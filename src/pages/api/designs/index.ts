import type { NextApiRequest, NextApiResponse } from "next";
import { createId } from "@paralleldrive/cuid2";
import { adminDb } from "@/lib/firebase-admin";
import { uploadImage } from "@/lib/cloudinary";
import { verifyAuth } from "@/lib/auth";
import { parseFormFile } from "@/lib/parse-form";
import { sendError, allowMethod } from "@/utils/api-helpers";
import type { UploadDesignResponse, ApiErrorResponse } from "@/types/taply";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UploadDesignResponse | ApiErrorResponse>,
) {
  if (!allowMethod(req.method, "POST", res)) return;

  try {
    const auth = await verifyAuth(req);
    if (!auth.success || !auth.uid) {
      return sendError(
        res,
        401,
        "UNAUTHORIZED",
        auth.error || "Authentication required",
      );
    }

    let file;
    try {
      file = await parseFormFile(req);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid file";
      return sendError(res, 400, "VALIDATION_ERROR", message);
    }
    let uploadResult;
    try {
      uploadResult = await uploadImage(file.buffer, "taply/designs");
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      return sendError(res, 500, "INTERNAL_ERROR", "Failed to upload image");
    }

    const shareableId = createId();
    const now = new Date().toISOString();
    const designData = {
      shareableId,
      imageUrl: uploadResult.url,
      publicId: uploadResult.publicId,
      creatorUid: auth.uid,
      createdAt: now,
    };

    const docRef = await adminDb.collection("designs").add(designData);
    return res.status(201).json({
      id: docRef.id,
      shareableId,
      imageUrl: uploadResult.url,
      createdAt: now,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return sendError(res, 500, "INTERNAL_ERROR", "Something went wrong");
  }
}
