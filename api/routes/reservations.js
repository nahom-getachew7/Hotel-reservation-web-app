// routes/reservationRoutes.js
import express from "express";
import { createReservation, getAllReservations, getUserReservations, getReservationById, updateReservation, deleteReservation } from "../controllers/reservation.js";
const router = express.Router();

// Create a reservation
router.post("/", createReservation);

// Get all reservations
router.get("/", getAllReservations);

// Get a specific reservation by ID
router.get("/:id", getReservationById);
router.get(
  "/users/:id",
  getUserReservations
);

// Update a reservation by ID
router.put("/:id", updateReservation);

// Delete a reservation by ID
router.delete("/:id", deleteReservation);

export default router;
