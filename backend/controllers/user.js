import mongoose from "mongoose";
import { User } from "../models/UserModel.js";

//signup function
export const userSignup = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.signup(email, password);

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//login function
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.login(email, password);

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
