import { Request, Response } from "express";
import Order from "../models/order";
import { HTTP_CODES } from "../constants/httpcode";
import { ERRORS } from "../constants/error";

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.status(HTTP_CODES.OK).json(orders);
  } catch (error) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: ERRORS.SERVER_ERROR });
  }
};
