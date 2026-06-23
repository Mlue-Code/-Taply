import type { NextApiRequest, NextApiResponse } from "next";
import { adminDb } from "@/lib/firebase-admin";
import { validateFeedback } from "@/lib/schemas";
import { sendError, allowMethod } from "@/utils/api-helpers";
import type { CreateFeedbackResponse, ApiErrorResponse } from "@/types/taply";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateFeedbackResponse | ApiErrorResponse>,
) {
  if (!allowMethod(req.method, "POST", res)) return;

  try {
    const validation = validateFeedback(req.body);

    if (!validation.success) {
      return sendError(
        res,
        400,
        "VALIDATION_ERROR",
        validation.errors.join(", "),
      );
    }

    const { designId, comment, x, y } = validation.data;

    const designRef = adminDb.collection("designs").doc(designId);
    const designSnap = await designRef.get();

    if (!designSnap.exists) {
      return sendError(
        res,
        404,
        "NOT_FOUND",
        `Design with id "${designId}" not found`,
      );
    }

    const now = new Date().toISOString();
    const feedbackData = {
      comment,
      x,
      y,
      createdAt: now,
    };

    const feedbackRef = await designRef
      .collection("feedback")
      .add(feedbackData);

    return res.status(201).json({
      id: feedbackRef.id,
      comment,
      x,
      y,
      createdAt: now,
    });
  } catch (error) {
    console.error("Feedback creation error:", error);
    return sendError(res, 500, "INTERNAL_ERROR", "Failed to create feedback");
  }
}
