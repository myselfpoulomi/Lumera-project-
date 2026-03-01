import express, { Request, Response } from "express";
import authRoutes from "./routers/auth.routes";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Health route
app.get("/", (req: Request, res: Response) => {
  res.send("Node + TypeScript is working 🚀");
});

// Mount routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});