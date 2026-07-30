import { useState } from "react";
import type { Vehicle } from "../services/vehicleService";

interface VehicleCardProps {
  vehicle: Vehicle;
  isAdmin: boolean;
  onPurchase: (id: string) => void;
  onEdit: (vehicle: Vehicle) => void;
  onQuickUpdate?: (id: string, data: Partial<Vehicle>) => Promise<void>;
  onDelete: (id: string) => void;
}

export default function VehicleCard({
  vehicle,
  isAdmin,
  onPurchase,
  onEdit,
  onQuickUpdate,
  onDelete,
}: VehicleCardProps) {
  const inStock = vehicle.quantity > 0;
  const [restockAmount, setRestockAmount] = useState("");

  const priceFormatted = `₹${vehicle.price.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
  })}`;

  const CardHeader = () => (
    <>
      {vehicle.imageUrl ? (
        <div className="vehicle-image-container" style={{ position: "relative", overflow: "hidden" }}>
          {!inStock && <div className="out-of-stock-ribbon">Out of Stock</div>}
          <img
            src={vehicle.imageUrl}
            alt={vehicle.model}
            className="vehicle-image"
          />
        </div>
      ) : (
        <div className="vehicle-card-accent" style={{ position: "relative", overflow: "hidden" }}>
          {!inStock && <div className="out-of-stock-ribbon">Out of Stock</div>}
        </div>
      )}
      <div className="vehicle-card-body">
        <div className="vehicle-badge-row">
          <span className="vehicle-badge">{vehicle.category}</span>
          {inStock ? (
            <span
              data-testid="stock-badge"
              className="vehicle-stock-badge in-stock"
            >
              {vehicle.quantity} in stock
            </span>
          ) : (
            <span
              data-testid="sold-out-badge"
              className="vehicle-stock-badge out-of-stock sold-out-pill"
            >
              Sold Out
            </span>
          )}
        </div>
        <h2 className="vehicle-name">
          {vehicle.make} {vehicle.model}
        </h2>
        <p className="vehicle-price">{priceFormatted}</p>
      </div>
    </>
  );


  if (isAdmin) {
    return (
      <article className="vehicle-card">
        <CardHeader />
        <div className="vehicle-card-body" style={{ paddingTop: 0 }}>
          <div className="vehicle-actions">
            {/* Restock row */}
            <div style={{ display: "flex", gap: 8 }}>
              <div className="custom-number-input">
                <button
                  type="button"
                  className="number-btn"
                  onClick={() => {
                    const next = Math.max(-vehicle.quantity, Number(restockAmount || 0) - 1);
                    setRestockAmount(next === 0 ? "" : String(next));
                  }}
                  aria-label="Decrease"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <input
                  type="number"
                  placeholder="Qty"
                  className="number-input"
                  value={restockAmount}
                  onChange={(e) => {
                    const val = e.target.value;
                    setRestockAmount(val === "0" ? "" : val);
                  }}
                  min={-vehicle.quantity}
                />
                <button
                  type="button"
                  className="number-btn"
                  onClick={() => {
                    const next = Number(restockAmount || 0) + 1;
                    setRestockAmount(next === 0 ? "" : String(next));
                  }}
                  aria-label="Increase"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>
              <button
                className="btn btn-ghost"
                style={{ flexShrink: 0, padding: "8px 14px", fontSize: 12 }}
                onClick={async () => {
                  if (restockAmount && onQuickUpdate) {
                    await onQuickUpdate(vehicle._id, {
                      quantity: vehicle.quantity + Number(restockAmount),
                    });
                    setRestockAmount("");
                  }
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.1"/>
                </svg>
                Restock
              </button>
            </div>
            {/* Edit / Delete row */}
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => onEdit(vehicle)}
                className="btn btn-ghost"
                style={{ flex: 1, fontSize: 13 }}
                aria-label="Edit"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Edit
              </button>
              <button
                onClick={() => onDelete(vehicle._id)}
                className="btn btn-danger"
                style={{ flex: 1, fontSize: 13 }}
                aria-label="Delete"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Customer variant
  return (
    <article className="vehicle-card">
      <CardHeader />
      <div className="vehicle-card-body" style={{ paddingTop: 0 }}>
        <div className="vehicle-actions">
          <button
            onClick={() => onPurchase(vehicle._id)}
            disabled={!inStock}
            className={`btn ${inStock ? "btn-primary" : "btn-ghost"} btn-full`}
            aria-label="Purchase"
            style={{ fontSize: 14 }}
          >
            {inStock ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                Purchase
              </>
            ) : (
              "Out of Stock"
            )}
          </button>
        </div>
      </div>
    </article>
  );
}