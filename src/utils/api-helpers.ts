import type { NextApiResponse } from "next";
import type { ApiErrorCode, ApiErrorResponse } from "@/types/taply";

export function sendError(
  res: NextApiResponse<ApiErrorResponse>,
  statusCode: number,
  error: ApiErrorCode,
  message: string,
): void {
  res.status(statusCode).json({ error, message });
}

export function allowMethod(
  method: string | undefined,
  allowed: string,
  res: NextApiResponse,
): boolean {
  if (method !== allowed) {
    res.setHeader("Allow", allowed);
    res.status(405).json({
      error: "INTERNAL_ERROR",
      message: `Method ${method} Not Allowed`,
    });
    return false;
  }
  return true;
}
