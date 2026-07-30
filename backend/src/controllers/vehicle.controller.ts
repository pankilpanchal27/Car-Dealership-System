import { Request, Response } from "express";
import {
  createVehicle,
  getAllVehicles,
  searchVehicles,
  updateVehicle,
  deleteVehicle,
  purchaseVehicle,
  restockVehicle,
} from "../services/vehicle.service";
import { moderateVehicleContent } from "../services/moderation.service";

export const createVehicleHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const moderationResult = await moderateVehicleContent(req.body);
    if (!moderationResult.isAppropriate) {
      res.status(400).json({
        success: false,
        message: `Content rejected: ${moderationResult.reason}`,
      });
      return;
    }

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
    const { make, model, category, minPrice, maxPrice } = req.query;

    const vehicles = await searchVehicles({
      make: make as string,
      model: model as string,
      category: category as string,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
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

export const updateVehicleHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const vehicle = await updateVehicle(req.params.id as string, req.body);

    if (!vehicle) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      vehicle,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to update vehicle",
    });
  }
};

export const deleteVehicleHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const vehicle = await deleteVehicle(req.params.id as string);

    if (!vehicle) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to delete vehicle",
    });
  }
};

export const purchaseVehicleHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
       res.status(401).json({ success: false, message: "Unauthorized" });
       return;
    }
    const vehicle = await purchaseVehicle(
      req.params.id as string,
      req.body.quantity,
      userId
    );

    if (!vehicle) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      vehicle,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Insufficient stock") {
      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to purchase vehicle",
    });
  }
};

export const restockVehicleHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const vehicle = await restockVehicle(
      req.params.id as string,
      req.body.quantity
    );

    if (!vehicle) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      vehicle,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to restock vehicle",
    });
  }
};