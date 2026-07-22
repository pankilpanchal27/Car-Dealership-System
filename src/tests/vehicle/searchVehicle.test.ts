import request from "supertest";
import app from "../../app";

describe("GET /api/vehicles/search", () => {
  it("should return vehicles matching the search query", async () => {
    const response = await request(app).get(
      "/api/vehicles/search?make=Toyota"
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.vehicles)).toBe(true);
  });
});