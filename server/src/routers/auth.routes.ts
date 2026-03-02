import { Router } from "express";
import {
  createUser,
  loginUser,
  updateUser,
  sendOtp,
  deleteUser,
  getMe,
  logoutUser,
} from "../controllers/auth.controllers";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", requireAuth, getMe);
router.put("/update", updateUser);
router.post("/send-otp", sendOtp);
router.delete("/delete-account", requireAuth, deleteUser);

export default router;