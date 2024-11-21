import { BaseController } from "./base_controller";
import { Request, Response } from "express";
import { UserService } from "@/services/user_service";
import { SERVER_CONST } from "@/util/common";
import * as jwt from "jsonwebtoken";
import { bcryptCompare } from "@/util/common";

export class UserController extends BaseController {
  public addHandler(req: Request, res: Response): void {}
  public async getAllHandler(req: Request, res: Response) {
    const service = new UserService();
    const result = await service.findAll(req.query);

    res.status(result.statusCode).json(result);
  }
  public getOneHandler(req: Request, res: Response): void {}
  public updateHandler(req: Request, res: Response): void {}
  public deleteHandler(req: Request, res: Response): void {}

  /**
   * Login the user with the email and password. Compares provided password against hashed password in DB
   * Sends back a JWT access token and refresh token
   */
  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const service = new UserService();

    const result = await service.findAll({ email: email });

    console.log(result);
    if (result.data.length < 1) {
      res
        .status(404)
        .json({ statusCode: 404, status: "error", message: "Email not found" });
      return;
    }
    const user = result.data[0];

    //  compare password to db hashed pw
    const comparePasswords = await bcryptCompare(password, user.password);
    if (!comparePasswords) {
      res.status(400).json({
        statusCode: 400,
        status: "error",
        message: "Invalid password",
      });
      return;
    }

    // Generate access and refresh token
    const accessToken: string = jwt.sign(
      { email: user.email, id: user.id },
      SERVER_CONST.JWTSECRET,
      { expiresIn: SERVER_CONST.ACCESS_TOKEN_EXPIRY_TIME_SECONDS }
    );

    const refreshToken: string = jwt.sign(
      { email: user.email, id: user.id },
      SERVER_CONST.JWTSECRET,
      { expiresIn: SERVER_CONST.ACCESS_TOKEN_EXPIRY_TIME_SECONDS }
    );

    // Respond with tokens
    res.status(200).json({
      statusCode: 200,
      status: "success",
      data: {
        accessToken,
        refreshToken,
      },
    });
    return;
  }
}
