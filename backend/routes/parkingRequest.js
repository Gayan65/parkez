import express from "express";

const router = express.Router();

//test api
router.get("/", (req, res) => {
    res.status(200).json({
        message: "successful!",
    });
});

export default router;
