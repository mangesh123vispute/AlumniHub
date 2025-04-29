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

const AllHODsContent = () => {
  const [hodData, setHodData] = useState(null);
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
    setIsAllStudentPage,
    setIsAllAlumniPage,
    setIsAllAdminPage,
    hodFilters,
    setHODFilters,
    reloadFilter,
    reloadAdminData,
    setIsAllPostPage,
  } = useContext(AuthContext);

  useEffect(() => {
    setFilter(true);
    setIsAllAdminPage(true);
    setIsAllStudentPage(false);
    setIsAllAlumniPage(false);
    setIsAllPostPage(false);
  }, []);

  const fetchHODs = async (page, filters) => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("authTokens") || "null");
    const params = new URLSearchParams({ page, page_size: pageSize, ...filters });
    try {
      const res = await axios.get(`${baseurl}/hods/?${params}`, {
        headers: { Authorization: `Bearer ${token?.access}` },
      });
      setHodData(res.data);
      setTotalPages(Math.ceil(res.data.count / pageSize));
    } catch (err) {
      console.error(err);
      showNotification("Error loading admin data.", "error", "Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFirstLoad.current) {
      setHODFilters({});
      fetchHODs(1, {});
      isFirstLoad.current = false;
    } else {
      fetchHODs(pageNumber, hodFilters);
    }
  }, [pageNumber, reloadFilter, reloadAdminData]);

  useEffect(() => {
    const cards = gsap.utils.toArray(".hod-card");
    gsap.from(cards, {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".hod-grid",
        start: "top 85%",
      },
    });
  }, [hodData]);

  const handleViewProfile = (hod) => {
    setShowProfileOfId(true);
    navigate("/profile", { state: hod });
  };

  return (
    <div className="space-y-6 pb-10">
      <LoadingSpinner isLoading={loading} />
      <Notification
        message={message}
        isOpen={isOpen}
        onClose={handleClose}
        icon={icon}
        title={title}
      />

      {/* HOD Cards Grid */}
      <div className="hod-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 auto-rows-fr">
        {hodData?.results?.length ? (
          hodData.results.map((hod) => (
            <div
              key={hod.id}
              className="hod-card flex flex-col h-full bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-gradient-to-br from-purple-300 to-purple-600 p-6 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white mb-4">
                  <img
                    src={hod.Image ? `${baseurl}/${hod.Image}` : "/default-avatar.png"}
                    alt={hod.full_name || hod.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-white text-center">
                  {hod.full_name || hod.username}
                </h3>
                <p className="text-sm text-purple-200 text-center mt-1">
                  {hod.hod_profile?.designation || "Senior Faculty"}
                </p>
                <p className="text-xs text-purple-100 text-center mt-2">
                  Branch: {hod.Branch || "N/A"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 text-right mt-auto">
                <button
                  onClick={() => handleViewProfile(hod)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-gray-500 text-xl">No Admin Found!</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4 pt-10">
        <button
          onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
          className="p-3 bg-purple-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition"
          disabled={pageNumber === 1}
        >
          &larr;
        </button>
        <span className="text-purple-700 font-bold">Page {pageNumber}</span>
        <button
          onClick={() => setPageNumber((p) => Math.min(totalPages, p + 1))}
          className="p-3 bg-purple-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition"
          disabled={pageNumber === totalPages}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

const AllHODs = () => (
  <Home
    DynamicContent={AllHODsContent}
    url="all_hods"
    heading="All Admin"
  />
);

export default AllHODs;
