import Food from "../models/FoodModel.js";

export const getFoodData = async (req, res) => {
  try {
    const foodData = await Food.find();
    res.json(foodData);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
