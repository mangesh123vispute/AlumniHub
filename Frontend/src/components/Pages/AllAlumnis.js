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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, reloadFilter]);

  useEffect(() => {
    setIsAllStudentPage(false);
    setIsAllAdminPage(false);
    setIsAllAlumniPage(true); 
    setFilter(true);
    setIsAllPostPage(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            style={{
              height: "150vh",
              overflowY: "auto",
              backgroundColor: "#f8f9fa",
              padding: "24px",
            }}
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
                        style={{ marginBottom: "24px" }}
                      >
                        <div
                          className="card d-flex flex-fill"
                          style={{
                            borderRadius: "16px",
                            border: "none",
                            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
                            transition: "all 0.3s ease",
                            overflow: "hidden",
                            backgroundColor: "#ffffff",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow =
                              "0 8px 24px rgba(0, 0, 0, 0.12)";
                            e.currentTarget.style.transform = "translateY(-4px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow =
                              "0 2px 12px rgba(0, 0, 0, 0.08)";
                            e.currentTarget.style.transform = "translateY(0)";
                          }}
                        >
                          {/* Header Section with Gradient */}
                          <div
                            style={{
                              background:
                                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                              padding: "20px",
                              color: "white",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: "12px",
                              }}
                            >
                              <h4
                                style={{
                                  margin: 0,
                                  fontSize: "1.25rem",
                                  fontWeight: "700",
                                  color: "white",
                                }}
                              >
                                {alumnus?.full_name || "N/A"}
                              </h4>
                              {alumnus?.alumni_profile?.years_of_experience &&
                                alumnus.alumni_profile.years_of_experience !==
                                  "N/A" && (
                                  <span
                                    style={{
                                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                                      padding: "4px 12px",
                                      borderRadius: "20px",
                                      fontSize: "0.75rem",
                                      fontWeight: "600",
                                      backdropFilter: "blur(10px)",
                                    }}
                                  >
                                    {alumnus.alumni_profile.years_of_experience} Yrs Exp
                                  </span>
                                )}
                            </div>
                            <div style={{ fontSize: "0.875rem", opacity: 0.95 }}>
                              <div style={{ marginBottom: "4px" }}>
                                <i
                                  className="fas fa-graduation-cap"
                                  style={{ marginRight: "6px" }}
                                ></i>
                                {alumnus?.Branch || "N/A"} • Class of{" "}
                                {alumnus?.graduation_year || "N/A"}
                              </div>
                            </div>
                          </div>

                          {/* Profile Image Section */}
                          <div
                            style={{
                              textAlign: "center",
                              marginTop: "-40px",
                              position: "relative",
                              zIndex: 1,
                            }}
                          >
                            <div
                              style={{
                                display: "inline-block",
                                position: "relative",
                              }}
                            >
                              <img
                                src={
                                  alumnus?.Image
                                    ? `${baseurl}/${alumnus?.Image}`
                                    : `../../dist/img/user1-128x128.jpg`
                                }
                                alt={alumnus?.full_name || "Alumnus"}
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  borderRadius: "50%",
                                  border: "4px solid white",
                                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                                  objectFit: "cover",
                                }}
                                onError={(e) => {
                                  e.target.src = `../../dist/img/user1-128x128.jpg`;
                                }}
                              />
                            </div>
                          </div>

                          {/* Body Content */}
                          <div className="card-body" style={{ padding: "24px 20px" }}>
                            {/* Job Title/Heading */}
                            <div style={{ textAlign: "center", marginBottom: "16px" }}>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: "0.95rem",
                                  fontWeight: "600",
                                  color: "#2c3e50",
                                  marginTop: "16px",
                                }}
                              >
                                {alumnus?.alumni_profile?.Heading
                                  ? alumnus.alumni_profile.Heading
                                  : alumnus?.alumni_profile?.job_title
                                  ? alumnus.alumni_profile.job_title
                                  : "Professional"}
                              </p>
                            </div>

                            {/* Company and Role */}
                            <div
                              style={{
                                backgroundColor: "#f8f9fa",
                                borderRadius: "8px",
                                padding: "12px",
                                marginBottom: "16px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: "8px",
                                }}
                              >
                                <i
                                  className="fas fa-building"
                                  style={{
                                    color: "#007bff",
                                    marginRight: "10px",
                                    width: "20px",
                                  }}
                                ></i>
                                <span
                                  style={{
                                    fontSize: "0.875rem",
                                    color: "#495057",
                                    fontWeight: "500",
                                  }}
                                >
                                  {alumnus.alumni_profile?.current_company_name ||
                                    "Not Specified"}
                                </span>
                              </div>
                              <div style={{ display: "flex", alignItems: "center" }}>
                                <i
                                  className="fas fa-id-badge"
                                  style={{
                                    color: "#28a745",
                                    marginRight: "10px",
                                    width: "20px",
                                  }}
                                ></i>
                                <span
                                  style={{
                                    fontSize: "0.875rem",
                                    color: "#495057",
                                    fontWeight: "500",
                                  }}
                                >
                                  {alumnus.alumni_profile?.job_title || "Not Specified"}
                                </span>
                              </div>
                            </div>

                            {/* Portfolio and Resume */}
                            <div style={{ marginBottom: "16px" }}>
                              <div
                                style={{
                                  display: "flex",
                                  gap: "12px",
                                  justifyContent: "space-between",
                                }}
                              >
                                {alumnus?.portfolio_link &&
                                alumnus.portfolio_link !== "N/A" ? (
                                  <a
                                    href={
                                      alumnus.portfolio_link.startsWith("http")
                                        ? alumnus.portfolio_link
                                        : `https://${alumnus.portfolio_link}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      flex: 1,
                                      padding: "8px 12px",
                                      backgroundColor: "#e7f3ff",
                                      color: "#007bff",
                                      borderRadius: "6px",
                                      textAlign: "center",
                                      textDecoration: "none",
                                      fontSize: "0.875rem",
                                      fontWeight: "600",
                                      transition: "all 0.2s ease",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      gap: "6px",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.backgroundColor = "#cfe2ff";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.backgroundColor = "#e7f3ff";
                                    }}
                                  >
                                    <i className="fas fa-folder"></i>
                                    Portfolio
                                  </a>
                                ) : (
                                  <div
                                    style={{
                                      flex: 1,
                                      padding: "8px 12px",
                                      backgroundColor: "#f8f9fa",
                                      color: "#6c757d",
                                      borderRadius: "6px",
                                      textAlign: "center",
                                      fontSize: "0.875rem",
                                    }}
                                  >
                                    <i className="fas fa-folder"></i> Portfolio N/A
                                  </div>
                                )}

                                {alumnus?.resume_link &&
                                alumnus.resume_link !== "N/A" ? (
                                  <a
                                    href={
                                      alumnus.resume_link.startsWith("http")
                                        ? alumnus.resume_link
                                        : `https://${alumnus.resume_link}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      flex: 1,
                                      padding: "8px 12px",
                                      backgroundColor: "#fff3cd",
                                      color: "#856404",
                                      borderRadius: "6px",
                                      textAlign: "center",
                                      textDecoration: "none",
                                      fontSize: "0.875rem",
                                      fontWeight: "600",
                                      transition: "all 0.2s ease",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      gap: "6px",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.backgroundColor = "#ffe69c";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.backgroundColor = "#fff3cd";
                                    }}
                                  >
                                    <i className="fas fa-file-alt"></i>
                                    Resume
                                  </a>
                                ) : (
                                  <div
                                    style={{
                                      flex: 1,
                                      padding: "8px 12px",
                                      backgroundColor: "#f8f9fa",
                                      color: "#6c757d",
                                      borderRadius: "6px",
                                      textAlign: "center",
                                      fontSize: "0.875rem",
                                    }}
                                  >
                                    <i className="fas fa-file-alt"></i> Resume N/A
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Contact Info */}
                            <div
                              style={{
                                borderTop: "1px solid #e9ecef",
                                paddingTop: "16px",
                              }}
                            >
                              <div
                                style={{
                                  fontSize: "0.875rem",
                                  fontWeight: "600",
                                  color: "#495057",
                                  marginBottom: "12px",
                                }}
                              >
                                <i className="fas fa-envelope" style={{ marginRight: "6px" }}></i>
                                Contact
                              </div>
                              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                {alumnus?.email && alumnus.email !== "N/A" ? (
                                  <a
                                    href={`mailto:${alumnus.email}`}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      fontSize: "0.8rem",
                                      color: "#495057",
                                      textDecoration: "none",
                                      transition: "color 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.color = "#007bff";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.color = "#495057";
                                    }}
                                  >
                                    <i
                                      className="fas fa-envelope"
                                      style={{
                                        marginRight: "8px",
                                        width: "16px",
                                        color: "#007bff",
                                      }}
                                    ></i>
                                    <span
                                      style={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {alumnus.email}
                                    </span>
                                  </a>
                                ) : null}

                                {alumnus?.Github && alumnus.Github !== "N/A" ? (
                                  <a
                                    href={
                                      alumnus.Github.startsWith("http")
                                        ? alumnus.Github
                                        : `https://${alumnus.Github}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      fontSize: "0.8rem",
                                      color: "#495057",
                                      textDecoration: "none",
                                      transition: "color 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.color = "#007bff";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.color = "#495057";
                                    }}
                                  >
                                    <i
                                      className="fab fa-github"
                                      style={{
                                        marginRight: "8px",
                                        width: "16px",
                                        color: "#24292e",
                                      }}
                                    ></i>
                                    <span
                                      style={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      GitHub Profile
                                    </span>
                                  </a>
                                ) : null}

                                {alumnus?.linkedin && alumnus.linkedin !== "N/A" ? (
                                  <a
                                    href={
                                      alumnus.linkedin.startsWith("http")
                                        ? alumnus.linkedin
                                        : `https://${alumnus.linkedin}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      fontSize: "0.8rem",
                                      color: "#495057",
                                      textDecoration: "none",
                                      transition: "color 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.color = "#007bff";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.color = "#495057";
                                    }}
                                  >
                                    <i
                                      className="fab fa-linkedin"
                                      style={{
                                        marginRight: "8px",
                                        width: "16px",
                                        color: "#0077b5",
                                      }}
                                    ></i>
                                    <span
                                      style={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      LinkedIn Profile
                                    </span>
                                  </a>
                                ) : null}
                              </div>
                            </div>
                          </div>

                          {/* Footer with View Profile Button */}
                          <div
                            className="card-footer"
                            style={{
                              backgroundColor: "#f8f9fa",
                              borderTop: "1px solid #e9ecef",
                              padding: "16px 20px",
                            }}
                          >
                            <button
                              onClick={() => handleViewProfile(alumnus)}
                              className="btn btn-primary"
                              aria-label={`View profile of ${alumnus.full_name}`}
                              style={{
                                width: "100%",
                                borderRadius: "8px",
                                fontWeight: "600",
                                padding: "10px",
                                fontSize: "0.95rem",
                                boxShadow: "0 2px 8px rgba(0, 123, 255, 0.2)",
                                transition: "all 0.3s ease",
                                border: "none",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow =
                                  "0 4px 12px rgba(0, 123, 255, 0.3)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow =
                                  "0 2px 8px rgba(0, 123, 255, 0.2)";
                              }}
                            >
                              <i className="fas fa-user" style={{ marginRight: "8px" }}></i>
                              View Profile
                            </button>
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
