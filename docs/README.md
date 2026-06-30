# Taply Documentation

This folder contains all technical documentation for the Taply backend API.

## Contents

| File                                                             | Description                              |
| ---------------------------------------------------------------- | ---------------------------------------- |
| [API.md](./API.md)                                               | Complete API endpoint documentation      |
| [SECURITY.md](./SECURITY.md)                                     | Security architecture and best practices |
| [Taply.postman_collection.json](./Taply.postman_collection.json) | Postman Collection for API testing       |

## Quick Start for Frontend Developers

### 1. Import Postman Collection

1. Open Postman
2. Click **Import**
3. Select `docs/Taply.postman_collection.json`
4. The collection "Taply API" will be added

### 2. Set Collection Variables

Click on the collection name and go to **Variables** tab:

| Variable        | Description                         | Example                   |
| --------------- | ----------------------------------- | ------------------------- |
| `baseUrl`       | API base URL                        | `http://localhost:3000`   |
| `firebaseToken` | Firebase ID token (for auth)        | `eyJhbGciOiJSUzI1NiIs...` |
| `designId`      | Real design ID (for feedback)       | `abc123xyz`               |
| `shareableId`   | Real shareable ID (for public view) | `ckpqr5w8x000abc`         |

### 3. Test the API

Run requests in this order:

1. **Upload Design** → Get `id` and `shareableId`
2. **Get Design by ShareableId** → Use the `shareableId`
3. **Create Feedback** → Use the `id` as `designId`
4. **Get Design Again** → See feedback in response

## Available Endpoints

### Designs

| Method | Endpoint                     | Auth | Description              |
| ------ | ---------------------------- | ---- | ------------------------ |
| POST   | `/api/designs`               | ✅   | Upload a new design      |
| GET    | `/api/designs/[shareableId]` | ❌   | Get design with feedback |

### Feedback

| Method | Endpoint        | Auth | Description                 |
| ------ | --------------- | ---- | --------------------------- |
| POST   | `/api/feedback` | ❌   | Submit feedback on a design |

## Rate Limits

| Endpoint             | Limit                |
| -------------------- | -------------------- |
| `POST /api/designs`  | 20 requests / hour   |
| `POST /api/feedback` | 10 requests / minute |
| All other endpoints  | No limit             |

Rate limits are per IP address. When exceeded, the API returns `429 Too Many Requests`.

## How to Get a Firebase Token

### In Browser Console (when logged in)

```javascript
const auth = firebase.auth();
const token = await auth.currentUser.getIdToken();
console.log(token);
```

## In React App

````javascript
import { getAuth } from "firebase/auth";

const auth = getAuth();
const token = await auth.currentUser?.getIdToken();
```

## For Development Testing
 There's a dev-only endpoint to generate test tokens:

 GET http://localhost:3000/api/dev/get-token

This creates a test user and returns an ID token (only works in development).

## How to Get a Real Design ID
Upload a design using POST /api/designs
Copy the id from the response
Or check Firebase Console:

## Go to Firestore Database
Open the designs collection
Click any document and copy the document ID
Full Reference
For complete details, see API.md:

## Request/Response formats
All error codes
Code examples (TypeScript, React, cURL)
Common errors and solutions
Support
If you encounter any issues:

## Review API.md carefully
Check the browser console and Network tab
Verify your Firebase token is valid
Contact the backend developer

 ## Last Updated: June 2026
 ## Backend Developer: Somaiya Noori
````
