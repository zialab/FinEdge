import { Component, OnInit } from '@angular/core';

import { Investment } from './investment';
import { InvestmentService } from './investment.service';

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.css' ]

})

export class DashboardComponent implements OnInit {

  investments: Investment[] = [];

  constructor(private investmentService: InvestmentService) { }

  ngOnInit(): void {
    this.investmentService.getInvestments()
      .then(investments => this.investments = investments.slice(1, 5));
  }
}