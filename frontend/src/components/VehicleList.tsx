import type { Vehicle } from "../services/vehicleService";
import VehicleCard from "./VehicleCard";

interface VehicleListProps {
  vehicles: Vehicle[];
}

export default function VehicleList({
  vehicles,
}: VehicleListProps) {
  return (
    <section>
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle._id}
          vehicle={vehicle}
        />
      ))}
    </section>
  );
}