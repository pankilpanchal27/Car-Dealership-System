import { useEffect, useState } from "react";
import {
  getVehicles,
  type Vehicle,
} from "../services/vehicleService";

export default function Dashboard() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    async function loadVehicles() {
      const response = await getVehicles();
      setVehicles(response.vehicles);
    }

    loadVehicles();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle._id}>
            {vehicle.make} {vehicle.model}
          </li>
        ))}
      </ul>
    </div>
  );
}