import type { Vehicle } from "../services/vehicleService";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({
  vehicle,
}: VehicleCardProps) {
  return (
    <article className="rounded-lg border bg-white p-5 shadow">
  <h2 className="text-xl font-bold">
    {vehicle.make} {vehicle.model}
  </h2>

  <p className="mt-2">
    <strong>Category:</strong> {vehicle.category}
  </p>

  <p>
    <strong>Price:</strong> ₹
    {vehicle.price.toLocaleString()}
  </p>

  <p>
    <strong>Stock:</strong> {vehicle.quantity}
  </p>
</article>
  );
}