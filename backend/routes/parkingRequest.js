import express from "express";
import {
  createParkingRequest,
  getAllParkingRequests,
} from "../controllers/parkingRequest.js";

const router = express.Router();

//create parking request
router.post("/", createParkingRequest);

//get all parking requests
router.get("/", getAllParkingRequests);

export default router;
