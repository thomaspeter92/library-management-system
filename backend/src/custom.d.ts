import { ApiResponse } from "./services/base_service";

declare global {
  namespace Express {
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
}
