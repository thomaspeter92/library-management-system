import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiPaths } from '../../../../enums/api-paths';
import { ApiResponse } from '../../../core/models/api-response.model';

export interface Book {
  title: string;
  year: number;
  authors: string;
  description: string;
  genre: string;
  id: string;
  pages: number;
  rating: number;
  ratings_count: number;
  subtitle?: string;
  thumbnail?: string;
  available?: boolean; // this is only available on the getBookById response
}

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  getAllBooks(page: number = 1, limit: number = 10) {
    return this.http.get<ApiResponse<Book[]>>(ApiPaths.Books, {
      params: new HttpParams().set('page', page).set('limit', limit),
    });
  }

  getBooks(page: number = 1, limit: number = 10, searchTerm: string) {
    return this.http.get<ApiResponse<Book[]>>(ApiPaths.Books, {
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
        .set('title', searchTerm)
        .set('authors', searchTerm),
    });
  }

  getBookById(id: string) {
    return this.http.get<ApiResponse<Book>>(`${ApiPaths.Books}/${id}`).pipe(
      map((res) => {
        return res.data;
      })
    );
  }
}
