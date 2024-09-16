import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true },
});

//static methods

userSchema.statics.signup = async function (
    email,
    password,
    re_password,
    admin
) {
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

    //two passwords not match
    if (password != re_password) {
        throw Error("Both passwords do not match!");
    }

    //hashing passwords
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT));
    const hash = bcrypt.hashSync(password, salt);

    //send to db for creating user
    const user = await this.create({ email, password: hash, admin });

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

    const match = bcrypt.compareSync(password, user.password);

    if (!match) {
        throw Error("password is not match!");
    }

    return user;
};

//forget password
userSchema.statics.forgetEmailFind = async function (email) {
    // check bank fields
    if (!email) {
        throw Error("Field can not be blank!");
    }

    // check email
    if (!validator.isEmail(email)) {
        throw Error("email is not valid!");
    }

    //check the existence of the email
    const exist = await this.findOne({ email });
    if (!exist) {
        throw Error(
            "No such an email registered, Please contact administrator"
        );
    }

    return exist;
};

export const User = mongoose.model("User", userSchema);
