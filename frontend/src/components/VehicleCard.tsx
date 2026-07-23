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

  if (isAdmin) {
    // Admin Variant
    return (
      <article className="relative flex flex-col overflow-hidden bg-navy-dark border border-white/5 rounded-sm p-6 text-white transition hover:border-white/10">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border border-white/10 px-2 py-0.5 rounded-sm bg-white/5">
            {vehicle.category}
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm ${inStock ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>
            {vehicle.quantity} in stock
          </span>
        </div>

        <h2 className="text-xl font-bold mt-1 mb-1">
          {vehicle.make} {vehicle.model}
        </h2>
        
        <p className="text-gold font-mono text-sm mb-6">
          ${vehicle.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>

        <div className="mt-auto flex flex-col gap-3">
          <div className="flex gap-2">
            <input 
              type="number" 
              placeholder="Amount" 
              className="flex-1 bg-navy border border-white/10 px-3 py-2 text-xs outline-none focus:border-gold rounded-sm"
              value={restockAmount}
              onChange={(e) => setRestockAmount(e.target.value)}
            />
            <button 
              className="flex-shrink-0 bg-navy border border-white/10 px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-gray-300 hover:text-white hover:border-white/20 transition rounded-sm"
              onClick={() => {
                if(restockAmount) {
                  onEdit({ ...vehicle, quantity: vehicle.quantity + Number(restockAmount) });
                  setRestockAmount("");
                }
              }}
            >
              Restock
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(vehicle)}
              className="flex-1 bg-navy border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-white hover:border-white/20 transition rounded-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(vehicle._id)}
              className="flex-1 bg-red-900/20 border border-red-900/30 px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-red-900/40 transition rounded-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </article>
    );
  }

  // Customer Variant
  return (
    <article className="relative flex flex-col overflow-hidden bg-white shadow-sm border border-gray-100 p-6 rounded-sm transition hover:shadow-md">
      {!inStock && (
        <div className="ribbon-wrapper">
          <div className="ribbon">Sold Out</div>
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border border-gray-200 px-2 py-0.5 rounded-sm bg-gray-50">
          {vehicle.category}
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm ${inStock ? 'text-emerald-500 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>
          {vehicle.quantity} in stock
        </span>
      </div>

      <h2 className="text-xl font-heading text-navy mt-1 mb-4">
        {vehicle.make} {vehicle.model}
      </h2>
      
      <div className="border-l-[4px] border-gold pl-3 mb-6">
        <p className="font-mono text-lg font-bold text-navy">
          ${vehicle.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
      </div>

      <div className="mt-auto">
        <button
          onClick={() => onPurchase(vehicle._id)}
          disabled={!inStock}
          className={`w-full py-3 text-xs font-bold uppercase tracking-widest transition rounded-sm ${
            inStock
              ? "bg-navy text-white hover:bg-navy-dark"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Purchase
        </button>
      </div>
    </article>
  );
}