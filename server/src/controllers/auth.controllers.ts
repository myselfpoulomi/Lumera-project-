import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

async function createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    } 
     const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
    }

    const newUser= await prisma.user.create({
        data: {
            name,  
            email,
            password, // In production, hash the password before storing
        },
        
    });

    return res.status(201).json({ message: "User created successfully", user: newUser });



}

async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body;   
        if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    } 

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
  if (!existingUser ) {
        return res.status(401).json({ message: "user does't exits. create new account" });
}

    if (existingUser.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

   return res.status(200).json({ message: "Login successful", user: existingUser });
}



  export { createUser , loginUser };




