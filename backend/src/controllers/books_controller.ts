import { Request, Response } from "express";
import { BaseController } from "./base_controller";
import { BooksService } from "@/services/books_service";
import { LoansUtil } from "./loans_controller";

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

    const activeLoan = await LoansUtil.getActiveLoanByBookId(req.params.id);

    if (activeLoan) {
      console.log(activeLoan);
      result.data["available"] = false;
      result.data["isLoanedToCurrentUser"] = activeLoan.user_id === req.user.id;
    } else {
      result.data["available"] = true;
    }

    res.status(result.statusCode).json(result);
  }

  public updateHandler(req: Request, res: Response): void {}

  public deleteHandler(req: Request, res: Response): void {}
}

export class BooksUtil {
  public static async getBookByID(book_id: string) {
    const service = new BooksService();

    const result = await service.findOne(book_id);

    if (result) {
      return result.data;
    }
    return null;
  }
}
