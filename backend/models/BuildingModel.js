import mongoose from "mongoose";

const { Schema } = mongoose;

const buildingSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
            required: true,
            unique: true,
        },
        address: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        imgFile: {
            type: String,
        },
    },
    { timestamps: true }
);

export const Building = mongoose.model("Building", buildingSchema);
