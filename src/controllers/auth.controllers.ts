import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import { HTTP_CODES } from "../constants/httpcode";
import { ERRORS } from "../constants/error";
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(HTTP_CODES.CREATED).json(newUser);
  } catch (error) {
    res
      .status(HTTP_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: ERRORS.SERVER_ERROR });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(HTTP_CODES.UNAUTHORIZED).json({ error: ERRORS.UNAUTHORIZED });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(HTTP_CODES.UNAUTHORIZED).json({ error: ERRORS.UNAUTHORIZED });
      return;
    }

    const token = generateToken({ id: user._id, email: user.email });
    res.status(HTTP_CODES.OK).json({ token });
  } catch (error) {
    res
      .status(HTTP_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: ERRORS.SERVER_ERROR });
  }
};