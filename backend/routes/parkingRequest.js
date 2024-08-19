import express from "express";
import {
  createParkingRequest,
  getAllParkingRequests,
  updateParkingRequest,
} from "../controllers/parkingRequest.js";

const router = express.Router();

//create parking request
router.post("/", createParkingRequest);

//get all parking requests
router.get("/", getAllParkingRequests);

//update parking request status
router.patch("/:id", updateParkingRequest);

export default router;
