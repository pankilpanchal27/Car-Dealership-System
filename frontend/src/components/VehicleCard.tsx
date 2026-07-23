import type { Vehicle } from "../services/vehicleService";

interface VehicleCardProps {
  vehicle: Vehicle;
  isAdmin: boolean;
  onPurchase: (id: string) => void;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: string) => void;
}

/**
 * VehicleCard — displays vehicle details with purchase button (disabled at 0 stock)
 * and admin-only edit/delete controls.
 */
export default function VehicleCard({
  vehicle,
  isAdmin,
  onPurchase,
  onEdit,
  onDelete,
}: VehicleCardProps) {
  const inStock = vehicle.quantity > 0;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl glass p-6 transition-all hover:glass-strong hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)]">
      {/* Stock badge */}
      <span
        className={`absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
          inStock
            ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30"
            : "bg-red-500/10 text-red-400 ring-1 ring-red-500/30"
        }`}
      >
        {inStock ? `${vehicle.quantity} in stock` : "Out of Stock"}
      </span>

      {/* Vehicle info */}
      <div className="mt-2 flex-grow">
        <h2 className="text-xl font-bold text-white group-hover:shimmer-text transition-all duration-300">
          {vehicle.make} {vehicle.model}
        </h2>
        
        <p className="mt-1.5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400/80">
          {vehicle.category}
        </p>

        <p className="mt-6 text-3xl font-extrabold text-white">
          <span className="text-sm font-medium text-gray-500 align-top mr-1">₹</span>
          {vehicle.price.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3">
        <button
          onClick={() => onPurchase(vehicle._id)}
          disabled={!inStock}
          className={`w-full ${inStock ? 'btn-primary' : 'rounded-xl bg-gray-800/50 py-2.5 text-sm font-semibold text-gray-500 cursor-not-allowed border border-white/5'}`}
        >
          {inStock ? "Purchase" : "Out of Stock"}
        </button>

        {isAdmin && (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(vehicle)}
              className="flex-1 rounded-xl bg-amber-500/20 py-2 text-sm font-medium text-amber-400 ring-1 ring-amber-500/30 transition hover:bg-amber-500/30"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(vehicle._id)}
              className="flex-1 rounded-xl bg-red-500/20 py-2 text-sm font-medium text-red-400 ring-1 ring-red-500/30 transition hover:bg-red-500/30"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </article>
  );
}