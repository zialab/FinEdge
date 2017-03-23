import { Injectable }    from '@angular/core';

import { RateFrequency } from './rate-frequency';
import { CalculationFrequency } from './calculation-frequency';
import { TransactionI } from './transaction-interface';
import { Transaction } from './transaction';
import { MFTransaction } from './mf-transaction';
import { MFInvestmentService } from './mf-investment.service';
import { MFNav } from './mf-nav-model';

@Injectable()
export class MFCalculator {

    private investmentAmount : number = 0;
    private navs : MFNav[] = [];

    constructor(private mfInvestmentService: MFInvestmentService) { }

    refreshNav(transactions: TransactionI[]){
      let scodes: number[] = [];
      for(let transaction of transactions) {
        let mfTransaction:MFTransaction = transaction as MFTransaction;
        if(!scodes.includes(mfTransaction.scode)){
          scodes.push(mfTransaction.scode);
        }
      }

      this.mfInvestmentService.getLatestNav(scodes).then(navs => {
        this.navs = navs;
      });
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
      let resultNav : MFNav = this.navs.find(nav => nav.scode == transaction.scode);
      return Number(resultNav.nav);
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
