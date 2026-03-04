import { get } from "http";
import { createProduct , getProducts } from "../controllers/product.controller";
import { Router } from "express";

const router = Router();

router.post("/create-product", createProduct);
router.get("/get-products", getProducts)


export default router;