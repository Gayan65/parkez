import express from "express";
import { userSignup } from "../controllers/user.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message: "okay",
    });
});

router.post("/", userSignup);
export default router;
