import { useEffect, useState, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import VehicleList from "../components/VehicleList";
import Navbar from "../components/Navbar";
import EditVehicleModal from "../components/EditVehicleModal";
import { useAuth } from "../context/useAuth";
import {
  getVehicles,
  searchVehicles,
  purchaseVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  type Vehicle,
} from "../services/vehicleService";

function StatCard({
  icon,
  label,
  value,
  color = "var(--text-primary)",
  iconBg = "var(--accent-subtle)",
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  color?: string;
  iconBg?: string;
}) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: iconBg }}>
        {icon}
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-value" style={{ color }}>{value}</div>
    </div>
  );
}

export default function Dashboard() {
  const { user, logout } = useAuth();

  const [viewAsCustomer, setViewAsCustomer] = useState(false);
  const isActuallyAdmin = user?.role === "admin";
  const isAdminView = isActuallyAdmin && !viewAsCustomer;

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Admin add-form state
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [adding, setAdding] = useState(false);

  const [editTarget, setEditTarget] = useState<Vehicle | null>(null);

  // ─── Data fetching ──────────────────────────────────────────────────────────
  async function loadVehicles() {
    try {
      setLoading(true);
      const response = await getVehicles();
      setVehicles(response.vehicles);
      setError("");
    } catch {
      setError("Failed to load vehicles.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVehicles();
  }, []);

  // ─── Stats ──────────────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const totalModels = new Set(vehicles.map((v) => v.model)).size;
    const totalUnits = vehicles.reduce((acc, v) => acc + v.quantity, 0);
    const totalValue = vehicles.reduce((acc, v) => acc + v.price * v.quantity, 0);
    const outOfStock = vehicles.filter((v) => v.quantity === 0).length;
    return { totalModels, totalUnits, totalValue, outOfStock };
  }, [vehicles]);

  // ─── Actions ────────────────────────────────────────────────────────────────
  async function handleSearch(filters: {
    make?: string;
    model?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
  }) {
    const hasFilters =
      filters.make ||
      filters.model ||
      filters.category ||
      filters.minPrice ||
      filters.maxPrice;
    if (!hasFilters) {
      await loadVehicles();
      return;
    }
    try {
      setLoading(true);
      const response = await searchVehicles(filters);
      setVehicles(response.vehicles);
      setError("");
    } catch {
      setError("Failed to search vehicles.");
    } finally {
      setLoading(false);
    }
  }

  async function handlePurchase(id: string) {
    try {
      await purchaseVehicle(id, 1);
      await loadVehicles();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Purchase failed.";
      setError(msg);
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setAdding(true);
    try {
      await createVehicle({
        make,
        model,
        category,
        price: Number(price),
        quantity: Number(quantity),
      });
      setMake("");
      setModel("");
      setCategory("");
      setPrice("");
      setQuantity("");
      await loadVehicles();
    } catch {
      setError("Failed to add vehicle. Please try again.");
    } finally {
      setAdding(false);
    }
  }

  async function handleSaveEdit(data: Partial<Vehicle>) {
    if (!editTarget) return;
    await updateVehicle(editTarget._id, data);
    setEditTarget(null);
    await loadVehicles();
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this vehicle? This cannot be undone.")) return;
    await deleteVehicle(id);
    await loadVehicles();
  }

  // ─── Shared sub-components ──────────────────────────────────────────────────
  const ErrorAlert = () =>
    error ? (
      <div className="alert alert-error" role="alert">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        {error}
      </div>
    ) : null;

  const LoadingSpinner = () => (
    <div className="loading-container" data-testid="loading-spinner">
      <div className="loading-spinner" />
      <span>Loading vehicles…</span>
    </div>
  );

  const EmptyState = ({ message }: { message: string }) => (
    <div className="empty-state">
      <div className="empty-state-icon">🚗</div>
      <div className="empty-state-title">{message}</div>
    </div>
  );

  // ─── Admin View ─────────────────────────────────────────────────────────────
  if (isAdminView) {
    return (
      <div className="page-with-navbar">
        <Navbar
          isAdmin={true}
          isActuallyAdmin={isActuallyAdmin}
          onLogout={logout}
          onToggleView={() => setViewAsCustomer(!viewAsCustomer)}
        />

        <div className="page-container">
          <ErrorAlert />

          {/* Stats row */}
          <div className="stats-grid">
            <StatCard
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>}
              label="Total Models"
              value={stats.totalModels}
            />
            <StatCard
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>}
              label="Total Units"
              value={stats.totalUnits}
              iconBg="rgba(251, 191, 36, 0.12)"
            />
            <StatCard
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
              label="Total Value"
              value={`₹${stats.totalValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`}
              color="var(--accent)"
              iconBg="var(--accent-subtle)"
            />
            <StatCard
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>}
              label="Out of Stock"
              value={stats.outOfStock}
              color="var(--danger)"
              iconBg="var(--danger-bg)"
            />
          </div>

          {/* Main grid: sidebar + vehicle grid */}
          <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
            {/* Add Vehicle sidebar */}
            <div className="admin-sidebar">
              <div className="admin-sidebar-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
                Add New Vehicle
              </div>
              <form onSubmit={handleAdd} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">Make</label>
                  <input type="text" required value={make} onChange={(e) => setMake(e.target.value)} className="form-input" style={{ padding: "9px 12px", fontSize: 13 }} />
                </div>
                <div className="form-group">
                  <label className="form-label">Model</label>
                  <input type="text" required value={model} onChange={(e) => setModel(e.target.value)} className="form-input" style={{ padding: "9px 12px", fontSize: 13 }} />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input type="text" required value={category} onChange={(e) => setCategory(e.target.value)} className="form-input" style={{ padding: "9px 12px", fontSize: 13 }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div className="form-group">
                    <label className="form-label">Price (₹)</label>
                    <input type="number" required min={0} value={price} onChange={(e) => setPrice(e.target.value)} className="form-input" style={{ padding: "9px 12px", fontSize: 13 }} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Qty</label>
                    <input type="number" required min={0} value={quantity} onChange={(e) => setQuantity(e.target.value)} className="form-input" style={{ padding: "9px 12px", fontSize: 13 }} />
                  </div>
                </div>
                <button type="submit" disabled={adding} className="btn btn-primary btn-full" aria-label="Add Vehicle" style={{ marginTop: 4 }}>
                  {adding ? <><span className="btn-spinner" /> Adding…</> : <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Add Vehicle
                  </>}
                </button>
              </form>
            </div>

            {/* Vehicle grid */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="section-header">
                <span className="section-title">Inventory</span>
                <span className="section-count">{vehicles.length} vehicle{vehicles.length !== 1 ? "s" : ""}</span>
              </div>
              {loading ? (
                <LoadingSpinner />
              ) : vehicles.length === 0 ? (
                <EmptyState message="No vehicles in inventory." />
              ) : (
                <VehicleList
                  vehicles={vehicles}
                  isAdmin={true}
                  onPurchase={handlePurchase}
                  onEdit={(v) => setEditTarget(v)}
                  onDelete={handleDelete}
                />
              )}
            </div>
          </div>
        </div>

        {editTarget && (
          <EditVehicleModal
            isOpen={!!editTarget}
            vehicle={editTarget}
            onClose={() => setEditTarget(null)}
            onSave={handleSaveEdit}
          />
        )}
      </div>
    );
  }

  // ─── Customer View ──────────────────────────────────────────────────────────
  return (
    <div className="page-with-navbar">
      <Navbar
        isAdmin={false}
        isActuallyAdmin={isActuallyAdmin}
        onLogout={logout}
        onToggleView={() => setViewAsCustomer(false)}
      />

      <div className="page-container-narrow">
        <ErrorAlert />

        {/* Hero section */}
        <div style={{ marginBottom: 28, animation: "fadeInUp 0.4s ease" }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 6 }}>
            Browse Our Fleet
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
            Discover premium vehicles — filter, search and purchase instantly.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />

        {loading ? (
          <LoadingSpinner />
        ) : vehicles.length === 0 ? (
          <EmptyState message="No vehicles found." />
        ) : (
          <VehicleList
            vehicles={vehicles}
            isAdmin={false}
            onPurchase={handlePurchase}
            onEdit={(v) => setEditTarget(v)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}