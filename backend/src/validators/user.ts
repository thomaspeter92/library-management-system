import { body } from "express-validator";

export const newUserValidator = [
  body("email").trim().notEmpty().isEmail().withMessage("Email required"),
  body("first_name").trim().notEmpty().withMessage("First name required"),
  body("last_name").trim().notEmpty().withMessage("Last name required"),
  body("password")
    .isLength({ min: 6, max: 50 })
    .withMessage("Password length")
    .isStrongPassword({
      minNumbers: 1,
      minSymbols: 1,
      minLowercase: 1,
      minUppercase: 0,
    })
    .withMessage("Password format"),
  body("role_id").isUUID().withMessage("Must be a valid UUID"),
];
