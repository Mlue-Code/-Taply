# Taply Frontend (MVP)

A modern design feedback platform built with Next.js that enables designers to upload designs and collect visual feedback from clients through shareable review links.

---

## 🚀 Overview

Taply is a lightweight design review tool that allows:

* Designers to upload design assets
* Generate public shareable review links
* Clients to leave feedback directly on specific areas of a design
* Visual feedback markers displayed on the design canvas

This MVP focuses on the core workflow:

```text
Upload Design → Generate Share Link → Leave Feedback → View Feedback Pins
```

---

## 🛠 Tech Stack

| Technology           | Purpose                 |
| -------------------- | ----------------------- |
| Next.js (App Router) | Application Framework   |
| TypeScript           | Type Safety             |
| Material UI (MUI)    | UI Components           |
| SWR                  | Data Fetching & Caching |
| Zustand              | Global UI State         |
| React Hook Form      | Form Management         |
| Zod                  | Form Validation         |
| Firebase Auth        | Authentication          |
| Vercel               | Deployment              |


---

## ✨ Features

### Design Upload

* Upload image designs
* Upload progress indicator
* Integration with `POST /api/designs`
* Automatic shareable link generation

### Public Review Page

* Dynamic route support
* Design image rendering
* Existing feedback display

### Interactive Feedback System

* Click anywhere on the design
* Capture X/Y coordinates
* Open feedback modal
* Submit comments

### Feedback Visualization

* Feedback pins displayed on canvas
* Position preserved using coordinates
* Automatic refresh after new feedback submission

### Responsive UI

* Mobile-friendly layout
* Loading states
* Error handling
* Empty states

---

## 🗺 Routes

### Home Page

```text
/
```

Purpose:

* Upload a design
* Generate a review link

---

### Review Page

```text
/review/[shareableId]
```

Purpose:

* Display uploaded design
* View feedback markers
* Submit new feedback

Example:

```text
/review/clx8af2s9
```

---

## 🔄 API Integration

### Upload Design

```http
POST /api/designs
```

Request:

```multipart/form-data
file: image
```

Response:

```json
{
  "id": "abc123",
  "shareableId": "clx8af2s9",
  "imageUrl": "https://..."
}
```

---

### Get Design Details

```http
GET /api/designs/[shareableId]
```

Response:

```json
{
  "design": {},
  "feedback": []
}
```

---

### Create Feedback

```http
POST /api/feedback
```

Request:

```json
{
  "designId": "abc123",
  "comment": "Move this element slightly left.",
  "x": 0.42,
  "y": 0.67
}
```

---

## 🧩 State Management

### Server State

Managed using SWR.

Responsibilities:

* Design fetching
* Feedback fetching
* Cache management
* Automatic revalidation

---

### Global UI State

Managed using Zustand.

Example:

```ts
interface UIState {
  isFeedbackModalOpen: boolean;
}
```

---

### Form State

Managed using:

* React Hook Form
* Zod

Forms:

* Design Upload Form
* Feedback Submission Form

---

## 🎨 Design System

Material UI is used as the primary component library.

Examples:

* Button
* Modal
* Alert
* Snackbar
* Skeleton
* Dialog
* Chip
* Avatar

Goals:

* Consistent UI
* Faster development
* Accessibility support

---

## ⚙ Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

NEXT_PUBLIC_API_URL=
```

---

## 🚀 Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Application:

```text
http://localhost:3000
```

---

## 🧪 Development Workflow

### Week 1

* Project setup
* MUI integration
* Design upload
* Shareable link generation
* Review page foundation

### Week 2

* Feedback modal
* Coordinate capture
* Feedback API integration
* Feedback rendering

### Week 3

* Loading states
* Error handling
* Mobile responsiveness
* Production deployment
* Final testing

---

## 📦 Deployment

The application is deployed using Vercel.

Production Workflow:

```text
GitHub
   ↓
Vercel
   ↓
Automatic Deployment
```

---

## 🎯 MVP Scope

Included:

✅ Design Upload

✅ Shareable Links

✅ Public Review Page

✅ Feedback Submission

✅ Feedback Visualization

✅ Responsive Interface


---

## 👥 Team Collaboration

Frontend developers should coordinate closely with backend developers for:

* API contracts
* Shared TypeScript types
* Error response formats
* Deployment configuration

---

## 📄 License

This project is developed as the MVP version of Taply and is intended for demonstration and validation purposes.
