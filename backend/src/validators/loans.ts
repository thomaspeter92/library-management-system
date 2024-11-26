import { body } from "express-validator";

export const newLoanValidator = [
  body("book_id").isUUID().withMessage("Book ID required"),
];

export const updateLoanValidator = [
  body("loan_id").isUUID().withMessage("Loan ID required"),
];
