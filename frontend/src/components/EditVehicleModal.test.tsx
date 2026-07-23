import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import EditVehicleModal from "./EditVehicleModal";

const mockVehicle = {
  _id: "1",
  make: "Toyota",
  model: "Fortuner",
  category: "SUV",
  price: 4500000,
  quantity: 10,
};

describe("EditVehicleModal", () => {
  it("does not render when isOpen is false", () => {
    render(
      <EditVehicleModal isOpen={false} vehicle={mockVehicle} onClose={vi.fn()} onSave={vi.fn()} />
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("pre-fills form with vehicle data when open", () => {
    render(
      <EditVehicleModal isOpen={true} vehicle={mockVehicle} onClose={vi.fn()} onSave={vi.fn()} />
    );

    expect((screen.getByLabelText(/make/i) as HTMLInputElement).value).toBe("Toyota");
    expect((screen.getByLabelText(/model/i) as HTMLInputElement).value).toBe("Fortuner");
    expect((screen.getByLabelText(/price/i) as HTMLInputElement).value).toBe("4500000");
  });

  it("calls onSave with updated data on submit", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    render(
      <EditVehicleModal isOpen={true} vehicle={mockVehicle} onClose={vi.fn()} onSave={onSave} />
    );

    fireEvent.change(screen.getByLabelText(/price/i), { target: { value: "5000000" } });
    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith(
        expect.objectContaining({ price: 5000000 })
      );
    });
  });

  it("calls onClose when Cancel is clicked", () => {
    const onClose = vi.fn();
    render(
      <EditVehicleModal isOpen={true} vehicle={mockVehicle} onClose={onClose} onSave={vi.fn()} />
    );

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
