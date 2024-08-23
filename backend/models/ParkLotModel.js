import mongoose from "mongoose";

const { Schema } = mongoose;

const parkLotSchema = new Schema(
  {
    lot: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    building_id: {
      type: String,
      required: true,
    },
    user: {
      type: String,
    },
  },
  { timestamps: true }
);

export const ParkLot = mongoose.model("ParkLot", parkLotSchema);
