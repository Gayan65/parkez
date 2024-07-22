import express from "express";
import { allParkLots, createParkLot } from "../controllers/parklot.js";

const router = express.Router();

//get all parking lots rote
router.get("/", allParkLots);

//create parking lot route - admin only
router.post("/", createParkLot);

export default router;
