import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Book, BooksService } from '../../services/books.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { SplitSemicolonPipe } from '../../../../shared/pipes/split-semicolon.pipe';
import { LoansService } from '../../services/loans.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { ModalService } from '../../../../shared/components/modal/modal.service';

@Component({
  selector: 'app-book-detail',
  imports: [ButtonComponent, MatIconModule, SplitSemicolonPipe],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss',
})
export class BookDetailComponent implements OnInit {
  @Input() bookId!: string;
  book!: Book;
  stars: number[] = [];

  constructor(
    private booksService: BooksService,
    private loansService: LoansService,
    private toastsService: ToastService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.fetchBookDetails();
  }

  fetchBookDetails() {
    this.booksService.getBookById(this.bookId).subscribe((book) => {
      this.stars = Array(Math.floor(book.rating)).fill(0);
      this.book = book;
    });
  }

  onRequestLoan() {
    this.loansService.createLoan(this.book.id).subscribe((res) => {
      this.fetchBookDetails();
      this.toastsService.addToast(
        'Loan for this book was processed',
        'success',
        3000
      );
      this.modalService.closeModal();
    });
  }
}
