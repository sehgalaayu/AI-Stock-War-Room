import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/auth";

interface AuthRequest extends Request {
  //Normally, req (request) doesn’t have a userId property by default.
  // //So we extend the Request type and add userId to it.
  userId?: string;
}

export const validateAuthentication = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; //Bearer token

  if (!token) {
    return res.status(401).json({
      error: "Access token required",
    });
  }

  try {
    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
