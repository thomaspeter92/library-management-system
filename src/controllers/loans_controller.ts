import { Request, Response } from "express";
import { BaseController } from "./base_controller";
import { LoanService } from "@/services/loans_service";

export class LoansController extends BaseController {
  public async addHandler(req: Request, res: Response): Promise<void> {
    const service = new LoanService();

    const loan = { book_id: req.body.book_id, user_id: req.user.id };

    const result = await service.create(loan);

    res.status(result.statusCode).json(result);
  }

  public async updateHandler(req: Request, res: Response): Promise<void> {
    const service = new LoanService();

    const result = await service.update(req.body.loan_id, {
      return_date: new Date(),
    });

    res.status(result.statusCode).json(result);
  }
  public getOneHandler(req: Request, res: Response): void {}
  public getAllHandler(req: Request, res: Response): void {}
  public deleteHandler(req: Request, res: Response): void {}
}

// Create a loans util that can check the loan in methods like getBook etc where the user can see if a given book is available
