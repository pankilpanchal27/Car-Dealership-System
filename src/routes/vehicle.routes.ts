import { Router } from "express";
import {
  createVehicleHandler,
  getAllVehiclesHandler,
  searchVehiclesHandler,
} from "../controllers/vehicle.controller";
import { authenticate } from "../middleware/auth.middleware";


const router = Router();

router.get("/search", searchVehiclesHandler);
router.get("/", getAllVehiclesHandler);
router.post("/", authenticate, createVehicleHandler);

export default router;