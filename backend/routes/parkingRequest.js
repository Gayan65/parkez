import express from "express";
import {
    createParkingRequest,
    getAllParkingRequests,
    getDuplicatePendingRequests,
    updateParkingRequest,
} from "../controllers/parkingRequest.js";

const router = express.Router();

//create parking request
router.post("/", createParkingRequest);

//get all parking requests
router.get("/", getAllParkingRequests);

//update parking request status
router.patch("/:id", updateParkingRequest);

//get duplicate pending requests
router.get("/duplicate/:id", getDuplicatePendingRequests);

export default router;
