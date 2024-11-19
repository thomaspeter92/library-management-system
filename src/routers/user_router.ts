import { UserController } from "@/controllers/user_controller";
import { Express } from "express";

export class UserRouter {
  private baseEndpoint = "/api/v1/user";

  constructor(app: Express) {
    const controller = new UserController();

    app.route(this.baseEndpoint).get(controller.getAllHandler);

    app.route("/api/v1/login").post(controller.login);
  }
}
