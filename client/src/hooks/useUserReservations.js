// useUserReservations.js
import { useEffect, useState } from "react";

const useUserReservations = (userId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserReservations = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:8800/api/reservations/users/${userId}`
        );
        const userData = await response.json();

        setData(userData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUserReservations();
  }, [userId]);

  return { data, loading, error };
};

export default useUserReservations;
