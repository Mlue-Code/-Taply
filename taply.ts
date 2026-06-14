//  This file is shared between the backend and frontend.
// The frontend developer uses these types as well.
// Any changes made here may affect the frontend.

// Main Database Models

export interface Design {
  id: string;
  shareableId: string;
  imageUrl: string;
  storagePath: string;
  creatorUid: string;
  createdAt: string;
}

export interface Feedback {
  id: string;
  comment: string;
  x: number;
  y: number;
  createdAt: string; // ISO string
}

// POST /api/designs
export interface UploadDesignResponse {
  id: string;
  shareableId: string;
  imageUrl: string;
  createdAt: string;
}

// GET /api/designs/[shareableId]
export interface GetDesignResponse {
  design: Design;
  feedback: Feedback[];
}

// POST /api/feedback →
export interface CreateFeedbackResponse {
  id: string;
  comment: string;
  x: number;
  y: number;
  createdAt: string;
}
// API Error Response Format

export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "INTERNAL_ERROR";

export interface ApiErrorResponse {
  error: ApiErrorCode;
  message: string;
}

// Request Formats
// Frontend sends these request payloads

export interface CreateFeedbackRequest {
  designId: string;
  comment: string;
  x: number;
  y: number;
}
