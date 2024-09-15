import express from "express";
import {
    userForgetEmailVerify,
    userLogin,
    userSignup,
    verifyOTP,
} from "../controllers/user.js";

const router = express.Router();

//user signup route
router.post("/signup", userSignup);

//user login route
router.post("/login", userLogin);

//user forget password routes
router.post("/forget", userForgetEmailVerify);
router.post("/otp_verify", verifyOTP);

export default router;
