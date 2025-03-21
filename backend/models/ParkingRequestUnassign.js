import mongoose from "mongoose";

const { Schema } = mongoose;

const parkingRequestUnassignSchema = new Schema(
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
        parkingLot_id: {
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
        requestComment: {
            type: String,
        },
    },
    { timestamps: true }
);

export const ParkingRequestUnassign = mongoose.model(
    "ParkingRequestUnassign",
    parkingRequestUnassignSchema
);
