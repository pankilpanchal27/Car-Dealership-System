import {
  render,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { vi } from "vitest";
import Dashboard from "./Dashboard";
import * as vehicleService from "../services/vehicleService";

vi.mock("../services/vehicleService");

describe("Dashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays vehicles from the backend", async () => {
    vi.mocked(vehicleService.getVehicles).mockResolvedValue({
      success: true,
      vehicles: [
        {
          _id: "1",
          make: "Toyota",
          model: "Corolla",
          category: "Sedan",
          price: 1200000,
          quantity: 5,
        },
      ],
    });

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Toyota/i)).toBeInTheDocument();
      expect(screen.getByText(/Corolla/i)).toBeInTheDocument();
    });
  });

  it("searches vehicles by filters", async () => {
    vi.mocked(vehicleService.getVehicles).mockResolvedValue({
      success: true,
      vehicles: [],
    });

    vi.mocked(vehicleService.searchVehicles).mockResolvedValue({
      success: true,
      vehicles: [
        {
          _id: "2",
          make: "Honda",
          model: "City",
          category: "Sedan",
          price: 1500000,
          quantity: 3,
        },
      ],
    });

    render(<Dashboard />);

    await waitFor(() => {
      expect(
        screen.getByText(/No vehicles available/i)
      ).toBeInTheDocument();
    });

    fireEvent.change(
      screen.getByPlaceholderText(/make/i),
      {
        target: {
          value: "Honda",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /search/i,
      })
    );

    await waitFor(() => {
      expect(
        vehicleService.searchVehicles
      ).toHaveBeenCalledWith({
        make: "Honda",
        model: undefined,
        category: undefined,
      });

      expect(
        screen.getByText(/Honda/i)
      ).toBeInTheDocument();

      expect(
        screen.getByText(/City/i)
      ).toBeInTheDocument();
    });
  });

  it("reloads all vehicles when search is cleared", async () => {
    vi.mocked(vehicleService.getVehicles).mockResolvedValue({
      success: true,
      vehicles: [
        {
          _id: "1",
          make: "Toyota",
          model: "Corolla",
          category: "Sedan",
          price: 1200000,
          quantity: 5,
        },
      ],
    });

    vi.mocked(vehicleService.searchVehicles).mockResolvedValue({
      success: true,
      vehicles: [
        {
          _id: "2",
          make: "Honda",
          model: "City",
          category: "Sedan",
          price: 1500000,
          quantity: 3,
        },
      ],
    });

    render(<Dashboard />);

    await waitFor(() => {
      expect(
        screen.getByText(/Toyota/i)
      ).toBeInTheDocument();
    });

    fireEvent.change(
      screen.getByPlaceholderText(/make/i),
      {
        target: {
          value: "Honda",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /search/i,
      })
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Honda/i)
      ).toBeInTheDocument();
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /clear/i,
      })
    );

    await waitFor(() => {
      expect(
        vehicleService.getVehicles
      ).toHaveBeenCalledTimes(2);

      expect(
        screen.getByText(/Toyota/i)
      ).toBeInTheDocument();
    });
  });
});