import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
  name:{
    type: String,
    require: true,
    select: true,
  },
  price:{
    type: Number,
    required:true,
    unique: true,
    lowercase: true,
  },
  image:{
    type: String,
    required:true,
    unique: true,
    lowercase: true,
  },
  description:{
    type: String,
    required:true,
    unique: true,
    lowercase: true,
},
});

export default mongoose.model("Product", ProductSchema);