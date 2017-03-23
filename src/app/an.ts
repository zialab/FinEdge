import { RateFrequency } from './rate-frequency';
import { CalculationFrequency } from './calculation-frequency';

export interface TransactionI {
    id:number;
    transactionDate:Date;
    amountInvested:number;
    rateOfReturn:Date;
    maturityDate:number;
    amountAtMaturity:number;
    returns:number;
    charges:number;
    rateFrequency: RateFrequency;
    calculationFrequency: CalculationFrequency;
}