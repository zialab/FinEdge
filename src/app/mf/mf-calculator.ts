import { Injectable }    from '@angular/core';

import { TransactionI } from '../model/transaction-interface';
import { Transaction } from '../model/transaction';
import { MFTransaction } from './model/mf-transaction';
import { MFInvestmentService } from './mf-investment.service';
import { MFNav } from '../model/mf-nav-model';
import { MFData } from '../model/mf-data.model';

@Injectable()
export class MFCalculator {

    private investmentAmount : number = 0;
    private navs : Array<MFNav> = [];

    constructor(private mfInvestmentService: MFInvestmentService) { }

    // refreshNav(transactions: TransactionI[]){
    //   //let scodes: number[] = [];
    //   for(let transaction of transactions) {
    //     let mfTransaction:MFTransaction = transaction as MFTransaction;
    //     if(!this.isMFNavIncludes(mfTransaction.scode)) {
    //       this.mfInvestmentService.getLatestNav(mfTransaction.scode).then(nav => {
    //         this.navs.push(nav as MFNav);
    //       });
    //     }
    //   }
    // }

    addMFNav(mfNav: MFNav): void {
      this.navs.push(mfNav);
    }

    private isMFNavIncludes(scode: number): boolean {
      let result :boolean = false;
      this.navs.forEach(navItem => {
        navItem.data.forEach(dataItem => {
            if(dataItem.schmCode == scode) {
              result = true;
            }
        });
      });
      return result;
    }
    getTransactionUnits(transaction: MFTransaction): number{
        let totalUnits : number = transaction.amountInvested/transaction.unitPrice;
        return Math.round(totalUnits*100)/100;
    }

    getTransactionLatestFundValue(transaction: MFTransaction) : number {
        let latestValue : number = this.getTransactionUnits(transaction) * this.getLatestNav(transaction);
        return Math.round(latestValue*100)/100;;
    }

    getLatestNav(transaction: MFTransaction) : number{
      let resultNavVal : number;
      this.navs.forEach(navItem => {
        //let data : Array<MFData> = navItem.data;
        navItem.data.forEach(dataItem => {
            if(dataItem.schmCode == transaction.scode) {
              resultNavVal = dataItem.navVal;
            }
        });
      });

      return resultNavVal;
    }

    getTransactionReturn(transaction: MFTransaction) : number {
        return Math.round((this.getTransactionLatestFundValue(transaction)-transaction.amountInvested)*100)/100;
    }

    getTransactionReturnPercentage(transaction: MFTransaction) : number {
        return Math.round((this.getTransactionReturn(transaction)/transaction.amountInvested)*100*100)/100;
    }

    getHistoricalNav(transaction: MFTransaction) : number{
      return Number('1233');
    }


    calculateMaturityAmount():number{return 1233;}
    calculateReurn() : number {return 1234;}
}
