import {Response, Request} from "express";
import {prisma} from "../lib/prisma";
import bcrypt from "bcrypt";
import { log } from "console";



async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body; 
  log("Login Request Body:", req.body);
    try {       
        const user = await prisma.admin.findUnique({ 
            where: { email },
        });     
        if (!user) {            
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);  
        if (!isPasswordValid) {            
            return res.status(401).json({ message: "Invalid credentials" });
        }       
        return res.status(200).json({ message: "Login successful", user });
    } catch (error) {               
        console.error("Login User Error:", error);      
        return res.status(500).json({ message: "Internal server error" });
    }
}   

async function logoutUser(req: Request, res: Response) {
    try {
        res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "strict" });         
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout User Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }    
}

async function createAdmin(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const existingAdmin = await prisma.admin.findUnique({
            where: { email },
        });     
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }   
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await prisma.admin.create({
            data: {
                email,
                password: hashedPassword,
            },
        });     
        return res.status(201).json({ message: "Admin created successfully", admin: newAdmin });
    } catch (error) {
        console.error("Create Admin Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export  {
        loginUser,
        logoutUser,
        createAdmin
} 