import { useState } from "react";
import type { Vehicle } from "../services/vehicleService";

interface VehicleCardProps {
  vehicle: Vehicle;
  isAdmin: boolean;
  onPurchase: (id: string) => void;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: string) => void;
}

export default function VehicleCard({
  vehicle,
  isAdmin,
  onPurchase,
  onEdit,
  onDelete,
}: VehicleCardProps) {
  const inStock = vehicle.quantity > 0;
  const [restockAmount, setRestockAmount] = useState("");

  const priceFormatted = `₹${vehicle.price.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
  })}`;

  const CardHeader = () => (
    <>
      <div className="vehicle-card-accent" />
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
              <input
                type="number"
                placeholder="Restock amount"
                className="form-input"
                value={restockAmount}
                onChange={(e) => setRestockAmount(e.target.value)}
                style={{ padding: "8px 12px", fontSize: 13 }}
              />
              <button
                className="btn btn-ghost"
                style={{ flexShrink: 0, padding: "8px 14px", fontSize: 12 }}
                onClick={() => {
                  if (restockAmount) {
                    onEdit({
                      ...vehicle,
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
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14H6L5 6"/>
                  <path d="M10 11v6"/><path d="M14 11v6"/>
                  <path d="M9 6V4h6v2"/>
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