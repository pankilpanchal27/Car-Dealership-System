import request from "supertest";
import app from "../app";

describe("Health Check", () => {
  it("should return API running message", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      success: true,
      message: "Car Dealership Inventory API is running 🚗",
    });
  });
});