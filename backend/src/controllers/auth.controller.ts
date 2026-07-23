import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Email already exists") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    console.error(error);
    
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const login = async (req: Request, res: Response) => {
  console.log("Login endpoint hit");
  console.log(req.body);
  try {
    const { token, user } = await loginUser(req.body);

    return res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
  
    if (
      error instanceof Error &&
      error.message === "Invalid email or password"
    ) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};