import { EquityTransaction } from './equity-transaction';

export class EquityTransactionGroup {

    constructor(
      public transactionDate: Date,public scode: number,public stockName: string, public stockShortName: string,
      public unitPrice: number, public units: number, public totalInvestment: number,
      public latestUnitPrice: number, public totalReturn: number, public returnPercentage: number, public latestInvestmentValue: number,
      public transactions : EquityTransaction[]) {}

}
