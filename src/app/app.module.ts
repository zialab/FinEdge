import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { CommonModule } from '@angular/common';

import {NgxChartsModule} from '@swimlane/ngx-charts';

import 'rxjs/add/operator/toPromise';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryInvestmentsDataService }  from './in-memory-investments-data.service';
//import { DataTableModule } from 'angular-2-data-table';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { InvestmentDetailComponent } from './investment-detail.component';
import { InvestmentsComponent } from './investments.component';
import { InvestmentService } from './investment.service';
import { InvestmentSearchComponent } from './investment-search.component';

//import { DataTableDemo1 } from './demo1/data-table-demo1';
//import { DataTableDemo1Remote } from './demo1/data-table-demo1-remote';
import { FDTopViewComponent } from './fd-top-view.component';
import { FDDataTableComponent } from './fd-data-table.component';
import { PPFTopViewComponent } from './ppf-top-view.component';
import { PPFDataTableComponent } from './ppf-data-table.component';
import { MFTopViewComponent } from './mf-top-view.component';
import { MFDataTableComponent } from './mf-data-table.component';
import { MFInvestmentService } from './mf-investment.service';
import { MFCalculator } from './mf-calculator';

import { AppRoutingModule } from './app-routing.module';

import {InputTextModule,DataTableModule,ButtonModule,DialogModule,CalendarModule} from 'primeng/primeng';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        InvestmentDetailComponent,
        InvestmentsComponent,
        InvestmentSearchComponent,
        PPFTopViewComponent,
        FDDataTableComponent,
        PPFDataTableComponent,
        FDTopViewComponent,
        MFTopViewComponent,
        MFDataTableComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryInvestmentsDataService, {passThruUnknownUrl: true}),
        AppRoutingModule,
        InputTextModule,DataTableModule,ButtonModule,DialogModule,CalendarModule,
        NgxChartsModule
        //DataTableModule,CommonModule
    ],
    providers: [
        InvestmentService,
        MFInvestmentService,
        MFCalculator
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
