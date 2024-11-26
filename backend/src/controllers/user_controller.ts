import { BaseController } from "./base_controller";
import { Request, Response } from "express";
import { UserService } from "@/services/user_service";
import { encryptString, SERVER_CONST } from "@/util/common";
import * as jwt from "jsonwebtoken";
import { bcryptCompare } from "@/util/common";
import { LoansUtil } from "./loans_controller";
import { User } from "@/entities/user";
import { responseUtil } from "@/util/reponse_util";

export class UserController extends BaseController {
  public async addHandler(req: Request, res: Response) {
    try {
      const service = new UserService();

      const user = req.body;

      // check role

      user.email = user.email?.toLowerCase();
      user.password = await encryptString(user.password);

      // create user
      const result = await service.create(user);

      if (result.statusCode === 201) {
        delete result?.data?.password;
      }

      responseUtil(res, result.statusCode, result);
    } catch (error) {
      console.log(`Error on add user => ${error.message}`);
      responseUtil(res, 500, {
        statusCode: 500,
        status: "error",
        message: "SERVER_ERROR",
      });
    }
  }

  public async getAllHandler(req: Request, res: Response) {
    const service = new UserService();
    const result = await service.findAll(req.query);
    if (result.statusCode === 200) {
      // Remove password field to send in response
      result.data.forEach((i) => delete i.password);
    }

    responseUtil(res, result.statusCode, result);
  }

  public async getOneHandler(req: Request, res: Response): Promise<void> {
    // Add another try/catch here due to additional data processing
    try {
      const service = new UserService();

      const result = await service.findOne(req.params.id);

      if (result.statusCode == 200) {
        // Remove password field to send in response
        delete result.data.password;

        const activeLoans = await LoansUtil.getActiveLoansByUserId(
          result.data.id
        );

        result.data["active_loans"] = activeLoans;

        result.data["outstanding_loans"] = activeLoans.reduce(
          (acc, curr) => (curr.outstanding ? acc + 1 : acc),
          0
        );
      }
      responseUtil(res, result.statusCode, result);
    } catch (error) {
      responseUtil(res, 500, {
        statusCode: 500,
        status: "error",
        message: "SERVER_ERROR",
      });
    }
  }
  public updateHandler(req: Request, res: Response): void {}

  public async deleteHandler(req: Request, res: Response): Promise<void> {
    const service = new UserService();

    const result = await service.delete(req.params.id);

    responseUtil(res, result.statusCode, result);
  }

  /**
   * Login the user with the email and password. Compares provided password against hashed password in DB
   * Sends back a JWT access token and refresh token
   */
  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const service = new UserService();
    const result = await service.findAll({ email: email });

    if (result.data.length < 1) {
      responseUtil(res, 404, {
        statusCode: 404,
        status: "error",
        message: "EMAIL_NOT_FOUND",
      });
      return;
    }

    const user = result.data[0];

    //  compare password to db hashed pw
    const comparePasswords = await bcryptCompare(password, user.password);
    if (!comparePasswords) {
      responseUtil(res, 400, {
        statusCode: 400,
        status: "error",
        message: "INVALID_PASSWORD",
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

    delete user.password;
    delete user.created_at;
    delete user.updated_at;

    // Respond with tokens
    res.status(200).json({
      statusCode: 200,
      status: "success",
      data: {
        ...user,
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    });
    return;
  }
}
