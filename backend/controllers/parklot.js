import { ParkLot } from "../models/ParkLotModel.js";

//create parking lot controller - admin only

export const createParkLot = async (req, res) => {
    const { lot, status } = req.body;

    try {
        const parkLot = await ParkLot.create({ lot, status });
        res.status(200).json(parkLot);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
