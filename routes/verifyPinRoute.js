import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import { verifyPin } from "../controllers/userAuthCotroller.js";
const verifyPinRouter = express.Router();

verifyPinRouter.post("/verify-pin", isAuthenticated, verifyPin);

export default verifyPinRouter;