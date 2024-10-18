import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Home from "../Dashboard/Home.js";
import AuthContext from "../../context/AuthContext.js";
import LoadingSpinner from "../Loading/Loading.js";
import Notification from "../Notification/Notification.js";
import { useNavigate } from "react-router-dom";

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
  } = useContext(AuthContext);
  
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const isValidGitHubUrl = (url) => {
    const githubUrlPattern =
      /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/;
    return githubUrlPattern.test(url);
  };

  const isValidLinkedInUrl = (url) => {
    const linkedinUrlPattern =
      /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/;
    return linkedinUrlPattern.test(url);
  };
  const isValidMobileNumber = (number) => {
    // This regex checks for numbers with 10 digits, with optional country code
    const mobileNumberPattern = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return mobileNumberPattern.test(number);
  };
  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleViewProfile = (userData) => {
    navigate("/profile", { state: userData });
  };

  const fetchAdmins = async (pageNumber) => {
    setLoading(true);
    const token = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/hods/?page=${pageNumber}&page_size=${pageSize}`,
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
      console.error("Error fetching alumni: ", err);
      setLoading(false);
    }
  };

  // Fetch alumni on component mount
  useEffect(() => {
    fetchAdmins(pageNumber);
  }, [pageNumber]);

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
          <div className="card-body pb-0">
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
                <div style={{ height: "200vh", overflowX: "auto" }}>
                  {adminData?.results?.map((admins) => (
                    <div
                      key={admins.id}
                      className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column"
                      style={{ height: "150vh", overflowY: "auto" }}
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
                                ? `http://127.0.0.1:8000/${admins?.Image}`
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
                </div>
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
