import { Component, OnInit } from '@angular/core';
import { Book, BooksService } from '../services/books.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-search',
  imports: [ButtonComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  books: Book[] = [];
  currentPage: number = 1;
  totalPages: number | null = null;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks() {
    this.booksService.getAllBooks(this.currentPage).subscribe((res) => {
      this.books = res.data;
      this.totalPages = res?.totalPages || null;
    });
  }

  nextPage() {
    if (this.totalPages && this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchBooks();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchBooks();
    }
  }
}
