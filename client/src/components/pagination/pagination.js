import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import "../featured/featured.css";
// import "./pagination.css";

const CustomPagination = ({
  postsPerPage,
  totalPosts,
  paginate,
}) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const currentPage=paginate
  const handlePageChange = (event, value) => {
    paginate(value);
  };

  return (
    <nav>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
        />
      </Stack>
    </nav>
  );
};

export default CustomPagination;
