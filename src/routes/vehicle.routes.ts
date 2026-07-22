import { Router } from "express";
import { createVehicleHandler } from "../controllers/vehicle.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, createVehicleHandler);

export default router;