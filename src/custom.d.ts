declare namespace Express {
  interface Request {
    user?: {
      username?: string;
      email?: string;
      rights?: string[];
      id?: string;
    };
    // Add other properties needed
  }
}
