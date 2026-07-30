import Purchase from "../models/Purchase";

export const getAllPurchases = async () => {
  return await Purchase.find()
    .populate("user", "name email")
    .populate("vehicle", "make model category price")
    .sort({ createdAt: -1 });
};
