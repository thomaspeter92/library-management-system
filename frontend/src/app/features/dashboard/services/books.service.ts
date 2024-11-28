import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiPaths } from '../../../../enums/api-paths';
import { ApiResponse } from '../../../core/models/api-response.model';

export interface Book {
  title: string;
  year: number;
  authors: string;
  descrption: string;
  genre: string;
  id: string;
  pages: number;
  rating: number;
  ratings_count: number;
  subtitle?: string;
  thumbnail?: string;
}

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  getAllBooks(page: number = 1, limit: number = 20) {
    return this.http.get<ApiResponse<Book[]>>(ApiPaths.Books, {
      params: new HttpParams().set('page', page).set('limit', limit),
    });
  }
}
