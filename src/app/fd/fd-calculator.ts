import { RateFrequency } from '../model/rate-frequency';
import { CalculationFrequency } from '../model/calculation-frequency';
import { FDTransaction } from './model/fd-transaction';

export class FDCalculator {

    constructor(
        private transaction : FDTransaction
    ) { }

    calculateMaturityAmount():number{
        let _MS_PER_DAY = 1000 * 60 * 60 * 24;
        let rate: number = this.transaction.rateOfReturn;
        let maturityAmount: number = 0;
        let rateFrequency: RateFrequency = this.transaction.rateFrequency;// as RateFrequency;
        let calculationFrequency: CalculationFrequency = this.transaction.calculationFrequency;// as CalculationFrequency;
        let principalAmt: number = this.transaction.amountInvested;
        let period: number = 0;

        if(rateFrequency.toString() === RateFrequency[RateFrequency.Days]) {
            period = Math.floor(this.transaction.maturityDate.getTime() - this.transaction.transactionDate.getTime())/_MS_PER_DAY;
        } else if(rateFrequency.toString() === RateFrequency[RateFrequency.Months]) {
            period = this.monthElapse(this.transaction.transactionDate, this.transaction.maturityDate);
        } else if(rateFrequency.toString() === RateFrequency[RateFrequency.Years]) {
            period = this.yearElapse(this.transaction.transactionDate, this.transaction.maturityDate);
        }

        if(period <= 90 && rateFrequency.toString() === RateFrequency[RateFrequency.Days]) {
            calculationFrequency = 0;
        }

        if(Number(CalculationFrequency[calculationFrequency]) == 0) {	//	Simple interest
            maturityAmount = principalAmt * (1 + ((rate * period) / (rateFrequency*100)));
        } else	{ //	Compound interest
            let val1 = 1 + rate/(100 * Number(CalculationFrequency[calculationFrequency]));
            let val2 = (period * Number(CalculationFrequency[calculationFrequency]) / Number(RateFrequency[rateFrequency]));
            let val3 = Math.pow(val1, val2);
            maturityAmount = (principalAmt * val3);
        }
        return Math.round(maturityAmount*1)/1;
    }

    calculateReurn():number{
            return Math.round((this.calculateMaturityAmount()-this.transaction.amountInvested)*1)/1;
    }

    monthElapse(fromString: Date, toString: Date):number {
        let from: Date = new Date(fromString);
        let to: Date = new Date(toString);
        let months: number = to.getMonth() - from.getMonth() + (12 * (to.getFullYear() - from.getFullYear()));

        if(to.getDate() < from.getDate()){
            months--;
        }

        return months;
    }

    yearElapse(fromString: Date, toString: Date):number {
        let from: Date = new Date(fromString);
        let to: Date = new Date(toString);
        let monthdif: number = to.getMonth() - from.getMonth();
        if(monthdif > -1) {
                return (to.getFullYear() - from.getFullYear());
        } else {
                return (to.getFullYear() - from.getFullYear() - 1);
        }
    }
}
