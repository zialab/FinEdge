import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Investment } from './investment';

@Injectable()
export class InvestmentSearchService {

  constructor(private http: Http) {}
    
  search(term: string): Observable<Investment[]> {
    return this.http
               .get(`app/investments/?name=${term}`)
               .map(response => response.json().data as Investment[]);
  }
}