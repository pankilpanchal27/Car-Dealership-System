import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import EditVehicleModal from "./EditVehicleModal";

const baseVehicle = {
  _id: "1",
  make: "Toyota",
  model: "Fortuner",
  category: "SUV",
  price: 4500000,
  quantity: 5,
};

describe("EditVehicleModal", () => {
  it("does not render when isOpen is false", () => {
    render(
      <EditVehicleModal
        isOpen={false}
        vehicle={baseVehicle}
        onClose={vi.fn()}
        onSave={vi.fn()}
      />
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders the modal when isOpen is true", () => {
    render(
      <EditVehicleModal
        isOpen={true}
        vehicle={baseVehicle}
        onClose={vi.fn()}
        onSave={vi.fn()}
      />
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("pre-fills all fields with the vehicle data", () => {
    render(
      <EditVehicleModal
        isOpen={true}
        vehicle={baseVehicle}
        onClose={vi.fn()}
        onSave={vi.fn()}
      />
    );
    expect(screen.getByDisplayValue("Toyota")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Fortuner")).toBeInTheDocument();
    expect(screen.getByDisplayValue("SUV")).toBeInTheDocument();
    expect(screen.getByDisplayValue("4500000")).toBeInTheDocument();
    expect(screen.getByDisplayValue("5")).toBeInTheDocument();
  });

  it("calls onClose when the Cancel button is clicked", () => {
    const onClose = vi.fn();
    render(
      <EditVehicleModal
        isOpen={true}
        vehicle={baseVehicle}
        onClose={onClose}
        onSave={vi.fn()}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when clicking the backdrop", () => {
    const onClose = vi.fn();
    render(
      <EditVehicleModal
        isOpen={true}
        vehicle={baseVehicle}
        onClose={onClose}
        onSave={vi.fn()}
      />
    );
    fireEvent.click(screen.getByTestId("modal-backdrop"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape key is pressed", () => {
    const onClose = vi.fn();
    render(
      <EditVehicleModal
        isOpen={true}
        vehicle={baseVehicle}
        onClose={onClose}
        onSave={vi.fn()}
      />
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onSave with updated data on submit", async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    render(
      <EditVehicleModal
        isOpen={true}
        vehicle={baseVehicle}
        onClose={vi.fn()}
        onSave={onSave}
      />
    );
    fireEvent.change(screen.getByDisplayValue("Toyota"), {
      target: { value: "Honda" },
    });
    fireEvent.click(screen.getByRole("button", { name: /save/i }));
    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith(
        expect.objectContaining({ make: "Honda" })
      );
    });
  });

  it("shows an error message when onSave rejects", async () => {
    const onSave = vi.fn().mockRejectedValue(new Error("Network error"));
    render(
      <EditVehicleModal
        isOpen={true}
        vehicle={baseVehicle}
        onClose={vi.fn()}
        onSave={onSave}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /save/i }));
    await waitFor(() => {
      expect(
        screen.getByText(/failed to save changes/i)
      ).toBeInTheDocument();
    });
  });
});
