import { createProduct } from "../controllers/product.controller";
import { Router } from "express";

const router = Router();

router.post("/create-product", createProduct);


export default router;