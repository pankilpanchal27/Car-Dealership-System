import request from "supertest";
import app from "../../app";
import Vehicle from "../../models/Vehicle";

describe("GET /api/vehicles/search", () => {
  beforeEach(async () => {
    await Vehicle.create([
      { make: "Toyota", model: "Fortuner", category: "SUV", price: 4500000, quantity: 10 },
      { make: "Honda", model: "City", category: "Sedan", price: 1200000, quantity: 5 },
      { make: "BMW", model: "X5", category: "SUV", price: 8000000, quantity: 3 },
    ]);
  });

  it("should return vehicles matching the search query by make", async () => {
    const response = await request(app).get(
      "/api/vehicles/search?make=Toyota"
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.vehicles)).toBe(true);
    expect(response.body.vehicles.length).toBe(1);
    expect(response.body.vehicles[0].make).toBe("Toyota");
  });

  it("should return vehicles filtered by minPrice", async () => {
    const response = await request(app).get(
      "/api/vehicles/search?minPrice=4000000"
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.vehicles.length).toBe(2);
    response.body.vehicles.forEach((v: { price: number }) => {
      expect(v.price).toBeGreaterThanOrEqual(4000000);
    });
  });

  it("should return vehicles filtered by maxPrice", async () => {
    const response = await request(app).get(
      "/api/vehicles/search?maxPrice=2000000"
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.vehicles.length).toBe(1);
    expect(response.body.vehicles[0].model).toBe("City");
  });

  it("should return vehicles filtered by price range", async () => {
    const response = await request(app).get(
      "/api/vehicles/search?minPrice=1000000&maxPrice=5000000"
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.vehicles.length).toBe(2);
  });
});