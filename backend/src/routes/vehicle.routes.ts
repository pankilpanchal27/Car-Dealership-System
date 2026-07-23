import { Router } from "express";
import {
  createVehicleHandler,
  getAllVehiclesHandler,
  searchVehiclesHandler,
  updateVehicleHandler,
  deleteVehicleHandler,
  purchaseVehicleHandler,
  restockVehicleHandler,
} from "../controllers/vehicle.controller";
import { authenticate } from "../middleware/auth.middleware";


const router = Router();

router.get("/search", searchVehiclesHandler);
router.get("/", getAllVehiclesHandler);
router.post("/", authenticate, createVehicleHandler);
router.post("/:id/purchase", authenticate, purchaseVehicleHandler);
router.post("/:id/restock", authenticate, restockVehicleHandler);
router.put("/:id", authenticate, updateVehicleHandler);
router.delete("/:id", authenticate, deleteVehicleHandler);

export default router;