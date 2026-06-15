import * as admin from "firebase-admin";

// =====================================================
// Firebase Admin SDK - Server-side only
// Used for Firestore and Authentication only
// (Cloudinary is used for file and image storage)
// =====================================================

if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    : undefined;

  if (
    !process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_CLIENT_EMAIL ||
    !privateKey
  ) {
    throw new Error(
      " Firebase Admin SDK: Required environment variables not found.\n" +
        "Please make sure your .env.local file is configured correctly.",
    );
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
  });

  console.log("Firebase Admin SDK initialized");
}

// export سرویس‌ها
export const adminDb = admin.firestore();
export const adminAuth = admin.auth();

export default admin;
