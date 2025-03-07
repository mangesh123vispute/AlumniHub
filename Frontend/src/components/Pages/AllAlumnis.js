import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import Home from "../Dashboard/Home.js";
import AuthContext from "../../context/AuthContext.js";
import LoadingSpinner from "../Loading/Loading.js";
import Notification from "../Notification/Notification.js";
import { useNavigate } from "react-router-dom";
import baseurl from "../const.js";

const AllAlumnisContent = () => {
  const [alumniData, setAlumniData] = useState(null); // Changed to hold the entire data object
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 12;
  const isFirstLoad = useRef(true); 

  const {
    isOpen,
    message,
    icon,
    title,
    showNotification,
    handleClose,
    setFilter,
    setShowProfileOfId,
    Alumnifilters,
    setAlumniFilters,
    setIsAllStudentPage,
    setIsAllAlumniPage,
    setIsAllAdminPage,
    reloadFilter,
    setIsAllPostPage,
  } = useContext(AuthContext);
  setFilter(true);

  setIsAllStudentPage(false);

  const handleViewProfile = (userData) => {
    setShowProfileOfId(true);
    navigate("/profile", { state: userData });
  };

  const fetchAlumni = async (pageNumber, Alumnifilters) => {
    setLoading(true);
    const token = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;

    
    const filteredFilters = Object.fromEntries(
      Object.entries(Alumnifilters).filter(([_, value]) => value !== "")
    );
    // Construct query parameters from Alumnifilters
    const queryParams = new URLSearchParams({
      page: pageNumber,
      page_size: pageSize,
    ...(isFirstLoad.current ? {} : filteredFilters), 
    }).toString();

    try {
      const response = await axios.get(
        `${baseurl}/getalumni/?${queryParams}`,
        { headers: { Authorization: `Bearer ${token?.access}` } }
      );
      if (response.status === 200) {
        setAlumniData(response.data);
        const totalItems = response.data.count;
        setTotalPages(Math.ceil(totalItems / pageSize));
        setLoading(false);
      }
      
    } catch (err) {
      console.error("Error fetching alumni: ", err);
       if (
         err.response?.status === 400 &&
         err.response?.data?.error === "Invalid page."
       ) {
         console.warn("Invalid page number detected. Resetting to page 1.");
         setPageNumber(1); 
       } else {
         console.error("Unexpected error: ", err.message);
      }
      
      setLoading(false);
    }
  };


  // Fetch alumni on component mount
  useEffect(() => {
  if (isFirstLoad.current) {
    // On the first load, pass an empty object for filters
    setAlumniFilters({});
    fetchAlumni(pageNumber, {});
    isFirstLoad.current = false; // Mark as no longer the first load
  } else {
    fetchAlumni(pageNumber, Alumnifilters);
  }
  }, [pageNumber, reloadFilter]);

  useEffect(() => {
    setIsAllStudentPage(false);
    setIsAllAdminPage(false);
    setIsAllAlumniPage(true); 
    setFilter(true);
    setIsAllPostPage(false);    
  }, []);

  console.log("Als=umni data ", alumniData);

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
        {/* Default box */}
        <div className="card card-solid">
          <div
            className="card-body pb-0"
            style={{ height: "150vh", overflowY: "auto" }}
          >
            <div className="row">
              <>
                {alumniData?.results?.length === 0 ? (
                  <div
                    className="col-12"
                    style={{ textAlign: "center", height: "200vh" }}
                  >
                    <h3
                      className="text-center"
                      style={{ marginTop: "50px", fontSize: "30px" }}
                    >
                      No Alumni found !!{" "}
                    </h3>
                  </div>
                ) : (
                  <>
                    {alumniData?.results?.map((alumnus) => (
                      <div
                        key={alumnus.id}
                        className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column"
                      >
                        <div className="card bg-light d-flex flex-fill">
                          <div className="card-header text-muted border-bottom-0">
                            <b>{alumnus?.full_name || "N/A"} </b>
                            <br />
                            <small className="text-muted float-left">
                              <b>
                                Branch: {alumnus?.Branch || "N/A"} | Grad Year:{" "}
                                {alumnus?.graduation_year || "N/A"} |
                                Experience:{" "}
                                {alumnus?.alumni_profile?.years_of_experience ||
                                  "N/A"}{" "}
                                Yr.
                              </b>
                            </small>
                          </div>

                          <hr
                            style={{
                              border: "1px solid #d2d6df",
                              marginBottom: "10px",
                            }}
                          />
                          <div className="card-body pt-0">
                            <div className="row">
                              <div className="col-7">
                                <p className="text-muted text-sm">
                                  {alumnus?.alumni_profile?.Heading
                                    ? alumnus.alumni_profile.Heading
                                    : alumnus?.alumni_profile?.job_title
                                    ? alumnus.alumni_profile.job_title
                                    : "N/A"}
                                </p>

                                <ul className="ml-4 mb-0 fa-ul text-muted">
                                  <li className="small">
                                    <span className="fa-li">
                                      <i className="fas fa-lg fa-building" />
                                    </span>
                                    Company:{" "}
                                    {alumnus.alumni_profile
                                      ?.current_company_name || "N/A"}
                                  </li>
                                  <li className="small mt-1">
                                    <span className="fa-li">
                                      <i className="fas fa-lg fa-id-badge" />
                                    </span>
                                    Role:{" "}
                                    {alumnus.alumni_profile?.job_title || "N/A"}
                                  </li>
                                </ul>
                              </div>
                              <div className="col-5 text-center">
                                <img
                                  src={
                                    alumnus?.Image
                                      ? `${baseurl}/${alumnus?.Image}`
                                      : `../../dist/img/user1-128x128.jpg`
                                  } // Replace with dynamic image path if needed
                                  alt="user-avatar"
                                  className="img-circle img-fluid"
                                />
                              </div>
                            </div>
                            <hr
                              style={{
                                border: "1px solid #d2d6df",
                                marginBottom: "10px",
                                marginTop: "20px",
                              }}
                            />
                            <div className="text-muted">
                              <div className="text-muted mb-2">
                                Portfolio and Resume
                              </div>
                              <ul className="ml-4 mb-0 fa-ul text-muted">
                                <li className="small mt-1">
                                  <span className="fa-li">
                                    <i className="fas fa-lg fa-folder mr-1" />
                                  </span>
                                  Portfolio{" "}
                                  {alumnus?.portfolio_link !== "N/A" ? (
                                    <a
                                      href={
                                        alumnus.portfolio_link.startsWith(
                                          "http"
                                        )
                                          ? alumnus.portfolio_link
                                          : `https://${alumnus.portfolio_link}`
                                      }
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      Click here
                                    </a>
                                  ) : (
                                    "N/A"
                                  )}
                                </li>
                                <li className="small mt-1">
                                  <span className="fa-li">
                                    <i className="fas fa-lg fa-file-alt mr-1" />
                                  </span>
                                  Resume:{" "}
                                  {alumnus?.resume_link !== "N/A" ? (
                                    <a
                                      href={
                                        alumnus.resume_link.startsWith("http")
                                          ? alumnus.resume_link
                                          : `https://${alumnus.resume_link}`
                                      }
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      Click here
                                    </a>
                                  ) : (
                                    "N/A"
                                  )}
                                </li>
                              </ul>
                            </div>
                            <hr
                              style={{
                                border: "1px solid #d2d6df",
                                marginBottom: "10px",
                                marginTop: "10px",
                              }}
                            />
                            {/* Additional Information Section */}
                            <div className="text-muted">
                              <div className="text-muted mb-2">
                                Contact Info:
                              </div>
                              <ul className="ml-4 mb-0 fa-ul text-muted">
                                <li className="small mt-1">
                                  <span className="fa-li">
                                    <i className="fas fa-lg fa-envelope mr-1" />
                                  </span>
                                  Email:{" "}
                                  {alumnus?.email && alumnus.email !== "N/A" ? (
                                    <a href={`mailto:${alumnus.email}`}>
                                      {alumnus.email}
                                    </a>
                                  ) : (
                                    "N/A"
                                  )}
                                </li>
                                <li className="small mt-1">
                                  <span className="fa-li">
                                    <i className="fab fa-lg fa-github mr-1" />
                                  </span>
                                  GitHub:{" "}
                                  {alumnus?.Github &&
                                  alumnus.Github !== "N/A" ? (
                                    <a
                                      href={
                                        alumnus.Github.startsWith("http")
                                          ? alumnus.Github
                                          : `https://${alumnus.Github}`
                                      }
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {alumnus.Github}
                                    </a>
                                  ) : (
                                    "N/A"
                                  )}
                                </li>
                                <li className="small mt-1">
                                  <span className="fa-li">
                                    <i className="fab fa-lg fa-linkedin mr-1" />
                                  </span>
                                  LinkedIn:{" "}
                                  {alumnus?.linkedin &&
                                  alumnus.linkedin !== "N/A" ? (
                                    <a
                                      href={
                                        alumnus.linkedin.startsWith("http")
                                          ? alumnus.linkedin
                                          : `https://${alumnus.linkedin}`
                                      }
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {alumnus.linkedin}
                                    </a>
                                  ) : (
                                    "N/A"
                                  )}
                                </li>
                               
                              </ul>
                            </div>
                          </div>
                          <div className="card-footer">
                            <div className="text-right">
                              <button
                                onClick={() => handleViewProfile(alumnus)}
                                className="btn btn-sm btn-primary"
                                aria-label={`View profile of ${alumnus.full_name}`}
                              >
                                <i className="fas fa-user" /> View Profile
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </>
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
      url="all_alumnis"
      heading="All Alumnis"
    />
  );
};

export default AllAlumnis;
