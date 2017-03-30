import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import 'rxjs/add/operator/toPromise';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryInvestmentsDataService }  from './in-memory-investments-data.service';

//App
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//dashboard
import { DashboardComponent } from './dashboard/dashboard.component';

//investment
import { InvestmentsComponent } from './investment/investment/investments.component';
import { InvestmentDetailComponent } from './investment/investment-detail/investment-detail.component';
import { InvestmentSearchComponent } from './investment/investment-search/investment-search.component';
import { InvestmentService } from './investment/investment.service';

//fd
import { FDDataTableComponent } from './fd/datatable/fd-data-table.component';
import { FDTopViewComponent } from './fd/topview/fd-top-view.component';

//ppf
import { PPFDataTableComponent } from './ppf/datatable/ppf-data-table.component';
import { PPFTopViewComponent } from './ppf/topview/ppf-top-view.component';

//mf
import { MFDataTableComponent } from './mf/datatable/mf-data-table.component';
import { MFTopViewComponent } from './mf/topview/mf-top-view.component';
import { MFInvestmentService } from './mf/mf-investment.service';
import { MFCalculator } from './mf/mf-calculator';

//equity
import { EquityDataTableComponent } from './equity/datatable/equity-data-table.component';
import { EquityTopViewComponent } from './equity/topview/equity-top-view.component';
import { EquityInvestmentService } from './equity/equity-investment.service';
import { EquityCalculator } from './equity/equity-calculator';

import {InputTextModule,DataTableModule,ButtonModule,DialogModule,CalendarModule} from 'primeng/primeng';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        InvestmentDetailComponent,
        InvestmentsComponent,
        InvestmentSearchComponent,
        FDDataTableComponent,
        PPFDataTableComponent,
        MFDataTableComponent,
        EquityDataTableComponent,
        FDTopViewComponent,
        PPFTopViewComponent,
        MFTopViewComponent,
        EquityTopViewComponent

    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryInvestmentsDataService, {passThruUnknownUrl: true}),
        AppRoutingModule,
        InputTextModule,DataTableModule,ButtonModule,DialogModule,CalendarModule,
        NgxChartsModule,
        BrowserAnimationsModule
    ],
    providers: [
        InvestmentService,
        MFInvestmentService,
        MFCalculator,
        EquityInvestmentService,
        EquityCalculator
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
