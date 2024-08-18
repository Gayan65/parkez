import express from "express";
import { createParkingRequest } from "../controllers/parkingRequest.js";

const router = express.Router();

//test api
router.get("/", createParkingRequest);

export default router;
