import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import AddVehicleModal from "./AddVehicleModal";

describe("AddVehicleModal", () => {
  it("does not render when isOpen is false", () => {
    render(
      <AddVehicleModal
        isOpen={false}
        onClose={vi.fn()}
        onSave={vi.fn().mockResolvedValue(undefined)}
      />
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders when isOpen is true", () => {
    render(
      <AddVehicleModal
        isOpen={true}
        onClose={vi.fn()}
        onSave={vi.fn().mockResolvedValue(undefined)}
      />
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Add New Vehicle")).toBeInTheDocument();
  });

  it("calls onSave with input data on submit", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    render(
      <AddVehicleModal
        isOpen={true}
        onClose={vi.fn()}
        onSave={onSave}
      />
    );

    fireEvent.change(screen.getByLabelText(/make/i), { target: { value: "Toyota" } });
    fireEvent.change(screen.getByLabelText(/model/i), { target: { value: "Camry" } });
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: "Sedan" } });
    fireEvent.change(screen.getByLabelText(/price/i), { target: { value: "3000000" } });
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: "10" } });
    fireEvent.change(screen.getByLabelText(/image url/i), { target: { value: "https://example.com/car.jpg" } });

    fireEvent.click(screen.getByRole("button", { name: /add vehicle/i }));

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith({
        make: "Toyota",
        model: "Camry",
        category: "Sedan",
        price: 3000000,
        quantity: 10,
        imageUrl: "https://example.com/car.jpg",
      });
    });
  });

  it("calls onClose when Cancel is clicked", () => {
    const onClose = vi.fn();
    render(
      <AddVehicleModal
        isOpen={true}
        onClose={onClose}
        onSave={vi.fn()}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
