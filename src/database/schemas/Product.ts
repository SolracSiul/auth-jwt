import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    select: true,
  },
  price: {
    type: Number,
    required: true,
    unique: false,  
  },
  image: {
    type: String,
    required: true,
    unique: false,  
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
    unique: false, 
    lowercase: true,
  },
});

export default mongoose.model("Product", ProductSchema);