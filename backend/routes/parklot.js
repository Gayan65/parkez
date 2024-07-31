import express from "express";
import {
    allParkLots,
    allParkLotsBuilding,
    createParkLot,
} from "../controllers/parklot.js";

const router = express.Router();

//get all parking lots rote
router.get("/", allParkLots);

// get all parking lots belongs to a building
router.get("/:id", allParkLotsBuilding);

//create parking lot route - admin only
router.post("/", createParkLot);

export default router;
