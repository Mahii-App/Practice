import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  _id: Number,
  userId: Number,
  productId: Number,
  quantity: Number
});

export default mongoose.model("Order", orderSchema);
