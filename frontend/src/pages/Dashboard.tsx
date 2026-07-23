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
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar isAdmin={isAdmin} onLogout={logout} />

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Vehicle Inventory
            </h1>
            <p className="mt-1 text-gray-400">
              Browse and purchase from our latest collection
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => setShowAddModal(true)}
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 active:scale-95"
            >
              + Add Vehicle
            </button>
          )}
        </div>

        {/* Search */}
        <SearchBar onSearch={handleSearch} />

        {/* Error */}
        {error && (
          <p className="mb-6 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400 ring-1 ring-red-500/30">
            {error}
          </p>
        )}

        {/* Vehicle grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-2xl bg-white/5"
              />
            ))}
          </div>
        ) : vehicles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-6xl">🚗</span>
            <p className="mt-4 text-lg text-gray-400">
              No vehicles available.
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