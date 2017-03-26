import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { InvestmentService } from '../../investment/investment.service';
import { Investment } from '../../model/investment';
//import { TransactionI } from '../../model/transaction-interface';
import { Transaction } from '../../model/transaction';
import { FDTransaction } from '../model/fd-transaction';
import { FDCalculator } from '../../fd/fd-calculator';

@Component({
    selector: 'fd-top-view',
    templateUrl: './fd-top-view.component.html',
    styleUrls: [ '../../dashboard/dashboard.component.css' ]
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
            let aItem: FDTransaction = a as FDTransaction;
            let bItem: FDTransaction = b as FDTransaction;
            return new Date(aItem.maturityDate).getTime() - new Date(bItem.maturityDate).getTime();
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
            fdCalc = new FDCalculator(transaction as FDTransaction);
            totalReturn = totalReturn + fdCalc.calculateReurn();
        }
        return totalReturn;
    }

    getTotalMaturityAmount(): number{
        let maturityAmount: number = 0;
        let fdCalc: FDCalculator;
        for (let transaction of this.transactions) {
            fdCalc = new FDCalculator(transaction as FDTransaction);
            maturityAmount = maturityAmount + fdCalc.calculateMaturityAmount();
        }
        return maturityAmount;
    }
}
