import mongoose from "mongoose";

const { Schema } = mongoose;

const parkingRequestSchema = new Schema(
    {
        user: {
            type: String,
            required: true,
        },
        building: {
            type: String,
            required: true,
        },
        apartment: {
            type: String,
            required: true,
        },
        room: {
            type: String,
        },
        parkingLot: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        comments: {
            type: String,
        },
    },
    { timestamps: true }
);

export const ParkingRequest = mongoose.model(
    "ParkingRequest",
    parkingRequestSchema
);
