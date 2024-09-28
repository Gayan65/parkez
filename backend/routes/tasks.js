import express from "express";
import { getNumberOfTasks } from "../controllers/tasks.js";

const router = express.Router();

//create parking request
router.get("/", getNumberOfTasks);

export default router;
