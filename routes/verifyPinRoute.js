import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import { verifyPin } from "../controllers/userAuthCotroller.js";
const verfifyPinRouter = express.Router();

verfifyPinRouter.post("/verify-pin", isAuthenticated, verifyPin);

export default verfifyPinRouter;