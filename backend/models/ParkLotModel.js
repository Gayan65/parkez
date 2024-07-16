import mongoose from "mongoose";

const { Schema } = mongoose;

const parkLotSchema = new Schema({
    lot: {
        type: Number,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        required: true,
    },
});

export const ParkLot = mongoose.model("ParkLot", parkLotSchema);
