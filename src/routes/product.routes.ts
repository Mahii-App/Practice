import { Router } from "express";
import { getAllProducts } from "../controllers/product.controllers";

const router = Router();

router.get("/", getAllProducts);

export default router;
