describe("Backend Services Setup", () => {
  // ─── Firebase Tests ───
  describe("Firebase Admin", () => {
    it("should have all required env variables", () => {
      expect(process.env.FIREBASE_PROJECT_ID).toBeDefined();
      expect(process.env.FIREBASE_CLIENT_EMAIL).toBeDefined();
      expect(process.env.FIREBASE_PRIVATE_KEY).toBeDefined();
    });

    it("should have valid project ID format", () => {
      const projectId = process.env.FIREBASE_PROJECT_ID;
      expect(projectId).toMatch(/^[a-z0-9-]+$/);
    });

    it("should have valid client email format", () => {
      const email = process.env.FIREBASE_CLIENT_EMAIL;
      expect(email).toContain("@");
      expect(email).toContain(".iam.gserviceaccount.com");
    });
  });

  // ─── Cloudinary Tests ───
  describe("Cloudinary", () => {
    it("should have all required env variables", () => {
      expect(process.env.CLOUDINARY_CLOUD_NAME).toBeDefined();
      expect(process.env.CLOUDINARY_API_KEY).toBeDefined();
      expect(process.env.CLOUDINARY_API_SECRET).toBeDefined();
    });

    it("should have valid cloud name", () => {
      const name = process.env.CLOUDINARY_CLOUD_NAME;
      expect(name).toBeTruthy();
      expect(name!.length).toBeGreaterThan(0);
    });

    it("should have numeric API key", () => {
      const key = process.env.CLOUDINARY_API_KEY;
      expect(key).toMatch(/^\d+$/);
    });
  });
});
