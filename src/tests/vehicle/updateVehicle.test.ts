import request from "supertest";
import app from "../../app";
import jwt from "jsonwebtoken";
import Vehicle from "../../models/Vehicle";

describe("PUT /api/vehicles/:id", () => {
  it("should update an existing vehicle", async () => {
    const vehicle = await Vehicle.create({
      make: "Toyota",
      model: "Fortuner",
      category: "SUV",
      price: 4500000,
      quantity: 10,
    });

    const token = jwt.sign(
      {
        id: "123456789",
        role: "admin",
      },
      process.env.JWT_SECRET as string
    );

    const response = await request(app)
      .put(`/api/vehicles/${vehicle._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        price: 4700000,
        quantity: 15,
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.vehicle.price).toBe(4700000);
    expect(response.body.vehicle.quantity).toBe(15);
  });
});