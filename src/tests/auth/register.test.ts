import request from "supertest";
import app from "../../app";

describe("POST /api/auth/register", () => {
  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Pankil",
        email: "pankil@example.com",
        password: "password123",
      });

    expect(response.status).toBe(201);

    expect(response.body.success).toBe(true);

    expect(response.body.user).toHaveProperty("_id");

    expect(response.body.user.email).toBe("pankil@example.com");

    expect(response.body.user).not.toHaveProperty("password");
  });
});
it("should not register a user with an existing email", async () => {
  const user = {
    name: "Pankil",
    email: "pankil@example.com",
    password: "password123",
  };

  await request(app).post("/api/auth/register").send(user);

  const response = await request(app).post("/api/auth/register").send(user);

  expect(response.status).toBe(409);

  expect(response.body.success).toBe(false);

  expect(response.body.message).toBe("Email already exists");
});
it("should not register a user with an existing email", async () => {
  const user = {
    name: "Pankil",
    email: "pankil@example.com",
    password: "password123",
  };

  await request(app)
    .post("/api/auth/register")
    .send(user);

  const response = await request(app)
    .post("/api/auth/register")
    .send(user);

  expect(response.status).toBe(409);
  expect(response.body.success).toBe(false);
  expect(response.body.message).toBe("Email already exists");
});