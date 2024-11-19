import * as bcrypt from "bcrypt";

export const Rights = {
  ROLES: {
    ADD: "add_role",
    EDIT: "edit_role",
    GET_ALL: "get_all_roles",
    GET_DETAILS: "get_details_role",
    DELETE: "delete_role",
    ALL: "add_role,edit_role,get_all_roles,get_details_role,delete_role",
  },
  USERS: {
    ADD: "add_user",
    EDIT: "edit_user",
    GET_ALL: "get_all_users",
    GET_DETAILS: "get_details_user",
    DELETE: "delete_user",
    ALL: "add_user,edit_user,get_all_users,get_details_user,delete_user",
  },
  LOANS: {
    ADD: "add_loan",
    EDIT: "edit_loan",
    GET_ALL: "get_all_loans",
    GET_DETAILS: "get_details_loan",
    DELETE: "delete_loan",
    ALL: "add_loan,edit_loan,get_all_loans,get_details_loan,delete_loan",
  },
  BOOKS: {
    ADD: "add_book",
    EDIT: "edit_book",
    GET_ALL: "get_all_books",
    GET_DETAILS: "get_details_book",
    DELETE: "delete_book",
    ALL: "add_book,edit_book,get_all_books,get_details_book,delete_book",
  },
};

export const ERROR_MESSAGES = {
  SERVER_ERROR: "Unkown server error fallback",
  INVALID_DATA: "The data provided to the API was of the wrong format",
  NOT_FOUND: "The entity requested was not found in the DB",
};

export const SERVER_CONST = {
  JWTSECRET: "SecretKeyOfPMS-SECRET",
  ACCESS_TOKEN_EXPIRY_TIME_SECONDS: 1 * 8 * 60 * 60, // 8 hours
  REFRESH_TOKEN_EXPIRY_TIME_SECONDS: 5 * 7 * 24 * 60 * 60, // 1 week
};

// Encrypts a string using bcrypt hashing
export const encryptString = async (s: string): Promise<string> => {
  const encryptedString = await bcrypt.hash(s, 8);
  return encryptedString;
};

//Compares a plain string with a bcrypt hash to check they match
export const bcryptCompare = async (
  s: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(s, hash);
};
