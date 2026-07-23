import request from "supertest";
import app from "../../app";
import User from "../../models/User";
import bcrypt from "bcrypt";

describe("POST /api/auth/login", () => {
  beforeEach(async () => {
    const hashedPassword = await bcrypt.hash("password123", 10);

    await User.create({
      name: "Pankil",
      email: "pankil@example.com",
      password: hashedPassword,
    });
  });

  it("should login successfully with valid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "pankil@example.com",
        password: "password123",
      });

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body).toHaveProperty("token");

    expect(response.body.user.email).toBe("pankil@example.com");

    expect(response.body.user.role).toBeDefined();
  });

  it("should return 401 with invalid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "pankil@example.com",
        password: "wrongpassword",
      });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Invalid email or password");
  });

  it("should return 401 when email does not exist", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "noone@example.com",
        password: "password123",
      });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Invalid email or password");
  });
});