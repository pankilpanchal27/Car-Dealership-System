import request from "supertest";
import app from "../../app";
import jwt from "jsonwebtoken";
import Vehicle from "../../models/Vehicle";

describe("DELETE /api/vehicles/:id", () => {
  it("should delete an existing vehicle", async () => {
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
      .delete(`/api/vehicles/${vehicle._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Vehicle deleted successfully");

    const deletedVehicle = await Vehicle.findById(vehicle._id);
    expect(deletedVehicle).toBeNull();
  });
});