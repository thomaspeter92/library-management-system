import { Request, Response } from "express";
import { BaseController } from "./base_controller";
import { BooksService } from "@/services/books_service";

export class BooksController extends BaseController {
  public addHandler(req: Request, res: Response): void {}

  public async getAllHandler(req: Request, res: Response) {
    const service = new BooksService();
    const result = await service.findAll(req.query);

    res.status(result.statusCode).json(result);
  }
  public getOneHandler(req: Request, res: Response): void {}

  public updateHandler(req: Request, res: Response): void {}

  public deleteHandler(req: Request, res: Response): void {}
}
