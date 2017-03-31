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
    transactionGroupMap: Map<string, EquityTransactionGroup> = new Map<string, EquityTransactionGroup>();
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

            if(this.equityCalculator.isStockPricePresent(mfTransaction.stockShortName))
              this.equityInvestmentService.getLatestPrice(mfTransaction.stockShortName).subscribe(
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
      if(this.transactionGroupMap.get(equityTransaction.stockShortName) === undefined) {
        let transactionArray : EquityTransaction[] = [];
        transactionArray.push(equityTransaction);
        let equityTransactionGroup: EquityTransactionGroup = new EquityTransactionGroup(equityTransaction.transactionDate, equityTransaction.scode,
          equityTransaction.stockName, equityTransaction.stockShortName, equityTransaction.unitPrice, equityTransaction.units,
          this.getTransactionInvestmentValue(equityTransaction), this.getLatestUnitPrice(equityTransaction) ,this.getTransactionTodayGainString(equityTransaction),
          this.getTransactionOverallGainString(equityTransaction), this.getTransactionLatestInvestmentValue(equityTransaction), transactionArray);
          this.transactionGroupMap.set(equityTransaction.stockShortName, equityTransactionGroup);
      } else {
        let equityTransactionGroup: EquityTransactionGroup = this.transactionGroupMap.get(equityTransaction.stockShortName);
        equityTransactionGroup.totalInvestment = equityTransactionGroup.totalInvestment + this.getTransactionInvestmentValue(equityTransaction);
        //equityTransactionGroup.totalReturn = equityTransactionGroup.totalReturn + this.getTransactionReturn(equityTransaction);
        equityTransactionGroup.latestInvestmentValue = equityTransactionGroup.latestInvestmentValue + this.getTransactionLatestInvestmentValue(equityTransaction);
        equityTransactionGroup.units = equityTransactionGroup.units + equityTransaction.units;
        equityTransactionGroup.transactions.push(equityTransaction);
        this.transactionGroupMap.set(equityTransaction.stockShortName, equityTransactionGroup);
      }

      this.transactionGroupMap.forEach((equityTransactionGroup: EquityTransactionGroup, key: string) => {
        equityTransactionGroup.todaysGainString = this.getTransactionGroupTodaysGainString(equityTransactionGroup);
        equityTransactionGroup.overallGainString = this.getTransactionGroupOverallGainString(equityTransactionGroup);
      });
    }

    private getLatestUnitPrice(t: EquityTransaction): number{
      return this.equityCalculator.getLatestUnitPrice(t);
    }

    // private getStockInvestment(t: EquityTransaction): number{
    //   return this.equityCalculator.getStockInvestment(t);
    // }

    // private getTransactionLatestInvestmentValue(t: EquityTransaction): number {
    //   return this.equityCalculator.getTransactionLatestInvestmentValue(t);
    // }

    // private getTransactionReturn(t: EquityTransaction): number {
    //   return this.equityCalculator.getTransactionReturn(t);
    // }
    //
    // private getTransactionReturnPercentage(t: EquityTransaction): number {
    //   return this.equityCalculator.getTransactionReturnPercentage(t);
    // }

    // private getReturnPercentage(equityTransactionGroup: EquityTransactionGroup): number {
    //   return 0;//Math.round(((equityTransactionGroup.totalReturn/equityTransactionGroup.totalInvestment)*100)*100)/100;
    // }

    private getTotalLatestInvestmentValue(): number{
        let totalReturn: number = 0;
        this.transactionGroupMap.forEach((equityTransactionGroup: EquityTransactionGroup, key: string) => {
          totalReturn = totalReturn + equityTransactionGroup.latestInvestmentValue;
        });
        return totalReturn;
    }

    private getTotalReturn(): number{
        let totalReturn: number = 0;
        this.transactionGroupMap.forEach((equityTransactionGroup: EquityTransactionGroup, key: string) => {
          totalReturn = totalReturn + (equityTransactionGroup.latestInvestmentValue - equityTransactionGroup.totalInvestment);
        });
        return totalReturn;
    }

    private getTotalReturnPercentage(): string {
        return Math.round(((this.getTotalReturn()/this.getTotalInvestment())*100)*100)/100 + '%';
    }

    private getTotalInvestment(): number {
        let totalInvestment: number = 0;
        this.transactionGroupMap.forEach((equityTransactionGroup: EquityTransactionGroup, key: string) => {
          totalInvestment = totalInvestment + equityTransactionGroup.totalInvestment;
        });
        return totalInvestment;
    }

    //////
    private getTransactionTodayGainString(t: EquityTransaction): string{
      return this.equityCalculator.getTransactionTodayGain(t)+ ' ('+this.equityCalculator.getTransactionTodayPercentageGain(t)+'%)';
    }

    private getTransactionOverallGainString(t: EquityTransaction): string{
      return this.equityCalculator.getTransactionOverallGain(t) + ' ('+this.equityCalculator.getTransactionOverallPercentageGain(t)+'%)';
    }

    private getTransactionGroupTodaysGainString(tg: EquityTransactionGroup): string{
      return this.equityCalculator.getTransactionGroupTodayGain(tg)+ ' ('+this.equityCalculator.getTransactionGroupTodayPercentageGain(tg)+'%)';
    }

    private getTransactionGroupOverallGainString(tg: EquityTransactionGroup): string{
      return this.equityCalculator.getTransactionGroupOverallGain(tg) + ' ('+this.equityCalculator.getTransactionGroupOverallPercentageGain(tg)+'%)';
    }

    private getTransactionLatestInvestmentValue(t: EquityTransaction): number {
      return this.equityCalculator.getTransactionLatestInvestmentValue(t);
    }

    private getTransactionInvestmentValue(t: EquityTransaction): number{
      return this.equityCalculator.getTransactionInvestmentValue(t);
    }

}
