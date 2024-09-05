import express from "express";
import {
    createParkingUnassign,
    getAllParkingUnassignRequests,
    updateParkingUnassignRequest,
} from "../controllers/parkingRequestUnassign.js";

const router = express.Router();

//create parking request
router.post("/", createParkingUnassign);

//get all unassigned request
router.get("/", getAllParkingUnassignRequests);

//update parking unassign request status
router.patch("/:id", updateParkingUnassignRequest);

export default router;
