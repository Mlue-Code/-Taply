# Taply Documentation

This folder contains all technical documentation for the Taply project.

## Contents

| File                                                             | Description                         |
| ---------------------------------------------------------------- | ----------------------------------- |
| [API.md](./API.md)                                               | Complete API endpoint documentation |
| [Taply.postman_collection.json](./Taply.postman_collection.json) | Postman Collection for API testing  |

## Quick Start (Frontend Developers)

1. Import `Taply.postman_collection.json` into Postman.
2. Set the collection variables:
   - `baseUrl`: API base URL (default: `http://localhost:3000`)
   - `firebaseToken`: Your Firebase ID token (for authenticated endpoints)
   - `designId`: A real design ID (for feedback testing)
3. Run the requests to test the API.

## Available Endpoints

### Designs

- `POST /api/designs` — Upload a design (Authenticated)

### Feedback

- `POST /api/feedback` — Submit feedback on a design (Public)

### Coming Soon (Week 3)

- `GET /api/designs/[shareableId]` — Get design with all feedback

## Full Reference

For complete details about each endpoint, including:

- Request formats
- Response structures
- Error codes
- Code examples (TypeScript, React, cURL)
- Common errors and solutions

See [API.md](./API.md).

## How to Get a Firebase Token

Run this in the browser console while logged in:

```javascript
const auth = firebase.auth();
const token = await auth.currentUser.getIdToken();
console.log(token);
```
