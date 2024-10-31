import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext.js";
import Home from "../Dashboard/Home.js";
import LoadingSpinner from "../Loading/Loading.js";
import Notification from "../Notification/Notification.js";
import axios from "axios";

const Requests = () => {
  const {
    userData,
    setFilter,
    isOpen,
    message,
    icon,
    title,
    handleClose,
    setIsAllAdminPage,
    showNotification,
    setNumberOfInactiveAlumni,  
  } = useContext(AuthContext);

  const [alumniData, setAlumniData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchAlumniData = async () => {
      setLoading(true);
      const token = localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null;

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/inactive-alumni/",
          {
            headers: {
              Authorization: `Bearer ${token?.access}`,
            },
          }
        );

        if (response.status === 200) {
          setAlumniData(response.data);
          setNumberOfInactiveAlumni(response.data.length); // Update the state with fetched data
        }
      } catch (error) {
        console.error("Error fetching alumni data:", error.message);
        showNotification(
          "Error fetching alumni data, please try again.",
          "error",
          "Error"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAlumniData();
  }, [userData, reload]);

   const activateAlumni = async (alumniId) => {
     const token = localStorage.getItem("authTokens")
       ? JSON.parse(localStorage.getItem("authTokens"))
       : null;

     try {
       const response = await axios.put(
         `http://127.0.0.1:8000/alumni/${alumniId}/activate/`,
         {},
         {
           headers: {
             Authorization: `Bearer ${token?.access}`,
           },
         }
       );

       if (response.status === 200) {
         showNotification(
           "Alumni activated successfully!",
           "success",
           "Success"
         );
         setReload(true);
         setAlumniData(alumniData.filter((alumni) => alumni.id !== alumniId));
       }
     } catch (error) {
       console.error("Error activating alumni:", error.message);
       showNotification(
         "Error activating alumni, please try again.",
         "error",
         "Error"
       );
     }
   };

   // Function to delete alumni
   const deleteAlumni = async (alumniId) => {
     const token = localStorage.getItem("authTokens")
       ? JSON.parse(localStorage.getItem("authTokens"))
       : null;

     try {
       const response = await axios.delete(
         `http://127.0.0.1:8000/alumni/${alumniId}/delete/`,
         {
           headers: {
             Authorization: `Bearer ${token?.access}`,
           },
         }
       );

       if (response.status === 204) {
         showNotification("Alumni deleted successfully!", "success", "Success");
         setAlumniData(alumniData.filter((alumni) => alumni.id !== alumniId));
         setReload(true);
       }
     } catch (error) {
       console.error("Error deleting alumni:", error.message);
       showNotification(
         "Error deleting alumni, please try again.",
         "error",
         "Error"
       );
     }
   };

  const acceptAllAlumni = async () => {
    const token = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;

    setLoading(true); // Optional: set loading state to true

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/alumni/accept-all/`,
        {},
        { 
          headers: {
            Authorization: `Bearer ${token?.access}`,
          },
        }
      );

      // Check if the response indicates success
      if (response.status === 200) {
        showNotification(
          "All alumni accepted successfully!",
          "success",
          "Success"
        );
        setReload(true);
      }
    } catch (error) {
      console.error("Error accepting all alumni:", error.message);
      showNotification(
        "Error accepting all alumni, please try again.",
        "error",
        "Error"
      );
    } finally {
      setLoading(false); // Optional: reset loading state
    }
  };

  const requestContent = () => {
    return (
      <>
        <section className="content">
          <div className="card" style={{ minHeight: "90vh" }}>
            <div className="card-header">
              <h3 className="card-title">Alumni Connect Requests</h3>
              <span className="float-right">
                <button
                  className="btn btn-primary btn-sm"
                  style={{ fontSize: "0.7rem" }}
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to accept all Alumnis?"
                      )
                    ) {
                      acceptAllAlumni();
                    }
                  }}
                >
                  <i className="fas fa-check-circle mr-2"></i>Accept All
                </button>
              </span>
            </div>
            <div
              className="card-body p-0"
              style={{ height: "50vh", overflowY: "auto" }}
            >
              <table className="table table-striped projects">
                <thead
                  style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "white",
                    zIndex: 1,
                  }}
                >
                  <tr>
                    <th style={{ width: "25%", backgroundColor: "lightgray" }}>
                      Alumni Name
                    </th>
                    <th style={{ width: "8%", backgroundColor: "lightgray" }}>
                      LinkedIn
                    </th>
                    <th style={{ width: "15%", backgroundColor: "lightgray" }}>
                      FY Marksheet
                    </th>
                    <th style={{ width: "8%", backgroundColor: "lightgray" }}>
                      LC
                    </th>
                    <th style={{ width: "8%", backgroundColor: "lightgray" }}>
                      ID Card
                    </th>
                    <th style={{ width: "15%", backgroundColor: "lightgray" }}>
                      Grad Certificate
                    </th>
                    <th style={{ width: "20%", backgroundColor: "lightgray" }}>
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {alumniData.map((alumni, index) => (
                    <tr key={index}>
                      <td>{alumni.full_name}</td>
                      <td>
                        {alumni?.linkedin ? (
                          <a
                            href={alumni.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-linkedin"></i>
                          </a>
                        ) : null}
                      </td>

                      <td>
                        {alumni.alumni_credentials.fourth_year_marksheet ? (
                          <i
                            className="fas fa-file-alt"
                            onClick={() =>
                              window.open(
                                alumni.alumni_credentials.fourth_year_marksheet,
                                "_blank"
                              )
                            }
                            style={{ cursor: "pointer" }}
                            title="FY Marksheet"
                          ></i>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td>
                        {alumni.alumni_credentials.lc ? (
                          <i
                            className="fas fa-file-alt"
                            onClick={() =>
                              window.open(
                                alumni.alumni_credentials.lc,
                                "_blank"
                              )
                            }
                            style={{ cursor: "pointer" }}
                            title="Leaving Certificate"
                          ></i>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td>
                        {alumni.alumni_credentials.id_card ? (
                          <i
                            className="fas fa-id-card"
                            onClick={() =>
                              window.open(
                                alumni.alumni_credentials.id_card,
                                "_blank"
                              )
                            }
                            style={{ cursor: "pointer" }}
                            title="ID Card"
                          ></i>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td>
                        {alumni.alumni_credentials.graduation_certificate ? (
                          <i
                            className="fas fa-graduation-cap"
                            onClick={() =>
                              window.open(
                                alumni.alumni_credentials
                                  .graduation_certificate,
                                "_blank"
                              )
                            }
                            style={{ cursor: "pointer" }}
                            title="Graduation Certificate"
                          ></i>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="project-actions">
                        <span
                          title="Correct"
                          style={{ color: "green", cursor: "pointer" }}
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to accept this alumni?"
                              )
                            ) {
                             activateAlumni(alumni.id);
                            }
                          }}
                        >
                          <i className="fas fa-check-circle"></i>
                        </span>
                        <span
                          title="Incorrect"
                          style={{
                            color: "red",
                            marginLeft: "10px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to reject this alumni?"
                              )
                            ) {
                             deleteAlumni(alumni.id);
                            }
                          }}
                        >
                          <i className="fas fa-times-circle"></i>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <LoadingSpinner isLoading={loading} />
      <Notification
        message={message}
        isOpen={isOpen}
        onClose={handleClose}
        icon={icon}
        title={title}
      />
      <Home DynamicContent={requestContent} url="requests" heading="Requests" />
    </>
  );
};

export default Requests;
