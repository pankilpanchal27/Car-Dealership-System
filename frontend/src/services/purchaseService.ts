import api from "../api/api";
import type { Vehicle } from "./vehicleService";

export interface Purchase {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  vehicle: Pick<Vehicle, "make" | "model" | "category" | "price">;
  quantity: number;
  totalPrice: number;
  createdAt: string;
}

export interface GetPurchasesResponse {
  success: boolean;
  purchases: Purchase[];
}

export const getPurchases = async (): Promise<GetPurchasesResponse> => {
  const response = await api.get("/purchases");
  return response.data;
};
