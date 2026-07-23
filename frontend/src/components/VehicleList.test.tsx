import { render, screen } from "@testing-library/react";
import VehicleList from "./VehicleList";
import type { Vehicle } from "../services/vehicleService";

describe("VehicleList", () => {
  it("renders multiple vehicle cards", () => {
    const vehicles: Vehicle[] = [
      {
        _id: "1",
        make: "Toyota",
        model: "Corolla",
        category: "Sedan",
        price: 1200000,
        quantity: 5,
      },
      {
        _id: "2",
        make: "Honda",
        model: "City",
        category: "Sedan",
        price: 1100000,
        quantity: 8,
      },
    ];

    render(<VehicleList vehicles={vehicles} />);

    expect(screen.getByText(/Toyota/i)).toBeInTheDocument();
    expect(screen.getByText(/Honda/i)).toBeInTheDocument();
  });
});