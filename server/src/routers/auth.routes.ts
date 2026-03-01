import { Router } from "express";
import {createUser} from "../controllers/auth.controllers";
import { loginUser } from "../controllers/auth.controllers";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser); 

export default router;