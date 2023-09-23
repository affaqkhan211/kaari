import express from "express";
const userAuthRouter = express.Router();
import { addAddress, login, setPin, userSignup, verifyPin } from "../controllers/userAuthCotroller.js";
import isAuthenticated from "../middlewares/auth.js";

userAuthRouter.post("/signup", userSignup);
userAuthRouter.post("/login", login);
// userAuthRouter.post('/:userId/verify', sendVerificationCode);
userAuthRouter.post('/:userId/add-address', addAddress);
userAuthRouter.post('/:userId/set-pin', setPin);
userAuthRouter.post('/:userId/verify-pin', verifyPin);

export default userAuthRouter;