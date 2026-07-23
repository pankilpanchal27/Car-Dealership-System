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
        year: 2022,
        price: 1200000,
        mileage: 15000,
        fuelType: "Petrol",
        transmission: "Automatic",
        color: "White",
        status: "Available",
      },
      {
        _id: "2",
        make: "Honda",
        model: "City",
        year: 2021,
        price: 1100000,
        mileage: 20000,
        fuelType: "Petrol",
        transmission: "Manual",
        color: "Silver",
        status: "Available",
      },
    ];

    render(<VehicleList vehicles={vehicles} />);

    expect(screen.getByText(/Toyota/i)).toBeInTheDocument();
    expect(screen.getByText(/Honda/i)).toBeInTheDocument();
  });
});