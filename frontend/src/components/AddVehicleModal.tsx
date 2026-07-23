import { useState } from "react";
import type { Vehicle } from "../services/vehicleService";

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: Omit<Vehicle, "_id" | "createdAt" | "updatedAt">) => Promise<void>;
}

/**
 * AddVehicleModal — admin-only modal form to add a new vehicle to inventory.
 */
export default function AddVehicleModal({
  isOpen,
  onClose,
  onAdd,
}: AddVehicleModalProps) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onAdd({
        make,
        model,
        category,
        price: Number(price),
        quantity: Number(quantity),
      });
      // Reset form on success
      setMake(""); setModel(""); setCategory(""); setPrice(""); setQuantity("");
      onClose();
    } catch {
      setError("Failed to add vehicle. Please try again.");
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
        aria-labelledby="add-vehicle-title"
        className="w-full max-w-md rounded-2xl border border-white/10 bg-gray-900 p-8 shadow-2xl"
      >
        <h2
          id="add-vehicle-title"
          className="mb-6 text-2xl font-bold text-white"
        >
          Add New Vehicle
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="add-make" className="text-sm font-medium text-gray-400">
              Make
            </label>
            <input
              id="add-make"
              aria-label="Make"
              type="text"
              required
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
              placeholder="e.g. Toyota"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="add-model" className="text-sm font-medium text-gray-400">
              Model
            </label>
            <input
              id="add-model"
              aria-label="Model"
              type="text"
              required
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
              placeholder="e.g. Fortuner"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="add-category" className="text-sm font-medium text-gray-400">
              Category
            </label>
            <input
              id="add-category"
              aria-label="Category"
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
              placeholder="e.g. SUV"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="add-price" className="text-sm font-medium text-gray-400">
              Price (₹)
            </label>
            <input
              id="add-price"
              aria-label="Price"
              type="number"
              required
              min={0}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
              placeholder="e.g. 4500000"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="add-quantity" className="text-sm font-medium text-gray-400">
              Quantity
            </label>
            <input
              id="add-quantity"
              aria-label="Quantity"
              type="number"
              required
              min={0}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
              placeholder="e.g. 10"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <div className="mt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl bg-white/10 py-2.5 text-sm font-medium text-white transition hover:bg-white/20"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50"
            >
              {loading ? "Adding…" : "Add Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
