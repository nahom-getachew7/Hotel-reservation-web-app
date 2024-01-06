import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";
// import Pagination from "../pagination/pagination.js";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";


const FeaturedProperties = () => {
  const { data, loading, currentPage, postPerPage, setCurrentPage, error } =
    useFetch("http://localhost:8800/api/hotels/?featured=true");

  const paginate = (PageNumber) => setCurrentPage(PageNumber);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const currenPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex justify-between items-center gap-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {currenPosts.map((item) => (
              <div
                key={item._id}
                className="col-span-1 p-4 border border-gray-300 rounded-md shadow-md bg-blue-200"
              >
                <h1 className="text-dark">{item.type}</h1>
                <div className="fpItem">
                  <div className="featuredItem">
                    <a className="imaglink" href="#">
                      <img
                        src={item.photos[0]}
                        alt=""
                        className="featuredImg"
                      />
                      <h1 className="featuredTitles">{item.name}</h1>
                    </a>
                  </div>
                  <div className="info">
                    <p className="fpCity">{item.city}</p>
                    <p className="fpPrice">
                      Starting from ${item.cheapestPrice}
                    </p>
                    {item.rating && (
                      <div className="fpRating">
                        <button>{item.rating}</button>
                        <span>Excellent</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="mt-8">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(data.length / postPerPage)}
            page={currentPage}
            onChange={(event, value) => paginate(value)}
            color="primary"
          />
        </Stack>
      </div>
    </div>
  );
};

export default FeaturedProperties;
