import { Component, OnInit } from '@angular/core';

import { Investment } from '../model/investment';
import { InvestmentService } from '../investment/investment.service';
import { Transaction } from '../model/transaction';

import {NgxChartsModule} from '@swimlane/ngx-charts';
//import {single, multi} from './data';

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.css' ]

})

export class DashboardComponent implements OnInit {

  single: Array<PieChartData>;
  //multi: any[];

  view: any[] = [700, 400];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  onSelect(event) {
    console.log(event);
  }

  investments: Investment[] = [];

  constructor(private investmentService: InvestmentService) {
    //Object.assign(this, {single, multi});
  }

  ngOnInit(): void {
    this.investmentService.getInvestments()
      .then(investments => {

        this.preparePieChartData(investments);
        this.investments = investments.slice(0, 4);

      });
  }

  private preparePieChartData(investments:Investment[]):void{
    this.single = new Array<PieChartData>();
    for(let investment of investments) {
      let chartData: PieChartData = new PieChartData();
      chartData.name = investment.name;
      let totalInv: number = 0;
      let transaction:Transaction;
      for(let transactionItem of investment.transactions) {
        transaction = transactionItem as Transaction;
        totalInv = totalInv + transaction.amountInvested;
      }
      chartData.value = totalInv;
      this.single.push(chartData);
    }
  }

}

export class PieChartData {
  name: string;
  value: number;
}
