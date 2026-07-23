import type { Vehicle } from "../services/vehicleService";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({
  vehicle,
}: VehicleCardProps) {
  return (
    <article>
      <h2>
        {vehicle.make} {vehicle.model}
      </h2>

      <p>Year: {vehicle.year}</p>
      <p>Price: ₹{vehicle.price.toLocaleString()}</p>
      <p>Mileage: {vehicle.mileage.toLocaleString()} km</p>
      <p>Fuel: {vehicle.fuelType}</p>
      <p>Transmission: {vehicle.transmission}</p>
      <p>Color: {vehicle.color}</p>
      <p>Status: {vehicle.status}</p>
    </article>
  );
}