import prisma from "../lib/prisma";
import { hashPwd, comparePwd, generateToken } from "../lib/auth";
import { registerSchema, loginSchema } from "../lib/validation";
import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

//POST  - api/auth/register
router.post("/register", async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const { name, email, password } = validatedData;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      res.status(400).json({
        error: "User already exists",
      });
    }
    const hashed = await hashPwd(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
      },
    });
    const token = generateToken(user.id);
    res.status(201).json({
      message: "User created successfully",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({
      error: "Server error",
    });
    console.log("User could not be created : ", error);
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValidPassword = await comparePwd(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user.id);

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Login failed" });
    }
  }
});

export default router;
