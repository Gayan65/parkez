import express from "express";
import {
    getAllUsers,
    getUser,
    userChangePassword,
    userEmailVerify,
    userForgetEmailVerify,
    userLogin,
    userSignup,
    verifyOTP,
    verifyOTPNoDeletion,
} from "../controllers/user.js";

const router = express.Router();

//user signup route
router.post("/signup", userSignup);

//user login route
router.post("/login", userLogin);

//user forget password routes
router.post("/forget", userForgetEmailVerify);
router.post("/otp_verify", verifyOTP);

//user email verify and change password routes
router.post("/email_verify", userEmailVerify);
router.post("/otp_verify_no_deletion", verifyOTPNoDeletion);
router.patch("/pw_change", userChangePassword);

//get all users (email, admin status)
router.get("/all", getAllUsers);

//get a user (email, admin status)
router.get("/get_user/:id", getUser);

export default router;
