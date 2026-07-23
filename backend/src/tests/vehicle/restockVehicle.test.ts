import request from "supertest";
import app from "../../app";
import jwt from "jsonwebtoken";
import Vehicle from "../../models/Vehicle";

describe("POST /api/vehicles/:id/restock", () => {
  it("should restock a vehicle and increase its quantity", async () => {
    const vehicle = await Vehicle.create({
      make: "Toyota",
      model: "Fortuner",
      category: "SUV",
      price: 4500000,
      quantity: 5,
    });

    const token = jwt.sign(
      {
        id: "123456789",
        role: "admin",
      },
      process.env.JWT_SECRET as string
    );

    const response = await request(app)
      .post(`/api/vehicles/${vehicle._id}/restock`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        quantity: 10,
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.vehicle.quantity).toBe(15);
  });
});