import request from "supertest";
import app from "../../app";

describe("GET /api/vehicles", () => {
  it("should return all vehicles", async () => {
    const response = await request(app).get("/api/vehicles");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.vehicles)).toBe(true);
  });
});