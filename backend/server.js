import express from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

//server
app.listen(port, () => {
    console.log(`server is running on port no: ${port}`);
});
