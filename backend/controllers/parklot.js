import { ParkLot } from "../models/ParkLotModel.js";

//create parking lot controller - admin only

export const createParkLot = async (req, res) => {
    const { lot, status, building_id } = req.body;

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
