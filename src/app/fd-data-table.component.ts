import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { InvestmentService } from './investment.service';
import { TransactionI } from './transaction-interface';
import { FDCalculator } from './fd-calculator';
import { Transaction } from './transaction';
//import { RateFrequency } from './rate-frequency';
//import { CalculationFrequency } from './calculation-frequency';

@Component({
    selector: 'fd-data-table',
    templateUrl: './fd-data-table.component.html'
    //styleUrls: [ './data-table-demo.component.css' ]
})

export class FDDataTableComponent implements OnInit {
    investmentName : string = "FD";
    
    activeId: number;

    displayDialog: boolean;

    transaction: TransactionI = new Transaction(0,new Date(),0,7.5,new Date(),0,0,0,'Years','Quaterly');

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
        this.transaction = new Transaction(0,new Date(),0,7.5,new Date(),0,0,0,'Years','Quaterly');
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

    cloneTransaction(t: TransactionI): TransactionI {
        let transaction = new Transaction(0,new Date(),0,7.5,new Date(),0,0,0,'Years','Quaterly');
        for(let prop in t) {
            transaction[prop] = t[prop];
        }
        return transaction;
    }

    findSelectedTransactionIndex(): number {
        return this.transactions.indexOf(this.selectedTransaction);
    }
    
    getAmountAtMaturity(t: Transaction): number{
        let fdCalculator: FDCalculator = new FDCalculator(t);
        return fdCalculator.calculateMaturityAmount();
    }
    
    getReturn(t: Transaction): number {
        let fdCalculator: FDCalculator = new FDCalculator(t);
        return fdCalculator.calculateReurn();   
    }
}