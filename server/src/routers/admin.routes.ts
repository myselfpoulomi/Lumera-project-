import { Router } from "express";
import { loginUser,logoutUser } from "../controllers/admin.controllers";
import { createAdmin } from "../controllers/admin.controllers";


const router = Router();

router.post("/login-admin", loginUser);
router.post("/logout-admin", logoutUser);
router.post("/create-admin", createAdmin);

export default router;
