import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createHotel);

// UPDATE
router.put("/:id", verifyAdmin, updateHotel);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

// GET

// GET ALL
router.get("/", getHotels);

// Count by City
router.get("/countByCity", countByCity);

// Count by Type
router.get("/countByType", countByType);

// Get Hotel Rooms
router.get("/room/:id", getHotelRooms);

router.get("/:id", getHotel);
export default router;
