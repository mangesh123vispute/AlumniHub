import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Home from "../Dashboard/Home.js";
import AuthContext from "../../context/AuthContext.js";
import LoadingSpinner from "../Loading/Loading.js";
import Notification from "../Notification/Notification.js";
import baseurl from "../const.js";

gsap.registerPlugin(ScrollTrigger);

const AllAlumnisContent = () => {
  const [alumniData, setAlumniData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 12;
  const isFirstLoad = useRef(true);
  const navigate = useNavigate();

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

  // Initialize filter state
  useEffect(() => {
    setFilter(true);
    setIsAllStudentPage(false);
    setIsAllAdminPage(false);
    setIsAllAlumniPage(true);
    setIsAllPostPage(false);
  }, []);

  // Fetch alumni data
  const fetchAlumni = async (page, filters) => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("authTokens") || "null");
    const params = new URLSearchParams({ page, page_size: pageSize, ...filters });
    try {
      const res = await axios.get(`${baseurl}/getalumni/?${params}`, {
        headers: { Authorization: `Bearer ${token?.access}` },
      });
      setAlumniData(res.data);
      setTotalPages(Math.ceil(res.data.count / pageSize));
    } catch (err) {
      console.error(err);
      showNotification("Error loading alumni.", "error", "Error");
    } finally {
      setLoading(false);
    }
  };

  // On mount and filters/page change
  useEffect(() => {
    if (isFirstLoad.current) {
      setAlumniFilters({});
      fetchAlumni(1, {});
      isFirstLoad.current = false;
    } else {
      fetchAlumni(pageNumber, Alumnifilters);
    }
  }, [pageNumber, reloadFilter]);

  // GSAP scroll animation for cards
  useEffect(() => {
    const cards = gsap.utils.toArray(".alumni-card");
    cards.forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
  }, [alumniData]);

  const handleViewProfile = (alumnus) => {
    setShowProfileOfId(true);
    navigate("/profile", { state: alumnus });
  };

  return (
    <div className="space-y-6">
      <LoadingSpinner isLoading={loading} />
      <Notification
        message={message}
        isOpen={isOpen}
        onClose={handleClose}
        icon={icon}
        title={title}
      />

      {/* Grid of cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {alumniData?.results?.length ? (
          alumniData.results.map((alumnus) => (
            <div
              key={alumnus.id}
              className="alumni-card bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div className="p-4">
                <img
                  src={
                    alumnus.Image ? `${baseurl}/${alumnus.Image}` : "/default-avatar.png"
                  }
                  alt={alumnus.full_name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-purple-700 text-center">
                  {alumnus.full_name || "N/A"}
                </h3>
                <p className="text-sm text-gray-500 text-center mb-2">
                  {alumnus.alumni_profile?.job_title || "Position N/A"}
                </p>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>
                    <strong>Branch:</strong> {alumnus.Branch || "N/A"}
                  </li>
                  <li>
                    <strong>Grad Year:</strong> {alumnus.graduation_year || "N/A"}
                  </li>
                  <li>
                    <strong>Exp:</strong> {alumnus.alumni_profile?.years_of_experience || "0"} Yr.
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right">
                <button
                  onClick={() => handleViewProfile(alumnus)}
                  className="bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-gray-500 text-xl">No Alumni Found!</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4 mt-4">
        <button
          onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
          className="p-2 bg-purple-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={pageNumber === 1}
        >
          &larr;
        </button>
        <span className="text-purple-700 font-medium">Page {pageNumber}</span>
        <button
          onClick={() => setPageNumber((p) => Math.min(totalPages, p + 1))}
          className="p-2 bg-purple-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={pageNumber === totalPages}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

const AllAlumnis = () => (
  <Home
    DynamicContent={AllAlumnisContent}
    url="all_alumnis"
    heading="All Alumni"
  />
);

export default AllAlumnis;
