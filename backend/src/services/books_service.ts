import { Book } from "@/entities/book";
import { BaseService } from "./base_service";
import { Repository } from "typeorm";
import { DatabaseUtil } from "@/util/database_util";

export class BooksService extends BaseService<Book> {
  private booksRepository: Repository<Book> | null = null;

  constructor() {
    let booksRepository = new DatabaseUtil().getRepository(Book);
    super(booksRepository);
    this.booksRepository = booksRepository;
  }
}
