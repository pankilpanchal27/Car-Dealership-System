import Vehicle, { IVehicle } from "../models/Vehicle";

export const createVehicle = async (vehicleData: IVehicle) => {
  const vehicle = await Vehicle.create(vehicleData);
  return vehicle;
};
export const getAllVehicles = async () => {
    return await Vehicle.find();
  };