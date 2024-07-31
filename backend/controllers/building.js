import { Building } from "../models/BuildingModel.js";

//create building controller - admin only

export const createBuilding = async (req, res) => {
    const { number } = req.body;

    try {
        const building = await Building.create({ number });
        res.status(200).json(building);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

//get all buildings controller
export const allBuildings = async (req, res) => {
    try {
        const buildings = await Building.find();
        res.status(200).json(buildings);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
