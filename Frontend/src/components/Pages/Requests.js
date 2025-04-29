import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext.js";
import Home from "../Dashboard/Home.js";
import LoadingSpinner from "../Loading/Loading.js";
import Notification from "../Notification/Notification.js";
import axios from "axios";
import baseurl from "../const.js";

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
    numberOfInactiveAlumni,
    setIsAllStudentPage,
    setIsAllAlumniPage,
  } = useContext(AuthContext);

  const [alumniData, setAlumniData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchAlumniData = async () => {
      setLoading(true);
      setFilter(false);
      const token = localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null;

      try {
        const response = await axios.get(
          `${baseurl}/inactive-alumni/`,
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
      } finally {
        setLoading(false);
      }
    };

    fetchAlumniData();
  }, [userData, reload]);

  const activateAlumni = async (alumniId) => {
     setLoading(true);
     const token = localStorage.getItem("authTokens")
       ? JSON.parse(localStorage.getItem("authTokens"))
       : null;

     try {
       const response = await axios.put(
         `${baseurl}/alumni/${alumniId}/activate/`,
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
         setLoading(false);
         setAlumniData(alumniData.filter((alumni) => alumni.id !== alumniId));
       }
     } catch (error) {
       console.error("Error activating alumni:", error.message);
       setLoading(false);
       showNotification(
         "Error activating alumni, please try again.",
         "error",
         "Error"
       );

     }
   };

   // Function to delete alumni
  const deleteAlumni = async (alumniId) => {
     setLoading(true);
     const token = localStorage.getItem("authTokens")
       ? JSON.parse(localStorage.getItem("authTokens"))
       : null;

     try {
       const response = await axios.delete(
         `${baseurl}/alumni/${alumniId}/delete/`,
         {
           headers: {
             Authorization: `Bearer ${token?.access}`,
           },
         }
       );

       if (response.status === 204) {
         showNotification("Alumni deleted successfully!", "success", "Success");
         setLoading(false);
         setAlumniData(alumniData.filter((alumni) => alumni.id !== alumniId));
         setReload(true);
       }
     } catch (error) {
       setLoading(false);
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
        `${baseurl}/alumni/accept-all/`,
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

  useEffect(() => {
    setIsAllAdminPage(false);
    setIsAllStudentPage(false);
    setIsAllAlumniPage(false);
    setFilter(false);
  }, []);

  const requestContent = () => {
    return (
      <section className="content flex justify-center items-center min-h-[80vh]">
        <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-purple-700">
              Alumni Connect Requests
            </h2>
            {alumniData.length > 0 && (
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition duration-300"
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to accept all alumni?")
                  ) {
                    acceptAllAlumni();
                  }
                }}
              >
                Accept All
              </button>
            )}
          </div>
  
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-purple-100 sticky top-0 z-10">
                <tr>
                  <th className="py-3 px-6 font-medium text-purple-700">Alumni Name</th>
                  <th className="py-3 px-6 font-medium text-purple-700">LinkedIn</th>
                  <th className="py-3 px-6 font-medium text-purple-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {alumniData.length > 0 ? (
                  alumniData.map((alumni, index) => (
                    <tr key={index} className="hover:bg-purple-50 transition">
                      <td className="py-3 px-6">{alumni.full_name}</td>
                      <td className="py-3 px-6">
                        {alumni.linkedin ? (
                          <a
                            href={alumni.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 transition"
                          >
                            <i className="fab fa-linkedin fa-lg"></i>
                          </a>
                        ) : (
                          <span className="text-gray-400 italic">N/A</span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-right space-x-4">
                        <button
                          title="Accept"
                          onClick={() => {
                            if (
                              window.confirm("Are you sure you want to accept this alumni?")
                            ) {
                              activateAlumni(alumni.id);
                            }
                          }}
                          className="text-green-600 hover:text-green-800 transition transform hover:scale-110"
                        >
                          <i className="fas fa-check-circle fa-lg"></i>
                        </button>
                        <button
                          title="Reject"
                          onClick={() => {
                            if (
                              window.confirm("Are you sure you want to reject this alumni?")
                            ) {
                              deleteAlumni(alumni.id);
                            }
                          }}
                          className="text-red-600 hover:text-red-800 transition transform hover:scale-110"
                        >
                          <i className="fas fa-times-circle fa-lg"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-5 text-center text-gray-500 italic">
                      No Alumni Join Request !!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
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
