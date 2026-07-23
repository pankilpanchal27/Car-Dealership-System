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
        category: "Sedan",
        price: 1200000,
        quantity: 5,
      }}
      />
    );

    expect(screen.getByText(/Toyota/i)).toBeInTheDocument();
    expect(screen.getByText(/Corolla/i)).toBeInTheDocument();
    expect(screen.getByText(/Sedan/i)).toBeInTheDocument();
  expect(screen.getByText(/5/i)).toBeInTheDocument();
  });
});