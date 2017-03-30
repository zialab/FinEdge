
export class StockDataSet {

        public id:number;
        public dataset_code:string;
        public database_code:string;
        public name:string;
        public description:string;
        public refreshed_at:string;
        public newest_available_date:string;
        public oldest_available_date:string;
        public column_names:Array<string>;
        public frequency:string;
        public type:string;
        public premium:boolean;
        public limit:number;
        public transform:string;
        public column_index:string;
        public start_date:string;
        public end_date:string;
        public data:Array<string>;;
        public collapse:string;
        public order:string;
        public database_id:string;

        constructor(
          id:number, dataset_code: string, database_code: string, name: string, description: string, refreshed_at: string, newest_available_date: string,
          oldest_available_date: string, column_names: Array<string>, frequency: string, type: number, premium: boolean, limit: number,transform: string,
          column_index: string, start_date: string, end_date: number, data: Array<string>, collapse: number, order: string, database_id: string
        ) {}

}
