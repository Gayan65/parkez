import express from "express";
import "dotenv/config";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT;
const db_url = process.env.DB_URL;

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
