import express from "express";
const userAuthRouter = express.Router();
import { login, setPin, userSignup, verifyPin } from "../controllers/userAuthCotroller.js";

userAuthRouter.post("/signup", userSignup);
userAuthRouter.post("/login", login);

userAuthRouter.post('/:userId/set-pin', setPin);
userAuthRouter.post('/:userId/verify-pin', verifyPin);

export default userAuthRouter;