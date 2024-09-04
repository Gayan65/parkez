import express from "express";
import {
    createParkingUnassign,
    getAllParkingUnassignRequests,
} from "../controllers/parkingRequestUnassign.js";

const router = express.Router();

//create parking request
router.post("/", createParkingUnassign);

//get all unassigned request
router.get("/", getAllParkingUnassignRequests);
export default router;
