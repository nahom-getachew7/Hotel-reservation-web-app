import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem bg-white  hover:shadow-xl hover:shadow-blue-400 hover:bg-blue-100 hover:transition-transform hover:translate-x-2 hover:-translate-y-2">
      <img src={item.photos[0]} alt={item.name} className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <p className="siSubtitle">Studio Apartment with Air conditioning</p>
        <p className="siFeatures">{item.desc}</p>
        <p className="siCancelOp">Free cancellation </p>
        <p className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </p>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
