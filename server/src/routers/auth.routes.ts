import { Router } from "express";
import { createUser, loginUser, updateUser, sendOtp, deleteUser } from "../controllers/auth.controllers";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.put("/update", updateUser);
router.post("/send-otp", sendOtp);
router.delete("/delete-account", deleteUser);

export default router;