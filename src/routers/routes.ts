import { Express, Router } from "express";
import { BooksRouter } from "./books_router";

export class AppRouter {
  public router: Router;

  constructor(app: Express) {
    const routerClasses = [BooksRouter];

    for (const RouterClass of routerClasses) {
      try {
        new RouterClass(app);
        console.log(`Router: ${RouterClass.name} - CONNECTED`);
      } catch (error) {
        console.log(`Router: ${RouterClass.name} - FAILED`);
      }
    }
  }
}
