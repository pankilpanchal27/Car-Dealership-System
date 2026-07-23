import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import VehicleList from "./VehicleList";
import type { Vehicle } from "../services/vehicleService";

const vehicles: Vehicle[] = [
  { _id: "1", make: "Toyota", model: "Corolla", category: "Sedan", price: 1200000, quantity: 5 },
  { _id: "2", make: "Honda", model: "City", category: "Sedan", price: 1100000, quantity: 8 },
];

describe("VehicleList", () => {
  it("renders multiple vehicle cards", () => {
    render(
      <VehicleList
        vehicles={vehicles}
        isAdmin={false}
        onPurchase={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText(/Toyota/i)).toBeInTheDocument();
    expect(screen.getByText(/Honda/i)).toBeInTheDocument();
  });

  it("shows admin controls on cards when isAdmin is true", () => {
    render(
      <VehicleList
        vehicles={vehicles}
        isAdmin={true}
        onPurchase={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    // Two admin edit buttons (one per card)
    const editBtns = screen.getAllByRole("button", { name: /edit/i });
    expect(editBtns.length).toBe(2);
  });
});