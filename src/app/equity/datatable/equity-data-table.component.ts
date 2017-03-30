import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { InvestmentService } from '../../investment/investment.service';
//import { TransactionI } from '../../model/transaction-interface';
import { EquityCalculator } from '../equity-calculator';
import { Transaction } from '../../model/transaction';
import { EquityTransaction } from '../model/equity-transaction';
import { EquityTransactionGroup } from '../model/equity-transaction-group';
import { EquityInvestmentService } from '../equity-investment.service';
import { StockPrice } from '../model/stock-price.model';

@Component({
    selector: 'equity-data-table',
    templateUrl: './equity-data-table.component.html',
    styleUrls: [ '../../dashboard/dashboard.component.css' ]
})

export class EquityDataTableComponent implements OnInit {
    investmentName : string = "Stocks";

    activeId: number;

    displayDialog: boolean;

    transaction: EquityTransaction = new EquityTransaction(0, new Date(), 0, 0, 0, 0, 0, 1234, 'Stock Name', 'Short Name', 0, 0, new Date());

    selectedMFTransactionGroup: EquityTransaction;

    newTransaction: boolean;

    private transactions: Transaction[]=[];
    transactionGroupList: EquityTransactionGroup[];
    private transactionGroupMap: Map<number, EquityTransactionGroup> = new Map<number, EquityTransactionGroup>();
    //equityCalculator: MFCalculator = new MFCalculator();//this.transactionGroupMap = new Map<number, MFTransactionGroup>();
    private errorMessage: string;

    constructor(
      private investmentService: InvestmentService,
      private equityInvestmentService: EquityInvestmentService,
      private route: ActivatedRoute,
      private equityCalculator: EquityCalculator) { }

    ngOnInit() {
      this.route.params.subscribe((params: Params) => {
          this.activeId = params['id'];

          //this.investmentService.getInvestment(this.activeId).then(inv => this.investment = inv);
          //console.log("b44 switchMap selected investment ");
          //console.log(this.investment);
          //console.log("b44 switchMap selected transactions ");
          //console.log(this.transactions);
        });
        console.log("selected investment id "+this.activeId);

        this.investmentService.getTransactions(this.activeId).then(transactions => {
          //this.transactions = transactions;
          //this.equityCalculator.refreshNav(this.transactions);
          for(let transaction of transactions) {
            let equityTransaction:EquityTransaction = transaction as EquityTransaction;

            this.equityInvestmentService.getLatestPrice(equityTransaction.stockShortName).subscribe(
              stckPrice => {
                this.equityCalculator.addStockPrice(stckPrice);
                this.prepareMFTransactionGroup(equityTransaction);
              },
              error =>  this.errorMessage = <any>error);
            }
        });
    }

    // ngOnDestroy(){
    //   this.sub.unsubscribe();
    // }

    private prepareMFTransactionGroup(equityTransaction:EquityTransaction): void {
      if(this.transactionGroupMap.get(equityTransaction.scode) === undefined) {
        let transactionArray : EquityTransaction[] = [];
        transactionArray.push(equityTransaction);
        let equityTransactionGroup: EquityTransactionGroup = new EquityTransactionGroup(equityTransaction.transactionDate, equityTransaction.scode,
          equityTransaction.stockName, equityTransaction.stockShortName, equityTransaction.unitPrice, equityTransaction.units,
          this.getStockInvestment(equityTransaction), this.getLatestUnitPrice(equityTransaction) ,this.getTransactionReturn(equityTransaction),
          this.getTransactionReturnPercentage(equityTransaction), this.getTransactionLatestInvestmentValue(equityTransaction), transactionArray);
          this.transactionGroupMap.set(equityTransaction.scode, equityTransactionGroup);
      } else {
        let equityTransactionGroup: EquityTransactionGroup = this.transactionGroupMap.get(equityTransaction.scode);
        equityTransactionGroup.totalInvestment = equityTransactionGroup.totalInvestment + this.getStockInvestment(equityTransaction);
        equityTransactionGroup.totalReturn = equityTransactionGroup.totalReturn + this.getTransactionReturn(equityTransaction);
        equityTransactionGroup.latestInvestmentValue = equityTransactionGroup.latestInvestmentValue + this.getTransactionLatestInvestmentValue(equityTransaction)
        equityTransactionGroup.transactions.push(equityTransaction);
        this.transactionGroupMap.set(equityTransaction.scode, equityTransactionGroup);
      }

      this.transactionGroupList = [];
      this.transactionGroupMap.forEach((equityTransactionGroup: EquityTransactionGroup, key: number) => {
        equityTransactionGroup.returnPercentage = this.getReturnPercentage(equityTransactionGroup);
        this.transactionGroupList.push(equityTransactionGroup);
      });
    }

    showDialogToAdd() {
      this.newTransaction = true;
      this.transaction = new EquityTransaction(0, new Date(), 0, 0, 0, 0, 0, 1234, 'Stock Name', 'Short Name', 0, 0, new Date());
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

    cloneTransaction(t: EquityTransaction): EquityTransaction {
      let transaction = new EquityTransaction(0, new Date(), 0, 0, 0, 0, 0, 1234, 'Stock Name', 'Short Name', 0, 0, new Date());
      for(let prop in t) {
          transaction[prop] = t[prop];
      }
      return transaction;
    }

    findSelectedTransactionIndex(): number {
      return this.transactions.indexOf(this.selectedMFTransactionGroup);
    }

    private getLatestUnitPrice(t: EquityTransaction): number{
      return this.equityCalculator.getLatestUnitPrice(t);
    }

    private getStockInvestment(t: EquityTransaction): number{
      return this.equityCalculator.getStockInvestment(t);
    }

    private getTransactionLatestInvestmentValue(t: EquityTransaction): number {
      return this.equityCalculator.getTransactionLatestInvestmentValue(t);
    }

    private getTransactionReturn(t: EquityTransaction): number {
      return this.equityCalculator.getTransactionReturn(t);
    }

    private getTransactionReturnPercentage(t: EquityTransaction): number {
      return this.equityCalculator.getTransactionReturnPercentage(t);
    }

    private getReturnPercentage(equityTransactionGroup: EquityTransactionGroup): number {
      return Math.round(((equityTransactionGroup.totalReturn/equityTransactionGroup.totalInvestment)*100)*100)/100;
    }

    private getTransactionGroupInvestment(transactions : EquityTransaction[]): number {
      let totalInvestment: number = 0;
      for (let transaction of this.transactions) {
          totalInvestment = totalInvestment + transaction.amountInvested;
      }
      return totalInvestment;
    }

}
