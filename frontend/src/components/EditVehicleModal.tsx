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

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

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
      className="modal-backdrop"
      data-testid="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-vehicle-title"
        className="modal-box"
      >
        {/* Close button */}
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <h2 id="edit-vehicle-title" className="modal-title">
          Edit Vehicle
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="form-group">
            <label htmlFor="edit-make" className="form-label">Make</label>
            <input
              id="edit-make"
              aria-label="Make"
              type="text"
              required
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-model" className="form-label">Model</label>
            <input
              id="edit-model"
              aria-label="Model"
              type="text"
              required
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-category" className="form-label">Category</label>
            <input
              id="edit-category"
              aria-label="Category"
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-input"
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="form-group">
              <label htmlFor="edit-price" className="form-label">Price (₹)</label>
              <input
                id="edit-price"
                aria-label="Price"
                type="number"
                required
                min={0}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-quantity" className="form-label">Quantity</label>
              <input
                id="edit-quantity"
                aria-label="Quantity"
                type="number"
                required
                min={0}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {error && (
            <div className="alert alert-error" role="alert">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
              style={{ flex: 1 }}
              aria-label="Cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ flex: 1 }}
              aria-label="Save changes"
            >
              {loading ? (
                <><span className="btn-spinner" /> Saving…</>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
