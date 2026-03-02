import { Router } from "express";
import {createUser} from "../controllers/auth.controllers";
import { loginUser } from "../controllers/auth.controllers";
import { updateUser , sendOtp} from "../controllers/auth.controllers";
import { send } from "node:process";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser); 
router.put("/update", updateUser); 
router.post("/send-otp", sendOtp);


export default router;