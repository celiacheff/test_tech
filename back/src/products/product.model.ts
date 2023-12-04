import { model, Schema, Document } from "mongoose";
import { Product } from "./core/product";

const ProductSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
    required: false,
  },
  updated_at: {
    type: Date,
    required: false,
  },
  quantity: {
    type: Number,
    required: false,
  },
});

export const ProductModel = model<Product & Document>("Product", ProductSchema);
