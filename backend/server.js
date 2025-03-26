import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.js";
import parkRouter from "./routes/parklot.js";
import buildingRouter from "./routes/building.js";
import parkRequestRouter from "./routes/parkingRequest.js";
import parkRequestUnassignRouter from "./routes/parkingRequestUnassign.js";
import tasksRoute from "./routes/tasks.js";

import requireAuth from "./middleware/requireAuth.js";

//express app
const app = express();

// CORS Configuration
const corsOptions = {
    origin: [
        "http://localhost:3000", // Local development
        "http://13.60.63.249", // Your production domain
        "http://13.60.63.249:3000", // Production frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
};

// Apply CORS middleware
app.use(cors(corsOptions));

//envs
const port = process.env.PORT;
const db_url = process.env.DB_URL;

//middleware
app.use(express.json({ limit: "15mb" })); // FOR ACCESSING THE BODY IN A POST REQUEST, // Increase JSON limit to 50MB

app.use((req, res, next) => {
    console.log(`Request method : ${req.method}, Request path: ${req.path}`);
    next();
});

app.use("/api/user", userRouter); // User route has to perform before the middleware

app.use(requireAuth); // Authorization middleware

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
