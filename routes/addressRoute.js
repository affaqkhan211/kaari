import express from "express";
import { addAddress } from "../controllers/userAuthCotroller.js";
import isAuthenticated from "../middlewares/auth.js"
const addressRoute = express.Router();

addressRoute.post('/add-address', isAuthenticated,  addAddress);

export default addressRoute;