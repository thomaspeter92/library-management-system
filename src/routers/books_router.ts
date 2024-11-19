import { BooksController } from "@/controllers/books_controller";
import { authorize } from "@/util/auth_util";
import { Express } from "express";

export class BooksRouter {
  private baseEndpoint = "/api/v1/books";

  constructor(app: Express) {
    const controller = new BooksController();

    app.route(this.baseEndpoint).all(authorize).get(controller.getAllHandler);
  }
}
