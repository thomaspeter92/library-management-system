import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';
import { SearchComponent } from './features/dashboard/search/search.component';
import { AccountComponent } from './features/dashboard/account/account.component';
import { loansResolver } from './features/dashboard/resolvers/loans.resolver';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: SearchComponent },
      {
        path: 'account',
        component: AccountComponent,
        resolve: { loans: loansResolver },
      },
    ],
  },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
