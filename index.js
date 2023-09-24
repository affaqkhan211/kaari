import express from "express";
const app = express();
import dotenv from "dotenv";
import Connection from "./db/conn.js";
import userAuthRouter from "./routes/userAuthRoutes.js";
import cors from "cors";
import addressRoute from "./routes/addressRoute.js";

dotenv.config()
const PORT = process.env.PORT ;
app.use(cors());
app.use((req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
    });

    next();
});
Connection()
app.use(express.json())

// routes
app.use("/api/v1/user", userAuthRouter);
app.use("/api/v1/user/address", addressRoute);



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})