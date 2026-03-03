import "dotenv/config";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routers/auth.routes";
import cors from "cors";
import adminRoutes from './routers/admin.routes'
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:8080", // your frontend port
    credentials: true,
  })
);

// Health route
app.get("/", (req: Request, res: Response) => {
  res.send("Node + TypeScript is working 🚀");
});

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/admin",adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});