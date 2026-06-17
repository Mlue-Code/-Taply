# 📡 Taply API Documentation

> **Version:** 1.0.0
> **Base URL (Dev):** `http://localhost:3000`
> **Base URL (Prod):** `https://taply.vercel.app` _(coming soon)_

---

## 📋 Table of Contents

1. [Authentication](#authentication)
2. [Error Format](#error-format)
3. [Endpoints](#endpoints)
   - [POST /api/designs](#post-apidesigns)

4. [Code Examples](#code-examples)
5. [Common Errors](#common-errors)

---

## 🔐 Authentication

Authenticated endpoints require a Firebase ID Token.

### How to Get a Token

```typescript
import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

if (user) {
  const token = await user.getIdToken();
  // Send the token in the Authorization header
}
```

### Header Format

```http
Authorization: Bearer <firebase-id-token>
```

> ⚠️ **Important:** The word `Bearer` followed by a space before the token is required.

---

## ❌ Error Format

All API errors follow this format:

```json
{
  "error": "ERROR_CODE",
  "message": "Human-readable error message"
}
```

### Error Codes

| Code               | Description                             |
| ------------------ | --------------------------------------- |
| `UNAUTHORIZED`     | Missing or invalid authentication token |
| `VALIDATION_ERROR` | Invalid request data                    |
| `NOT_FOUND`        | Resource not found                      |
| `FORBIDDEN`        | Access denied                           |
| `INTERNAL_ERROR`   | Internal server error                   |

---

## 🛠️ Endpoints

---

### POST /api/designs

Upload a new design and receive a shareable link.

#### 🔒 Authentication

**Required** ✅

#### 📥 Request

**URL:** `POST /api/designs`

**Headers:**

| Header          | Value                 | Required                                  |
| --------------- | --------------------- | ----------------------------------------- |
| `Authorization` | `Bearer <token>`      | ✅ Yes                                    |
| `Content-Type`  | `multipart/form-data` | ✅ Yes (automatically set by the browser) |

**Body (form-data):**

| Field   | Type | Required | Description             |
| ------- | ---- | -------- | ----------------------- |
| `image` | File | ✅ Yes   | Design image (max 10MB) |

**Allowed Image Types:**

- `image/jpeg`
- `image/png`
- `image/gif`
- `image/webp`

#### 📤 Response

**Success - 201 Created**

```json
{
  "id": "abc123xyz",
  "shareableId": "ckpqr5w8x000abc",
  "imageUrl": "https://res.cloudinary.com/taply/image/upload/v1234/taply/designs/abc.jpg",
  "createdAt": "2025-01-15T10:30:00.000Z"
}
```

**Response Fields:**

| Field         | Type   | Description                                  |
| ------------- | ------ | -------------------------------------------- |
| `id`          | string | Internal design ID (Firestore document ID)   |
| `shareableId` | string | Public ID used for generating shareable URLs |
| `imageUrl`    | string | Direct image URL                             |
| `createdAt`   | string | Creation timestamp (ISO 8601)                |

#### ❌ Error Responses

**401 Unauthorized** - Missing or invalid token

```json
{
  "error": "UNAUTHORIZED",
  "message": "Authorization header missing"
}
```

**400 Bad Request** - Missing or invalid file

```json
{
  "error": "VALIDATION_ERROR",
  "message": "No image file provided. Use field name \"image\""
}
```

**400 Bad Request** - Unsupported file type

```json
{
  "error": "VALIDATION_ERROR",
  "message": "Only image files are allowed"
}
```

**405 Method Not Allowed** - Invalid HTTP method

```json
{
  "error": "INTERNAL_ERROR",
  "message": "Method GET Not Allowed"
}
```

**500 Internal Server Error** - Server error

```json
{
  "error": "INTERNAL_ERROR",
  "message": "Failed to upload image"
}
```

---

## 💻 Code Examples

### JavaScript / TypeScript (Fetch API)

```typescript
import { getAuth } from "firebase/auth";

async function uploadDesign(file: File) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  // Get Firebase ID token
  const token = await user.getIdToken();

  // Create FormData
  const formData = new FormData();
  formData.append("image", file);

  // Send request
  const response = await fetch("/api/designs", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // ⚠️ Do NOT manually set Content-Type
      // The browser will automatically set it with the correct boundary
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data = await response.json();
  return data;
}
```

### cURL (Terminal Testing)

```bash
curl -X POST http://localhost:3000/api/designs \
  -H "Authorization: Bearer YOUR_FIREBASE_TOKEN" \
  -F "image=@/path/to/your/design.jpg"
```

---

## 🚨 Common Errors & Solutions

### ❌ "Authorization header missing"

```text
Cause:
  No Firebase token was sent with the request.

Solution:
  - Make sure the user is logged in.
  - Await getIdToken().
  - Send the header in the format:
    "Bearer <token>"
```

### ❌ "Invalid or expired token"

```text
Cause:
  The token is expired, invalid, or malformed.

Solution:
  - Refresh the token using getIdToken(true).
  - Verify your Firebase configuration.
  - Make sure the token comes from the same Firebase project.
```

### ❌ "No image file provided"

```text
Cause:
  The form-data field name is incorrect.

Solution:
  Use:
    formData.append('image', file)

  The field name must be exactly:
    image
```

### ❌ "Only image files are allowed"

```text
Cause:
  The uploaded file is not an image.

Solution:
  Only the following formats are supported:
  - JPG
  - PNG
  - GIF
  - WEBP
```

### ❌ Incorrect Content-Type Boundary

```text
Cause:
  Content-Type was manually set.

Incorrect:
  headers: {
    'Content-Type': 'multipart/form-data'
  }

Correct:
  headers: {
    Authorization: 'Bearer <token>'
  }

Let the browser automatically set Content-Type.
```

---

## 📞 Support

If you encounter any issues:

1. Review this documentation carefully.
2. Check the browser console for errors.
3. Inspect the Network tab (request/response details).
4. Contact the backend developer.

---

**Last Updated:** June 2026
**Backend Developer:** Somaiya Noori
