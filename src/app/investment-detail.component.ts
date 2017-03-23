// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

//import {Button, DataTable,Footer, Column} from "primeng/primeng";
import 'rxjs/Rx';

import { Investment } from './investment';
import { Transaction } from './transaction';
import { FDTransaction } from './fd-transaction';
import { InvestmentService } from './investment.service';

//import { DataTableDemoComponent } from './data-table-demo.component';

@Component({
    selector: 'investment-detail',
    templateUrl: './investment-detail.component.html',
    styleUrls: [ './investment-detail.component.css' ]
})

export class InvestmentDetailComponent implements OnInit {
    
    investment: Investment;
    transactions: Transaction[];
    activeInvId: number;
    //location: Location;
    
    constructor(
        private investmentService: InvestmentService,
        private route: ActivatedRoute,
        private location: Location
    ) {}
    
	displayDialog: boolean;

    ngOnInit() {
        
        this.route.params.subscribe((params: Params) => {
            this.activeInvId = params['id'];
            
            this.investmentService.getInvestment(this.activeInvId).then(inv => this.investment = inv);

            console.log("b44 switchMap selected investment ");
            console.log(this.investment);
            console.log("b44 switchMap selected transactions ");
            console.log(this.transactions);
        });
        console.log("selected investment id "+this.activeInvId);
        
        this.route.params
            .switchMap((params: Params) => this.investmentService.getInvestment(this.activeInvId))
            .subscribe(investment => this.investment = investment);
    }

    
//    save(): void {
//        this.investmentService.update(this.investment)
//            .then(() => this.goBack());
//    }
    
    goBack(): void {
        this.location.back();
    }
    
//    ngOnInit(): void {
//        
//        this.route.params.subscribe((params: Params) => {
//            this.activeId = params['id'];
//            
//            this.investmentService.getInvestment(this.activeId).then(inv => this.investment = inv);
//
//            console.log("b44 switchMap selected investment ");
//            console.log(this.investment);
//            console.log("b44 switchMap selected transactions ");
//            console.log(this.transactions);
//        });
//        console.log("selected investment id "+this.activeId);
//    
//        
//        
//        this.route.params
//            .switchMap((params: Params) => this.investmentService.getInvestment(this.activeId))
//        .subscribe(investment => {
//            this.investment = investment; 
//            this.transactions = investment.transactions;
//            console.log("switchMap selected investment ");
//            console.log(this.investment);
//            console.log("switchMap selected transactions ");
//            console.log(this.transactions);
//        });
//        
//        console.log("selected investment ");
//        console.log(this.investment);
//        console.log("selected transactions ");
//        console.log(this.transactions);
//    }
//
//    save(): void {
//        this.investmentService.update(this.investment)
//            .then(() => this.goBack());
//    }
//    
//    goBack(): void {
//        this.location.back();
//    }



//export class InvestmentDetailComponent implements OnInit {
//    
//    investment: Investment;
//    transactions: Transaction[];
//    activeId: number;
//    displayDialog: boolean;
//    
//    newTransaction: boolean;
//    
//    transaction: Transaction = new FDTransaction("vinz","yearz","brandz","colorz");
    //investments: Investment[];
    
//    
//    constructor(
//        private investmentService: InvestmentService,
//        private route: ActivatedRoute,
//        private location: Location
//    ) {}
    
    
    //
//    selectedTransaction: Transaction;
    
    //ngOnInit() {
        
        
        
        //this.investmentService.getInvestments().then(function(investments) {
//            console.log("i am here");
//            console.log(investments);
//            console.log(investments[2]);
            //console.log("it worked");
//            console.log(typeof investments[2]);
//            console.log(typeof this.investment);
//            console.log("type written");
                //this.investment = investments[2];
//            for (let investment of investments) {
//                if(investment.id === this.id) {
//                    this.investment = investment;
//                    console.log(this.investment);
//                }
//            }
//            console.log("investment");
//            console.log(this.investment); // 1, "string", false
            //this.investment = investment;
            //console.log("next");
        //});
//        console.log("investment");
//        console.log(this.investment);
        //console.log(this.id);
//        this.route.params
//            .switchMap((params: Params) => this.investmentService.getInvestment(this.activeId))
//            .subscribe(investment => this.investment = investment);
        
