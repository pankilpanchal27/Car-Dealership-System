import request from "supertest";
import app from "../../app";
import jwt from "jsonwebtoken";

describe("Authentication Middleware", () => {
  it("should allow access with a valid JWT token", async () => {
    const token = jwt.sign(
      {
        id: "123456789",
        role: "user",
      },
      process.env.JWT_SECRET as string
    );

    const response = await request(app)
      .get("/api/protected")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);
  });
});