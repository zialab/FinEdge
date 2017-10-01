import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { InvestmentService } from '../../investment/investment.service';
import { TransactionI } from '../../model/transaction-interface';
import { PPFCalculator } from '../../ppf/ppf-calculator';
import { Transaction } from '../../model/transaction';
import { PPFTransaction } from '../model/ppf-transaction';
import { RateFrequency } from '../../model/rate-frequency';
import { CalculationFrequency } from '../../model/calculation-frequency';

@Component({
    selector: 'ppf-data-table',
    templateUrl: './ppf-data-table.component.html',
    styleUrls: [  '../../dashboard/dashboard.component.css',
                  './../../../../node_modules/primeng/resources/primeng.min.css',
                  './../../../../node_modules/primeng/resources/themes/omega/theme.css',
                  './../../../../node_modules/font-awesome/css/font-awesome.min.css' ],
    encapsulation: ViewEncapsulation.None
})

export class PPFDataTableComponent implements OnInit {
    investmentName : string = "PPF";

    activeId: number;

    displayDialog: boolean;

    transaction: PPFTransaction = new PPFTransaction(0,new Date(),0,7.5,0,0,0,new Date(),RateFrequency.Years,CalculationFrequency.Quaterly);

    selectedTransaction: Transaction;

    newTransaction: boolean;

    transactions: Transaction[];

    constructor(
        private investmentService: InvestmentService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.activeId = params['id'];

//            this.investmentService.getInvestment(this.activeId).then(inv => this.investment = inv);
//
//            console.log("b44 switchMap selected investment ");
//            console.log(this.investment);
//            console.log("b44 switchMap selected transactions ");
//            console.log(this.transactions);
        });
        console.log("selected investment id "+this.activeId);

        this.investmentService.getTransactions(this.activeId).then(transactions => this.transactions = transactions);
    }

    showDialogToAdd() {
        this.newTransaction = true;
        this.transaction = new PPFTransaction(0,new Date(),0,7.5,0,0,0,new Date(),RateFrequency.Years,CalculationFrequency.Quaterly);
        this.displayDialog = true;
    }

    save() {
        if(this.newTransaction)
            this.transactions.push(this.transaction);
        else
            this.transactions[this.findSelectedTransactionIndex()] = this.transaction;

        this.transaction = null;
        this.displayDialog = false;
    }

    delete() {
        this.transactions.splice(this.findSelectedTransactionIndex(), 1);
        this.transaction = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newTransaction = false;
        this.transaction = this.cloneTransaction(event.data);
        this.displayDialog = true;
    }

    cloneTransaction(t: PPFTransaction): PPFTransaction {
        let transaction = new PPFTransaction(0,new Date(),0,7.5,0,0,0,new Date(),RateFrequency.Years,CalculationFrequency.Quaterly);
        for(let prop in t) {
            transaction[prop] = t[prop];
        }
        return transaction;
    }

    findSelectedTransactionIndex(): number {
        return this.transactions.indexOf(this.selectedTransaction);
    }

    getAmountAtMaturity(t: Transaction): number{
        let ppfCalculator: PPFCalculator = new PPFCalculator(t as PPFTransaction);
        return ppfCalculator.calculateMaturityAmount();
    }

    getReturn(t: Transaction): number {
        let ppfCalculator: PPFCalculator = new PPFCalculator(t as PPFTransaction);
        return ppfCalculator.calculateReurn();
    }

    getTotalInvestment(): number {
        let totalInvestment: number = 0;
        for (let transaction of this.transactions) {
            totalInvestment = totalInvestment + transaction.amountInvested;
        }
        return totalInvestment;
    }
}
