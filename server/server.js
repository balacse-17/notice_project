import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import noticeRoutes from "./routes/noticeRoutes.js";

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("<h1>Welcome to Department Notice Board</h1><p>Backend server is running.</p>");
});

app.get("/faculty", (_req, res) => {
  res.json(["Dr. Kumar", "Dr. Priya", "Prof. Ravi", "Prof. Meena"]);
});

app.use("/api/notices", noticeRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  try {
    await connectDB();
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.error("Start MongoDB or update MONGODB_URI in server/.env, then restart the server.");
  }
});
