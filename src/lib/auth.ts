import type { NextApiRequest } from "next";
import { adminAuth } from "./firebase-admin";

export interface AuthResult {
  success: boolean;
  uid?: string;
  email?: string;
  error?: string;
}

/**
 *
 * @param req - Next.js request
 * @returns Authentication check result
 */
export async function verifyAuth(req: NextApiRequest): Promise<AuthResult> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return {
        success: false,
        error: "Authorization header missing",
      };
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return {
        success: false,
        error: "Invalid authorization format. Use: Bearer <token>",
      };
    }

    const token = parts[1];

    const decodedToken = await adminAuth.verifyIdToken(token);

    return {
      success: true,
      uid: decodedToken.uid,
      email: decodedToken.email,
    };
  } catch (error) {
    console.error("Auth verification failed:", error);
    return {
      success: false,
      error: "Invalid or expired token",
    };
  }
}
