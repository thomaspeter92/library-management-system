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
}
