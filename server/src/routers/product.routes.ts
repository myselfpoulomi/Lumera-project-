import { createProduct , getProducts, getProductByID, updateProduct} from "../controllers/product.controller";
import { Router } from "express";

const router = Router();

router.post("/create-product", createProduct);
router.get("/get-products", getProducts)
router.get("/get-product/:id", getProductByID)
router.put("/update-product/:id", updateProduct)

export default router;