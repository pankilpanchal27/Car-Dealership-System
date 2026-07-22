import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    user: {
      _id: "dummy-id",
      name: req.body.name,
      email: req.body.email,
    },
  });
};