import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

import { CanActivateFn } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const alwaysFalseGuard: CanActivateFn = () => {
  return false; // Always prevents activation
};

export const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
];
