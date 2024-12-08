import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths } from '../../../../enums/api-paths';
import { ApiResponse } from '../../../core/models/api-response.model';
import { AuthService } from '../../../core/services/auth.service';
import { map, tap } from 'rxjs';
import { Book } from './books.service';

export interface Loan {
  id: string;
  book_id: string;
  user_id: string;
  loan_date: Date;
  due_date: Date;
  return_date: Date;
  book?: Book;
}

@Injectable({
  providedIn: 'root',
})
export class LoansService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  createLoan(bookId: string) {
    return this.http.post<ApiResponse<Loan>>(ApiPaths.Loans, {
      book_id: bookId,
    });
  }

  getAllActiveUserLoans() {
    return this.http.get<ApiResponse<Loan[]>>(ApiPaths.Loans + '/active').pipe(
      map((res) => {
        console.log(res.data);
        return res.data.sort(
          (a, b) =>
            new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
        );
      })
    );
  }

  getAllPastUserLoans() {
    return this.http
      .get<ApiResponse<Loan[]>>(ApiPaths.Loans, {
        params: new HttpParams()
          .append('user_id', this.authService.currentUser.value?.id!)
          .append('page', 1)
          .append('limit', 5),
      })
      .pipe(
        map((res) => {
          const pastLoans = res.data
            .filter((loan) => !!loan.return_date)
            .sort(
              (a, b) =>
                new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
            );
          console.log(pastLoans);
          return pastLoans;
        })
      );
  }

  returnBook(loanId: string) {
    return this.http.put<ApiResponse<Loan>>(ApiPaths.Loans, {
      loan_id: loanId,
    });
  }
}
