import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { InvestmentService } from '../../investment/investment.service';
import { TransactionI } from '../../model/transaction-interface';
import { MFCalculator } from './../mf-calculator';
import { Transaction } from '../../model/transaction';
import { MFTransaction } from '../model/mf-transaction';
import { MFTransactionGroup } from '../model/mf-transaction-group';
import { MFNav } from '../../model/mf-nav-model';
import { MFInvestmentService } from './../mf-investment.service';

@Component({
    selector: 'mf-data-table',
    templateUrl: './mf-data-table.component.html',
    styleUrls: [ '../../dashboard/dashboard.component.css' ]
})

export class MFDataTableComponent implements OnInit {
    investmentName : string = "MF";

    activeId: number;

    displayDialog: boolean;

    transaction: MFTransaction = new MFTransaction(0, new Date(), 0, 0, 0, 0, 0, 1234, '121csd21', 'ABC',1234, new Date());

    selectedMFTransactionGroup: MFTransaction;

    newTransaction: boolean;

    private transactions: TransactionI[]=[];
    transactionGroupList: MFTransactionGroup[];
    private transactionGroupMap: Map<number, MFTransactionGroup> = new Map<number, MFTransactionGroup>();
    //mfCalculator: MFCalculator = new MFCalculator();//this.transactionGroupMap = new Map<number, MFTransactionGroup>();
    private errorMessage: string;

    constructor(
      private investmentService: InvestmentService,
      private mfInvestmentService: MFInvestmentService,
      private route: ActivatedRoute,
      private mfCalculator: MFCalculator) { }

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
          //this.mfCalculator.refreshNav(this.transactions);
          for(let transaction of transactions) {
            let mfTransaction:MFTransaction = transaction as MFTransaction;

            this.mfInvestmentService.getLatestNav(mfTransaction.scode).subscribe(
              mfNav => {
                this.mfCalculator.addMFNav(mfNav);
                this.prepareMFTransactionGroup(mfTransaction);
              },
              error =>  this.errorMessage = <any>error);
            }
        });
    }

    // ngOnDestroy(){
    //   this.sub.unsubscribe();
    // }

    private prepareMFTransactionGroup(mfTransaction:MFTransaction): void {
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

      this.transactionGroupList = [];
      this.transactionGroupMap.forEach((mfTransactionGroup: MFTransactionGroup, key: number) => {
        mfTransactionGroup.returnPercentage = this.getReturnPercentage(mfTransactionGroup);
        this.transactionGroupList.push(mfTransactionGroup);
      });
    }

    showDialogToAdd() {
      this.newTransaction = true;
      this.transaction = new MFTransaction(0, new Date(), 0, 0, 0, 0, 0, 1234, '121csd21', 'ABC',1234, new Date());
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
      let transaction = new MFTransaction(0, new Date(), 0, 0, 0, 0, 0, 1234, '121csd21', 'ABC',1234, new Date());
      for(let prop in t) {
          transaction[prop] = t[prop];
      }
      return transaction;
    }

    findSelectedTransactionIndex(): number {
      return this.transactions.indexOf(this.selectedMFTransactionGroup);
    }

    private getTransactionLatestFundValue(t: MFTransaction): number{
      return this.mfCalculator.getTransactionLatestFundValue(t);
    }

    private getTransactionReturn(t: MFTransaction): number {
      return this.mfCalculator.getTransactionReturn(t);
    }

    private getTransactionReturnPercentage(t: MFTransaction): number {
      return this.mfCalculator.getTransactionReturnPercentage(t);
    }

    private getTransactionUnits(transaction: MFTransaction): number{
      return this.mfCalculator.getTransactionUnits(transaction);
    }

    private getReturnPercentage(mfTransactionGroup: MFTransactionGroup): number {
      return Math.round(((mfTransactionGroup.totalReturn/mfTransactionGroup.totalInvestment)*100)*100)/100;
    }

    private getTransactionGroupInvestment(transactions : MFTransaction[]): number {
      let totalInvestment: number = 0;
      for (let transaction of this.transactions) {
          totalInvestment = totalInvestment + transaction.amountInvested;
      }
      return totalInvestment;
    }

}
