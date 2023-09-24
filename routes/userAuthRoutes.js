import express from "express";
const userAuthRouter = express.Router();
import { login, userSignup } from "../controllers/userAuthCotroller.js";

userAuthRouter.post("/signup", userSignup);
userAuthRouter.post("/login", login);


export default userAuthRouter;