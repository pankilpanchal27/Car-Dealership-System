import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Dashboard from "./Dashboard";
import * as vehicleService from "../services/vehicleService";

vi.mock("../services/vehicleService");

describe("Dashboard", () => {
  it("displays vehicles from the backend", async () => {
    vi.mocked(vehicleService.getVehicles).mockResolvedValue({
      success: true,
      vehicles: [
        {
          _id: "1",
          make: "Toyota",
          model: "Corolla",
          year: 2022,
          price: 1200000,
          mileage: 15000,
          fuelType: "Petrol",
          transmission: "Automatic",
          color: "White",
          status: "Available",
        },
      ],
    });

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Toyota/i)).toBeInTheDocument();
      expect(screen.getByText(/Corolla/i)).toBeInTheDocument();
    });
  });
});