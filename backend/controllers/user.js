import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "../models/UserModel.js";

// taken creating function
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//signup function
export const userSignup = async (req, res) => {
    try {
        const { email, password, re_password, admin } = req.body;

        const user = await User.signup(email, password, re_password, admin);

        //create token
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//login function
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.login(email, password);

        //create token
        const token = createToken(user._id);

        //admin status
        const admin = user.admin;

        res.status(200).json({ email, token, admin });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//forget password
export const userForgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.forget(email);

        res.status(200).json({ message: "user Deleted successfully!" }); //delete the user from the db notification
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
