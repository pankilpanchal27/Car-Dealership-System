import { useState, useEffect } from "react";
import { getPurchases, type Purchase } from "../services/purchaseService";

export default function PurchaseHistory() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        setLoading(true);
        const response = await getPurchases();
        setPurchases(response.purchases);
        setError("");
      } catch {
        setError("Failed to load purchase history.");
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  if (loading) {
    return (
      <div className="loading-container" data-testid="loading-spinner">
        <div className="loading-spinner" />
        <span>Loading purchase history…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error" role="alert">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        {error}
      </div>
    );
  }

  if (purchases.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📋</div>
        <div className="empty-state-title">No purchases found.</div>
      </div>
    );
  }

  return (
    <div className="purchases-table-container">
      <table className="purchases-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer</th>
            <th>Vehicle</th>
            <th style={{ textAlign: "right" }}>Qty</th>
            <th style={{ textAlign: "right" }}>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => {
            const date = new Date(purchase.createdAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <tr key={purchase._id}>
                <td className="purchase-date">{date}</td>
                <td>
                  <div className="purchase-user-name">{purchase.user.name}</div>
                  <div className="purchase-user-email">{purchase.user.email}</div>
                </td>
                <td>
                  <div className="purchase-vehicle-name">
                    {purchase.vehicle.make} {purchase.vehicle.model}
                  </div>
                  <div className="purchase-vehicle-category">{purchase.vehicle.category}</div>
                </td>
                <td style={{ textAlign: "right", fontWeight: 600 }}>{purchase.quantity}</td>
                <td style={{ textAlign: "right", fontWeight: 700, color: "var(--accent)" }}>
                  ₹{purchase.totalPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
