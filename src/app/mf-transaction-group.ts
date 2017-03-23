import { MFTransaction } from './mf-transaction';

export class MFTransactionGroup {
    // scode: string;
    // fundName: string;
    // totalInvestment: number;
    // totalReturn: number;
    // returnPercentage: number;
    // latestFundValue: number;

    constructor(public transactionDate: Date,public scode: number,public fundName: string, public totalInvestment: number, public totalReturn: number,
        public returnPercentage: number, public latestFundValue: number,  public transactions : MFTransaction[]) {}

}
