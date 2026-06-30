````markdown
# Security Documentation

This document outlines the security architecture and practices implemented in the Taply API.

## Overview

| Layer      | Protection                              |
| ---------- | --------------------------------------- |
| Firestore  | Strict security rules                   |
| Cloudinary | Signed uploads only                     |
| API        | Authentication + IP-based rate limiting |
| Transport  | HTTPS enforced                          |

## Authentication

### Method

Firebase Authentication with ID Tokens

### Flow

1. User logs in via Firebase Client SDK (frontend)
2. Frontend obtains an ID Token via `getIdToken()`
3. ID Token is sent in the `Authorization` header: `Bearer <token>`
4. Backend verifies the token using Firebase Admin SDK
5. If valid, the user's UID is available for authorization checks

### Token Expiration

- Firebase ID Tokens expire after **1 hour**
- Frontend should refresh tokens automatically before they expire
- Use `getIdToken(true)` to force refresh

## Firestore Security Rules

### Design Collection

```javascript
match /designs/{designId} {
  // Public read access (for review pages)
  allow read: if true;

  // Authenticated users can create designs
  allow create: if request.auth != null;

  // Only the owner can update or delete
  allow update, delete: if request.auth != null
                        && request.auth.uid == resource.data.creatorUid;
}
```

## Feedback Sub-collection

```javascript
match /designs/{designId}/feedback/{feedbackId} {
// Public read access
allow read: if true;

// Anyone can create feedback (no login required)
allow write: if true;
}
```

Key Points
✅ Public read for both designs and feedback (needed for share links)
✅ Authentication required for design creation
✅ Ownership check for design modification
✅ Public write for feedback (intentional - anyone with link can comment)
Cloudinary Security
Configuration
✅ Signed uploads only - No unsigned upload presets
✅ Server-side uploads - API credentials never exposed to client
✅ HTTPS enforced - secure: true in configuration
✅ Upload through API - Direct uploads from frontend disabled
Why This Matters
If unsigned uploads were enabled, anyone could:

Upload arbitrary files to your Cloudinary account
Consume your storage quota
Upload malicious content
By requiring server-side signed uploads, every upload goes through our authenticated API.

Rate Limiting
Limits
Endpoint Window Max Requests
POST /api/designs 1 hour 20
POST /api/feedback 1 minute 10
Implementation
Per-IP rate limiting using in-memory store
Returns 429 Too Many Requests when exceeded
Automatic cleanup of expired entries
Production Considerations
⚠️ The current in-memory rate limiter is suitable for single-instance deployments.

For multi-instance production deployments, consider:

Upstash Redis (recommended - free tier available)
Vercel KV (Vercel's built-in solution)
Database-based rate limiting
Input Validation
All API inputs are validated using Zod schemas:

✅ Type validation
✅ Length constraints (e.g., comment max 500 chars)
✅ Range validation (e.g., coordinates 0-1)
✅ Required field checks
Invalid requests return 400 Bad Request with detailed error messages.

File Upload Security
Restrictions
✅ File size limit: 10 MB
✅ Allowed types: JPG, PNG, GIF, WEBP (MIME type checked)
✅ Server-side parsing with formidable
✅ Cloudinary processing (automatic optimization)
Environment Variables
Sensitive Variables (Never Expose)
These are server-side only:

FIREBASE*PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
Public Variables (Safe to Expose)
These start with NEXT_PUBLIC* and are bundled into the frontend:

NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
CLOUDINARY_CLOUD_NAME (used in public URLs)
Known Limitations
Admin SDK Bypasses Firestore Rules
The Firebase Admin SDK has full access to Firestore, bypassing security rules. This is intentional and standard practice.

The security rules protect:

✅ Direct client access (from frontend)
✅ Compromised client tokens
The Admin SDK in our API routes performs additional authorization checks (e.g., verifying user ownership).

Public Feedback Creation
Feedback creation is intentionally public (no auth required). This means:

✅ Anyone with the link can leave feedback (desired behavior)
⚠️ Anonymous spam is possible (mitigated by rate limiting)
For future versions, consider:

Optional Firebase Auth for feedback authors
CAPTCHA for anonymous submissions
Moderation tools
Security Checklist
Before deploying to production:

All environment variables set in deployment platform
Firestore rules deployed and tested
Cloudinary upload presets verified (signed only)
Rate limits configured appropriately
HTTPS enforced on production domain
Test endpoints (/api/dev/\*) removed or disabled
Service account JSON not committed to Git
.env.local in .gitignore
Reporting Security Issues
If you discover a security vulnerability, please contact the backend developer directly. Do not open public GitHub issues for security concerns.

## Last Updated: June 2026

## Backend Developer: Somaiya Noori
````
