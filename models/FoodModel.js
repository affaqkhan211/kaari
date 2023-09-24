import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: String, // You might consider using a Number type if you plan to perform arithmetic operations
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  deliveryTime: {
    type: String,
    required: true
  }
});

const Food = mongoose.model('Food', foodSchema);

export default Food
