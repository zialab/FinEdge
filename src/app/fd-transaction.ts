import { Transaction } from './transaction';

export class FDTransaction extends Transaction {
    constructor(public vin, public year, public brand, public color) {
        super(vin,year,brand,color);
    }
}