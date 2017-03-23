import {TransactionI} from './transaction-interface';

export class MFTransaction implements TransactionI {
    // folioNumber: string;
    // fundName: string;
    // unitPrice: number;

    constructor(public id:number, public transactionDate:Date, public amountInvested: number, public rateOfReturn: number,
        public maturityDate: Date, public amountAtMaturity:number, public returns:number, public charges:number,
        public rateFrequency, public calculationFrequency, public scode:number, public folioNumber:string, public fundName:string,
        public unitPrice:number) {
        //super(id, transactionDate, amountInvested, rateOfReturn, maturityDate, amountAtMaturity, returns, charges, rateFrequency, calculationFrequency);
    }

}
