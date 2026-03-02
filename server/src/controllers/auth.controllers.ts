import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import storeOTP from "../lib/storeOTP";
import mailSender from "../lib/sendemail";
import verifyOTP from "../lib/verifyOTP";



async function sendOtp(req: Request, res: Response) {
  const { email } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },

    });
    if (existingUser !== null) {
      return res.status(409).json({ message: "User already exists" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const storeOTPResult = await storeOTP(email, otp);
    const EmailTitle = "Your OTP Code";
    const EmailBody = `<p>Your OTP code is: <strong>${otp}</strong></p><p>This code will expire in 5 minutes.</p>`;
    const mailInfo = await mailSender(email, EmailTitle, EmailBody);

    return res.status(200).json({ message: "OTP sent successfully", storeOTPResult, mailInfo });

  }
  catch (error) {
    console.error("Send OTP Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}



async function createUser(req: Request, res: Response) {
  try {
    const { name, email, password , otp } = req.body;

    if (!name || !email || !password || !otp) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });


    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const verifyOTPResult = await verifyOTP(email, otp);
    console.log(verifyOTPResult);
    



    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });

  } catch (error) {
    console.error("Create User Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  try {

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return res.status(401).json({ message: "user does't exits. create new account" });
    }

    // 🔐 Compare hashed password (only change here)
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Login successful", user: existingUser });
  }
  catch (error) {
    console.error("Login User Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function updateUser(req: Request, res: Response) {
  const { email, name, password } = req.body;

  try {

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
    });

    return res.status(200).json({
      message: "Password updated successfully",
      user: updatedUser,
    });
  }
  catch (error) {
    console.error("Update User Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}



async function deleteUser(req: Request, res: Response) {
  const { userId } = req.body;

  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export { createUser, loginUser, updateUser, sendOtp, deleteUser };