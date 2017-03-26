import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { Investment } from './model/investment';
import { InvestmentsComponent } from './investment/investment/investments.component';
import { InvestmentDetailComponent }   from './investment/investment-detail/investment-detail.component';
import { InvestmentService } from './investment/investment.service';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'detail/:id', component: InvestmentDetailComponent },
    { path: 'investments', component: InvestmentsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
