import { Request, Response } from "express";
import { BaseController } from "./base_controller";
import { LoanService } from "@/services/loans_service";
import { Loan } from "@/entities/loan";
import { BooksUtil } from "./books_controller";

export class LoansController extends BaseController {
  /**
   * TO DO: Add checking here to ensure that user has no outstanding loans
   * They should be blocked form making new loans if they do!
   * @param req
   * @param res
   */
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

  public async getAllHandler(req: Request, res: Response): Promise<void> {
    const service = new LoanService();

    const result = await service.findAll(req.query);

    for (const loan of result.data) {
      const book = await BooksUtil.getBookByID(loan.book_id);

      loan["book"] = book;
    }

    res.status(result.statusCode).json(result);
  }

  public deleteHandler(req: Request, res: Response): void {}
}

// Create a loans util that can check the loan in methods like getBook etc where the user can see if a given book is available
export class LoansUtil {
  public static async getActiveLoanByBookId(book_id: string) {
    const service = new LoanService();

    // If the return date is null, the book hasnt been returned yet
    const result = await service.customQuery(
      `book_id = '${book_id}' AND return_date IS NULL`
    );

    if (result && result.length > 0) {
      return result[0];
    }
    return false;
  }

  public static async getActiveLoansByUserId(
    user_id: string
  ): Promise<({ outstanding?: boolean } & Loan)[]> {
    const service = new LoanService();

    // If the return date is null, the book hasnt been returned yet
    const result = await service.customQuery(
      `user_id = '${user_id}' AND return_date IS NULL`
    );

    if (result && result.length > 0) {
      for (const loan of result) {
        const dueDate = new Date(loan.due_date).getTime();
        loan["outstanding"] = dueDate < Date.now();
      }
      return result;
    }
    return [];
  }

  public static async getAllActiveLoansByUserId(user_id: string) {}
}
