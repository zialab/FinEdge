import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { InvestmentService } from '../../investment/investment.service';
import { Investment } from '../../model/investment';
import { MFCalculator } from '../../mf/mf-calculator';
import { Transaction } from '../../model/transaction';
import { MFTransaction } from '../model/mf-transaction';
import { MFTransactionGroup } from '../model/mf-transaction-group';
import { MFNav } from '../../model/mf-nav-model';
import { MFInvestmentService } from '../../mf/mf-investment.service';

@Component({
    selector: 'mf-top-view',
    templateUrl: './mf-top-view.component.html',
    styleUrls: [ '../../dashboard/dashboard.component.css' ]
})

export class MFTopViewComponent implements OnInit {
    investmentName : string = "MF";

    private activeId: number;

    private investment: Investment;
    private transactions: MFTransaction[];
    transactionGroupMap: Map<number, MFTransactionGroup> = new Map<number, MFTransactionGroup>();
    private errorMessage: string;

    constructor(
      private investmentService: InvestmentService,
      private mfInvestmentService: MFInvestmentService,
      private route: ActivatedRoute,
      private mfCalculator: MFCalculator) { }

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
            let mfTransaction:MFTransaction = transaction as MFTransaction;

            this.mfInvestmentService.getLatestNav(mfTransaction.scode).subscribe(
              mfNav => {
                this.mfCalculator.addMFNav(mfNav);
                this.prepareMFTransactionGroup(mfTransaction);
              },
              error =>  this.errorMessage = <any>error);
            }
        });
    }

    // ngOnDestroy(){
    //   this.sub.unsubscribe();
    // }

    private prepareMFTransactionGroup(mfTransaction:MFTransaction): void {
      if(this.transactionGroupMap.get(mfTransaction.scode) === undefined) {
        let transactionArray : MFTransaction[] = [];
        transactionArray.push(mfTransaction);
        let mfTransactionGroup: MFTransactionGroup = new MFTransactionGroup(mfTransaction.transactionDate, mfTransaction.scode,mfTransaction.fundName, mfTransaction.amountInvested, this.mfCalculator.getTransactionReturn(mfTransaction), this.mfCalculator.getTransactionReturnPercentage(mfTransaction), this.mfCalculator.getTransactionLatestFundValue(mfTransaction), transactionArray);
        this.transactionGroupMap.set(mfTransaction.scode, mfTransactionGroup);
      } else {
        let mfTransactionGroup: MFTransactionGroup = this.transactionGroupMap.get(mfTransaction.scode);
        mfTransactionGroup.totalInvestment = mfTransactionGroup.totalInvestment + mfTransaction.amountInvested;
        mfTransactionGroup.totalReturn = mfTransactionGroup.totalReturn + this.mfCalculator.getTransactionReturn(mfTransaction);
        mfTransactionGroup.latestFundValue = mfTransactionGroup.latestFundValue + this.mfCalculator.getTransactionLatestFundValue(mfTransaction)
        mfTransactionGroup.transactions.push(mfTransaction);
        this.transactionGroupMap.set(mfTransaction.scode, mfTransactionGroup);
      }

      //this.transactionGroupList = [];
      this.transactionGroupMap.forEach((mfTransactionGroup: MFTransactionGroup, key: number) => {
        mfTransactionGroup.returnPercentage = this.getReturnPercentage(mfTransactionGroup);

      });
    }

    private getReturnPercentage(mfTransactionGroup: MFTransactionGroup): number {
      return Math.round(((mfTransactionGroup.totalReturn/mfTransactionGroup.totalInvestment)*100)*100)/100;
    }

    getTotalInvestment(): number {
        let totalInvestment: number = 0;
        this.transactionGroupMap.forEach((mfTransactionGroup: MFTransactionGroup, key: number) => {
          totalInvestment = totalInvestment + mfTransactionGroup.totalInvestment;
        });
        return totalInvestment;
    }

    getTotalReturnPercentage(): string {
        return Math.round(((this.getTotalReturn()/this.getTotalInvestment())*100)*100)/100 + '%';
    }

    getTotalReturn(): number{
        let totalReturn: number = 0;
        this.transactionGroupMap.forEach((mfTransactionGroup: MFTransactionGroup, key: number) => {
          totalReturn = totalReturn + mfTransactionGroup.totalReturn;
        });
        return totalReturn;
    }

    getTotalMaturityAmount(): number{
        let maturityAmount: number = 0;
        this.transactionGroupMap.forEach((mfTransactionGroup: MFTransactionGroup, key: number) => {
          maturityAmount = maturityAmount + mfTransactionGroup.latestFundValue;
        });
        return maturityAmount;
    }
}
