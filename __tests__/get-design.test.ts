import { createMocks } from "node-mocks-http";
import type { NextApiRequest, NextApiResponse } from "next";

// Mock Firebase Admin
// Mock feedback data
const mockFeedbackDocs = [
  {
    id: "feedback1",
    data: () => ({
      comment: "Great work!",
      x: 0.5,
      y: 0.5,
      createdAt: "2025-01-15T12:00:00.000Z",
    }),
  },
  {
    id: "feedback2",
    data: () => ({
      comment: "Nice color",
      x: 0.3,
      y: 0.7,
      createdAt: "2025-01-15T11:00:00.000Z",
    }),
  },
];

// Mock design document
const mockDesignDoc = {
  id: "design-id-123",
  ref: {
    collection: jest.fn(() => ({
      orderBy: jest.fn(() => ({
        get: jest.fn(() =>
          Promise.resolve({
            docs: mockFeedbackDocs,
          }),
        ),
      })),
    })),
  },
  data: () => ({
    shareableId: "valid-shareable-id",
    imageUrl: "https://res.cloudinary.com/test/image.jpg",
    publicId: "taply/designs/test",
    creatorUid: "user-123",
    createdAt: "2025-01-15T10:00:00.000Z",
  }),
};

// Mock Firebase
jest.mock("@/lib/firebase-admin", () => ({
  adminDb: {
    collection: jest.fn(() => ({
      where: jest.fn((field: string, op: string, value: string) => ({
        limit: jest.fn(() => ({
          get: jest.fn(() => {
            if (value === "non-existent-id") {
              return Promise.resolve({
                empty: true,
                docs: [],
              });
            }
            return Promise.resolve({
              empty: false,
              docs: [mockDesignDoc],
            });
          }),
        })),
      })),
    })),
  },
}));

import handler from "@/pages/api/designs/[shareableId]";
describe("GET /api/designs/[shareableId]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("HTTP Method Validation", () => {
    it("should reject POST requests with 405", async () => {
      const { req, res } = createMocks({
        method: "POST",
        query: { shareableId: "valid-id" },
      });

      await handler(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse,
      );

      expect(res._getStatusCode()).toBe(405);
    });

    it("should reject PUT requests with 405", async () => {
      const { req, res } = createMocks({
        method: "PUT",
        query: { shareableId: "valid-id" },
      });

      await handler(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse,
      );

      expect(res._getStatusCode()).toBe(405);
    });

    it("should reject DELETE requests with 405", async () => {
      const { req, res } = createMocks({
        method: "DELETE",
        query: { shareableId: "valid-id" },
      });

      await handler(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse,
      );

      expect(res._getStatusCode()).toBe(405);
    });
  });

  // Validation Tests
  describe("shareableId Validation", () => {
    it("should reject missing shareableId", async () => {
      const { req, res } = createMocks({
        method: "GET",
        query: {},
      });

      await handler(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse,
      );

      expect(res._getStatusCode()).toBe(400);
      const data = JSON.parse(res._getData());
      expect(data.error).toBe("VALIDATION_ERROR");
    });

    it("should reject array shareableId", async () => {
      const { req, res } = createMocks({
        method: "GET",
        query: { shareableId: ["id1", "id2"] },
      });

      await handler(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse,
      );

      expect(res._getStatusCode()).toBe(400);
    });
  });

  // Not Found Test
  describe("Not Found", () => {
    it("should return 404 when design does not exist", async () => {
      const { req, res } = createMocks({
        method: "GET",
        query: { shareableId: "non-existent-id" },
      });

      await handler(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse,
      );

      expect(res._getStatusCode()).toBe(404);
      const data = JSON.parse(res._getData());
      expect(data.error).toBe("NOT_FOUND");
      expect(data.message).toContain("not found");
    });
  });

  // Successful Fetch
  describe("Successful Fetch", () => {
    it("should return design and feedback for valid shareableId", async () => {
      const { req, res } = createMocks({
        method: "GET",
        query: { shareableId: "valid-shareable-id" },
      });

      await handler(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse,
      );

      expect(res._getStatusCode()).toBe(200);

      const data = JSON.parse(res._getData());
      expect(data).toHaveProperty("design");
      expect(data).toHaveProperty("feedback");

      expect(data.design).toHaveProperty("id");
      expect(data.design).toHaveProperty("shareableId");
      expect(data.design).toHaveProperty("imageUrl");
      expect(data.design).toHaveProperty("publicId");
      expect(data.design).toHaveProperty("creatorUid");
      expect(data.design).toHaveProperty("createdAt");

      expect(data.design.id).toBe("design-id-123");
      expect(data.design.shareableId).toBe("valid-shareable-id");
      expect(data.design.imageUrl).toBe(
        "https://res.cloudinary.com/test/image.jpg",
      );
      expect(Array.isArray(data.feedback)).toBe(true);
      expect(data.feedback.length).toBe(2);

      const firstFeedback = data.feedback[0];
      expect(firstFeedback).toHaveProperty("id");
      expect(firstFeedback).toHaveProperty("comment");
      expect(firstFeedback).toHaveProperty("x");
      expect(firstFeedback).toHaveProperty("y");
      expect(firstFeedback).toHaveProperty("createdAt");

      expect(firstFeedback.id).toBe("feedback1");
      expect(firstFeedback.comment).toBe("Great work!");
      expect(firstFeedback.x).toBe(0.5);
      expect(firstFeedback.y).toBe(0.5);
    });

    it("should return empty feedback array when no feedback exists", async () => {
      const { req, res } = createMocks({
        method: "GET",
        query: { shareableId: "valid-shareable-id" },
      });

      await handler(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse,
      );

      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(Array.isArray(data.feedback)).toBe(true);
    });
  });
});
