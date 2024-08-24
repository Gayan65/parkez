import { ParkLot } from "../models/ParkLotModel.js";
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
