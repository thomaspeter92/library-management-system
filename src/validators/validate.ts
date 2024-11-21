import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export interface IValidatonError {
  type?: string;
  msg?: string;
  path?: string;
  location?: string;
}

export const validate = (validations: any[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const errorMessages = errors.array().map((error: IValidatonError) => {
      console.log(error);
      const obj = {};
      obj[error.path] = error.msg;
      return obj;
    });

    res
      .status(400)
      .json({ statusCode: 400, status: "error", errors: errorMessages });
  };
};
