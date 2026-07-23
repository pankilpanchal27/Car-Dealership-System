import { useState, useEffect } from "react";
import type { Vehicle } from "../services/vehicleService";

interface EditVehicleModalProps {
  isOpen: boolean;
  vehicle: Vehicle;
  onClose: () => void;
  onSave: (data: Partial<Vehicle>) => Promise<void>;
}

/**
 * EditVehicleModal — admin-only modal that pre-fills with current vehicle data
 * and calls onSave with the updated fields on submission.
 */
export default function EditVehicleModal({
  isOpen,
  vehicle,
  onClose,
  onSave,
}: EditVehicleModalProps) {
  const [make, setMake] = useState(vehicle.make);
  const [model, setModel] = useState(vehicle.model);
  const [category, setCategory] = useState(vehicle.category);
  const [price, setPrice] = useState(String(vehicle.price));
  const [quantity, setQuantity] = useState(String(vehicle.quantity));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Re-populate fields whenever the selected vehicle changes
  useEffect(() => {
    setMake(vehicle.make);
    setModel(vehicle.model);
    setCategory(vehicle.category);
    setPrice(String(vehicle.price));
    setQuantity(String(vehicle.quantity));
    setError("");
  }, [vehicle]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onSave({
        make,
        model,
        category,
        price: Number(price),
        quantity: Number(quantity),
      });
      onClose();
    } catch {
      setError("Failed to save changes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-vehicle-title"
        className="w-full max-w-md rounded-sm border border-gray-200 bg-white p-8 shadow-xl"
      >
        <h2
          id="edit-vehicle-title"
          className="mb-6 text-2xl font-heading text-navy"
        >
          Edit Vehicle
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="edit-make" className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              Make
            </label>
            <input
              id="edit-make"
              aria-label="Make"
              type="text"
              required
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="input-minimal rounded-sm px-4 py-2.5"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="edit-model" className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              Model
            </label>
            <input
              id="edit-model"
              aria-label="Model"
              type="text"
              required
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="input-minimal rounded-sm px-4 py-2.5"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="edit-category" className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              Category
            </label>
            <input
              id="edit-category"
              aria-label="Category"
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-minimal rounded-sm px-4 py-2.5"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="edit-price" className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              Price (₹)
            </label>
            <input
              id="edit-price"
              aria-label="Price"
              type="number"
              required
              min={0}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input-minimal rounded-sm px-4 py-2.5"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="edit-quantity" className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              Quantity
            </label>
            <input
              id="edit-quantity"
              aria-label="Quantity"
              type="number"
              required
              min={0}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="input-minimal rounded-sm px-4 py-2.5"
            />
          </div>

          {error && (
            <p className="text-sm font-medium text-red-600 bg-red-50 p-2 rounded">{error}</p>
          )}

          <div className="mt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-sm border border-gray-200 bg-gray-50 py-2.5 text-xs font-bold uppercase tracking-widest text-navy transition hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-sm bg-gold py-2.5 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-gold-hover disabled:opacity-50"
            >
              {loading ? "SAVING…" : "SAVE CHANGES"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
