import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
const prisma = new PrismaClient();
const SALT_ROUNDS = 10;
const SECRET_KEY = "your_secret_key";

// Signup Route
router.post("/signup", async (req:Request, res:Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;

    // Check if a user already exists
    const existingUser = await prisma.user.findFirst();
    if (existingUser) {
      return res.status(400).json({ error: "A user already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login Route
router.post("/login", async (req:Request, res:Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    // Find the user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Check if a user already exists (used on the frontend to determine if auth should be login/signup)
router.get("/status", async (req:Request, res:Response): Promise<any> => {
  try {
    const user = await prisma.user.findFirst();
    if (user) {
      return res.json({ hasUser: true });
    } else {
      return res.json({ hasUser: false });
    }
  } catch (error) {
    console.error("Status check error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
