import { BaseController } from "@/controllers/base_controller";
import { BooksController } from "@/controllers/books_controller";
import { Express } from "express";

export class BooksRouter {
  private baseEndpoint = "/api/v1/books";

  constructor(app: Express) {
    const constoller = new BooksController();

    app.route(this.baseEndpoint).get(constoller.getAllHandler);
  }
}
