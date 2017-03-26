import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { InvestmentSearchService } from '../investment-search.service';
import { Investment } from '../../model/investment';

@Component({
  moduleId: module.id,
  selector: 'investment-search',
  templateUrl: './investment-search.component.html',
  styleUrls: [ './investment-search.component.css' ],
  providers: [InvestmentSearchService]
})

export class InvestmentSearchComponent implements OnInit {
  investments: Observable<Investment[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private investmentSearchService: InvestmentSearchService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.investments = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.investmentSearchService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Investment[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Investment[]>([]);
      });
  }

  gotoDetail(investment: Investment): void {
    let link = ['/detail', investment.id];
    this.router.navigate(link);
  }
}
