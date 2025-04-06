import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  price: Number
});

export default mongoose.model("Product", productSchema);
