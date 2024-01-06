import React, { useContext,useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./featured.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";


const cities = [
  {
    name: "Addis Ababa",
    imageUrl:
      "https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=",
  },
  {
    name: "Adama",
    imageUrl:
      "https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o=",
  },
  {
    name: "Bahirdar",
    imageUrl:
      "https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o=",
  },
];

const Featured = () => {
  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/hotels/countByCity?cities=${encodeURIComponent(
      cities.map((city) => city.name).join(",")
    )}`
  );
    const navigate = useNavigate();
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const { dispatch } = useContext(SearchContext);
  const onclick=(destination) =>{
    console.log("City name:" + destination);
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  }

  return (
    <div className="featured pt-24 justify-center">
      {loading ? (
        "Loading please wait"
      ) : (
        <div className="flex flex-row items-center space-x-10">
          {cities.map((city, index) => (
            <div
              key={index}
              className=" rounded-3xl shadow-lg shadow-blue-300 hover:shadow-blue-600 hover:transition-transform hover:-translate-y-3"
            >
              <Card
                sx={{ maxWidth: 345, backgroundColor: "lightblue", width: 400 }}
              >
                <CardMedia
                  component="img"
                  alt={`Image of ${city.name}`}
                  image={city.imageUrl}
                  className=" h-64 "
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {city.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <h2>{data[index]} properties</h2>
                  </Typography>
                </CardContent>
                <CardActions>
                  <button onClick={() => onclick(city.name)} size="small">
                    See
                  </button>
                </CardActions>
              </Card>
            </div>
          ))}
          {/* <div className="featuredItem">
  <img
    src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
    alt=""
    className="featuredImg"
  />
  <div className="featuredTitles">
    <h1 className="text-xl font-bold">Addis Ababa</h1>
    <h2>{data[0]} properties</h2>
  </div>
</div>

<div className="featuredItem">
  <img
    src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
    alt=""
    className="featuredImg"
  />
  <div className="featuredTitles">
    <h1 className="text-xl font-bold">Adama</h1>
    <h2>{data[1]} properties</h2>
  </div>
</div>
<div className="featuredItem">
  <img
    src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
    alt=""
    className="featuredImg"
  />
  <div className="featuredTitles">
    <h1 className="text-xl font-bold">Bahirdar</h1>
    <h2>{data[2]} properties</h2>
  </div>
</div> */}
        </div>
      )}
    </div>
  );
};

export default Featured;

