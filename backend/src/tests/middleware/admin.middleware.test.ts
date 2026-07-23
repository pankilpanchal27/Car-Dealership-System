import request from "supertest";
import app from "../../app";
import jwt from "jsonwebtoken";
import Vehicle from "../../models/Vehicle";

describe("authorizeAdmin middleware", () => {
  it("should be defined", () => {
    const { authorizeAdmin } = require("../../middleware/admin.middleware");
    expect(authorizeAdmin).toBeDefined();
  });

  it("should block a non-admin user from deleting a vehicle (403)", async () => {
    const vehicle = await Vehicle.create({
      make: "Toyota",
      model: "Fortuner",
      category: "SUV",
      price: 4500000,
      quantity: 10,
    });

    // Sign a token with role "user" (not admin)
    const token = jwt.sign(
      { id: "user123", role: "user" },
      process.env.JWT_SECRET as string
    );

    const response = await request(app)
      .delete(`/api/vehicles/${vehicle._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Admin access required");
  });

  it("should allow an admin user to delete a vehicle (200)", async () => {
    const vehicle = await Vehicle.create({
      make: "Honda",
      model: "City",
      category: "Sedan",
      price: 1200000,
      quantity: 5,
    });

    // Sign a token with role "admin"
    const token = jwt.sign(
      { id: "admin123", role: "admin" },
      process.env.JWT_SECRET as string
    );

    const response = await request(app)
      .delete(`/api/vehicles/${vehicle._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should block restock for non-admin user (403)", async () => {
    const vehicle = await Vehicle.create({
      make: "BMW",
      model: "X5",
      category: "SUV",
      price: 8000000,
      quantity: 3,
    });

    const token = jwt.sign(
      { id: "user456", role: "user" },
      process.env.JWT_SECRET as string
    );

    const response = await request(app)
      .post(`/api/vehicles/${vehicle._id}/restock`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 5 });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Admin access required");
  });
});