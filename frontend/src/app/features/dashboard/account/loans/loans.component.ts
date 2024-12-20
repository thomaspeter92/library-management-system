import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Loan, LoansService } from '../../services/loans.service';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { SplitSemicolonPipe } from '../../../../shared/pipes/split-semicolon.pipe';
import { DatePipe } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ToastService } from '../../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-loans',
  imports: [TruncatePipe, SplitSemicolonPipe, DatePipe, ButtonComponent],
  templateUrl: './loans.component.html',
  styleUrl: './loans.component.scss',
})
export class LoansComponent implements OnInit {
  activeLoans!: Loan[];
  pastLoans!: Loan[];
  currentPage: number = 1;
  totalPages!: number;

  constructor(
    private route: ActivatedRoute,
    private loansService: LoansService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    console.log(this.route.snapshot);
    this.activeLoans = this.route.snapshot.data['account']['activeLoans'];
    this.pastLoans = this.route.snapshot.data['account']['pastLoans']['loans'];
    this.totalPages =
      this.route.snapshot.data['account']['pastLoans']['totalPages'];
  }

  handlePage() {
    if (this.currentPage === this.totalPages) return;
    this.currentPage += 1;
    this.fetchLoansHistory();
  }

  fetchLoansHistory(): void {
    this.loansService.getAllPastUserLoans(this.currentPage).subscribe({
      next: (res) => {
        console.log(res);
        this.pastLoans = [...this.pastLoans, ...res.loans];
      },
    });
  }

  onReturn(loanId: string) {
    console.log(loanId);
    this.loansService.returnBook(loanId).subscribe({
      next: () => {
        this.toastService.addToast('Return request processed', 'success', 3000);
        this.loansService.getAllActiveUserLoans().subscribe((res) => {
          this.activeLoans = res;
        });
      },
      error: () => {},
    });
  }
}
