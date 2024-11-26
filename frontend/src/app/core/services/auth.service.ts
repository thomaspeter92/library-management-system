import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths } from '../../../enums/api-paths';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../models/user.model';

export interface LoginAPIResponse {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role_id: string;
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = new BehaviorSubject<User | null>(null);

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.httpClient
      .post<LoginAPIResponse>(ApiPaths.User + '/login', {
        email: email,
        password: password,
      })
      .pipe(
        tap((data) => {
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
          }
        })
      );
  }
}
