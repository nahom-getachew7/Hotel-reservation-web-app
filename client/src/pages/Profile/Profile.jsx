import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import useUserReservations from "../../hooks/useUserReservations";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import UserProfileCard from "../../components/profile/UserProfileCard";
const ReservationCard = ({ reservation, hotel, rooms, onDelete }) => {
  const formatDateString = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <Card
      elevation={3}
      sx={{ display: "flex", flexDirection: "column", height: "100%", borderRadius:"5%" }}
      className=" hover:shadow-xl hover:shadow-blue-200 hover:bg-blue-200 hover:text-white hover:transition-transform hover:translate-x-2 hover:-translate-y-2"
    >
      <CardContent>
        <Typography variant="h6">Hotel: {hotel.name}</Typography>
        <Typography>
          Room: {rooms.map((room) => room.room.title).join(", ")}
        </Typography>
        <Typography>
          Room Number:{" "}
          {rooms
            .map((room) => room.roomNumbers.map((num) => num.number))
            .join(", ")}
        </Typography>
        <Typography>
          Reserved Date: {formatDateString(reservation.updatedAt)}
        </Typography>
        <Typography>Location: {hotel.address}</Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ marginLeft: "auto" }}>
          <Link
            to={`/edit-reservation/${reservation._id}`}
            className="text-white mr-4 bg-blue-600 py-1 pb-1.5 px-5 rounded-md shadow-sm shadow-gray-500 hover:bg-white hover:text-blue-600"
          >
            Edit
          </Link>
          <Button
            onClick={() => onDelete(reservation._id)}
            color="error"
            variant="contained"
            size="small"
            className="text-red-500"
          >
            Delete
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { data, loading, error, refetch } = useUserReservations(user?._id);

  const handleDeleteReservation = async (reservationId) => {
    // Implement your logic to delete the reservation
    // You might want to use an API call or other mechanism here
    // After deleting, you can refetch the data to update the UI
    // Example using the refetch function provided by useUserReservations hook
    // await deleteReservation(reservationId);
    // refetch();
  };

  return (
    <div className=" w-screen">
      <div className=" -mt-10">
        <Navbar />
      </div>
      <Box
        mt={4}
        mx="auto"
        bgColor="#f5f5f5"
        p={3}
        borderRadius={8}
        paddingTop={15}
        // sx={{ backgroundColor: "ghostwhite" }}
        className="bg-slate-100"
      >
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to Your Profile
        </Typography>

        {user ? (
          <div className="flex flex-row justify-evenly">
            <div>
              <UserProfileCard user={user} />
            </div>
            <div>
              <Paper elevation={3} p={3} mb={3}>
                <Typography variant="h6">Hello, {user.username}!</Typography>
                <Typography>Email: {user.email}</Typography>
              </Paper>

              {loading ? (
                <Box display="flex" justifyContent="center" mt={3}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Typography color="error" mt={3}>
                  Error fetching reservations: {error.message}
                </Typography>
              ) : data?.length > 0 ? (
                <Box className="flex flex-col space-y-10">
                  <Typography variant="h6" gutterBottom mt={3}>
                    Your Reservations:
                  </Typography>
                  {data.map(({ reservation, hotel, rooms }) => (
                    <ReservationCard
                      key={reservation._id}
                      reservation={reservation}
                      hotel={hotel}
                      rooms={rooms}
                      onDelete={handleDeleteReservation}
                    />
                  ))}
                </Box>
              ) : (
                <Typography variant="body1" mt={3}>
                  No reservations found.
                </Typography>
              )}
            </div>
          </div>
        ) : (
          <Typography variant="body1" align="center" mt={3}>
            Please log in to view your profile.
          </Typography>
        )}
      </Box>
      <Footer />
    </div>
  );
};

export default Profile;
