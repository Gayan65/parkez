import express from "express";
import { allBuildings, createBuilding } from "../controllers/building.js";

const router = express.Router();

//get all building route
router.get("/", allBuildings);

//create building route - admin only
router.post("/", createBuilding);

export default router;
