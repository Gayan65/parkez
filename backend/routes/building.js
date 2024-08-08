import express from "express";
import {
  allBuildings,
  createBuilding,
  get_a_Building,
} from "../controllers/building.js";

const router = express.Router();

//get all building route
router.get("/", allBuildings);

//get a building from the building _id
router.get("/:id", get_a_Building);

//create building route - admin only
router.post("/", createBuilding);

export default router;
