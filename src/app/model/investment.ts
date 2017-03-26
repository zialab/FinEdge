import { Transaction } from './transaction';

export class Investment {

  constructor (public id: number, public name: string, public investmentId: string,
    public investerId: string, public transactions: Transaction[], public lockInPeriod: number) {}

}
