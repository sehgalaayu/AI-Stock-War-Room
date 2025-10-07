import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be atleast 2 characters"),
  email: z.string().email("Invalid Email"),
  password: z.string().min(6, "password must be 6 characters atleast long"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid Email"),
  password: z.string().min(1, "password is required"),
});

export const watchlistSchema = z.object({
  name: z.string().min(1, "Watclist name is required"),
});

export const addStockSchema = z.object({
  stockSymbol: z.string().min(1, "Stock symbol is required"),
});
