// models/Reservation.js

import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model, replace 'User' with your actual User model name
      required: true,
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel", // Assuming you have a Hotel model, replace 'Hotel' with your actual Hotel model name
      required: true,
    },
    roomIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room", // Assuming you have a Room model, replace 'Room' with your actual Room model name
        required: true,
      },
    ],
    roomNumIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room", // Assuming you have a Room model, replace 'Room' with your actual Room model name
        required: true,
      },
    ],
    dates: {
      type: [Date],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
