import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import VehicleList from "../components/VehicleList";
import {
  getVehicles,
  searchVehicles,
  type Vehicle,
} from "../services/vehicleService";

function Dashboard() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadVehicles() {
    try {
      setLoading(true);

      const response = await getVehicles();

      setVehicles(response.vehicles);
      setError("");
    } catch {
      setError("Failed to load vehicles.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVehicles();
  }, []);

  async function handleSearch(filters: {
    make?: string;
    model?: string;
    category?: string;
  }) {
    const hasFilters =
      filters.make || filters.model || filters.category;

    if (!hasFilters) {
      await loadVehicles();
      return;
    }

    try {
      setLoading(true);

      const response = await searchVehicles(filters);

      setVehicles(response.vehicles);
      setError("");
    } catch {
      setError("Failed to search vehicles.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="p-6">
        <h1 className="mb-6 text-3xl font-bold">
          Vehicle Inventory
        </h1>

        <p>Loading vehicles...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-6">
        <h1 className="mb-6 text-3xl font-bold">
          Vehicle Inventory
        </h1>

        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Vehicle Inventory
      </h1>

      <SearchBar onSearch={handleSearch} />

      {vehicles.length === 0 ? (
        <p>No vehicles available.</p>
      ) : (
        <VehicleList vehicles={vehicles} />
      )}
    </main>
  );
}

export default Dashboard;