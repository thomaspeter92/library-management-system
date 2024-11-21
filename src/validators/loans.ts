import { body } from "express-validator";

export const newLoanValidator = [
  body("book_id").isUUID().withMessage("Book ID required"),
];
