# Taply API Documentation

> **Version:** 1.0.0
> **Base URL (Dev):** `http://localhost:3000`
> **Base URL (Prod):** `https://taply.vercel.app` _(coming soon)_

---

## Table of Contents

1. [Authentication](#authentication)
2. [Error Format](#error-format)
3. [Endpoints](#endpoints)
   - [POST /api/designs](#post-apidesigns)
   - [POST /api/feedback](#post-apifeedback)
4. [Code Examples](#code-examples)
5. [Common Errors](#common-errors)

---

## Authentication

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

> **Important:** The word `Bearer` followed by a space before the token is required.

---

## Error Format

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

## Endpoints

---

### POST /api/designs

Upload a new design and receive a shareable link.

#### Authentication

**Required**

#### Request

**URL:** `POST /api/designs`

**Headers:**

| Header          | Value                 | Required                               |
| --------------- | --------------------- | -------------------------------------- |
| `Authorization` | `Bearer <token>`      | Yes                                    |
| `Content-Type`  | `multipart/form-data` | Yes (automatically set by the browser) |

**Body (form-data):**

| Field   | Type | Required | Description             |
| ------- | ---- | -------- | ----------------------- |
| `image` | File | Yes      | Design image (max 10MB) |

**Allowed Image Types:**

- `image/jpeg`
- `image/png`
- `image/gif`
- `image/webp`

#### Response

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

#### Error Responses

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

### POST /api/feedback

Submit feedback on a design at specific coordinates.

#### Authentication

**Not Required** (Public endpoint)

> Anyone with a shareable link can submit feedback without logging in.

#### Request

**URL:** `POST /api/feedback`

**Headers:**

| Header         | Value              | Required |
| -------------- | ------------------ | -------- |
| `Content-Type` | `application/json` | Yes      |

**Body (JSON):**

| Field      | Type   | Required | Constraints     | Description                            |
| ---------- | ------ | -------- | --------------- | -------------------------------------- |
| `designId` | string | Yes      | Non-empty       | The ID of the design to leave feedback |
| `comment`  | string | Yes      | 1-500 chars     | The feedback text                      |
| `x`        | number | Yes      | Between 0 and 1 | Horizontal coordinate (relative)       |
| `y`        | number | Yes      | Between 0 and 1 | Vertical coordinate (relative)         |

**About Coordinates:**

Coordinates are normalized values between 0 and 1, making them responsive across different screen sizes:

- `x = 0` → Left edge of the image
- `x = 1` → Right edge of the image
- `y = 0` → Top edge of the image
- `y = 1` → Bottom edge of the image

**Example Request Body:**

```json
{
  "designId": "abc123xyz",
  "comment": "Looking great! Maybe try a brighter color here.",
  "x": 0.45,
  "y": 0.78
}
```

#### Response

**Success - 201 Created**

```json
{
  "id": "ckpqr5w8x000abc",
  "comment": "Looking great! Maybe try a brighter color here.",
  "x": 0.45,
  "y": 0.78,
  "createdAt": "2025-01-15T12:30:00.000Z"
}
```

**Response Fields:**

| Field       | Type   | Description                       |
| ----------- | ------ | --------------------------------- |
| `id`        | string | Unique ID of the created feedback |
| `comment`   | string | The feedback text (trimmed)       |
| `x`         | number | Horizontal coordinate (0-1)       |
| `y`         | number | Vertical coordinate (0-1)         |
| `createdAt` | string | Creation timestamp (ISO 8601)     |

#### Error Responses

**400 Bad Request** - Invalid data

```json
{
  "error": "VALIDATION_ERROR",
  "message": "comment: comment cannot be empty"
}
```

**Other VALIDATION_ERROR examples:**

```json
{
  "error": "VALIDATION_ERROR",
  "message": "x: x must be between 0 and 1"
}
```

```json
{
  "error": "VALIDATION_ERROR",
  "message": "comment: comment must be 500 characters or less"
}
```

```json
{
  "error": "VALIDATION_ERROR",
  "message": "designId: designId cannot be empty, comment: comment cannot be empty"
}
```

**404 Not Found** - Design does not exist

```json
{
  "error": "NOT_FOUND",
  "message": "Design with id \"abc123\" not found"
}
```

````json
,
{
  "name": "Create Feedback - Method Not Allowed",
  "request": {
    "method": "GET",
    "header": [],
    "url": {
      "raw": "{{baseUrl}}/api/feedback",
      "host": ["{{baseUrl}}"],
      "path": ["api", "feedback"]
    },
    "description": "Test: GET method should be rejected (only POST allowed)"
  },
  "response": [
    {
      "name": "Error - 405 Method Not Allowed",
      "status": "Method Not Allowed",
      "code": 405,
      "body": "{\n  \"error\": \"INTERNAL_ERROR\",\n  \"message\": \"Method GET Not Allowed\"\n}"
    }
  ]
}
**405 Method Not Allowed** - Invalid HTTP method

```json
{
  "error": "INTERNAL_ERROR",
  "message": "Method GET Not Allowed"
}
````

**500 Internal Server Error** - Server error

```json
{
  "error": "INTERNAL_ERROR",
  "message": "Failed to create feedback"
}
```

---

## Code Examples

### Upload Design (TypeScript + Fetch)

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
      // Do NOT manually set Content-Type
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

### Submit Feedback (TypeScript + Fetch)

```typescript
interface CreateFeedbackRequest {
  designId: string;
  comment: string;
  x: number;
  y: number;
}

interface FeedbackResponse {
  id: string;
  comment: string;
  x: number;
  y: number;
  createdAt: string;
}

async function submitFeedback(
  data: CreateFeedbackRequest,
): Promise<FeedbackResponse> {
  const response = await fetch("/api/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to submit feedback");
  }

  return result;
}

// Usage example
try {
  const feedback = await submitFeedback({
    designId: "abc123",
    comment: "Great work!",
    x: 0.5,
    y: 0.5,
  });

  console.log("Feedback created:", feedback.id);
} catch (error) {
  console.error("Failed:", error);
}
```

### Click-to-Feedback Component (Complete Example)

```typescript
"use client";

import { useState, useRef } from "react";

interface Feedback {
  id: string;
  comment: string;
  x: number;
  y: number;
  createdAt: string;
}

interface FeedbackCanvasProps {
  designId: string;
  imageUrl: string;
  existingFeedback?: Feedback[];
  onFeedbackCreated?: () => void;
}

export function FeedbackCanvas({
  designId,
  imageUrl,
  existingFeedback = [],
  onFeedbackCreated,
}: FeedbackCanvasProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate relative coordinates on image click
  function handleImageClick(e: React.MouseEvent<HTMLImageElement>) {
    const rect = e.currentTarget.getBoundingClientRect();

    // Normalize coordinates to 0-1 range
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setCoords({ x, y });
    setModalOpen(true);
    setError(null);
  }

  // Submit feedback to API
  async function handleSubmit() {
    if (!comment.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          designId,
          comment: comment.trim(),
          x: coords.x,
          y: coords.y,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      // Reset and close modal
      setModalOpen(false);
      setComment("");

      // Refresh feedback list
      if (onFeedbackCreated) {
        onFeedbackCreated();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Design Image */}
      <img
        ref={imageRef}
        src={imageUrl}
        alt="Design"
        onClick={handleImageClick}
        style={{ cursor: "crosshair", maxWidth: "100%", display: "block" }}
      />

      {/* Existing Feedback Markers */}
      {existingFeedback.map((feedback, index) => (
        <div
          key={feedback.id}
          style={{
            position: "absolute",
            left: `${feedback.x * 100}%`,
            top: `${feedback.y * 100}%`,
            transform: "translate(-50%, -50%)",
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "#1976d2",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 14,
            fontWeight: "bold",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
          title={feedback.comment}
        >
          {index + 1}
        </div>
      ))}

      {/* Feedback Modal */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            style={{
              background: "white",
              padding: 24,
              borderRadius: 8,
              minWidth: 320,
              maxWidth: 500,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginTop: 0 }}>Leave a comment</h3>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={500}
              rows={4}
              placeholder="Your feedback..."
              style={{
                width: "100%",
                padding: 8,
                fontSize: 14,
                fontFamily: "inherit",
                border: "1px solid #ccc",
                borderRadius: 4,
                resize: "vertical",
              }}
              disabled={submitting}
            />

            <p style={{ margin: "8px 0", color: "#666", fontSize: 12 }}>
              {comment.length}/500 characters
            </p>

            {error && (
              <p style={{ color: "red", fontSize: 14 }}>{error}</p>
            )}

            <div
              style={{
                display: "flex",
                gap: 8,
                justifyContent: "flex-end",
                marginTop: 16,
              }}
            >
              <button
                onClick={() => setModalOpen(false)}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting || !comment.trim()}
                style={{
                  background: "#1976d2",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: 4,
                  cursor: submitting ? "wait" : "pointer",
                }}
              >
                {submitting ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

### cURL (Terminal Testing)

**Upload Design:**

```bash
curl -X POST http://localhost:3000/api/designs \
  -H "Authorization: Bearer YOUR_FIREBASE_TOKEN" \
  -F "image=@/path/to/your/design.jpg"
```

**Submit Feedback:**

```bash
curl -X POST http://localhost:3000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "designId": "abc123",
    "comment": "This looks amazing!",
    "x": 0.5,
    "y": 0.5
  }'
```

---

## Common Errors & Solutions

### "Authorization header missing"

```text
Cause:
  No Firebase token was sent with the request.

Solution:
  - Make sure the user is logged in.
  - Await getIdToken().
  - Send the header in the format:
    "Bearer <token>"
```

### "Invalid or expired token"

```text
Cause:
  The token is expired, invalid, or malformed.

Solution:
  - Refresh the token using getIdToken(true).
  - Verify your Firebase configuration.
  - Make sure the token comes from the same Firebase project.
```

### "No image file provided"

```text
Cause:
  The form-data field name is incorrect.

Solution:
  Use:
    formData.append('image', file)

  The field name must be exactly:
    image
```

### "Only image files are allowed"

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

### Incorrect Content-Type Boundary

```text
Cause:
  Content-Type was manually set for multipart/form-data.

Incorrect:
  headers: {
    'Content-Type': 'multipart/form-data'
  }

Correct:
  headers: {
    Authorization: 'Bearer <token>'
  }

Let the browser automatically set Content-Type with the correct boundary.
```

### "comment cannot be empty"

```text
Cause:
  The comment field is empty or only whitespace.

Solution:
  - Ensure the comment has at least 1 character after trimming.
  - Maximum length is 500 characters.
```

### "x must be between 0 and 1"

```text
Cause:
  Coordinates are outside the 0-1 range.

Solution:
  Normalize coordinates relative to the image dimensions:

  const rect = element.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;

  // Both x and y will always be between 0 and 1
```

### "Design with id ... not found"

```text
Cause:
  The provided designId does not exist in the database.

Solution:
  - Verify you are sending the correct designId.
  - Use the "id" field from the upload response (not "shareableId").
  - Check if the design was deleted.
```

### "Failed to fetch" or CORS Errors

```text
Cause:
  Network issues or CORS misconfiguration.

Solution:
  - Verify the API URL is correct.
  - Check the browser Network tab for details.
  - Make sure you're calling the correct base URL.
```

---

## Support

If you encounter any issues:

1. Review this documentation carefully.
2. Check the browser console for errors.
3. Inspect the Network tab (request/response details).
4. Contact the backend developer.

---

**Last Updated:** June 2026  
**Backend Developer:** Somaiya Noori
