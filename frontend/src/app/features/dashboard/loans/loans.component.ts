import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Loan } from '../services/loans.service';

@Component({
  selector: 'app-loans',
  imports: [],
  templateUrl: './loans.component.html',
  styleUrl: './loans.component.scss',
})
export class LoansComponent implements OnInit {
  loans!: Loan[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Subscribe
    this.route.data.subscribe((data) => {
      this.loans = data['loans'];
    });

    // // Direct Access
    // this.loans = this.route.snapshot.data['loans'];
  }
}
