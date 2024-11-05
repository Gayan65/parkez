import express from "express";
import {
    allParkLots,
    allParkLotsBuilding,
    allParkLotUser,
    createParkLot,
    deleteParkingLot,
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

//get all parking lots belongs to an email (user)
router.post("/by_email", allParkLotUser);

//delete parking lot
router.delete("/:id", deleteParkingLot);

export default router;
