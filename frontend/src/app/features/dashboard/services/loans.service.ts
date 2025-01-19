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
  outstanding?: boolean;
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

  getAllPastUserLoans(page: number = 1, limit: number = 5) {
    return this.http
      .get<ApiResponse<Loan[]>>(ApiPaths.Loans + '/past', {
        params: new HttpParams().append('page', page).append('limit', limit),
      })
      .pipe(
        map((res) => {
          const pastLoans = res.data.sort(
            (a, b) =>
              new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
          );

          return { totalPages: res.totalPages, loans: pastLoans };
        })
      );
  }

  returnBook(loanId: string) {
    return this.http.put<ApiResponse<Loan>>(ApiPaths.Loans, {
      loan_id: loanId,
    });
  }
}
