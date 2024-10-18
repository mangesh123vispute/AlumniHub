import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Home from "../Dashboard/Home.js";
import AuthContext from "../../context/AuthContext.js";
import LoadingSpinner from "../Loading/Loading.js";
import Notification from "../Notification/Notification.js";
import { useNavigate } from "react-router-dom";

const AllAlumnisContent = () => {
  const [alumniData, setAlumniData] = useState(null); // Changed to hold the entire data object
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const {
    isOpen,
    message,
    icon,
    title,
    showNotification,
    handleClose,
    setFilter,
  } = useContext(AuthContext);
  setFilter(true);
  
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

  const fetchAlumni = async (pageNumber) => {
    setLoading(true);
    const token = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/getalumni/?page=${pageNumber}&page_size=${pageSize}`,
        {
          headers: { Authorization: `Bearer ${token?.access}` },
        }
      );
      if (response.status === 200) {
        setAlumniData(response.data);
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
    fetchAlumni(pageNumber);
  }, [  pageNumber ]);

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
          <div className="card-body pb-0">
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
                  <div style={{ height: "200vh", overflowX: "auto" }}>
                    {alumniData?.results?.map((alumnus) => (
                      <div
                        key={alumnus.id}
                        className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column"
                      >
                        <div className="card bg-light d-flex flex-fill">
                          <div className="card-header text-muted border-bottom-0">
                            <b>{alumnus?.full_name || "N/A"} </b>
                            <small className="text-muted float-right">
                              Grad Year: {alumnus.graduation_year || "N/A"}
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
                                      ? `http://127.0.0.1:8000/${alumnus?.Image}`
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
                                  Portfolio:{" "}
                                  {alumnus?.portfolio_link ? (
                                    <a
                                      href={alumnus.portfolio_link}
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
                                  {alumnus?.resume_link ? (
                                    <a
                                      href={alumnus.resume_link}
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
                                  {alumnus.email ? (
                                    isValidEmail(alumnus.email) ? (
                                      <a href={`mailto:${alumnus.email}`}>
                                        {alumnus.email}
                                      </a>
                                    ) : (
                                      "Invalid Email"
                                    )
                                  ) : (
                                    "N/A"
                                  )}
                                </li>
                                <li className="small mt-1">
                                  <span className="fa-li">
                                    <i className="fab fa-lg fa-github mr-1" />
                                  </span>
                                  GitHub:{" "}
                                  <a
                                    href={alumnus.Github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {alumnus.Github ? (
                                      isValidGitHubUrl(alumnus.Github) ? (
                                        <a
                                          href={alumnus.Github}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {alumnus.Github}
                                        </a>
                                      ) : (
                                        "Invalid URL"
                                      )
                                    ) : (
                                      "N/A"
                                    )}
                                  </a>
                                </li>
                                <li className="small mt-1">
                                  <span className="fa-li">
                                    <i className="fab fa-lg fa-linkedin mr-1" />
                                  </span>
                                  LinkedIn:{" "}
                                  <a
                                    href={alumnus.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {alumnus.linkedin ? (
                                      isValidLinkedInUrl(alumnus.linkedin) ? (
                                        <a
                                          href={alumnus.linkedin}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {alumnus.linkedin}
                                        </a>
                                      ) : (
                                        "Invalid URL"
                                      )
                                    ) : (
                                      "N/A"
                                    )}
                                  </a>
                                </li>
                                <li className="small">
                                  <span className="fa-li">
                                    <i className="fas fa-lg fa-fax mr-1" />
                                  </span>
                                  Mobile No:{" "}
                                  {alumnus.mobile
                                    ? isValidMobileNumber(alumnus.mobile)
                                      ? alumnus.mobile
                                      : "Invalid Mobile Number"
                                    : "N/A"}
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
                  </div>
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
