import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { InvestmentService } from './investment.service';
import { Investment } from './investment';
import { TransactionI } from './transaction-interface';
import { Transaction } from './transaction';
import { PPFCalculator } from './ppf-calculator';

@Component({
    selector: 'ppf-top-view',
    templateUrl: './ppf-top-view.component.html',
    styleUrls: [ './dashboard.component.css' ]
})

export class PPFTopViewComponent implements OnInit {
    investmentName : string = "PPF";
    
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
            return new Date(a.transactionDate).getTime() - new Date(b.transactionDate).getTime();
        });
        
        let firstTransaction: Transaction = sortedTransaction[0];
        let firstTransactionDate: Date = new Date(firstTransaction.transactionDate);
        firstTransactionDate.setFullYear(firstTransactionDate.getFullYear()+this.investment.lockInPeriod);
        
        return firstTransactionDate.toDateString();
    }
    
    getTotalReturn(): number{
        let totalReturn: number = 0;
        let ppfCalc: PPFCalculator;
        for (let transaction of this.transactions) {
            ppfCalc = new PPFCalculator(transaction);
            totalReturn = totalReturn + ppfCalc.calculateReurn();
        }
        return totalReturn;
    }
    
    getTotalMaturityAmount(): number{
        let maturityAmount: number = 0;
        let ppfCalc: PPFCalculator;
        for (let transaction of this.transactions) {
            ppfCalc = new PPFCalculator(transaction);
            maturityAmount = maturityAmount + ppfCalc.calculateMaturityAmount();
        }
        return maturityAmount;
    }
}