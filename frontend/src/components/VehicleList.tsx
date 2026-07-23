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
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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