        //this.investments = this.investmentService.getInvestments();
        //console.log(this.investmentService.getInvestments());
        /*
        this.investmentService.getInvestments().then(function(investments) {
            console.log(investments[this.id]);
            console.log("it worked");
            for (let investment of investments) {
                if(investment.id === this.id) {
                    this.investment = investment;
                    console.log(this.investment);
                }
            }
            console.log("investment");
            console.log(this.investment); // 1, "string", false
            //this.investment = investment;
            //console.log("next");
        });
        */
//        this.investmentService.getInvestment(this.activeId).then(investment => {
//            console.log("investment");
//            console.log(investment);
//            this.investment = investment;
//            console.log("next");
//        });
//        
//        console.log("zia");
//        console.log(this.investment);
//        console.log(this.investment.transactions);
//        console.log("rehman");
//        this.transactions = this.investment.transactions;
//            
//   }

//    showDialogToAdd() {
//        this.newTransaction = true;
//        this.transaction = new FDTransaction("vinz","yearz","brandz","colorz");
//        this.displayDialog = true;
//    }
//    
//    save() {
//        if(this.newTransaction)
//            this.transactions.push(this.transaction);
//        else
//            this.transactions[this.findSelectedTransactionIndex()] = this.transaction;
//        
//        this.transaction = null;
//        this.displayDialog = false;
//    }
//    
//    delete() {
//        this.transactions.splice(this.findSelectedTransactionIndex(), 1);
//        this.transaction = null;
//        this.displayDialog = false;
//    }    
//    
//    onRowSelect(event) {
//        this.newTransaction = false;
//        this.transaction = this.cloneTransaction(event.data);
//        this.displayDialog = true;
//    }
//    
//    cloneTransaction(t: Transaction): Transaction {
//        let transaction = new FDTransaction("vinz","yearz","brandz","colorz");
//        for(let prop in t) {
//            transaction[prop] = t[prop];
//        }
//        return transaction;
//    }
//    
//    findSelectedTransactionIndex(): number {
//        return this.transactions.indexOf(this.selectedTransaction);
//    }
    
//    ngOnInit(): void {
//        
//        this.route.params.subscribe((params: Params) => {
//            this.activeId = params['id'];
//            
//            this.investmentService.getInvestment(this.activeId).then(inv => this.investment = inv);
//
//            console.log("b44 switchMap selected investment ");
//            console.log(this.investment);
//            console.log("b44 switchMap selected transactions ");
//            console.log(this.transactions);
//        });
//        console.log("selected investment id "+this.activeId);
//    
//        
//        
//        this.route.params
//            .switchMap((params: Params) => this.investmentService.getInvestment(this.activeId))
//        .subscribe(investment => {
//            this.investment = investment; 
//            this.transactions = investment.transactions;
//            console.log("switchMap selected investment ");
//            console.log(this.investment);
//            console.log("switchMap selected transactions ");
//            console.log(this.transactions);
//        });
//        
//        console.log("selected investment ");
//        console.log(this.investment);
//        console.log("selected transactions ");
//        console.log(this.transactions);
////        console.log("selected investment ");
//        this.investmentService.getInvestment(this.activeId).then(inv => this.investment = inv);
//        console.log(this.investment);
//        console.log("selected investment's transaction ");
        //console.log(this.investment.tansactions);
//    }
//
//    save(): void {
//        this.investmentService.update(this.investment)
//            .then(() => this.goBack());
//    }
//    
//    goBack(): void {
//        this.location.back();
//    }
}

