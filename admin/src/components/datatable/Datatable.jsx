import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  // const { data, loading, error } = useFetch(`${path}`, {
  //   withCredentials: true,
  // });
   const [deleteId, setDeleteId] = useState(null);
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(`/${path}`);
        const data = response.data;

        if (isMounted) {
          console.log("Component mounted");
          setList(data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();

    return () => {
      console.log("component unmounted")
      isMounted = false;
    };
  }, [path]);

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`/${path}/${id}`);
  //     setList(list.filter((item) => item._id !== id));
  //   } catch (err) {
  //     console.error("Error deleting item:", err);
  //     // Add logic for handling or displaying the error
  //   }
  // };
    const handleDelete = (id) => {
      setDeleteId(id);
      setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
      try {
        await axios.delete(`/${path}/${deleteId}`);
        setList(list.filter((item) => item._id !== deleteId));
        setDeleteId(null);
        toast.success(`${path} Deleted successfully!`);
        setIsDeleteModalOpen(false);
      } catch (err) {
        console.error("Error deleting item:", err);
        // Add logic for handling or displaying the error
        setIsDeleteModalOpen(false);
      }
    };

    const cancelDelete = () => {
      setDeleteId(null);
      setIsDeleteModalOpen(false);
    };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/${path}/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      {list && ( // Conditionally render DataGrid if list is available
        <DataGrid
          className="datagrid"
          rows={list}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      )}
      <Dialog open={isDeleteModalOpen} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <div
          style={{ display: "flex", justifyContent: "flex-end", padding: 16 }}
        >
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Confirm
          </Button>
        </div>
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default Datatable;


// export default Datatable;
