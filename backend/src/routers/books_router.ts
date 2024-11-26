import { BooksController } from "@/controllers/books_controller";
import { authorize } from "@/util/auth_util";
import { newBookValidator } from "@/validators/books";
import { Express } from "express";
import { validate } from "@/validators/validate";

export class BooksRouter {
  private baseEndpoint = "/api/v1/books";

  constructor(app: Express) {
    const controller = new BooksController();

    app
      .route(this.baseEndpoint)
      .all(authorize)
      .get(controller.getAllHandler)
      .post(validate(newBookValidator), controller.addHandler);

    app
      .route(this.baseEndpoint + "/:id")
      .all(authorize)
      .get(controller.getOneHandler);
  }
}
