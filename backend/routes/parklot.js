import express from "express";
import {
  allParkLots,
  allParkLotsBuilding,
  createParkLot,
  updateParkLot,
} from "../controllers/parklot.js";

const router = express.Router();

//get all parking lots rote
router.get("/", allParkLots);

// get all parking lots belongs to a building
router.get("/:id", allParkLotsBuilding);

//create parking lot route - admin only
router.post("/", createParkLot);

//update parkLot status, and assigned a user
router.patch("/:id", updateParkLot);

export default router;
