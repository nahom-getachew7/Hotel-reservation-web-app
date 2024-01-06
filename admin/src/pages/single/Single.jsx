import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import LoadingOverlay from "../../components/overlay/overlay";

import "./single.scss";

const Single = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const allId = location.pathname.split("/")[2];

  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/${path}/${allId}`,
    { credentials: "include" }
  );

  const [item, setItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (data) {
      setItem(data);
    }
  }, [data]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:8800/api/${path}/${allId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(item),
        }
      );

      if (response.ok) {
        setIsEditMode(false);
        const updatedData = await response.json();
        setItem(updatedData);
        toast.success("Data updated successfully!");
      } else {
        console.error("Failed to update data:", response.statusText);
        toast.error("Failed to update data. Please try again.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Error updating data. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [id]: value,
    }));
  };

  if (loading) {
    return <LoadingOverlay/>;
  }

  if (error) {
    return <p>Error fetching user: {error.message}</p>;
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={handleEditClick}>
              Edit
            </div>
            {isEditMode && (
              <div className="saveButton" onClick={handleSaveClick}>
                Save
              </div>
            )}
            <h1 className="title">Information</h1>
            {item && (
              <div className="item">
                <img
                  src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                  alt=""
                  className="itemImg"
                />
                <div className="details">
                  {path === "users" && (
                    <>
                      <h1 className="itemTitle">
                        {isEditMode ? (
                          <input
                            type="text"
                            value={item.fullName}
                            onChange={handleInputChange}
                            id="fullName"
                          />
                        ) : (
                          item.fullName
                        )}
                      </h1>
                      <div className="detailItem">
                        <span className="itemKey">Email:</span>
                        <span className="itemValue">
                          {isEditMode ? (
                            <input
                              type="text"
                              value={item.email}
                              onChange={handleInputChange}
                              id="email"
                            />
                          ) : (
                            item.email
                          )}
                        </span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Phone:</span>
                        <span className="itemValue">
                          {isEditMode ? (
                            <input
                              type="text"
                              value={item.phone}
                              onChange={handleInputChange}
                              id="phone"
                            />
                          ) : (
                            item.phone
                          )}
                        </span>
                      </div>
                    </>
                  )}
                  {path === "hotels" && (
                    <>
                      <h1 className="itemTitle">
                        {isEditMode ? (
                          <input
                            type="text"
                            value={item.name}
                            onChange={handleInputChange}
                            id="name"
                          />
                        ) : (
                          item.name
                        )}
                      </h1>
                      <div className="detailItem">
                        <span className="itemKey">Type:</span>
                        <span className="itemValue">
                          {isEditMode ? (
                            <input
                              type="text"
                              value={item.type}
                              onChange={handleInputChange}
                              id="type"
                            />
                          ) : (
                            item.type
                          )}
                        </span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">City:</span>
                        <span className="itemValue">
                          {isEditMode ? (
                            <input
                              type="text"
                              value={item.city}
                              onChange={handleInputChange}
                              id="city"
                            />
                          ) : (
                            item.city
                          )}
                        </span>
                      </div>
                    </>
                  )}
                  {path === "rooms" && (
                    <>
                      <h1 className="itemTitle">
                        {isEditMode ? (
                          <input
                            type="text"
                            value={item.title}
                            onChange={handleInputChange}
                            id="title"
                          />
                        ) : (
                          item.title
                        )}
                      </h1>
                      <div className="detailItem">
                        <span className="itemKey">Price:</span>
                        <span className="itemValue">
                          {isEditMode ? (
                            <input
                              type="text"
                              value={item.price}
                              onChange={handleInputChange}
                              id="price"
                            />
                          ) : (
                            item.price
                          )}
                        </span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Max People:</span>
                        <span className="itemValue">
                          {isEditMode ? (
                            <input
                              type="text"
                              value={item.maxPeople}
                              onChange={handleInputChange}
                              id="maxPeople"
                            />
                          ) : (
                            item.maxPeople
                          )}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Single;
