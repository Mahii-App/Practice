import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HTTP_CODES } from "../constants/httpcode";
import { ERRORS } from "../constants/error";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(HTTP_CODES.UNAUTHORIZED).json({ error: ERRORS.UNAUTHORIZED });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(HTTP_CODES.UNAUTHORIZED).json({ error: ERRORS.UNAUTHORIZED });
  }
};