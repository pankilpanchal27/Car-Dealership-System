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
      <article className="relative flex flex-col overflow-hidden bg-white shadow-sm border border-gray-100 rounded-sm p-6 text-navy transition hover:shadow-md">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border border-gray-200 px-2 py-0.5 rounded-sm bg-gray-50">
            {vehicle.category}
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm ${inStock ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
            {vehicle.quantity} in stock
          </span>
        </div>

        <h2 className="text-xl font-heading mt-1 mb-1">
          {vehicle.make} {vehicle.model}
        </h2>
        
        <p className="text-gold font-mono text-sm mb-6 font-bold">
          ₹{vehicle.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </p>

        <div className="mt-auto flex flex-col gap-3">
          <div className="flex gap-2">
            <input 
              type="number" 
              placeholder="Amount" 
              className="flex-1 input-minimal px-3 py-2 text-xs rounded-sm"
              value={restockAmount}
              onChange={(e) => setRestockAmount(e.target.value)}
            />
            <button 
              className="flex-shrink-0 border border-gray-200 bg-gray-50 px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-navy hover:bg-gray-100 transition rounded-sm"
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
              className="flex-1 border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-navy hover:bg-gray-100 transition rounded-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(vehicle._id)}
              className="flex-1 btn-outline-red px-4 py-2 text-xs font-bold uppercase tracking-widest transition rounded-sm"
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
    <article className="relative flex flex-col overflow-hidden bg-white shadow-sm border border-gray-100 p-6 rounded-sm text-navy transition hover:shadow-md">
      {!inStock && (
        <div className="ribbon-wrapper">
          <div className="ribbon">Sold Out</div>
        </div>
      )}

      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border border-gray-200 px-2 py-0.5 rounded-sm bg-gray-50">
          {vehicle.category}
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm ${inStock ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
          {vehicle.quantity} in stock
        </span>
      </div>

      <h2 className="text-xl font-heading mt-1 mb-1">
        {vehicle.make} {vehicle.model}
      </h2>
      
      <p className="text-gold font-mono text-sm mb-6 font-bold">
        ₹{vehicle.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
      </p>

      <div className="mt-auto">
        <button
          onClick={() => onPurchase(vehicle._id)}
          disabled={!inStock}
          className={`w-full py-3 text-xs font-bold uppercase tracking-widest transition rounded-sm ${
            inStock
              ? "bg-gold text-white hover:bg-gold-hover"
              : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
          }`}
        >
          Purchase
        </button>
      </div>
    </article>
  );
}