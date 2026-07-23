import { describe, expect, it, vi } from "vitest";
import api from "../api/api";
import { getVehicles } from "./vehicleService";

vi.mock("../api/api", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("Vehicle Service", () => {
  it("fetches all vehicles", async () => {
    const get = vi.mocked(api.get);

    get.mockResolvedValue({
      data: {
        success: true,
        vehicles: [],
      },
    });

    await getVehicles();

    expect(get).toHaveBeenCalledWith("/vehicles");
  });
});