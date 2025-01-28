import express from "express";
import {
    deleteUser,
    getAllUsers,
    getUser,
    updateUserStatus,
    userChangePassword,
    userEmailVerify,
    userEmailVerifySignUp,
    userForgetEmailVerify,
    userLogin,
    userSignup,
    verifyOTP,
    verifyOTPNoDeletion,
} from "../controllers/user.js";

const router = express.Router();

//user signup route
router.post("/email_verify_signup", userEmailVerifySignUp);
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

//update user status
router.patch("/update_user_status/:id", updateUserStatus);

//delete user (if the user does not have any allocated parking)
router.delete("/delete_user/:id", deleteUser);

export default router;
