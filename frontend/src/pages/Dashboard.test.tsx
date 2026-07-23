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

// Minimal auth context wrapper so Dashboard can read user role
import { AuthContext } from "../context/AuthContext";

function renderWithAuth(
  ui: React.ReactElement,
  role: "user" | "admin" = "user"
) {
  return render(
    <AuthContext.Provider
      value={{
        token: "tok",
        user: { id: "1", role, name: role === "admin" ? "Admin User" : "Test User" },
        isAuthenticated: true,
        login: vi.fn(),
        logout: vi.fn(),
      }}
    >
      {ui}
    </AuthContext.Provider>
  );
}

const mockVehicles = [
  { _id: "1", make: "Toyota", model: "Corolla", category: "Sedan", price: 1200000, quantity: 5 },
];

describe("Dashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays vehicles from the backend", async () => {
    vi.mocked(vehicleService.getVehicles).mockResolvedValue({
      success: true,
      vehicles: mockVehicles,
    });

    renderWithAuth(<Dashboard />);

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
        { _id: "2", make: "Honda", model: "City", category: "Sedan", price: 1500000, quantity: 3 },
      ],
    });

    renderWithAuth(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/No vehicles found/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/e.g. Toyota/i), { target: { value: "Honda" } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(vehicleService.searchVehicles).toHaveBeenCalledWith({
        make: "Honda", model: undefined, category: undefined, minPrice: undefined, maxPrice: undefined,
      });
      expect(screen.getByText(/Honda/i)).toBeInTheDocument();
      expect(screen.getByText(/City/i)).toBeInTheDocument();
    });
  });

  it("reloads all vehicles when search is cleared", async () => {
    vi.mocked(vehicleService.getVehicles).mockResolvedValue({
      success: true,
      vehicles: mockVehicles,
    });
    vi.mocked(vehicleService.searchVehicles).mockResolvedValue({
      success: true,
      vehicles: [
        { _id: "2", make: "Honda", model: "City", category: "Sedan", price: 1500000, quantity: 3 },
      ],
    });

    renderWithAuth(<Dashboard />);

    await waitFor(() => expect(screen.getByText(/Toyota/i)).toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText(/e.g. Toyota/i), { target: { value: "Honda" } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => expect(screen.getByText(/Honda/i)).toBeInTheDocument());

    fireEvent.click(screen.getByRole("button", { name: /clear/i }));

    await waitFor(() => {
      expect(vehicleService.getVehicles).toHaveBeenCalledTimes(2);
      expect(screen.getByText(/Toyota/i)).toBeInTheDocument();
    });
  });

  it("calls purchaseVehicle when Purchase is clicked and refreshes the list", async () => {
    vi.mocked(vehicleService.getVehicles).mockResolvedValue({
      success: true,
      vehicles: mockVehicles,
    });
    vi.mocked(vehicleService.purchaseVehicle).mockResolvedValue({
      success: true,
      vehicle: { ...mockVehicles[0], quantity: 4 },
    });

    renderWithAuth(<Dashboard />);

    await waitFor(() => expect(screen.getByRole("button", { name: /purchase/i })).toBeInTheDocument());

    fireEvent.click(screen.getByRole("button", { name: /purchase/i }));

    await waitFor(() => {
      expect(vehicleService.purchaseVehicle).toHaveBeenCalledWith("1", 1);
      expect(vehicleService.getVehicles).toHaveBeenCalledTimes(2);
    });
  });

  it("shows Add Vehicle button for admin users", async () => {
    vi.mocked(vehicleService.getVehicles).mockResolvedValue({ success: true, vehicles: [] });

    renderWithAuth(<Dashboard />, "admin");

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /add vehicle/i })).toBeInTheDocument();
    });
  });

  it("does not show Add Vehicle button for regular users", async () => {
    vi.mocked(vehicleService.getVehicles).mockResolvedValue({ success: true, vehicles: [] });

    renderWithAuth(<Dashboard />, "user");

    await waitFor(() => {
      expect(screen.queryByRole("button", { name: /add vehicle/i })).not.toBeInTheDocument();
    });
  });
});