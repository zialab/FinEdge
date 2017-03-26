import { TransactionI } from './transaction-interface';

export class Transaction implements TransactionI {
    id:number = 0;
    transactionDate:Date = new Date();
    amountInvested:number = 0;
    returns:number = 0;
    amountAtMaturity:number = 0;
    rateOfReturn:number = 0;
    charges:number = 0;

    constructor(
      id: number, transactionDate: Date,
      amountInvested: number, rateOfReturn: number, returns: number, amountAtMaturity: number, charges: number
      ) {}

}
