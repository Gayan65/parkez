import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

//static methods

userSchema.statics.signup = async function (email, password) {
    // check bank fields
    if (!email || !password) {
        throw Error("Field can not be blank!");
    }

    // check email
    if (!validator.isEmail(email)) {
        throw Error("email is not valid!");
    }

    // check password
    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong!");
    }

    //check the existence of the email
    const exist = await this.findOne({ email });
    if (exist) {
        throw Error("Email already exists!");
    }

    //send to db for creating user
    const user = await this.create({ email, password });

    return user;
};

userSchema.statics.login = async function (email, password) {
    // check bank fields
    if (!email || !password) {
        throw Error("Field can not be blank!");
    }

    //get the entire user
    const user = await this.findOne({ email });

    if (!user) {
        throw Error("user can not be found!");
    }

    if (user.password === password) {
        return user;
    } else {
        throw Error("password is not match!");
    }
};

export const User = mongoose.model("User", userSchema);
