import { body } from "express-validator";

export const newBookValidator = [
  body("title").trim().notEmpty().withMessage("Title required"),
  body("authors").trim().notEmpty().withMessage("Author required"),
  body("genre").trim().notEmpty().withMessage("Genre required"),
  body("year")
    .isInt({ min: 1, max: new Date().getFullYear() })
    .withMessage("Must be a valid year up to the current year."),
  body("pages").isInt({ min: 1 }).withMessage("Enter a valid number of pages"),
];
