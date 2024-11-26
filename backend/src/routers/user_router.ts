import { UserController } from "@/controllers/user_controller";
import { authorize } from "@/util/auth_util";
import { newUserValidator } from "@/validators/user";
import { validate } from "@/validators/validate";
import { Express } from "express";

export class UserRouter {
  private baseEndpoint = "/api/v1/user";

  constructor(app: Express) {
    const controller = new UserController();

    app.route(this.baseEndpoint + "/login").post(controller.login);

    app
      .route(this.baseEndpoint)
      .all(authorize)
      .get(controller.getAllHandler)
      .post(validate(newUserValidator), controller.addHandler);

    app
      .route(this.baseEndpoint + "/:id")
      .all(authorize)
      .get(controller.getOneHandler)
      .delete(controller.deleteHandler);
  }
}
