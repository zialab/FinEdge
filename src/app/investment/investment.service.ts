import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Investment } from '../model/investment';
import { MFInvestment } from '../model/mf-investment';
import { Transaction } from '../model/transaction';
//import { TransactionI } from '../model/transaction-interface';
//import { MFTransaction } from '../model/mf-transaction';

@Injectable()
export class InvestmentService {

    private headers = new Headers({'Content-Type': 'application/json'});

    private investmentsUrl = 'api/investments';  // URL to web api
    private transactionsUrl = 'api/transactions';
    private mfTransactionsUrl = 'api/mftransactions';  // URL to web api

    constructor(private http: Http) { }

    getInvestments(): Promise<Investment[]> {
        return this.http.get(this.investmentsUrl)
               .toPromise()
               .then(response => response.json().data as Investment[])
               .catch(this.handleError);
    }

    getInvestment(id: number): Promise<Investment> {
        const url = `${this.investmentsUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Investment)
            .catch(this.handleError);
    }

    getMFInvestment(id: number): Promise<MFInvestment> {
        const url = `${this.mfTransactionsUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as MFInvestment)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.investmentsUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    create(name: string): Promise<Investment> {
        return this.http
          .post(this.investmentsUrl, JSON.stringify({name: name}), {headers: this.headers})
          .toPromise()
          .then(res => res.json().data)
          .catch(this.handleError);
    }

    update(investment: Investment): Promise<Investment> {
        const url = `${this.investmentsUrl}/${investment.id}`;
        return this.http
          .put(url, JSON.stringify(investment), {headers: this.headers})
          .toPromise()
          .then(() => investment)
          .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getTransactions(id: number): Promise<Transaction[]> {
        const url = `${this.investmentsUrl}/${id}`;
        return this.http.get(url)
               .toPromise()
               .then(response => response.json().data.transactions as Transaction[])
               .catch(this.handleError);
    }
    //
    // getMFTransactions(id: number): Promise<MFTransaction[]> {
    //     const url = `${this.mfTransactionsUrl}/${id}`;
    //     return this.http.get(url)
    //            .toPromise()
    //            .then(response => response.json().data.transactions as TransactionI[])
    //            .catch(this.handleError);
    // }
}
