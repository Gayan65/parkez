import express from "express";
import "dotenv/config";
import mongoose from "mongoose";

import userRouter from "./routes/user.js";
import parkRouter from "./routes/parklot.js";
import buildingRouter from "./routes/building.js";
import parkRequestRouter from "./routes/parkingRequest.js";
import parkRequestUnassignRouter from "./routes/parkingRequestUnassign.js";
import tasksRoute from "./routes/tasks.js";

//express app
const app = express();

//envs
const port = process.env.PORT;
const db_url = process.env.DB_URL;

//middleware
app.use(express.json({ limit: "50mb" })); // FOR ACCESSING THE BODY IN A POST REQUEST, // Increase JSON limit to 50MB

app.use((req, res, next) => {
    console.log(`Request method : ${req.method}, Request path: ${req.path}`);
    next();
});

app.use("/api/user", userRouter);
app.use("/api/park", parkRouter);
app.use("/api/building", buildingRouter);
app.use("/api/park_request", parkRequestRouter);
app.use("/api/park_unassign_request", parkRequestUnassignRouter);
app.use("/api/tasks", tasksRoute);

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
