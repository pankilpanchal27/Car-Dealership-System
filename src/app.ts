import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { authenticate } from "./middleware/auth.middleware";
import vehicleRoutes from "./routes/vehicle.routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Car Dealership Inventory API is running 🚗",
  });
});

// Health Route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});
app.get("/api/protected", authenticate, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Access granted",
  });
});
export default app;