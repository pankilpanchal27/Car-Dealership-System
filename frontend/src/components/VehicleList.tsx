import type { Vehicle } from "../services/vehicleService";
import VehicleCard from "./VehicleCard";

interface VehicleListProps {
  vehicles: Vehicle[];
  isAdmin: boolean;
  onPurchase: (id: string) => void;
  onEdit: (vehicle: Vehicle) => void;
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
  onDelete,
}: VehicleListProps) {
  const cols = isAdmin
    ? "repeat(auto-fill, minmax(260px, 1fr))"
    : "repeat(auto-fill, minmax(240px, 1fr))";

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: cols,
        gap: 20,
      }}
    >
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle._id}
          vehicle={vehicle}
          isAdmin={isAdmin}
          onPurchase={onPurchase}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}