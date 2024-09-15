import express from "express";
import {
    userForgetPassword,
    userLogin,
    userSignup,
} from "../controllers/user.js";

const router = express.Router();

//user signup route
router.post("/signup", userSignup);

//user login route
router.post("/login", userLogin);

//user forget password route
router.post("/forget", userForgetPassword);

export default router;
