import type { Vehicle } from "../services/vehicleService";
import VehicleCard from "./VehicleCard";

interface VehicleListProps {
  vehicles: Vehicle[];
  isAdmin: boolean;
  onPurchase: (id: string) => void;
  onEdit: (vehicle: Vehicle) => void;
  onQuickUpdate?: (id: string, data: Partial<Vehicle>) => Promise<void>;
  onDelete: (id: string) => void;
}

/**
 * VehicleList — renders a responsive grid of VehicleCards,
 * forwarding admin capabilities and action handlers to each card.
 */
export default function VehicleList({
  vehicles,
  isAdmin,
  onPurchase,
  onEdit,
  onQuickUpdate,
  onDelete,
}: VehicleListProps) {
  const cols = isAdmin
    ? "repeat(auto-fill, minmax(260px, 1fr))"
    : "repeat(auto-fill, minmax(240px, 1fr))";

  const sortedVehicles = [...vehicles].sort((a, b) => {
    const aStock = a.quantity > 0 ? 1 : 0;
    const bStock = b.quantity > 0 ? 1 : 0;
    return bStock - aStock;
  });

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: cols,
        gap: 20,
      }}
    >
      {sortedVehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle._id}
          vehicle={vehicle}
          isAdmin={isAdmin}
          onPurchase={onPurchase}
          onEdit={onEdit}
          onQuickUpdate={onQuickUpdate}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}