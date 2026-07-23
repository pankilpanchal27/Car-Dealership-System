import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import AddVehicleModal from "./AddVehicleModal";

describe("AddVehicleModal", () => {
  it("does not render when isOpen is false", () => {
    render(
      <AddVehicleModal isOpen={false} onClose={vi.fn()} onAdd={vi.fn()} />
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders the form when isOpen is true", () => {
    render(
      <AddVehicleModal isOpen={true} onClose={vi.fn()} onAdd={vi.fn()} />
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByLabelText(/make/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/model/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/quantity/i)).toBeInTheDocument();
  });

  it("calls onAdd with form data when submitted", async () => {
    const onAdd = vi.fn().mockResolvedValue(undefined);
    render(
      <AddVehicleModal isOpen={true} onClose={vi.fn()} onAdd={onAdd} />
    );

    fireEvent.change(screen.getByLabelText(/make/i), { target: { value: "Toyota" } });
    fireEvent.change(screen.getByLabelText(/model/i), { target: { value: "Fortuner" } });
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: "SUV" } });
    fireEvent.change(screen.getByLabelText(/price/i), { target: { value: "4500000" } });
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: "10" } });

    fireEvent.click(screen.getByRole("button", { name: /add vehicle/i }));

    await waitFor(() => {
      expect(onAdd).toHaveBeenCalledWith({
        make: "Toyota",
        model: "Fortuner",
        category: "SUV",
        price: 4500000,
        quantity: 10,
      });
    });
  });

  it("calls onClose when Cancel is clicked", () => {
    const onClose = vi.fn();
    render(
      <AddVehicleModal isOpen={true} onClose={onClose} onAdd={vi.fn()} />
    );

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
