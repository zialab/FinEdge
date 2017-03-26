import { MFTransaction } from './mf-transaction';

export class MFTransactionGroup {
  
    constructor(public transactionDate: Date,public scode: number,public fundName: string, public totalInvestment: number, public totalReturn: number,
        public returnPercentage: number, public latestFundValue: number,  public transactions : MFTransaction[]) {}

}
