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

export default function Dashboard() {
  const { user, logout } = useAuth();
  
  // View mode state for admin
  const [viewAsCustomer, setViewAsCustomer] = useState(false);
  const isActuallyAdmin = user?.role === "admin";
  const isAdminView = isActuallyAdmin && !viewAsCustomer;

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Admin Add Form State
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [adding, setAdding] = useState(false);

  // Admin Edit Modal
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

  // ─── Stats Calculation ─────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const totalModels = new Set(vehicles.map((v) => v.model)).size;
    const totalUnits = vehicles.reduce((acc, v) => acc + v.quantity, 0);
    const totalValue = vehicles.reduce((acc, v) => acc + (v.price * v.quantity), 0);
    const outOfStock = vehicles.filter((v) => v.quantity === 0).length;

    return { totalModels, totalUnits, totalValue, outOfStock };
  }, [vehicles]);

  // ─── Actions ───────────────────────────────────────────────────────────────
  async function handleSearch(filters: {
    make?: string;
    model?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
  }) {
    const hasFilters = filters.make || filters.model || filters.category || filters.minPrice || filters.maxPrice;
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
      setMake(""); setModel(""); setCategory(""); setPrice(""); setQuantity("");
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

  // ─── Admin View ────────────────────────────────────────────────────────────
  if (isAdminView) {
    return (
      <div className="min-h-screen bg-gray-bg text-navy font-sans flex flex-col">
        <Navbar 
          isAdmin={true}
          isActuallyAdmin={isActuallyAdmin}
          onLogout={logout} 
          viewAsCustomer={viewAsCustomer}
          onToggleView={() => setViewAsCustomer(!viewAsCustomer)}
        />
        
        <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 py-8 flex flex-col">
          {error && (
            <p className="mb-4 rounded bg-red-50 px-4 py-3 text-sm font-medium text-red-600 border border-red-200">
              {error}
            </p>
          )}

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-2">
                <span className="w-3 h-3 bg-gray-100 rounded flex items-center justify-center text-gray-600 text-[8px]">▣</span>
                Total Models
              </p>
              <p className="text-3xl font-heading tracking-wide text-navy">{stats.totalModels}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-2">
                <span className="w-3 h-3 bg-gray-100 rounded flex items-center justify-center text-gray-600 text-[8px]">⚡</span>
                Total Units
              </p>
              <p className="text-3xl font-heading tracking-wide text-navy">{stats.totalUnits}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-2">
                <span className="w-3 h-3 bg-gray-100 rounded flex items-center justify-center text-gray-600 text-[8px]">₹</span>
                Total Value
              </p>
              <p className="text-3xl font-heading tracking-wide text-gold">
                ₹{stats.totalValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-2">
                <span className="w-3 h-3 bg-red-50 rounded flex items-center justify-center text-red-500 text-[8px]">⊗</span>
                Out of Stock
              </p>
              <p className="text-3xl font-heading tracking-wide text-red-500">{stats.outOfStock}</p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Left Sidebar: Add Vehicle Form */}
            <div className="w-full lg:w-72 shrink-0 bg-white border border-gray-200 rounded-sm p-6 shadow-sm sticky top-28">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gold mb-6">
                Add New Vehicle
              </h2>
              <form onSubmit={handleAdd} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Make</label>
                  <input type="text" required value={make} onChange={(e) => setMake(e.target.value)} className="input-minimal rounded-sm py-2 px-3 text-xs" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Model</label>
                  <input type="text" required value={model} onChange={(e) => setModel(e.target.value)} className="input-minimal rounded-sm py-2 px-3 text-xs" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Category</label>
                  <input type="text" required value={category} onChange={(e) => setCategory(e.target.value)} className="input-minimal rounded-sm py-2 px-3 text-xs" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Price (₹)</label>
                    <input type="number" required min={0} value={price} onChange={(e) => setPrice(e.target.value)} className="input-minimal rounded-sm py-2 px-3 text-xs" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Quantity</label>
                    <input type="number" required min={0} value={quantity} onChange={(e) => setQuantity(e.target.value)} className="input-minimal rounded-sm py-2 px-3 text-xs" />
                  </div>
                </div>
                <button type="submit" disabled={adding} className="btn-gold rounded-sm py-2.5 mt-2 text-white hover:text-white">
                  {adding ? "ADDING..." : "ADD VEHICLE"}
                </button>
              </form>
            </div>

            {/* Right side: Vehicle Grid */}
            <div className="flex-1 w-full">
              {loading ? (
                <div className="text-gray-500 font-mono">Loading...</div>
              ) : vehicles.length === 0 ? (
                <div className="text-gray-500 font-mono py-10">No vehicles in inventory.</div>
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
        </main>

        {/* Edit Modal (Kept simple for admin) */}
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

  // ─── Customer View ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-bg text-navy font-sans flex flex-col">
      <Navbar 
        isAdmin={false} 
        isActuallyAdmin={isActuallyAdmin}
        onLogout={logout}
        viewAsCustomer={viewAsCustomer}
        onToggleView={() => setViewAsCustomer(!viewAsCustomer)}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 flex flex-col">
        {error && (
          <p className="mb-6 rounded bg-red-50 px-4 py-3 text-sm font-medium text-red-600 border border-red-200">
            {error}
          </p>
        )}

        <SearchBar onSearch={handleSearch} />

        {loading ? (
          <div className="text-gray-500 font-mono">Loading...</div>
        ) : vehicles.length === 0 ? (
          <div className="text-gray-500 font-mono py-20 text-center">No vehicles found.</div>
        ) : (
          <VehicleList
            vehicles={vehicles}
            isAdmin={false}
            onPurchase={handlePurchase}
            onEdit={(v) => setEditTarget(v)}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}