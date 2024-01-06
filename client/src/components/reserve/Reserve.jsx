import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const { user } = useContext(AuthContext);

  const [selectedRooms, setSelectedRooms] = useState([]);
  const [parentRoomId, setParentRoomId] = useState([]);

  console.log("i am hotel id: "+hotelId)
  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/hotels/room/${hotelId}`
  );
  console.log(data);

  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = ({e, id}) => {
    const checked = e.target.checked;
    const value = e.target.value;
      setParentRoomId((prevIds) => ({
        ...prevIds,
        [value]: id,
      }));

      setSelectedRooms((prevRooms) =>
        checked
          ? [...prevRooms, value]
          : prevRooms.filter((item) => item !== value)
      );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      // Assuming you have a user ID (replace 'yourUserId' with the actual user ID)
      console.log(user)
      console.log(parentRoomId)
      const userId = user._id;

      // Send reservation data to the backend
     const response = await axios.post(
       "http://localhost:8800/api/reservations",
       {
         userId,
         hotelId,
         roomIds: [parentRoomId[Object.keys(parentRoomId)[0]]],
         roomNumIds: selectedRooms,
         dates: alldates,
       }
     );

      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `http://localhost:8800/api/rooms/availability/${roomId}`,
            {
              dates: alldates,
            }
          );
          return res.data;
        })
      );
      const createdReservation = response.data.reservation;
      const reservationId = createdReservation._id.toString();
      await axios.put(`http://localhost:8800/api/users/up/${userId}`, {
        reservation: [...user.reservation, reservationId],
      });

      setOpen(false);
      alert("Your room(s) have been booked!");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={(e) => handleSelect({ e, id: item._id })}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
