import { Router } from "express";
import { getAllOrders } from "../controllers/order.controllers";

const router = Router();

router.get("/", getAllOrders);

export default router;
