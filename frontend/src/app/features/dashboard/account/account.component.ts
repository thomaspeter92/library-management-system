import { Component } from '@angular/core';
import { LoansComponent } from './loans/loans.component';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'app-account',
  imports: [LoansComponent, UserComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {}
