import mongoose from "mongoose";

const { Schema } = mongoose;

const buildingSchema = new Schema(
    {
        number: {
            type: Number,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

export const Building = mongoose.model("Building", buildingSchema);
