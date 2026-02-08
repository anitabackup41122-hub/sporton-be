import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
if (!secret) {
  console.error("Atlas URI Not Found Dummy");
  process.exit(1);
}

export interface AuthRequest extends Request {
  user?: any;
}

export default function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Authentication Required!" });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid Token" });
  }
};