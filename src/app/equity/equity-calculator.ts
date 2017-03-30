import { Injectable }    from '@angular/core';

import { Transaction } from '../model/transaction';
import { EquityTransaction } from './model/equity-transaction';
import { EquityInvestmentService } from './equity-investment.service';
import { StockPrice } from './model/stock-price.model';
import { EquityTransactionGroup } from './model/equity-transaction-group';
//import { MFData } from '../model/mf-data.model';

@Injectable()
export class EquityCalculator {

    private investmentAmount : number = 0;
    private stockPrices : Array<StockPrice> = [];

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

    addStockPrice(stockPrice: StockPrice): void {

      this.stockPrices.push(stockPrice);
    }

    isStockPricePresent(shortName: string): boolean {
      let result :boolean = false;
      this.stockPrices.forEach(stockItem => {
            if(stockItem.dataset.dataset_code === shortName) {
              result = true;
            }
      });
      return result;
    }
    getTransactionUnits(transaction: EquityTransaction): number{
        let totalUnits : number = transaction.amountInvested/transaction.unitPrice;
        return Math.round(totalUnits*100)/100;
    }

    getTransactionLatestFundValue(transaction: EquityTransaction) : number {
        let latestValue : number = this.getTransactionUnits(transaction) * this.getLatestUnitPrice(transaction);
        return Math.round(latestValue*100)/100;;
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

    // getLatestUnitPrice(t: EquityTransaction): number{
    //   return Number('100');//this.getLatestUnitPrice(t);
    // }

    getStockInvestment(t: EquityTransaction): number{
      return Number('123');
    }


    //////
    getLatestUnitPrice(transaction: EquityTransaction) : number{
      let resultNavVal : number;
      this.stockPrices.forEach(stockItem => {
          if(stockItem.dataset.dataset_code === transaction.stockShortName) {
            resultNavVal = Number(stockItem.dataset.data[0][5]);
          }
      });
      return resultNavVal;
    }

    getYesterdayUnitPrice(transaction: EquityTransaction) : number{
      let resultNavVal : number;
      this.stockPrices.forEach(stockItem => {
          if(stockItem.dataset.dataset_code === transaction.stockShortName) {
            resultNavVal = Number(stockItem.dataset.data[1][5]);
          }
      });
      return resultNavVal;
    }

    getTransactionInvestmentValue(t: EquityTransaction): number {
      return Math.round((t.units*t.unitPrice)*100)/100;
    }

    getTransactionTodayGain(t: EquityTransaction): number{
      return Math.round((t.units*this.getLatestUnitPrice(t)-t.units*this.getYesterdayUnitPrice(t))*100)/100;
    }

    getTransactionTodayPercentageGain(t: EquityTransaction): number{
      return Math.round(((this.getTransactionTodayGain(t))/(t.units*this.getLatestUnitPrice(t))*100)*100)/100;
    }

    getTransactionOverallGain(t: EquityTransaction): number{
      return Math.round((t.units*this.getLatestUnitPrice(t)-this.getTransactionInvestmentValue(t))*100)/100;
    }

    getTransactionOverallPercentageGain(t: EquityTransaction): number{
      return Math.round((((this.getTransactionOverallGain(t))/this.getTransactionInvestmentValue(t))*100)*100)/100;
    }

    getTransactionLatestInvestmentValue(t: EquityTransaction): number {
      return Math.round((t.units*this.getLatestUnitPrice(t))*100)/100;
    }

    getTransactionGroupTodayGain(transactionGroup: EquityTransactionGroup): number {
      return 0;
    }

    getTransactionGroupTodayPercentageGain(transactionGroup: EquityTransactionGroup): number {
      return 0;
    }

    getTransactionGroupOverallGain(transactionGroup: EquityTransactionGroup): number {
      return 0;
    }

    getTransactionGroupOverallPercentageGain(transactionGroup: EquityTransactionGroup): number {
      return 0;
    }
}
