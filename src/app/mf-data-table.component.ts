import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { InvestmentService } from './investment.service';
import { TransactionI } from './transaction-interface';
import { MFCalculator } from './mf-calculator';
import { Transaction } from './transaction';
import { MFTransaction } from './mf-transaction';
import { MFTransactionGroup } from './mf-transaction-group';
import { MFNav } from './mf-nav-model';
//import { RateFrequency } from './rate-frequency';
//import { CalculationFrequency } from './calculation-frequency';

@Component({
    selector: 'mf-data-table',
    templateUrl: './mf-data-table.component.html',
    styleUrls: [ './dashboard.component.css' ]
})

export class MFDataTableComponent implements OnInit {
    investmentName : string = "MF";

    activeId: number;

    displayDialog: boolean;

    transaction: MFTransaction = new MFTransaction(0, new Date(), 0, 0, new Date(), 0, 0, 0, 'Daily', 'Quaterly',1234, '121csd21', 'ABC',123);

    selectedMFTransactionGroup: MFTransaction;

    newTransaction: boolean;

    private transactions: TransactionI[]=[];
    transactionGroupList: MFTransactionGroup[];
    private transactionGroupMap: Map<number, MFTransactionGroup>;
    //mfCalculator: MFCalculator = new MFCalculator();

    constructor(
        private investmentService: InvestmentService,
        private route: ActivatedRoute,
        private mfCalculator: MFCalculator) { }

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

        this.investmentService.getTransactions(this.activeId).then(transactions => {
          this.transactions = transactions;
          this.mfCalculator.refreshNav(this.transactions);
          this.prepareMFTransactionGroup();
        });

    }

    private prepareMFTransactionGroup(): void {
      this.transactionGroupMap = new Map<number, MFTransactionGroup>();
      for(let mfTransactionItem of this.transactions) {
        let mfTransaction:MFTransaction = mfTransactionItem as MFTransaction;
        if(this.transactionGroupMap.get(mfTransaction.scode) === undefined) {
          let transactionArray : MFTransaction[] = [];
          transactionArray.push(mfTransaction);
          let mfTransactionGroup: MFTransactionGroup = new MFTransactionGroup(mfTransaction.transactionDate, mfTransaction.scode,mfTransaction.fundName, mfTransaction.amountInvested, this.getTransactionReturn(mfTransaction), this.getTransactionReturnPercentage(mfTransaction), this.getTransactionLatestFundValue(mfTransaction), transactionArray);
          this.transactionGroupMap.set(mfTransaction.scode, mfTransactionGroup);
        } else {
          let mfTransactionGroup: MFTransactionGroup = this.transactionGroupMap.get(mfTransaction.scode);
          mfTransactionGroup.totalInvestment = mfTransactionGroup.totalInvestment + mfTransaction.amountInvested;
          mfTransactionGroup.totalReturn = mfTransactionGroup.totalReturn + this.getTransactionReturn(mfTransaction);
          mfTransactionGroup.latestFundValue = mfTransactionGroup.latestFundValue + this.getTransactionLatestFundValue(mfTransaction)
          mfTransactionGroup.transactions.push(mfTransaction);
          this.transactionGroupMap.set(mfTransaction.scode, mfTransactionGroup);
        }
      }

      this.transactionGroupList = [];
      this.transactionGroupMap.forEach((mfTransactionGroup: MFTransactionGroup, key: number) => {
        mfTransactionGroup.returnPercentage = this.getReturnPercentage(mfTransactionGroup);
        this.transactionGroupList.push(mfTransactionGroup);
      });
    }

    showDialogToAdd() {
        this.newTransaction = true;
        this.transaction = new MFTransaction(0, new Date(), 0, 0, new Date(), 0, 0, 0, 'Daily', 'Quaterly',1234, '121csd21', 'ABC',1234);
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

    cloneTransaction(t: MFTransaction): MFTransaction {
        let transaction = new MFTransaction(0, new Date(), 0, 0, new Date(), 0, 0, 0, 'Daily', 'Quaterly',1234, '121csd21', 'ABC',1234);
        for(let prop in t) {
            transaction[prop] = t[prop];
        }
        return transaction;
    }

    findSelectedTransactionIndex(): number {
        return this.transactions.indexOf(this.selectedMFTransactionGroup);
    }

    getTransactionLatestFundValue(t: MFTransaction): number{
        return this.mfCalculator.getTransactionLatestFundValue(t);
    }

    getTransactionReturn(t: MFTransaction): number {
        return this.mfCalculator.getTransactionReturn(t);
    }

    getTransactionReturnPercentage(t: MFTransaction): number {
        return this.mfCalculator.getTransactionReturnPercentage(t);
    }

    getTransactionUnits(transaction: MFTransaction): number{
        return this.mfCalculator.getTransactionUnits(transaction);
    }

    getReturnPercentage(mfTransactionGroup: MFTransactionGroup): number {
      return Math.round(((mfTransactionGroup.totalReturn/this.getTransactionGroupInvestment(mfTransactionGroup.transactions))*100)*100)/100;
    }

    private getTransactionGroupInvestment(transactions : MFTransaction[]): number {
        let totalInvestment: number = 0;
        for (let transaction of this.transactions) {
            totalInvestment = totalInvestment + transaction.amountInvested;
        }
        return totalInvestment;
    }

    // private getTotalUnits(): number{
    //   let totalUnits: number = 0;
    //   for (let transaction of this.transactions) {
    //       totalUnits = totalUnits + this.getTransactionUnits(transaction as MFTransaction);
    //   }
    //   return totalUnits;
    // }
    // getMFTransactions(scode: number) : MFTransaction[] {
    //   return this.transactionGroupMap.get(scode).transactions;
    // }
}
