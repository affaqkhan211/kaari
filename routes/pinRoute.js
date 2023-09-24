import express from "express";
const pinRouter = express.Router()
import { setPin, verifyPin } from "../controllers/userAuthCotroller.js";
import isAuthenticated from "../middlewares/auth.js";


pinRouter.post('/add-pin', isAuthenticated,  setPin);
pinRouter.post("/verify-pin", isAuthenticated ,verifyPin)

export default pinRouter;