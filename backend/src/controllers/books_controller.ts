import { Request, Response } from "express";
import { BaseController } from "./base_controller";
import { BooksService } from "@/services/books_service";
import { LoansUtil } from "./loans_controller";
import { Book } from "@/entities/book";

export class BooksController extends BaseController {
  public async addHandler(req: Request, res: Response): Promise<void> {
    const service = new BooksService();

    const book = req.body;

    const result = await service.create(book);

    res.status(result.statusCode).json(result);
  }

  public async getAllHandler(req: Request, res: Response): Promise<void> {
    const service = new BooksService();

    const result = await service.findAll(req.query);

    res.status(result.statusCode).json(result);
  }

  public async getOneHandler(req: Request, res: Response): Promise<void> {
    const service = new BooksService();

    const result = await service.findOne(req.params.id);

    const isUnavailable = await LoansUtil.getActiveLoanByBookId(req.params.id);

    if (isUnavailable) {
      result.data["available"] = false;
    } else {
      result.data["available"] = true;
    }

    res.status(result.statusCode).json(result);
  }

  public updateHandler(req: Request, res: Response): void {}

  public deleteHandler(req: Request, res: Response): void {}
}
