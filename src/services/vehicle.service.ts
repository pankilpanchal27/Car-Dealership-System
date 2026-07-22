import Vehicle, { IVehicle } from "../models/Vehicle";

export const createVehicle = async (vehicleData: IVehicle) => {
  const vehicle = await Vehicle.create(vehicleData);
  return vehicle;
};

export const getAllVehicles = async () => {
    return await Vehicle.find();
};

export const searchVehicles = async (query: {
    make?: string;
    model?: string;
    category?: string;
  }) => {
    const filter: Record<string, string> = {};
  
    if (query.make) filter.make = query.make;
    if (query.model) filter.model = query.model;
    if (query.category) filter.category = query.category;
  
    return await Vehicle.find(filter);
};

export const updateVehicle = async (
  id: string,
  updateData: Partial<IVehicle>
) => {
  return await Vehicle.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};