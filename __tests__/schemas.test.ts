import { CreateFeedbackSchema, validateFeedback } from "@/lib/schemas";

describe("CreateFeedbackSchema", () => {
  describe("Valid Data", () => {
    it("should accept valid feedback data", () => {
      const validData = {
        designId: "abc123",
        comment: "This looks great!",
        x: 0.5,
        y: 0.5,
      };

      const result = CreateFeedbackSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should accept x and y at boundaries (0 and 1)", () => {
      const validData = {
        designId: "abc123",
        comment: "Corner feedback",
        x: 0,
        y: 1,
      };

      const result = CreateFeedbackSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should accept comment with exactly 500 characters", () => {
      const validData = {
        designId: "abc123",
        comment: "a".repeat(500),
        x: 0.5,
        y: 0.5,
      };

      const result = CreateFeedbackSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should trim whitespace from designId and comment", () => {
      const data = {
        designId: "  abc123  ",
        comment: "  Nice work!  ",
        x: 0.5,
        y: 0.5,
      };

      const result = CreateFeedbackSchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.designId).toBe("abc123");
        expect(result.data.comment).toBe("Nice work!");
      }
    });
  });

  describe("Invalid designId", () => {
    it("should reject empty designId", () => {
      const data = {
        designId: "",
        comment: "Hello",
        x: 0.5,
        y: 0.5,
      };

      const result = CreateFeedbackSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject missing designId", () => {
      const data = {
        comment: "Hello",
        x: 0.5,
        y: 0.5,
      };

      const result = CreateFeedbackSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject non-string designId", () => {
      const data = {
        designId: 123,
        comment: "Hello",
        x: 0.5,
        y: 0.5,
      };

      const result = CreateFeedbackSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe("Invalid comment", () => {
    it("should reject empty comment", () => {
      const data = {
        designId: "abc123",
        comment: "",
        x: 0.5,
        y: 0.5,
      };

      const result = CreateFeedbackSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject comment longer than 500 characters", () => {
      const data = {
        designId: "abc123",
        comment: "a".repeat(501),
        x: 0.5,
        y: 0.5,
      };

      const result = CreateFeedbackSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe("Invalid coordinates", () => {
    it("should reject x less than 0", () => {
      const data = {
        designId: "abc123",
        comment: "Hello",
        x: -0.1,
        y: 0.5,
      };

      const result = CreateFeedbackSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject x greater than 1", () => {
      const data = {
        designId: "abc123",
        comment: "Hello",
        x: 1.1,
        y: 0.5,
      };

      const result = CreateFeedbackSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject y less than 0", () => {
      const data = {
        designId: "abc123",
        comment: "Hello",
        x: 0.5,
        y: -0.5,
      };

      const result = CreateFeedbackSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject y greater than 1", () => {
      const data = {
        designId: "abc123",
        comment: "Hello",
        x: 0.5,
        y: 2,
      };

      const result = CreateFeedbackSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject non-number coordinates", () => {
      const data = {
        designId: "abc123",
        comment: "Hello",
        x: "0.5",
        y: 0.5,
      };

      const result = CreateFeedbackSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });
});

describe("validateFeedback helper", () => {
  it("should return success with valid data", () => {
    const data = {
      designId: "abc123",
      comment: "Hello",
      x: 0.5,
      y: 0.5,
    };

    const result = validateFeedback(data);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.designId).toBe("abc123");
    }
  });

  it("should return errors array with invalid data", () => {
    const data = {
      designId: "",
      comment: "",
      x: 2,
      y: -1,
    };

    const result = validateFeedback(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.length).toBeGreaterThan(0);
      expect(Array.isArray(result.errors)).toBe(true);
    }
  });

  it("should handle null input", () => {
    const result = validateFeedback(null);
    expect(result.success).toBe(false);
  });

  it("should handle undefined input", () => {
    const result = validateFeedback(undefined);
    expect(result.success).toBe(false);
  });
});
