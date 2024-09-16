import "dotenv/config";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import randomstring from "randomstring";

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

const otpStore = {}; // for keep memory

export const userForgetEmailVerify = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.forgetEmailFind(email);

        //console.log(user.email);

        // Generate OTP
        let otp = randomstring.generate({ length: 4, charset: "numeric" });

        // Store OTP with expiry (e.g., 10 minutes from now)
        const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes in milliseconds
        otpStore[email] = { otp, expiresAt };

        //send OTP via email

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for port 465, false for other ports
            auth: {
                user: "ishinefs@gmail.com",
                pass: process.env.PASS,
            },
        });

        // async..await is not allowed in global scope, must use a wrapper
        async function main() {
            // send mail with defined transport object
            const info = await transporter.sendMail({
                from: '"ParkEz MOAS 🅿️" <ishinefs@mail.com>', // sender address
                to: email, // list of receivers
                subject: "ParkEz verification code", // Subject line
                text: "You requested a password reset. Please use the following four-digit code to activate your account", // plain text body
                html: `
         <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2 style="color: #226699;">🅿️ ParkEz Password Reset</h2>
            <p>
                You requested a password reset. Please use the following four-digit code to activate your account:
            </p>
            <p style="font-size: 18px; font-weight: bold; color: #226699;">${otp}</p>
            <p>
                If you didn't request this, please ignore this email or contact support.
            </p>
            <br/>
            <p>Best regards,</p>
            <p>The ParkEz Team 🅿️</p>
        </div>
    `, // html body
            });

            console.log("Message sent: %s", info.messageId);
        }

        main().catch(console.error);

        res.status(200).json({
            message: "OTP sent successfully!, Check your email.",
            success: true,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Verify OTP
export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Check if OTP exists for the given email
        if (!otpStore[email]) {
            return res
                .status(400)
                .json({ message: "No OTP found for this email" });
        }

        const { otp: storedOtp, expiresAt } = otpStore[email];

        // Check if OTP has expired
        if (Date.now() > expiresAt) {
            delete otpStore[email]; // Remove expired OTP
            return res.status(400).json({ message: "OTP has expired" });
        }

        // Verify the OTP
        if (otp === storedOtp) {
            // OTP is valid, delete it from the store and proceed with further actions (like activating the account)
            delete otpStore[email];
            await User.deleteOne({ email: email }); //delete user from the db
            return res
                .status(200)
                .json({ message: "OTP verified successfully" });
        } else {
            return res.status(400).json({ message: "Invalid OTP" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
