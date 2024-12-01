import { Component, OnInit } from '@angular/core';
import { Book, BooksService } from '../services/books.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SplitSemicolonPipe } from '../../../shared/pipes/split-semicolon.pipe';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

@Component({
  selector: 'app-search',
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    MatIconModule,
    SplitSemicolonPipe,
    ModalComponent,
    BookDetailComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  books: Book[] | null = null;
  currentPage: number = 1;
  totalPages!: number;
  totalResults!: number;
  isLoading = false;
  error = '';
  searchForm!: FormGroup;
  bookDetailOpen = false;
  selectedBook: string | null = null;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    // this.fetchBooks();
    this.searchForm = new FormGroup({
      search: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (!this.searchForm.valid) return;
    this.currentPage = 1;
    this.fetchBooks();
  }

  fetchBooks() {
    this.error = '';
    this.isLoading = true;
    const search = this.searchForm.value.search;

    this.booksService
      .getBooks(this.currentPage, 10, search)
      .subscribe((res) => {
        this.books = res.data;
        this.totalPages = res.totalPages || 0;
        this.isLoading = false;
        this.totalResults = res.total || 0;
        console.log(this.books);
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

  onClearResults() {
    this.books = null;
    this.searchForm.reset();
  }

  onSelectBook(bookId: string) {
    console.log(bookId);
    this.selectedBook = bookId;
    this.bookDetailOpen = true;
  }

  onCloseBookDetail() {
    this.bookDetailOpen = false;
    this.selectedBook = null;
  }

  generateArray(count: number): number[] {
    count = Number(count);
    if (!count) return [];
    const arr = Array(Math.floor(count)).fill(0);
    return arr;
  }
}
