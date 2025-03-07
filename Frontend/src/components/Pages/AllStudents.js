import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import Home from "../Dashboard/Home.js";
import AuthContext from "../../context/AuthContext.js";
import LoadingSpinner from "../Loading/Loading.js";
import Notification from "../Notification/Notification.js";
import { useNavigate } from "react-router-dom";
import baseurl from "../const.js";

const AllStudentsContent = () => {
  const [studentData, setStudentData] = useState(null); // Changed to hold the entire data object
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
    setStudentFilters,
    handleClose,
    setFilter,
    setShowProfileOfId,
    studentFilters,
    setIsAllStudentPage,
    setIsAllAlumniPage,
    setIsAllAdminPage,
    reloadFilter,
    setIsAllPostPage,
  } = useContext(AuthContext);
  setFilter(true);

  
  
  
  const handleViewProfile = (userData) => {
    setShowProfileOfId(true);
    navigate("/profile", { state: userData });
  };


  const fetchStudents = async (pageNumber) => {
    setLoading(true);
    const token = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;

    const filteredFilters = Object.fromEntries(
      Object.entries(studentFilters).filter(([_, value]) => value !== "")
    );
    

   const queryParams = new URLSearchParams({
     page: pageNumber,
     page_size: pageSize,
     ...(isFirstLoad.current ? {} : filteredFilters), 
   }).toString();

    try {
      const response = await axios.get(
        `${baseurl}/students/?${queryParams}`,
        {
          headers: { Authorization: `Bearer ${token?.access}` },
        }
      );

      if (response.status === 200) {
        setStudentData(response.data);
        const totalItems = response.data.count;
        setTotalPages(Math.ceil(totalItems / pageSize));
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching students: ", err);
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
    fetchStudents(pageNumber);

     if (isFirstLoad.current) {
       // On the first load, pass an empty object for filters
      setStudentFilters({});
      fetchStudents(pageNumber);
       isFirstLoad.current = false; // Mark as no longer the first load
     } else {
        fetchStudents(pageNumber);
     }
  }, [pageNumber, reloadFilter]);

  useEffect(() => {
    setIsAllStudentPage(true);
    setIsAllAlumniPage(false);
    setIsAllAdminPage(false);
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
        {/* Default box */}
        <div className="card card-solid">
          <div
            className="card-body pb-0"
            style={{ height: "150vh", overflowY: "auto" }}
          >
            <div className="row">
              {studentData?.results?.length === 0 ? (
                <div
                  className="col-12"
                  style={{ textAlign: "center", height: "200vh" }}
                >
                  <h3
                    className="text-center"
                    style={{ marginTop: "50px", fontSize: "30px" }}
                  >
                    No students found !!{" "}
                  </h3>
                </div>
              ) : (
                <>
                  {studentData?.results?.map((students) => (
                    <div
                      key={students.id}
                      className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column"
                    >
                      <div className="card bg-light d-flex flex-fill">
                        <div className="card-header text-muted border-bottom-0">
                          <b>{students?.full_name || "N/A"} </b>
                          <br />
                          <small className="text-muted float-left">
                            <b>
                              {" "}
                              Branch: {students?.Branch || "N/A"} | Yr. of
                              Study:{" "}
                              {students?.student_profile
                                ?.current_year_of_study || "N/A"}{" "}
                              | Grad Year: {students.graduation_year || "N/A"}
                            </b>
                          </small>
                        </div>

                        <hr
                          style={{
                            border: "2px solid #d2d6df",
                            marginBottom: "10px",
                          }}
                        />
                        <div className="card-body pt-0">
                          <div className="row">
                            <div className="col-7">
                              <p className="text-muted text-sm">
                                {students?.student_profile?.Heading
                                  ? students.student_profile.Heading
                                  : students?.student_profile?.job_title
                                  ? students.student_profile.job_title
                                  : "N/A"}
                              </p>
                            </div>
                            <div className="col-5 text-center">
                              <img
                                src={
                                  students?.Image
                                    ? `${baseurl}/${students?.Image}`
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
                                {students?.portfolio_link !== "N/A" ? (
                                  <a
                                    href={
                                      students.portfolio_link.startsWith("http")
                                        ? students.portfolio_link
                                        : `https://${students.portfolio_link}`
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
                                {students.resume_link !== "N/A" ? (
                                  <a
                                    href={
                                      students.resume_link.startsWith("http")
                                        ? students.resume_link
                                        : `https://${students.resume_link}`
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
                            <div className="text-muted mb-2">Contact Info:</div>
                            <ul className="ml-4 mb-0 fa-ul text-muted">
                              <li className="small mt-1">
                                <span className="fa-li">
                                  <i className="fas fa-lg fa-envelope mr-1" />
                                </span>
                                Email:{" "}
                                {students?.email ? (
                                  <a href={`mailto:${students.email}`}>
                                    {students.email}
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
                                {students?.Github &&
                                students.Github !== "N/A" ? (
                                  <a
                                    href={
                                      students.Github.startsWith("http")
                                        ? students.Github
                                        : `https://${students.Github}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {students.Github}
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
                                {students?.linkedin ? (
                                  <a
                                    href={
                                      students.linkedin.startsWith("http")
                                        ? students.linkedin
                                        : `https://${students.linkedin}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {students.linkedin}
                                  </a>
                                ) : (
                                  "N/A"
                                )}
                              </li>
                              {/* <li className="small">
                                <span className="fa-li">
                                  <i className="fas fa-lg fa-fax mr-1" />
                                </span>
                                Mobile No:{" "}
                                {students.mobile
                                  ? isValidMobileNumber(students.mobile)
                                    ? students.mobile
                                    : "Invalid Mobile Number"
                                  : "N/A"}
                              </li> */}
                            </ul>
                          </div>
                        </div>
                        <div className="card-footer">
                          <div className="text-right">
                            <button
                              onClick={() => handleViewProfile(students)}
                              className="btn btn-sm btn-primary"
                              aria-label={`View profile of ${students.name}`}
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

const AllStudents = () => {
  return (
    <Home
      DynamicContent={AllStudentsContent}
      url="all_students"
      heading="All Students"
    />
  );
};

export default AllStudents;
