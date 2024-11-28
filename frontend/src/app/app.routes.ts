import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

import { CanActivateFn } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';
import { SearchComponent } from './features/dashboard/search/search.component';
import { LoansComponent } from './features/dashboard/loans/loans.component';
import { AccountComponent } from './features/dashboard/account/account.component';

export const alwaysFalseGuard: CanActivateFn = () => {
  return false; // Always prevents activation
};

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: SearchComponent },
      { path: 'loans', component: LoansComponent },
      { path: 'account', component: AccountComponent },
    ],
  },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
