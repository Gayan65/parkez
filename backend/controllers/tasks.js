import mongoose from "mongoose";
import { ParkingRequest } from "../models/ParkingRequestModel.js";
import { ParkingRequestUnassign } from "../models/ParkingRequestUnassign.js";

//Get all number of tasks
export const getNumberOfTasks = async (req, res) => {
    try {
        //parking requests
        const parkingRequestsInitiated = await ParkingRequest.find({
            status: "initiate",
        });
        const parkingRequestsInitiatedTotal = parkingRequestsInitiated.length;

        //parking unassign requests
        const parkingUnassignRequestsInitiated =
            await ParkingRequestUnassign.find({
                status: "initiate",
            });

        const parkingUnassignRequestsInitiatedTotal =
            parkingUnassignRequestsInitiated.length;

        const totalTasks =
            parkingRequestsInitiatedTotal +
            parkingUnassignRequestsInitiatedTotal;
        res.status(200).json(totalTasks);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
