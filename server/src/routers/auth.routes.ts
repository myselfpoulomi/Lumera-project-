import { Router } from "express";
import {createUser} from "../controllers/auth.controllers";
import { loginUser } from "../controllers/auth.controllers";
import { updateUser } from "../controllers/auth.controllers";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser); 
router.put("/update", updateUser); // Example of an update route, you can modify it as needed

export default router;