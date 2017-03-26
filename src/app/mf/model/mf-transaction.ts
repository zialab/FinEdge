import {Transaction} from '../../model/transaction';

export class MFTransaction extends Transaction {

  folioNumber = '';
  fundName = '';
  unitPrice = 0;
  maturityDate = new Date();

  constructor(
    id:number, transactionDate: Date, amountInvested: number, rateOfReturn: number, returns: number, charges: number, amountAtMaturity: number, 
    public scode: number, folioNumber: string, fundName: string, unitPrice: number, maturityDate: Date) {
      super(id, transactionDate, amountInvested, rateOfReturn, returns, amountAtMaturity, charges);
  }

}
