import { LoansController } from "@/controllers/loans_controller";
import { authorize } from "@/util/auth_util";
import { newLoanValidator } from "@/validators/loans";
import { validate } from "@/validators/validate";
import { Express } from "express";
export class LoansRouter {
  private baseEndpoint = "/api/v1/loans";

  constructor(app: Express) {
    const controller = new LoansController();

    app
      .route(this.baseEndpoint)
      .all(authorize)
      .post(validate(newLoanValidator), controller.addHandler);
  }
}