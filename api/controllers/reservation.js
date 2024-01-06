import Reservation from "../models/Reservation.js";
import User from "../models/User.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
export const createReservation = async (req, res) => {
  try {
    const { userId, hotelId, roomIds, roomNumIds, dates } = req.body;

    // Create a new reservation
    const reservation = new Reservation({
      userId,
      hotelId,
      roomIds,
      roomNumIds,
      dates,
    });

    // Save the reservation in the database
    await reservation.save();

    res
      .status(201)
      .json({ message: "Reservation saved successfully", reservation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add other reservation-related controller functions as needed

export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// export const getUserReservations = async (req, res) => {
//   try {
//     const userId = req.params.userId; // Assuming userId is passed as a URL parameter
//     const reservations = await Reservation.find({ userId });

//     res.status(200).json({ reservations });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
export const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.status(200).json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateReservation = async (req, res) => {
  // ... (similar to createReservation)
    try {
    const { userId, hotelId, roomIds, dates } = req.body;

    // Create a new reservation
    const reservation = new Reservation({
      userId,
      hotelId,
      roomIds,
      dates,
    });

    // Save the reservation in the database
    await reservation.save();
  res
    .status(200)
    .json({ message: "Reservation updated successfully", reservation });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(
      req.params.id
    );
    if (!deletedReservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res
      .status(200)
      .json({
        message: "Reservation deleted successfully",
        deletedReservation,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// export const getUserReservations = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);
//     // console.log(`Found user ${user}`)
//     const list = await Promise.all(
//       user.reservation.map(async (reservId) => {
//         const reservation = await Reservation.findById(reservId);

//         // Fetch hotel details
//         const hotel = await Hotel.findById(reservation.hotelId);

//         // Fetch room details
//         const rooms = await Room.find({ _id: { $in: reservation.roomIds } });
//         // console.log("Rooms:", rooms);
        
//         return {
//           reservation,
//           hotel,
//           rooms,
//         };
//       })
//     );
//     res.status(200).json(list);
//   } catch (err) {
//     console.log("nothing found");
//     next(err);
//   }
// };
export const getUserReservations = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const list = await Promise.all(
      user.reservation.map(async (reservId) => {
        const reservation = await Reservation.findById(reservId);

        // Fetch hotel details
        const hotel = await Hotel.findById(reservation.hotelId);

        // Fetch room details along with filtered room numbers
        const roomDetails = await Promise.all(
          reservation.roomIds.map(async (roomId) => {
            const room = await Room.findById(roomId);

            // Filter room numbers based on reservation.roomNumIds
            const filteredRoomNumbers = room.roomNumbers.filter((roomNumber) =>
              reservation.roomNumIds.includes(roomNumber._id.toString())
            );

            return {
              room,
              roomNumbers: filteredRoomNumbers,
            };
          })
        );

        return {
          reservation,
          hotel,
          rooms: roomDetails,
        };
      })
    );
    res.status(200).json(list);
  } catch (err) {
    console.log("nothing found");
    next(err);
  }
};
