import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { InvestmentService } from './investment.service';
import { Investment } from './investment';
import { TransactionI } from './transaction-interface';
import { Transaction } from './transaction';
import { FDCalculator } from './fd-calculator';

@Component({
    selector: 'fd-top-view',
    templateUrl: './fd-top-view.component.html',
    styleUrls: [ './dashboard.component.css' ]
})

export class FDTopViewComponent implements OnInit {
    investmentName : string = "PD";

    activeId: number;

    investment: Investment;
    transactions: Transaction[];

    constructor(
        private investmentService: InvestmentService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.activeId = params['id'];
        });
        console.log("selected investment id "+this.activeId);

        //this.investmentService.getTransactions(this.activeId).then(transactions => this.transactions = transactions);

        this.investmentService.getInvestment(this.activeId).then(investment => {
            this.investment = investment;
            this.transactions = investment.transactions});

    }

    getTotalInvestment(): number {
        let totalInvestment: number = 0;
        for (let transaction of this.transactions) {
            totalInvestment = totalInvestment + transaction.amountInvested;
        }
        return totalInvestment;
    }

    getMaturityDate(): string{

        let sortedTransaction = this.transactions;
        sortedTransaction.sort(function(a,b) {
            return new Date(a.maturityDate).getTime() - new Date(b.maturityDate).getTime();
        });

        let firstTransaction: Transaction = sortedTransaction[0];
        let firstMaturityDate: Date = new Date(firstTransaction.transactionDate);

        return firstMaturityDate.toDateString();
    }


    getTotalReturnPercentage(): string {
        return Math.round(((this.getTotalReturn()/this.getTotalInvestment())*100)*100)/100 + '%';
    }

    getTotalReturn(): number{
        let totalReturn: number = 0;
        let fdCalc: FDCalculator;
        for (let transaction of this.transactions) {
            fdCalc = new FDCalculator(transaction);
            totalReturn = totalReturn + fdCalc.calculateReurn();
        }
        return totalReturn;
    }

    getTotalMaturityAmount(): number{
        let maturityAmount: number = 0;
        let fdCalc: FDCalculator;
        for (let transaction of this.transactions) {
            fdCalc = new FDCalculator(transaction);
            maturityAmount = maturityAmount + fdCalc.calculateMaturityAmount();
        }
        return maturityAmount;
    }
}
