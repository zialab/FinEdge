import { MFTransaction } from '../mf/model/mf-transaction';

export class MFInvestment {

    // id: number;
    // name: string;
    // investmentId: string;
    // investerId: string;
    // transactions: MFTransaction[];
    // lockInPeriod: number;

    constructor (public id:number, public name:string,public investmentId: string,public investerId: string,public transactions: MFTransaction[],
        public lockInPeriod: number) {}

}
