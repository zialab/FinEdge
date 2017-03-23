import {TransactionI} from './transaction-interface';

export class Transaction implements TransactionI {
    constructor(public id, public transactionDate, public amountInvested, public rateOfReturn, 
    public maturityDate, public amountAtMaturity, public returns, public charges, 
    public rateFrequency, public calculationFrequency) {}
    
    //constructor(){}
}
