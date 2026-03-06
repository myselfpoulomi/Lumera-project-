import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} from "../controllers/cart.controllers";

const router = Router();

router.use(requireAuth);

router.post("/add", addToCart);
router.get("/", getCart);
router.put("/items/:itemId", updateCartItem);
router.delete("/items/:itemId", removeCartItem);

export default router;
