import express from "express";
const app = express();
import dotenv from "dotenv";
import Connection from "./db/conn.js";
import userAuthRouter from "./routes/userAuthRoutes.js";

dotenv.config()
const PORT = process.env.PORT ;
Connection()
app.use(express.json())

// routes
app.use("/api/v1/user", userAuthRouter);



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})