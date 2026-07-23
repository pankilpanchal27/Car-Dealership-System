import { render, screen } from "@testing-library/react";
import VehicleCard from "./VehicleCard";

describe("VehicleCard", () => {
  it("displays vehicle information", () => {
    render(
      <VehicleCard
        vehicle={{
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
        }}
      />
    );

    expect(screen.getByText(/Toyota/i)).toBeInTheDocument();
    expect(screen.getByText(/Corolla/i)).toBeInTheDocument();
    expect(screen.getByText(/2022/i)).toBeInTheDocument();
  });
});