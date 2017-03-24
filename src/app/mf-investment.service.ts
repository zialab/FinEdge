import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { Investment } from './investment';
import { MFTransaction } from './mf-transaction';
import { TransactionI } from './transaction-interface';
import { MFNav } from './mf-nav-model';

@Injectable()
export class MFInvestmentService {

  //private mutualFundUrl = 'https://mutualfundsnav.p.mashape.com/';
  private mutualFundUrl = 'https://mitanjos-india-mutual-fund-nav-prices-v1.p.mashape.com/';
  private headers : Headers = new Headers({
         'Content-Type': 'application/json',
         'Accept': 'application/json',
         'X-Mashape-Key': 'H5jTdzFVINmshqJUgY38yQfXZSJOp1XhcgojsnXEmHlRq5LFrU'
       }); // ... Set content type to JSON
  private options : RequestOptions = new RequestOptions({ headers: this.headers }); // Create a request option

  constructor(private http: Http) { }

  //private headers = new Headers({'Content-Type': 'application/json','X-Mashape-Key': 'H5jTdzFVINmshqJUgY38yQfXZSJOp1XhcgojsnXEmHlRq5LFrU','Accept': 'application/json'});
  //private options = new RequestOptions({ headers: this.headers });

  getLatestNav(schemeCode: number): Observable<MFNav> {
    let url : string = this.mutualFundUrl+'quote/schemeCode/'+schemeCode;
    return  this.http.get(url, this.options)
            .map(res =>  res.json() as MFNav)
            .catch(this.handleError); // ...using post request
  }

  // getLatestNav(scodes: number[]): Promise<MFNav[]> {
  //   let bodyString = '{"scodes":' +JSON.stringify(scodes) +'}'; // Stringify payload
  //
  //   return  this.http.post(this.mutualFundUrl, bodyString , this.options)
  //           .toPromise()
  //           .then(this.extractData)
  //           .catch(this.handleError); // ...using post request
  // }

  getHistoricalNav(): Promise<Map<number, Array<MFNav>>> {
    let headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Mashape-Key': 'H5jTdzFVINmshqJUgY38yQfXZSJOp1XhcgojsnXEmHlRq5LFrU'
      }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    let bodyString = '{"scodes":' +JSON.stringify([]) +'}'; // Stringify payload
    return this.http.post(this.mutualFundUrl, bodyString , options)
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
