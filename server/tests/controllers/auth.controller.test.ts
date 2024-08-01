// routes.test.ts
import request from "supertest";
import { NextFunction, Request, Response } from "express";
import express, { Express } from "express";
import authRouter from "../../src//routes/auth.routes";

const app: Express = express();
app.use("/api/v1/auth", authRouter);

jest.mock("../../src/utils/token.util", () => ({
  generateTokens: jest.fn(() => ({
    accessToken: "fakeAccessToken",
    refreshToken: "fakeRefreshToken",
  })),
  saveRefreshToken: jest.fn(),
  removeRefreshToken: jest.fn(),
  findRefreshToken: jest.fn(),
}));

describe("Auth Routes", () => {
  describe("GET /auth/google/callback", () => {
    it("should handle Google callback and generate tokens", async () => {
      const fakeUser = { id: "123", name: "Test User" };

      // Mocking req.user
      app.use((req: Request, res: Response, next: NextFunction) => {
        req.user = fakeUser;
        next();
      });

      const response = await request(app).get("/api/v1/auth/google/callback");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token", "fakeAccessToken");
    });
  });

  describe("POST /auth/local/callback", () => {
    it("should handle local login callback and generate tokens", async () => {
      const fakeUser = { id: "123", name: "Test User" };

      // Mocking req.user
      app.use((req: Request, res: Response, next: NextFunction) => {
        req.user = fakeUser;
        next();
      });

      const response = await request(app).post("/api/v1/auth/local/callback");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token", "fakeAccessToken");
    });
  });

  describe("POST /auth/register", () => {
    it("should register a new user and return success message", async () => {
      const response = await request(app).post("/api/v1/auth/register").send({
        username: "testuser",
        firstname: "Test",
        lastname: "User",
        email: "test@example.com",
        password: "password123",
        avatarUrl: "http://example.com/avatar.jpg",
      });

      expect(response.status).toBe(200);
      expect(response.text).toBe("successfully login");
    });

    it("should return 500 if there is an error registering a new user", async () => {
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({});

      expect(response.status).toBe(500);
      expect(response.text).toBe("Error registering new user.");
    });
  });

  describe("POST /auth/logout", () => {
    it("should logout a user and redirect to home page", async () => {
      const response = await request(app).post("/api/v1/auth/logout");

      expect(response.status).toBe(302);
      expect(response.headers.location).toBe("/");
    });
  });
});
