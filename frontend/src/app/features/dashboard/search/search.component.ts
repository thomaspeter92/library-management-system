import { Component, OnInit } from '@angular/core';
import { Book, BooksService } from '../services/books.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SplitSemicolonPipe } from '../../../shared/pipes/split-semicolon.pipe';

@Component({
  selector: 'app-search',
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    MatIconModule,
    SplitSemicolonPipe,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  books: Book[] = [];
  currentPage: number = 1;
  totalPages!: number;
  totalResults!: number;
  isLoading = false;
  error = '';
  searchForm!: FormGroup;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.fetchBooks();
    this.searchForm = new FormGroup({
      search: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    console.log('subby');
    this.error = '';
    if (!this.searchForm.valid) return;
    this.isLoading = true;
    const search = this.searchForm.value.search;
    this.booksService
      .getBooks(this.currentPage, 20, search)
      .subscribe((res) => {
        this.books = res.data;
        this.totalPages = res.totalPages || 0;
        this.isLoading = false;
        this.totalResults = res.total || 0;
        console.log(this.books);
      });
  }

  fetchBooks() {
    this.booksService.getAllBooks(this.currentPage).subscribe((res) => {
      this.books = res.data;
      this.totalPages = res?.totalPages || 0;
      this.totalResults = res.total || 0;
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

  generateArray(count: number): number[] {
    count = Number(count);
    console.log(count);
    const arr = Array(Math.floor(count)).fill(0);
    return arr;
  }
}
