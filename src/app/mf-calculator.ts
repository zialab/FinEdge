import { Injectable }    from '@angular/core';

import { RateFrequency } from './rate-frequency';
import { CalculationFrequency } from './calculation-frequency';
import { Transaction } from './transaction';
import { MFTransaction } from './mf-transaction';
import { MFInvestmentService } from './mf-investment.service';
import { MFNav } from './mf-nav-model';

@Injectable()
export class MFCalculator {

    investmentAmount : number = 0;

    constructor(private mfInvestmentService: MFInvestmentService) { }

    getTotalUnits(transaction: MFTransaction): number{
        let totalUnits : number = transaction.amountInvested/transaction.unitPrice;
        return Math.round(totalUnits*100)/100;
    }

    getLatestNav(transaction: MFTransaction) : number{
      //let resultNavMap : Map<number, MFNav>;
      // let resultNav : MFNav;
      // let scodes : number[] = [];
      // scodes.push(transaction.scode);
      // this.mfInvestmentService.getLatestNav(scodes).then(resultNavList => {
      //   resultNav = resultNavList.find(navObj => navObj.scode == transaction.scode);
      //   return Number(resultNav.nav);
      // });
      return Number('0');
    }

    getTransactionLatestFundValue(transaction: MFTransaction) : number {
        let  latestValue : number = this.getTotalUnits(transaction) * this.getLatestNav(transaction);
        return Math.round(latestValue*100)/100;;
    }

    getTransactionReturn(transaction: MFTransaction) : number {
        console.log("latest Nav"+this.getLatestNav(transaction));
        return this.getLatestNav(transaction);
    }

    getReturnPercentage(transaction: MFTransaction) : number {

        return 1234;
    }



    getHistoricalNav(transaction: MFTransaction) : number{
      return Number('1233');
    }


    calculateMaturityAmount():number{return 1233;}
    calculateReurn() : number {return 1234;}
}
