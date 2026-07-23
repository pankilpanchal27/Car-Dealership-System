import { useEffect, useState } from "react";
import VehicleList from "../components/VehicleList";
import {
  getVehicles,
  type Vehicle,
} from "../services/vehicleService";

function Dashboard() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadVehicles() {
      try {
        const response = await getVehicles();
        setVehicles(response.vehicles);
      } catch (err) {
        setError("Failed to load vehicles.");
      } finally {
        setLoading(false);
      }
    }

    loadVehicles();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="mb-4 text-3xl font-bold">Dashboard</h1>
        <p>Loading vehicles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="mb-4 text-3xl font-bold">Dashboard</h1>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <main className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Vehicle Inventory
      </h1>

      {vehicles.length === 0 ? (
        <p>No vehicles available.</p>
      ) : (
        <VehicleList vehicles={vehicles} />
      )}
    </main>
  );
}

export default Dashboard;