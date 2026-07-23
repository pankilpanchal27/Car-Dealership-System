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
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-sm transition hover:border-indigo-500/40 hover:shadow-indigo-500/10 hover:shadow-xl">
      {/* Stock badge */}
      <span
        className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
          inStock
            ? "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40"
            : "bg-red-500/20 text-red-400 ring-1 ring-red-500/40"
        }`}
      >
        {inStock ? `${vehicle.quantity} in stock` : "Out of Stock"}
      </span>

      {/* Vehicle info */}
      <h2 className="mt-2 text-xl font-bold text-white">
        {vehicle.make} {vehicle.model}
      </h2>

      <p className="mt-1 text-sm font-medium uppercase tracking-wider text-indigo-400">
        {vehicle.category}
      </p>

      <p className="mt-4 text-2xl font-bold text-white">
        ₹{vehicle.price.toLocaleString("en-IN")}
      </p>

      {/* Actions */}
      <div className="mt-6 flex flex-col gap-2">
        <button
          onClick={() => onPurchase(vehicle._id)}
          disabled={!inStock}
          className={`w-full rounded-xl py-2.5 text-sm font-semibold transition active:scale-95 ${
            inStock
              ? "bg-indigo-600 text-white hover:bg-indigo-500"
              : "cursor-not-allowed bg-gray-700 text-gray-500"
          }`}
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