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

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.getBookById(this.bookId).subscribe((book) => {
      this.stars = Array(Math.floor(book.rating)).fill(0);
      this.book = book;
    });
  }
}
