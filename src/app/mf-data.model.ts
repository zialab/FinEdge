import { MFPrice } from './mf-price.model';

export class MFData {

  //constructor(
      public id:number;
      public priceDate:number;
      public schmCode:number;
      public isinGrowth:string;
      public isinReinv:string;
      public schmName:string;
      public fundType:string;
      public fundHouse:string;
      public navVal:number;
      public repVal:number;
      public salePrc:number;
      public priceList:Array<MFPrice>;//){}

}
