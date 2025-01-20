import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApiPaths } from '../../../../enums/api-paths';
import { pipe, map } from 'rxjs';
import { ApiResponse } from '../../../core/models/api-response.model';
import { User } from '../../../core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserById(id: string) {
    return this.http.get<ApiResponse<User>>(`${ApiPaths.User}/${id}`).pipe(
      map((res) => {
        return res.data;
      })
    );
  }

  editUserDetails(data: {
    email: string;
    first_name: string;
    last_name: string;
  }) {
    console.log(data);
    return this.http
      .put<ApiResponse<User>>(`${ApiPaths.User}`, data)
      .pipe(map((res) => res.data));
  }
}
