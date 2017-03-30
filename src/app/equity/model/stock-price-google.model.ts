export class StockPriceGoogle {

        public id:number;
        public t:string;
        public e:string;
        public l:string;
        public l_fix:string;
        public l_cur:string;
        public s:string;
        public ltt:string;
        public lt:string;
        public lt_dts:string;
        public c:string;
        public c_fix:string;
        public cp:string;
        public cp_fix:string;
        public ccol:string;
        public pcls_fix:string;

        constructor(
          id:number, t: string, e: string, l: string, l_fix: string, l_cur: string, s: string, ltt: string, lt: string,
          lt_dts: number, c: boolean, c_fix: string,cp: string, cp_fix: string, ccol: string, pcls_fix: string
        ) {}

}
