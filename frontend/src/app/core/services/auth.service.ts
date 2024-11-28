import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths } from '../../../enums/api-paths';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { ApiResponse, ERROR_MESSAGES } from '../models/api-response.model';
import { Router } from '@angular/router';

export type LoginAPIResponse = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role_id: string;
  access_token: string;
  refresh_token: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = new BehaviorSubject<User | null>(null);

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.httpClient
      .post<ApiResponse<LoginAPIResponse>>(ApiPaths.User + '/login', {
        email: email,
        password: password,
      })
      .pipe(
        map((res) => {
          if (res?.data) {
            return res.data;
          }
          throw Error(res.message);
        }),
        catchError((err: HttpErrorResponse) =>
          throwError(() => {
            console.log(err.error);
            let message;
            if (err.error && err.error.message in ERROR_MESSAGES) {
              message = err.error.message;
            } else {
              message = 'SERVER_ERROR';
            }

            throw new Error(message);
          })
        ),
        tap((res) => {
          const data = res;

          const user = new User(
            data.id,
            data.email,
            data.first_name,
            data.last_name,
            data.role_id,
            data.access_token,
            data.refresh_token
          );
          if (user.token) {
            this.currentUser.next(user);
            localStorage.setItem('user-data', JSON.stringify(user));
          }
        })
      );
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('user-data')!);
    if (!userData) return;
    const user = new User(
      userData.id,
      userData.email,
      userData.firstName,
      userData.lastName,
      userData.roldId,
      userData.accessToken,
      userData.refreshToken
    );
    this.currentUser.next(user);
  }

  logout() {
    this.currentUser.next(null);
    localStorage.removeItem('user-data');
    this.router.navigate(['login']);
  }
}
