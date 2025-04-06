import { Request, Response } from "express";
import Product from "../models/product";
import { HTTP_CODES } from "../constants/httpcode";
import { ERRORS } from "../constants/error";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(HTTP_CODES.OK).json(products);
  } catch (error) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: ERRORS.SERVER_ERROR });
  }
};
