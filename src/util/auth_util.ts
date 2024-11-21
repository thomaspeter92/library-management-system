import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { SERVER_CONST } from "./common";

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Get access token from req header
  const token = req.headers?.authorization
    ? (req.headers?.authorization?.split("Bearer ")[1] as string)
    : null;

  if (!token) {
    res.status(401).json({
      statusCode: 401,
      status: "error",
      message: "Missing auth token",
    });
    return;
  }

  try {
    // verify access token
    const decodedToken = jwt.verify(token, SERVER_CONST.JWTSECRET);
    req.user = {};
    req.user.id = decodedToken["id"] ?? "";
    req.user.email = decodedToken["email"] ?? "";
    //   if (req.user.username) {
    //     const user: Users = await UsersUtil.getUserFromUsername(
    //       req.user.username
    //     );
    //     const rights = await RolesUtil.getAllRightsFromRoles([user.role_id]);
    //     req.user.rights = rights;
    //   }

    // Authorised proceed to next
    next();
  } catch (error) {
    console.error(error.message);
    res
      .status(401)
      .json({ statusCode: 401, status: "error", message: "Invalid Token" });
  }
};
