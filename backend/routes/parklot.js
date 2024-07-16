import express from "express";
import { createParkLot } from "../controllers/parklot.js";

const router = express.Router();

//test route
router.get("/", (req, res) => {
    res.status(200).json({
        message: "okay",
    });
});

//create parking lot route - admin only
router.post("/", createParkLot);

export default router;
