import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import VehicleCard from "./VehicleCard";

const baseVehicle = {
  _id: "1",
  make: "Toyota",
  model: "Fortuner",
  category: "SUV",
  price: 4500000,
  quantity: 5,
};

describe("VehicleCard", () => {
  it("renders vehicle details", () => {
    render(
      <VehicleCard
        vehicle={baseVehicle}
        isAdmin={false}
        onPurchase={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText(/Toyota/i)).toBeInTheDocument();
    expect(screen.getByText(/Fortuner/i)).toBeInTheDocument();
    expect(screen.getByText(/SUV/i)).toBeInTheDocument();
  });

  it("renders an enabled Purchase button when quantity > 0", () => {
    render(
      <VehicleCard
        vehicle={{ ...baseVehicle, quantity: 5 }}
        isAdmin={false}
        onPurchase={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    const btn = screen.getByRole("button", { name: /purchase/i });
    expect(btn).toBeInTheDocument();
    expect(btn).not.toBeDisabled();
  });

  it("renders a disabled Purchase button when quantity is 0", () => {
    render(
      <VehicleCard
        vehicle={{ ...baseVehicle, quantity: 0 }}
        isAdmin={false}
        onPurchase={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    const btn = screen.getByRole("button", { name: /purchase/i });
    expect(btn).toBeDisabled();
  });

  it("shows Edit and Delete buttons for admin users", () => {
    render(
      <VehicleCard
        vehicle={baseVehicle}
        isAdmin={true}
        onPurchase={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("hides Edit and Delete buttons for regular users", () => {
    render(
      <VehicleCard
        vehicle={baseVehicle}
        isAdmin={false}
        onPurchase={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.queryByRole("button", { name: /edit/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /delete/i })).not.toBeInTheDocument();
  });
});