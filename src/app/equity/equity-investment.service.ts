import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { Investment } from '../model/investment';
import { EquityTransaction } from './model/equity-transaction';
import { StockPrice } from './model/stock-price.model';
import { StockPriceGoogle } from './model/stock-price-google.model';

@Injectable()
export class EquityInvestmentService {

  //private mutualFundUrl = 'https://mutualfundsnav.p.mashape.com/';
  private equityUrl = 'https://www.quandl.com/';
  private googleUrl = 'http://finance.google.com/';
  private headers : Headers = new Headers({
        //  'Content-Type': 'application/json',
        //  'Accept': 'application/json',
        //  'X-Mashape-Key': 'H5jTdzFVINmshqJUgY38yQfXZSJOp1XhcgojsnXEmHlRq5LFrU'
       }); // ... Set content type to JSON
  private options : RequestOptions = new RequestOptions({ headers: this.headers }); // Create a request option

  constructor(private http: Http) { }

  getLatestPrice(shortName: string): Observable<StockPrice> {
    let url : string = this.equityUrl+'api/v3/datasets/NSE/'+shortName+'.json?rows=2?api_key=AdH7n-CDua_KxCGScV2d';
    return  this.http.get(url, this.options)
            .map(res =>  res.json() as StockPrice)
            .catch(this.handleError); // ...using post request
  }

  // getLatestPrice(shortName: string): Observable<StockPriceGoogle> {
  //   let url : string = this.equityUrl+'finance/info?client=ig&q=NSE:'+shortName;
  //   return  this.http.get(url, this.options)
  //           .map(res =>  {
  //             res.extractData.replace("//","").json() as StockPriceGoogle
  //           }).catch(this.handleError); // ...using post request
  // }

  getHistoricalNav(): Promise<Map<number, Array<StockPrice>>> {
    let headers = new Headers({
        // 'Content-Type': 'application/json',
        // 'Accept': 'application/json',
        // 'X-Mashape-Key': 'H5jTdzFVINmshqJUgY38yQfXZSJOp1XhcgojsnXEmHlRq5LFrU'
      }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    let bodyString = '{"scodes":' +JSON.stringify([]) +'}'; // Stringify payload
    return this.http.post(this.equityUrl, bodyString , options)
                      .toPromise()
                      .then(this.extractData)
                      .catch(this.handleError); // ...using post request
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || [];
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

  private clone(object: any){
    // hack
    return JSON.parse(JSON.stringify(object));
  }
}
