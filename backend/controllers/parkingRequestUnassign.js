import mongoose from "mongoose";
import { ParkingRequestUnassign } from "../models/ParkingRequestUnassign.js";

//create parking unassign request
export const createParkingUnassign = async (req, res) => {
    const {
        user,
        building,
        apartment,
        room,
        parkingLot,
        parkingLot_id,
        status,
        comments,
        requestComment,
    } = req.body;

    try {
        const parkingRequestUnassign = await ParkingRequestUnassign.create({
            user,
            building,
            apartment,
            room,
            parkingLot,
            parkingLot_id,
            status,
            comments,
            requestComment,
        });
        res.status(200).json(parkingRequestUnassign);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};