import api from "../api/api";

export interface Vehicle {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  color: string;
  status: string;
}

export interface VehicleListResponse {
  success: boolean;
  vehicles: Vehicle[];
}

export async function getVehicles(): Promise<VehicleListResponse> {
  const response = await api.get<VehicleListResponse>("/vehicles");

  return response.data;
}