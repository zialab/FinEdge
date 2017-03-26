import { RateFrequency } from './rate-frequency';
import { CalculationFrequency } from './calculation-frequency';

export interface TransactionI {
    id:number;
    //transactionDate: number;
    transactionDate:Date;
    amountInvested:number;
    // rateOfReturn:number;
    // maturityDate:Date;
    // amountAtMaturity:number;
    // returns:number;
    charges: number;
    // rateFrequency: RateFrequency;
    // calculationFrequency: CalculationFrequency;
}
