import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { InvestmentService } from '../../investment/investment.service';
import { Investment } from '../../model/investment';
import { EquityCalculator } from '../equity-calculator';
import { Transaction } from '../../model/transaction';
import { EquityTransaction } from '../model/equity-transaction';
import { EquityTransactionGroup } from '../model/equity-transaction-group';
import { EquityInvestmentService } from '../equity-investment.service';

@Component({
    selector: 'equity-top-view',
    templateUrl: './equity-top-view.component.html',
    styleUrls: [ '../../dashboard/dashboard.component.css' ]
})

export class EquityTopViewComponent implements OnInit {
    investmentName : string = "Stocks";

    private activeId: number;

    private investment: Investment;
    private transactions: EquityTransaction[];
    transactionGroupMap: Map<number, EquityTransactionGroup> = new Map<number, EquityTransactionGroup>();
    private errorMessage: string;

    constructor(
      private investmentService: InvestmentService,
      private equityInvestmentService: EquityInvestmentService,
      private route: ActivatedRoute,
      private equityCalculator: EquityCalculator) { }

    ngOnInit() {
      this.route.params.subscribe((params: Params) => {
          this.activeId = params['id'];

          //this.investmentService.getInvestment(this.activeId).then(inv => this.investment = inv);
          //console.log("b44 switchMap selected investment ");
          //console.log(this.investment);
          //console.log("b44 switchMap selected transactions ");
          //console.log(this.transactions);
        });
        console.log("selected investment id "+this.activeId);

        this.investmentService.getTransactions(this.activeId).then(transactions => {
          //this.transactions = transactions;
          //this.mfCalculator.refreshNav(this.transactions);
          for(let transaction of transactions) {
            let mfTransaction:EquityTransaction = transaction as EquityTransaction;

            this.equityInvestmentService.getLatestNav(mfTransaction.scode).subscribe(
              mfNav => {
                this.equityCalculator.addStockPrice(mfNav);
                this.prepareMFTransactionGroup(mfTransaction);
              },
              error =>  this.errorMessage = <any>error);
            }
        });
    }

    // ngOnDestroy(){
    //   this.sub.unsubscribe();
    // }

    private prepareMFTransactionGroup(equityTransaction:EquityTransaction): void {
      if(this.transactionGroupMap.get(equityTransaction.scode) === undefined) {
        let transactionArray : EquityTransaction[] = [];
        transactionArray.push(equityTransaction);
        let equityTransactionGroup: EquityTransactionGroup = new EquityTransactionGroup(equityTransaction.transactionDate, equityTransaction.scode,
          equityTransaction.stockName, equityTransaction.stockShortName, equityTransaction.unitPrice, equityTransaction.units,
          this.getTotalInvestment(equityTransaction), this.getLatestUnitPrice(equityTransaction) ,this.getTransactionReturn(equityTransaction),
          this.getTransactionReturnPercentage(equityTransaction), this.getTransactionLatestInvestmentValue(equityTransaction), transactionArray);
          this.transactionGroupMap.set(equityTransaction.scode, equityTransactionGroup);
      } else {
        let equityTransactionGroup: EquityTransactionGroup = this.transactionGroupMap.get(equityTransaction.scode);
        equityTransactionGroup.totalInvestment = equityTransactionGroup.totalInvestment + this.getTotalInvestment(equityTransaction);
        equityTransactionGroup.totalReturn = equityTransactionGroup.totalReturn + this.getTransactionReturn(equityTransaction);
        equityTransactionGroup.latestInvestmentValue = equityTransactionGroup.latestInvestmentValue + this.getTransactionLatestInvestmentValue(equityTransaction)
        equityTransactionGroup.transactions.push(equityTransaction);
        this.transactionGroupMap.set(equityTransaction.scode, equityTransactionGroup);
      }

      this.transactionGroupMap.forEach((equityTransactionGroup: EquityTransactionGroup, key: number) => {
        equityTransactionGroup.returnPercentage = this.getReturnPercentage(equityTransactionGroup);
      });
    }

    private getLatestUnitPrice(t: EquityTransaction): number{
      return this.equityCalculator.getLatestUnitPrice(t);
    }

    private getTotalInvestment(t: EquityTransaction): number{
      return this.equityCalculator.getTotalInvestment(t);
    }

    private getTransactionLatestInvestmentValue(t: EquityTransaction): number {
      return this.equityCalculator.getTransactionLatestInvestmentValue(t);
    }

    private getTransactionReturn(t: EquityTransaction): number {
      return this.equityCalculator.getTransactionReturn(t);
    }

    private getTransactionReturnPercentage(t: EquityTransaction): number {
      return this.equityCalculator.getTransactionReturnPercentage(t);
    }

    private getReturnPercentage(equityTransactionGroup: EquityTransactionGroup): number {
      return Math.round(((equityTransactionGroup.totalReturn/equityTransactionGroup.totalInvestment)*100)*100)/100;
    }
}
