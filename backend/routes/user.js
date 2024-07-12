import express from "express";
import { userLogin, userSignup } from "../controllers/user.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message: "okay",
    });
});

//user signup route
router.post("/signup", userSignup);

//user login route
router.post("/login", userLogin);

export default router;
