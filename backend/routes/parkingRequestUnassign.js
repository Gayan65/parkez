import express from "express";
import { createParkingUnassign } from "../controllers/parkingRequestUnassign.js";

const router = express.Router();

//create parking request
router.post("/", createParkingUnassign);

export default router;
