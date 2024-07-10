import express from "express";
import "dotenv/config";
import mongoose from "mongoose";

import userRouter from "./routes/user.js";

//express app
const app = express();

//envs
const port = process.env.PORT;
const db_url = process.env.DB_URL;

//middleware
app.use((req, res, next) => {
    console.log(`Request method : ${req.method}, Request path: ${req.path}`);
    next();
});

app.use("/api/user", userRouter);

//db connection
mongoose
    .connect(db_url)
    .then(() => {
        //server
        app.listen(port, () => {
            console.log(`DB connected, server is running on port no: ${port}`);
        });
    })
    .catch((err) => console.log(err));
