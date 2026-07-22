import { Request, Response } from "express";
import {
  createVehicle,
  getAllVehicles,
  searchVehicles,
} from "../services/vehicle.service";

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

export const getAllVehiclesHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
  try {
    const vehicles = await getAllVehicles();
  
    res.status(200).json({
      success: true,
      vehicles,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch vehicles",
    });
  }
};

export const searchVehiclesHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
  try {
    const vehicles = await searchVehicles({
      make: req.query.make as string,
      model: req.query.model as string,
      category: req.query.category as string,
    });
  
    res.status(200).json({
      success: true,
      vehicles,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to search vehicles",
    });
  }
};