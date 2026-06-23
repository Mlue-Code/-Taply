import { createMocks } from "node-mocks-http";
import type { NextApiRequest, NextApiResponse } from "next";

// ─── Mock Firebase Admin ───
jest.mock("@/lib/firebase-admin", () => {
  const createMockDoc = (exists: boolean) => ({
    get: jest.fn(() => Promise.resolve({ exists })),
    collection: jest.fn(() => ({
      add: jest.fn(() => Promise.resolve({ id: "mock-feedback-id-123" })),
    })),
  });

  return {
    adminDb: {
      collection: jest.fn(() => ({
        doc: jest.fn((id: string) => {
          if (id === "non-existent-id") {
            return createMockDoc(false);
          }
          return createMockDoc(true);
        }),
      })),
    },
  };
});

import handler from "@/pages/api/feedback";

describe("POST /api/feedback", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // HTTP Method Validation
  describe("HTTP Method Validation", () => {
    it("should reject GET requests with 405", async () => {
      const { req, res } = createMocks({ method: "GET" });

      await handler(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse,
      );

      expect(res._getStatusCode()).toBe(405);
    });

    it("should reject PUT requests with 405", async () => {
      const { req, res } = createMocks({ method: "PUT" });

      await handler(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse,
      );

      expect(res._getStatusCode()).toBe(405);
    });

    it("should reject DELETE requests with 405", async () => {
      const { req, res } = createMocks({ method: "DELETE" });

      await handler(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse,
      );

      expect(res._getStatusCode()).toBe(405);
    });
  });
  // Validation Errors
  describe("Validation - Invalid Data", () => {
    it("should reject empty designId", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          designId: "",
          comment: "Test comment",
          x: 0.5,
          y: 0.5,
        },
      });

      await handler(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse,
      );

      expect(res._getStatusCode()).toBe(400);
      const data = JSON.parse(res._getData());
      expect(data.error).toBe("VALIDATION_ERROR");
      expect(data.message).toContain("designId");
    });

    it("should reject missing designId", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          comment: "Test comment",
          x: 0.5,
          y: 0.5,
        },
      });

      await handler(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse,
      );

      expect(res._getStatusCode()).toBe(400);
      const data = JSON.parse(res._getData());
      expect(data.error).toBe("VALIDATION_ERROR");
    });

    it("should reject empty comment", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          designId: "valid-id",
          comment: "",
          x: 0.5,
          y: 0.5,
        },
      });

      await handler(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse,
      );

      expect(res._getStatusCode()).toBe(400);
      const data = JSON.parse(res._getData());
      expect(data.error).toBe("VALIDATION_ERROR");
      expect(data.message).toContain("comment");
    });

    it("should reject comment longer than 500 characters", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          designId: "valid-id",
          comment: "a".repeat(501),
          x: 0.5,
          y: 0.5,
        },
      });

      await handler(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse,
      );

      expect(res._getStatusCode()).toBe(400);
      const data = JSON.parse(res._getData());
      expect(data.error).toBe("VALIDATION_ERROR");
    });

    it("should reject x less than 0", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          designId: "valid-id",
          comment: "Hello",
          x: -0.5,
          y: 0.5,
        },
      });

      await handler(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse,
      );

      expect(res._getStatusCode()).toBe(400);
      const data = JSON.parse(res._getData());
      expect(data.error).toBe("VALIDATION_ERROR");
      expect(data.message).toContain("x");
    });

    it("should reject x greater than 1", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          designId: "valid-id",
          comment: "Hello",
          x: 1.5,
          y: 0.5,
        },
      });

      await handler(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse,
      );

      expect(res._getStatusCode()).toBe(400);
      const data = JSON.parse(res._getData());
      expect(data.error).toBe("VALIDATION_ERROR");
    });

    it("should reject y less than 0", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          designId: "valid-id",
          comment: "Hello",
          x: 0.5,
          y: -1,
        },
      });

      await handler(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse,
      );

      expect(res._getStatusCode()).toBe(400);
      const data = JSON.parse(res._getData());
      expect(data.error).toBe("VALIDATION_ERROR");
    });

    it("should reject y greater than 1", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          designId: "valid-id",
          comment: "Hello",
          x: 0.5,
          y: 2,
        },
      });

      await handler(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse,
      );

      expect(res._getStatusCode()).toBe(400);
      const data = JSON.parse(res._getData());
      expect(data.error).toBe("VALIDATION_ERROR");
    });

    it("should reject non-number coordinates", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          designId: "valid-id",
          comment: "Hello",
          x: "0.5",
          y: 0.5,
        },
      });

      await handler(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse,
      );

      expect(res._getStatusCode()).toBe(400);
      const data = JSON.parse(res._getData());
      expect(data.error).toBe("VALIDATION_ERROR");
    });

    it("should reject empty body", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {},
      });

      await handler(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse,
      );

      expect(res._getStatusCode()).toBe(400);
      const data = JSON.parse(res._getData());
      expect(data.error).toBe("VALIDATION_ERROR");
    });
  });

  // Design Not Found
  describe("Design Not Found", () => {
    it("should return 404 when design does not exist", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          designId: "non-existent-id",
          comment: "This is a test",
          x: 0.5,
          y: 0.5,
        },
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

  // Successful Creation
  describe("Successful Creation", () => {
    it("should successfully create feedback with valid data", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          designId: "valid-design-id",
          comment: "Great work!",
          x: 0.5,
          y: 0.5,
        },
      });

      await handler(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse,
      );

      expect(res._getStatusCode()).toBe(201);

      const data = JSON.parse(res._getData());
      expect(data).toHaveProperty("id");
      expect(data).toHaveProperty("comment");
      expect(data).toHaveProperty("x");
      expect(data).toHaveProperty("y");
      expect(data).toHaveProperty("createdAt");
      expect(data.id).toBe("mock-feedback-id-123");
      expect(data.comment).toBe("Great work!");
      expect(data.x).toBe(0.5);
      expect(data.y).toBe(0.5);
      expect(new Date(data.createdAt).toString()).not.toBe("Invalid Date");
    });

    it("should accept x and y at boundary values (0 and 1)", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          designId: "valid-design-id",
          comment: "Corner feedback",
          x: 0,
          y: 1,
        },
      });

      await handler(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse,
      );

      expect(res._getStatusCode()).toBe(201);
      const data = JSON.parse(res._getData());
      expect(data.x).toBe(0);
      expect(data.y).toBe(1);
    });

    it("should accept comment with exactly 500 characters", async () => {
      const longComment = "a".repeat(500);
      const { req, res } = createMocks({
        method: "POST",
        body: {
          designId: "valid-design-id",
          comment: longComment,
          x: 0.5,
          y: 0.5,
        },
      });

      await handler(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse,
      );

      expect(res._getStatusCode()).toBe(201);
      const data = JSON.parse(res._getData());
      expect(data.comment).toBe(longComment);
      expect(data.comment.length).toBe(500);
    });

    it("should trim whitespace from comment", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          designId: "valid-design-id",
          comment: "  Trimmed comment  ",
          x: 0.5,
          y: 0.5,
        },
      });

      await handler(
        req as unknown as NextApiRequest,
        res as unknown as NextApiResponse,
      );

      expect(res._getStatusCode()).toBe(201);
      const data = JSON.parse(res._getData());
      expect(data.comment).toBe("Trimmed comment");
    });
  });
});
