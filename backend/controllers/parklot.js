import { ParkLot } from "../models/ParkLotModel.js";
import { Building } from "../models/BuildingModel.js";
import mongoose from "mongoose";

//create parking lot controller - admin only

export const createParkLot = async (req, res) => {
    const { lot, status, building_id } = req.body;

    let emptyFields = [];

    if (!lot) {
        emptyFields.push("lot");
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({
            error: "Lot number must be filed",
            emptyFields: emptyFields,
        });
    }

    if (lot <= 0) {
        return res.status(400).json({
            error: "Value should be more than 0",
        });
    }

    const findDuplicate = await ParkLot.find({
        lot: lot,
        building_id: building_id,
    });

    if (findDuplicate.length > 0) {
        return res.status(400).json({
            error: "Duplicate parking lot can not be created!",
        });
    }
    try {
        const parkLot = await ParkLot.create({ lot, status, building_id });
        res.status(200).json(parkLot);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

//get all parking lots controller - home page
export const allParkLots = async (req, res) => {
    try {
        const parkLots = await ParkLot.find();
        res.status(200).json(parkLots);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

//get all parking lots belongs to a building
export const allParkLotsBuilding = async (req, res) => {
    try {
        const building_id = req.params.id;
        const parkLots = await ParkLot.find({ building_id });
        res.status(200).json(parkLots);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

//update parking lot (status to "PENDING" and user with "EMAIL") from parking lot id
export const updateParkLot = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "parkLot not found" });
    }

    const parkLot = await ParkLot.findByIdAndUpdate(
        { _id: id },
        {
            ...req.body,
        }
    );

    if (!parkLot) {
        return res.status(404).json({ error: "park lot not found" });
    }

    res.status(200).json(parkLot);
};

//get all parking lots belongs to an email (user)
export const allParkLotUser = async (req, res) => {
    try {
        const { user } = req.body;
        console.log("you are here", user);
        const parkLots = await ParkLot.find({ user: user });
        res.status(200).json(parkLots);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

//delete a parking lot (if the status = "active" only)..
export const deleteParkingLot = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Parking lot not found" });
    }

    // Find the parking lot by ID
    const parkingLot = await ParkLot.findById(id);

    // Check if parking lot exists and has "active" status
    if (!parkingLot) {
        return res.status(404).json({ error: "Parking lot not found" });
    } else if (parkingLot.status !== "active") {
        return res
            .status(400)
            .json({ error: "Only active parking lots can be deleted" });
    }

    await ParkLot.findByIdAndDelete({ _id: id });

    res.status(200).json(parkingLot);
};

//get all parking lots and building details belongs to an email (user)
export const allParkLotBuildingsUser = async (req, res) => {
    try {
        const { user } = req.body;
        const parkLots = await ParkLot.find({ user: user });

        if (parkLots.length === 0) {
            return res.status(200).json([]);
        }

        // Map over parking lots to fetch building details
        const result = await Promise.all(
            parkLots.map(async (parkLot) => {
                const building = await Building.findById(parkLot.building_id);
                return {
                    email: user,
                    parking_id: parkLot._id,
                    parking_lot_number: parkLot.lot,
                    building_id: building._id,
                    building_name: building.name,
                    building_number: building.number,
                };
            })
        );

        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
