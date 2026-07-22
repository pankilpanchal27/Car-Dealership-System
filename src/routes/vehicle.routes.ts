import { Router } from "express";
import {
    createVehicleHandler,
    getAllVehiclesHandler,
  } from "../controllers/vehicle.controller";
import { authenticate } from "../middleware/auth.middleware";


const router = Router();

router.get("/", getAllVehiclesHandler);

router.post("/", authenticate, createVehicleHandler);

export default router;