import { Router } from "express";
import Notice from "../models/Notice.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: "Could not load notices. Check MongoDB connection." });
  }
});

router.post("/", async (req, res) => {
  const title = typeof req.body.title === "string" ? req.body.title.trim() : "";
  const message = typeof req.body.message === "string" ? req.body.message.trim() : "";

  if (!title || !message) {
    return res.status(400).json({ message: "Title and message are required." });
  }

  try {
    const notice = await Notice.create({ title, message });
    res.status(201).json(notice);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Please check the notice fields." });
    }
    res.status(500).json({ message: "Could not save notice. Check MongoDB connection." });
  }
});

export default router;
