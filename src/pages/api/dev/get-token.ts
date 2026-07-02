import type { NextApiRequest, NextApiResponse } from "next";
import { adminAuth } from "@/lib/firebase-admin";
import { sendError, allowMethod } from "@/utils/api-helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!allowMethod(req.method, "GET", res)) return;

  // Security: Only allow with secret key
  const secret = req.query.secret;
  const expectedSecret = process.env.DEV_TOKEN_SECRET;

  if (!expectedSecret) {
    return sendError(
      res,
      500,
      "INTERNAL_ERROR",
      "DEV_TOKEN_SECRET not configured",
    );
  }

  if (secret !== expectedSecret) {
    return sendError(res, 403, "FORBIDDEN", "Invalid secret");
  }

  try {
    const testUid = "test-user-dev-12345";
    const testEmail = "test@taply.dev";

    // Create or update test user
    try {
      await adminAuth.getUser(testUid);
    } catch {
      await adminAuth.createUser({
        uid: testUid,
        email: testEmail,
        displayName: "Test User",
      });
    }

    // Create custom token
    const customToken = await adminAuth.createCustomToken(testUid);

    // Exchange custom token for ID token using Firebase REST API
    const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

    if (!firebaseApiKey) {
      return res.status(200).json({
        message: "Custom token created, but couldn't exchange for ID token",
        customToken,
        uid: testUid,
        note: "NEXT_PUBLIC_FIREBASE_API_KEY is missing",
      });
    }

    const exchangeUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${firebaseApiKey}`;

    const exchangeResponse = await fetch(exchangeUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: customToken,
        returnSecureToken: true,
      }),
    });

    const exchangeData = await exchangeResponse.json();

    if (!exchangeResponse.ok) {
      return res.status(500).json({
        message: "Failed to exchange token",
        error: exchangeData,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Use idToken in Authorization header",
      uid: testUid,
      email: testEmail,
      idToken: exchangeData.idToken,
      expiresIn: exchangeData.expiresIn + " seconds",
      usage: {
        header: `Authorization: Bearer ${exchangeData.idToken}`,
        example: "Use this token in Postman for POST /api/designs",
      },
    });
  } catch (error) {
    console.error("Dev token error:", error);
    return sendError(
      res,
      500,
      "INTERNAL_ERROR",
      error instanceof Error ? error.message : "Failed to generate token",
    );
  }
}
