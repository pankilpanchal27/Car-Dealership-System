import request from "supertest";
import app from "../../app";
import jwt from "jsonwebtoken";

describe("POST /api/vehicles", () => {
  it("should create a new vehicle", async () => {
    const token = jwt.sign(
      {
        id: "123456789",
        role: "admin",
      },
      process.env.JWT_SECRET as string
    );

    const response = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        make: "Toyota",
        model: "Fortuner",
        category: "SUV",
        price: 4500000,
        quantity: 10,
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.vehicle.make).toBe("Toyota");
    expect(response.body.vehicle.model).toBe("Fortuner");
  });
});