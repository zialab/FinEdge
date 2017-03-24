import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Investment } from './investment';
import { InvestmentService } from './investment.service';
import { MFInvestmentService } from './mf-investment.service';

import {single, multi} from './data';

@Component({
    selector: 'investments',
    templateUrl: './investments.component.html',
    styleUrls: ['./investments.component.css'],
    providers: [InvestmentService,MFInvestmentService]
})

export class InvestmentsComponent implements OnInit {

    // single: any[];
    // multi: any[];
    //
    // view: any[] = [700, 400];
    //
    // colorScheme = {
    //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    // };
    //
    // onSelect1(event) {
    //   console.log(event);
    // }

    title = 'Investment Profile';
    investments: Investment[];
    selectedInvestment: Investment;

    constructor(private router: Router, private investmentService: InvestmentService) {
        //Object.assign(this, {single, multi});
    }

    ngOnInit(): void {
        this.getInvestments();
    }

    getInvestments(): void {
        this.investmentService.getInvestments().then(investments => this.investments = investments);
    }

    // add(name: string): void {
    //     name = name.trim();
    //     if (!name) { return; }
    //         this.investmentService.create(name)
    //         .then(investment => {
    //         this.investments.push(investment);
    //         this.selectedInvestment = null;
    //   });
    // }
    //
    // delete(investment: Investment): void {
    //     this.investmentService
    //     .delete(investment.id)
    //     .then(() => {
    //       this.investments = this.investments.filter(i => i !== investment);
    //       if (this.selectedInvestment === investment) { this.selectedInvestment = null; }
    //     });
    // }

    onSelect(investment: Investment): void {
        this.selectedInvestment = investment;
    }

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedInvestment.investmentId]);
    }
}
