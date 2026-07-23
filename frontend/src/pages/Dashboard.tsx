import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import VehicleList from "../components/VehicleList";
import Navbar from "../components/Navbar";
import AddVehicleModal from "../components/AddVehicleModal";
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

function Dashboard() {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === "admin";

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Admin modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Vehicle | null>(null);

  // ─── Data fetching ─────────────────────────────────────────────────────────

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

  // ─── Search ────────────────────────────────────────────────────────────────

  async function handleSearch(filters: {
    make?: string;
    model?: string;
    category?: string;
  }) {
    const hasFilters = filters.make || filters.model || filters.category;
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

  // ─── Purchase ──────────────────────────────────────────────────────────────

  async function handlePurchase(id: string) {
    try {
      await purchaseVehicle(id, 1);
      await loadVehicles();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Purchase failed.";
      setError(msg);
    }
  }

  // ─── Admin: Add ───────────────────────────────────────────────────────────

  async function handleAdd(
    data: Omit<Vehicle, "_id" | "createdAt" | "updatedAt">
  ) {
    await createVehicle(data);
    await loadVehicles();
  }

  // ─── Admin: Edit ──────────────────────────────────────────────────────────

  async function handleSaveEdit(data: Partial<Vehicle>) {
    if (!editTarget) return;
    await updateVehicle(editTarget._id, data);
    setEditTarget(null);
    await loadVehicles();
  }

  // ─── Admin: Delete ────────────────────────────────────────────────────────

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this vehicle? This cannot be undone.")) return;
    await deleteVehicle(id);
    await loadVehicles();
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#04060d] text-white">
      <Navbar isAdmin={isAdmin} onLogout={logout} />

      <main className="mx-auto max-w-7xl px-6 py-10 animate-fade-up">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold tracking-tight text-white shimmer-text">
              Vehicle Inventory
            </h1>
            <p className="mt-2 text-gray-400 font-medium">
              Browse and purchase from our latest premium collection.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary w-auto shadow-[0_0_15px_rgba(99,102,241,0.3)]"
            >
              + Add Vehicle
            </button>
          )}
        </div>

        {/* Search */}
        <SearchBar onSearch={handleSearch} />

        {/* Error */}
        {error && (
          <p className="mb-6 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400 ring-1 ring-red-500/30">
            {error}
          </p>
        )}

        {/* Vehicle grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 stagger">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-72 animate-pulse rounded-2xl glass-strong"
              />
            ))}
          </div>
        ) : vehicles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center animate-fade-up glass-strong rounded-3xl mt-8">
            <span className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-500/10 text-4xl shadow-[0_0_30px_rgba(99,102,241,0.15)] ring-1 ring-indigo-500/20">
              📭
            </span>
            <h3 className="text-2xl font-bold text-white mb-2">No vehicles found</h3>
            <p className="text-gray-400 max-w-md">
              We couldn't find any vehicles matching your current filters, or the inventory is completely sold out.
            </p>
          </div>
        ) : (
          <VehicleList
            vehicles={vehicles}
            isAdmin={isAdmin}
            onPurchase={handlePurchase}
            onEdit={(v) => setEditTarget(v)}
            onDelete={handleDelete}
          />
        )}
      </main>

      {/* Admin: Add Modal */}
      <AddVehicleModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAdd}
      />

      {/* Admin: Edit Modal */}
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

export default Dashboard;