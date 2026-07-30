import { Request, Response } from "express";
import { getAllPurchases } from "../services/purchase.service";

export const getAllPurchasesHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const purchases = await getAllPurchases();
    res.status(200).json({
      success: true,
      purchases,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch purchase history",
    });
  }
};
