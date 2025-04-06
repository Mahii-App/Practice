import { Request, Response } from "express";
import User from "../models/user";
import { HTTP_CODES } from "../constants/httpcode";
import { ERRORS } from "../constants/error";


export const getAllUsers = async (req: Request, res: Response) => {
	try {
	  const users = await User.find();
	  res.status(HTTP_CODES.OK).json(users);
	} catch {
	  res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: ERRORS.SERVER_ERROR });
	}
  };
export const createUser = async (req: Request, res: Response) => {
	try {
	  const newUser = await User.create(req.body);
	  res.status(HTTP_CODES.CREATED).json(newUser);
	} catch {
	  res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: ERRORS.SERVER_ERROR });
	}
  };
  
  export const updateUser = async (req: Request, res: Response) => {
	try {
	  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
	  res.status(HTTP_CODES.OK).json(updated);
	} catch {
	  res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: ERRORS.SERVER_ERROR });
	}
  };
  
  export const deleteUser = async (req: Request, res: Response) => {
	try {
	  await User.findByIdAndDelete(req.params.id);
	  res.status(HTTP_CODES.NO_CONTENT).send();
	} catch {
	  res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: ERRORS.SERVER_ERROR });
	}
  };
  