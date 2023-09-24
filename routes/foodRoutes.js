import express from "express";
import { getFoodData } from "../controllers/foodController.js";
const foodRouter = express.Router();

foodRouter.get("/get-food-data", getFoodData)

export default foodRouter