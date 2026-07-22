import { Request, Response } from "express";
import { createVehicle } from "../services/vehicle.service";

export const createVehicleHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const vehicle = await createVehicle(req.body);

    res.status(201).json({
      success: true,
      vehicle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create vehicle",
    });
  }
};