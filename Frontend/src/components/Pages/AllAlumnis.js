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
  const { isOpen, message, icon, title, showNotification, handleClose } =
    useContext(AuthContext);
  
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

  const fetchAlumni = async () => {
    setLoading(true); 
    const token = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
    try {
      const response = await axios.get("http://127.0.0.1:8000/getalumni/", {
        headers: { Authorization: `Bearer ${token?.access}` },
      });
      if (response.status === 200) {
        setAlumniData(response.data);
        setLoading(false);
      }
     
    } catch (err) {
      console.error("Error fetching alumni: ", err);
      setLoading(false);
    }
  };

  // Fetch alumni on component mount
  useEffect(() => {
    fetchAlumni();
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
        {/* Default box */}
        <div className="card card-solid">
          <div className="card-body pb-0">
            <div className="row">
              {alumniData?.results?.map((alumnus) => (
                <div
                  key={alumnus.id}
                  className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column"
                >
                  <div className="card bg-light d-flex flex-fill">
                    <div className="card-header text-muted border-bottom-0">
                      {alumnus.alumni_profile?.Heading ||
                        alumnus.alumni_profile?.job_title}
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
                          <h2
                            className="lead"
                            style={{ fontSize: "1rem", fontWeight: "bold" }}
                          >
                            {alumnus.full_name}
                          </h2>
                          <p className="text-muted text-sm">
                            <b>Grad Year:</b> {alumnus.graduation_year || "N/A"}
                          </p>
                          <ul className="ml-4 mb-0 fa-ul text-muted">
                            <li className="small">
                              <span className="fa-li">
                                <i className="fas fa-lg fa-building" />
                              </span>
                              Company:{" "}
                              {alumnus.alumni_profile?.current_company_name ||
                                "N/A"}
                            </li>
                            <li className="small mt-1">
                              <span className="fa-li">
                                <i className="fas fa-lg fa-id-badge" />
                              </span>
                              Role: {alumnus.alumni_profile?.job_title || "N/A"}
                            </li>
                          </ul>
                        </div>
                        <div className="col-5 text-center">
                          <img
                            src="../../dist/img/user1-128x128.jpg" // Replace with dynamic image path if needed
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
                      {/* Additional Information Section */}
                      <div className="text-muted">
                        <div className="text-muted mb-2">Contact Info:</div>
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
                      <div className="text-center">
                        <a href="#" className="btn btn-sm btn-primary">
                          <i className="fas fa-user" /> View Profile
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* /.card-body */}
          <div className="card-footer">
            <nav aria-label="Contacts Page Navigation">
              <ul className="pagination justify-content-center m-0">
                <li className="page-item active">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                {/* Pagination items can be generated dynamically as needed */}
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
