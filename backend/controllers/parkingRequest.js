import { ParkingRequest } from "../models/ParkingRequestModel.js";

//create a parking request
export const createParkingRequest = async (req, res) => {
  const { user, building, apartment, room, parkingLot, status, comments } =
    req.body;

  try {
    const parkingRequest = await ParkingRequest.create({
      user,
      building,
      apartment,
      room,
      parkingLot,
      status,
      comments,
    });
    res.status(200).json(parkingRequest);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// get all parking requests
export const getAllParkingRequests = async (req, res) => {
  try {
    const parkingRequests = await ParkingRequest.find();
    res.status(200).json(parkingRequests);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
