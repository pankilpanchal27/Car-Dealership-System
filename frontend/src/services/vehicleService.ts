import api from "../api/api";

export interface Vehicle {
  _id: string;
  make: string;
  model: string;
  category: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface VehicleResponse {
  success: boolean;
  vehicle: Vehicle;
}

export interface VehicleListResponse {
  success: boolean;
  vehicles: Vehicle[];
}

export async function getVehicles(): Promise<VehicleListResponse> {
  const response = await api.get<VehicleListResponse>("/vehicles");

  return response.data;
}

export async function createVehicle(
  data: Omit<Vehicle, "_id">
) {
  const response = await api.post<VehicleResponse>(
    "/vehicles",
    data
  );

  return response.data;
}

export async function updateVehicle(
  id: string,
  data: Partial<Vehicle>
) {
  const response = await api.put<VehicleResponse>(
    `/vehicles/${id}`,
    data
  );

  return response.data;
}

export async function deleteVehicle(id: string) {
  return api.delete(`/vehicles/${id}`);
}

export async function purchaseVehicle(
  id: string,
  quantity: number
) {
  const response = await api.post<VehicleResponse>(
    `/vehicles/${id}/purchase`,
    { quantity }
  );

  return response.data;
}

export async function restockVehicle(
  id: string,
  quantity: number
) {
  const response = await api.post<VehicleResponse>(
    `/vehicles/${id}/restock`,
    { quantity }
  );

  return response.data;
}

export async function searchVehicles(params: {
  make?: string;
  model?: string;
  category?: string;
}) {
  const response = await api.get<VehicleListResponse>(
    "/vehicles/search",
    {
      params,
    }
  );

  return response.data;
}