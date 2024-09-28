import mongoose from "mongoose";
import { ParkingRequest } from "../models/ParkingRequestModel.js";

//create a parking request
export const createParkingRequest = async (req, res) => {
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
        const parkingRequest = await ParkingRequest.create({
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
        res.status(200).json(parkingRequest);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

// get all parking requests
export const getAllParkingRequests = async (req, res) => {
    try {
        const parkingRequests = await ParkingRequest.find();
        res.status(200).json(parkingRequests);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

// update the status of the parking request ("initiate to approved or rejected")
export const updateParkingRequest = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "parking request not found" });
    }

    const parkingRequest = await ParkingRequest.findByIdAndUpdate(
        { _id: id },
        {
            ...req.body,
        }
    );

    if (!parkingRequest) {
        return res.status(404).json({ error: "parking request not found" });
    }

    res.status(200).json(parkingRequest);
};

//search for pending requests in a same email address
export const getDuplicatePendingRequests = async (req, res) => {
    try {
        const user = req.params.id;
        const parkingRequests = await ParkingRequest.find({
            user: user,
            status: "initiate",
        });
        // If there is at least one pending request, return true, otherwise false
        if (parkingRequests.length > 0) {
            res.status(200).json(true);
        } else {
            res.status(200).json(false);
        }
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
