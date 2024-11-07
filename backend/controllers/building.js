import { Building } from "../models/BuildingModel.js";

import mongoose from "mongoose";

//create building controller - admin only

export const createBuilding = async (req, res) => {
    const { name, number, image, imgFile, address } = req.body;

    let emptyFields = [];

    if (!name) {
        emptyFields.push("name");
    }

    if (!number) {
        emptyFields.push("number");
    }

    if (!address) {
        emptyFields.push("address");
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({
            error: "Name, Number & Address fields must be filed",
            emptyFields: emptyFields,
        });
    }

    try {
        const building = await Building.create({
            name,
            number,
            image,
            imgFile,
            address,
        });
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

//get a building from building _id

export const get_a_Building = async (req, res) => {
    const building_id = req.params.id;

    try {
        const building = await Building.find({ _id: building_id });
        res.status(200).json(building);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

//update a building from building id
export const updateBuilding = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "building not found" });
    }

    const building = await Building.findByIdAndUpdate(
        { _id: id },
        {
            ...req.body,
        },
        { new: true } // This returns the updated document
    );

    if (!building) {
        return res.status(404).json({ error: "building not found" });
    }

    res.status(200).json(building);
};

// delete a building (if the building does not have any parking lot allocated)
