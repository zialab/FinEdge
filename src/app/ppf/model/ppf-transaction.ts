import { Transaction } from '../../model/transaction';
import { RateFrequency } from '../../model/rate-frequency';
import { CalculationFrequency } from '../../model/calculation-frequency';

export class PPFTransaction extends Transaction {

  maturityDate: Date = new Date();
  rateFrequency: RateFrequency = RateFrequency.Years;
  calculationFrequency: CalculationFrequency = CalculationFrequency.Quaterly;

  constructor(
    id:number, transactionDate: Date, amountInvested: number, rateOfReturn: number, returns: number, amountAtMaturity: number, charges: number,
    maturityDate: Date, rateFrequency: RateFrequency, calculationFrequency: CalculationFrequency
    ) {
      super(id, transactionDate, amountInvested, rateOfReturn, returns, amountAtMaturity, charges);
  }

}
