import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { InvestmentService } from './../../investment/investment.service';
import { TransactionI } from '../../model/transaction-interface';
import { FDCalculator } from '../../fd/fd-calculator';
import { Transaction } from '../../model/transaction';
import { FDTransaction } from '../model/fd-transaction';
import { RateFrequency } from '../../model/rate-frequency';
import { CalculationFrequency } from '../../model/calculation-frequency';

@Component({
    selector:     'fd-data-table',
    templateUrl:  './fd-data-table.component.html',
    styleUrls: [  "./../../../../node_modules/primeng/resources/primeng.min.css",
                  "./../../../../node_modules/primeng/resources/themes/omega/theme.css",
                  "./../../../../node_modules/font-awesome/css/font-awesome.min.css"
                ]

})

export class FDDataTableComponent implements OnInit {
    investmentName : string = "FD";

    activeId: number;

    displayDialog: boolean;

    transaction: FDTransaction = new FDTransaction(0,new Date(),0,7.5,0,0,0,new Date(),RateFrequency.Years,CalculationFrequency.Quaterly);

    selectedTransaction: FDTransaction;

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
        this.transaction = new FDTransaction(0,new Date(),0,7.5,0,0,0,new Date(),RateFrequency.Years,CalculationFrequency.Quaterly);
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

    cloneTransaction(t: FDTransaction): FDTransaction {
        let transaction = new FDTransaction(0,new Date(),0,7.5,0,0,0,new Date(),RateFrequency.Years,CalculationFrequency.Quaterly);
        for(let prop in t) {
            transaction[prop] = t[prop];
        }
        return transaction;
    }

    findSelectedTransactionIndex(): number {
        return this.transactions.indexOf(this.selectedTransaction);
    }

    getAmountAtMaturity(t: FDTransaction): number{
        let fdCalculator: FDCalculator = new FDCalculator(t);
        return fdCalculator.calculateMaturityAmount();
    }

    getReturn(t: FDTransaction): number {
        let fdCalculator: FDCalculator = new FDCalculator(t);
        return fdCalculator.calculateReurn();
    }
}
