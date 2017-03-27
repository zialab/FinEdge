import { Transaction } from '../../model/transaction';

export class EquityTransaction extends Transaction {

  stockName: string = '';
  stockShortName: string = '';
  unitPrice: number = 0;
  units: number = 0;
  maturityDate: Date = new Date();

  constructor(
    id:number, transactionDate: Date, amountInvested: number, rateOfReturn: number, returns: number, charges: number, amountAtMaturity: number,
    public scode: number, stockName: string, stockShortName: string, unitPrice: number, units: number, maturityDate: Date) {
      super(id, transactionDate, amountInvested, rateOfReturn, returns, amountAtMaturity, charges);
  }

}
