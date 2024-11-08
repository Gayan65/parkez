import express from "express";
import {
    allBuildings,
    createBuilding,
    deleteBuilding,
    get_a_Building,
    updateBuilding,
} from "../controllers/building.js";

const router = express.Router();

//get all building route
router.get("/", allBuildings);

//get a building from the building _id
router.get("/:id", get_a_Building);

//create building route - admin only
router.post("/", createBuilding);

//update a building
router.patch("/:id", updateBuilding);

//delete a building
router.delete("/:id", deleteBuilding);

export default router;
