import { Building } from "../models/BuildingModel.js";

//create building controller - admin only

export const createBuilding = async (req, res) => {
  const { name, number, image } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }

  if (!number) {
    emptyFields.push("number");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "Name & Number fields must be filed",
      emptyFields: emptyFields,
    });
  }

  try {
    const building = await Building.create({ name, number, image });
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
