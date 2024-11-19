import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import Home from "../Dashboard/Home.js";
import AuthContext from "../../context/AuthContext.js";
import LoadingSpinner from "../Loading/Loading.js";
import Notification from "../Notification/Notification.js";
import { useNavigate } from "react-router-dom";
import baseurl from "../const.js";

const AllAlumnisContent = () => {
  const [adminData, setAdminData] = useState(null); // Changed to hold the entire data object
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    isOpen,
    message,
    icon,
    title,
    showNotification,
    handleClose,
    setFilter,
    setShowProfileOfId,
    setIsAllStudentPage,
    setIsAllAlumniPage,
    setIsAllAdminPage,
    hodFilters,
    setHODFilters,
    isModalOpen,
    toggleModal,
    toggleAddAdminModal,
    isAddAdminModalOpen,
    userData,
    setIsAllPostPage,
    reloadFilter,
    toggelreloadAdminData,
    reloadAdminData,
    setAlumniFilters,
  } = useContext(AuthContext);

const [pageNumber, setPageNumber] = useState(1);
const [totalPages, setTotalPages] = useState(1);

const isFirstLoad = useRef(true); 
  
  const pageSize = 12;

  const handleViewProfile = (userData) => {
    setShowProfileOfId(true);
    navigate("/profile", { state: userData });
  };


  const fetchAdmins = async (pageNumber) => {
    setLoading(true);
    const token = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;

    const filteredFilters = Object.fromEntries(
      Object.entries(hodFilters).filter(([_, value]) => value !== "")
    );
    
    // Construct query parameters from hodFilters
    const queryParams = new URLSearchParams({
      page: pageNumber,
      page_size: pageSize,
      ...(isFirstLoad.current ? {} : filteredFilters),
    }).toString();

    try {
      const response = await axios.get(
        `${baseurl}/hods/?${queryParams}`,
        {
          headers: { Authorization: `Bearer ${token?.access}` },
        }
      );
      if (response.status === 200) {
        setAdminData(response.data);
        const totalItems = response.data.count;
        setTotalPages(Math.ceil(totalItems / pageSize));
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching admins: ", err);
       if (
         err.response?.status === 400 &&
         err.response?.data?.error === "Invalid page."
       ) {
         console.warn("Invalid page number detected. Resetting to page 1.");
         setPageNumber(1); 
        
       } else {
         // Handle other errors
         console.error("Unexpected error: ", err.message);
       }
      setLoading(false);
    }
  };

  // Fetch alumni on component mount
  useEffect(() => {

    if (isFirstLoad.current) {
     setHODFilters({})
      fetchAdmins(pageNumber);
      isFirstLoad.current = false; 
    } else {
      fetchAdmins(pageNumber);
    }
  }, [pageNumber, reloadFilter, reloadAdminData]);

  useEffect(() => {
    setIsAllAdminPage(true);
    setIsAllStudentPage(false);
    setIsAllAlumniPage(false);
    setIsAllPostPage(false);
    setFilter(true);
  }, []);

  return (
    <div>
      <LoadingSpinner isLoading={loading} />
      <Notification
        message={message}
        isOpen={isOpen}
        onClose={handleClose}
        icon={icon}
        title={title}
      />
      <section className="content">
        <div className="card card-solid">
          <div
            className="card-body pb-0"
            style={{ height: "150vh", overflowY: "auto" }}
          >
            <div className="row">
              {adminData?.results?.length === 0 ? (
                <div
                  className="col-12"
                  style={{ textAlign: "center", height: "200vh" }}
                >
                  <h3
                    className="text-center"
                    style={{ marginTop: "50px", fontSize: "30px" }}
                  >
                    No Admin found !!{" "}
                  </h3>
                </div>
              ) : (
                <>
                  {adminData?.results?.map((admins) => (
                    <div
                      key={admins.id}
                      className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column"
                    >
                      <div className="card card-widget widget-user">
                        {/* Add the bg color to the header using any of the bg-* classes */}
                        <div className="widget-user-header bg-info">
                          <h3
                            className="widget-user-username mb-1"
                            style={{ fontSize: "1rem" }}
                          >
                            {admins.full_name || admins.username}
                          </h3>
                          <h5 className="widget-user-desc">
                            <b style={{ marginRight: "0.1rem" }}>{`${
                              admins?.hod_profile?.designation
                                ? admins.hod_profile?.designation
                                : "Senior Faculty"
                            } `}</b>
                            at SSBT COET ,Jalgaon ,Maharashtra.
                            <div
                              className="mt-1"
                              style={{ fontWeight: "bold" }}
                            >
                              Branch : {admins?.Branch || "N/A"}
                            </div>
                          </h5>
                        </div>
                        <div
                          className="widget-user-image"
                          style={{ marginTop: "1.5rem" }}
                        >
                          <img
                            className="img-circle elevation-2"
                            src={
                              admins?.Image
                                ? `${baseurl}/${admins?.Image}`
                                : `../../dist/img/user1-128x128.jpg`
                            }
                            alt="User Avatar"
                          />
                        </div>
                        <div
                          className="card-footer"
                          style={{ marginTop: "1.5rem" }}
                        >
                          <div
                            style={{ display: "flex", justifyContent: "right" }}
                          >
                            <div>
                              <button
                                onClick={() => handleViewProfile(admins)}
                                className="btn btn-sm btn-primary"
                                aria-label={`View profile of ${admins.full_name}`}
                              >
                                <i className="fas fa-user" /> View Profile
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          {/* /.card-body */}

          <div className="card-footer">
            <nav aria-label="Page Navigation">
              <ul className="pagination justify-content-center m-0">
                {/* Previous button */}
                <li
                  className={`page-item ${pageNumber === 1 ? "disabled" : ""}`}
                >
                  <button
                    className={`page-link ${
                      pageNumber === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => setPageNumber(pageNumber - 1)}
                    disabled={pageNumber === 1}
                  >
                    <i
                      className="fas fa-arrow-left"
                      style={{ fontSize: "1em" }}
                    />
                  </button>
                </li>

                {/* Current page */}
                <li className="page-item active">
                  <button className="page-link" disabled>
                    {pageNumber}
                  </button>
                </li>

                {/* Next button */}
                <li
                  className={`page-item ${
                    pageNumber === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className={`page-link ${
                      pageNumber === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => setPageNumber(pageNumber + 1)}
                    disabled={pageNumber === totalPages}
                  >
                    <i
                      className="fas fa-arrow-right"
                      style={{ fontSize: "1em" }}
                    />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          {/* /.card-footer */}
        </div>
        {/* /.card */}
      </section>
      
    </div>
  );
};


const AllAlumnis = () => {
  return (
    <Home
      DynamicContent={AllAlumnisContent}
      url="all_hods"
      heading="All Admin"
    />
  );
};

export default AllAlumnis;
