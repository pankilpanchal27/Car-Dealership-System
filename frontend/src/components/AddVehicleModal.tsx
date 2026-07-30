import { useState, useEffect } from "react";
import type { Vehicle } from "../services/vehicleService";

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Vehicle, "_id" | "createdAt" | "updatedAt">) => Promise<void>;
}

export default function AddVehicleModal({
  isOpen,
  onClose,
  onSave,
}: AddVehicleModalProps) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Reset fields when opened
  useEffect(() => {
    if (isOpen) {
      setMake("");
      setModel("");
      setCategory("");
      setPrice("");
      setQuantity("");
      setImageUrl("");
      setImageError(false);
      setError("");
    }
  }, [isOpen]);

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
        ...(imageUrl.trim() ? { imageUrl: imageUrl.trim() } : {}),
      });
      onClose();
    } catch {
      setError("Failed to add vehicle. Please try again.");
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
        aria-labelledby="add-vehicle-title"
        className="modal-box"
      >
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

        <h2 id="add-vehicle-title" className="modal-title">
          Add New Vehicle
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="form-group">
            <label htmlFor="add-make" className="form-label">Make</label>
            <input
              id="add-make"
              type="text"
              required
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="form-input"
              placeholder="e.g. Toyota"
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="form-group">
              <label htmlFor="add-model" className="form-label">Model</label>
              <input
                id="add-model"
                type="text"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="form-input"
                placeholder="e.g. Camry"
              />
            </div>
            <div className="form-group">
              <label htmlFor="add-category" className="form-label">Category</label>
              <input
                id="add-category"
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-input"
                placeholder="e.g. Sedan"
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="form-group">
              <label htmlFor="add-price" className="form-label">Price (₹)</label>
              <input
                id="add-price"
                type="number"
                required
                min={0}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-input"
                placeholder="e.g. 3000000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="add-quantity" className="form-label">Quantity</label>
              <input
                id="add-quantity"
                type="number"
                required
                min={0}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="form-input"
                placeholder="e.g. 10"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="add-imageUrl" className="form-label">
              Image URL (Optional)
            </label>
            <input
              id="add-imageUrl"
              type="url"
              className="form-input"
              value={imageUrl}
              onChange={(e) => { setImageUrl(e.target.value); setImageError(false); }}
              placeholder="https://example.com/car.jpg"
            />
            {imageUrl.trim() && (
              <div className="image-preview-box">
                {imageError ? (
                  <span className="image-preview-box-error">Invalid Image URL</span>
                ) : (
                  <img 
                    src={imageUrl.trim()} 
                    alt="Vehicle preview" 
                    onError={() => setImageError(true)} 
                  />
                )}
              </div>
            )}
          </div>

          {error && (
            <div className="alert alert-error" role="alert">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <div className="modal-actions" style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
