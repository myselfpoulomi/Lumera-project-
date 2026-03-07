import { createProduct , getProducts, getProductByID, updateProduct,deleteProduct, getProductsByCategory, getProductsBySkinType} from "../controllers/product.controller";
import { Router } from "express";

const router = Router();

router.post("/create-product", createProduct);
router.get("/get-products", getProducts)
router.get("/get-product/:id", getProductByID)
router.put("/update-product/:id", updateProduct)
router.delete("/delete-product/:id", deleteProduct)
router.get("/get-products/category/:category", getProductsByCategory)
router.get("/get-products/skin-type/:skinType", getProductsBySkinType)
export default router;