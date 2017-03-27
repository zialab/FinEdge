import { Injectable }    from '@angular/core';

import { RateFrequency } from '../model/rate-frequency';
import { CalculationFrequency } from '../model/calculation-frequency';
import { TransactionI } from '../model/transaction-interface';
import { Transaction } from '../model/transaction';
import { EquityTransaction } from './model/equity-transaction';
import { EquityInvestmentService } from './equity-investment.service';
import { StckPrice } from './model/stock-price.model';
//import { MFData } from '../model/mf-data.model';

@Injectable()
export class EquityCalculator {

    private investmentAmount : number = 0;
    private stockPrices : Array<StckPrice> = [];

    constructor(private mfInvestmentService: EquityInvestmentService) { }

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

    addStockPrice(stckPrice: StckPrice): void {
      this.stockPrices.push(stckPrice);
    }

    private isMFNavIncludes(scode: number): boolean {
      let result :boolean = false;
      this.stockPrices.forEach(stockItem => {
        // stockItem.data.forEach(dataItem => {
        //     if(dataItem.schmCode == scode) {
        //       result = true;
        //     }
        // });
      });
      return result;
    }
    getTransactionUnits(transaction: EquityTransaction): number{
        let totalUnits : number = transaction.amountInvested/transaction.unitPrice;
        return Math.round(totalUnits*100)/100;
    }

    getTransactionLatestFundValue(transaction: EquityTransaction) : number {
        let latestValue : number = this.getTransactionUnits(transaction) * this.getLatestNav(transaction);
        return Math.round(latestValue*100)/100;;
    }

    getLatestNav(transaction: EquityTransaction) : number{
      let resultNavVal : number;
      this.stockPrices.forEach(stockItem => {
        // stockItem.data.forEach(dataItem => {
        //     if(dataItem.schmCode == transaction.scode) {
        //       resultNavVal = dataItem.navVal;
        //     }
        // });
      });

      // return resultNavVal;
      return 101;
    }

    getTransactionReturn(transaction: EquityTransaction) : number {
        return Math.round((this.getTransactionLatestFundValue(transaction)-transaction.amountInvested)*100)/100;
    }

    getTransactionReturnPercentage(transaction: EquityTransaction) : number {
        return Math.round((this.getTransactionReturn(transaction)/transaction.amountInvested)*100*100)/100;
    }

    getHistoricalNav(transaction: EquityTransaction) : number{
      return Number('1233');
    }

    getLatestUnitPrice(t: EquityTransaction): number{
      return this.getLatestUnitPrice(t);
    }

    getTotalInvestment(t: EquityTransaction): number{
      return Number('123');
    }

    getTransactionLatestInvestmentValue(t: EquityTransaction): number {
      return this.getTransactionLatestInvestmentValue(t);
    }

}
