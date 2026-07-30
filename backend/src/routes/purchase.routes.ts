import { Router } from "express";
import { getAllPurchasesHandler } from "../controllers/purchase.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorizeAdmin } from "../middleware/admin.middleware";

const router = Router();

router.get("/", authenticate, authorizeAdmin, getAllPurchasesHandler);

export default router;
