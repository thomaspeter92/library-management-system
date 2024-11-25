import { ApiResponse } from "@/services/base_service";
import { Response } from "express";

export function responseUtil<T>(
  res: Response,
  statusCode: number,
  data: ApiResponse<T>
) {
  res.status(statusCode).json(data);
}
