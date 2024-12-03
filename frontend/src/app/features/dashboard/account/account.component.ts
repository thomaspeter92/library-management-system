import { Component } from '@angular/core';
import { LoansComponent } from './loans/loans.component';

@Component({
  selector: 'app-account',
  imports: [LoansComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {}
