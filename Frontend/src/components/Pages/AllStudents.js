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

const AllStudentsContent = () => {
  const [studentData, setStudentData] = useState(null);
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
    setStudentFilters,
    setFilter,
    setShowProfileOfId,
    studentFilters,
    setIsAllStudentPage,
    setIsAllAlumniPage,
    setIsAllAdminPage,
    reloadFilter,
    setIsAllPostPage,
  } = useContext(AuthContext);

  // Initialize page state
  useEffect(() => {
    setFilter(true);
    setIsAllStudentPage(true);
    setIsAllAlumniPage(false);
    setIsAllAdminPage(false);
    setIsAllPostPage(false);
  }, []);

  // Fetch students
  const fetchStudents = async (page, filters) => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("authTokens") || "null");
    const params = new URLSearchParams({ page, page_size: pageSize, ...filters });
    try {
      const res = await axios.get(`${baseurl}/students/?${params}`, {
        headers: { Authorization: `Bearer ${token?.access}` },
      });
      setStudentData(res.data);
      setTotalPages(Math.ceil(res.data.count / pageSize));
    } catch (err) {
      console.error(err);
      showNotification("Error loading students.", "error", "Error");
    } finally {
      setLoading(false);
    }
  };

  // On mount and filter/page change
  useEffect(() => {
    if (isFirstLoad.current) {
      setStudentFilters({});
      fetchStudents(1, {});
      isFirstLoad.current = false;
    } else {
      fetchStudents(pageNumber, studentFilters);
    }
  }, [pageNumber, reloadFilter]);

  // GSAP scroll animations
  useEffect(() => {
    const cards = gsap.utils.toArray(".student-card");
    cards.forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    });
  }, [studentData]);

  const handleViewProfile = (student) => {
    setShowProfileOfId(true);
    navigate("/profile", { state: student });
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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {studentData?.results?.length ? (
          studentData.results.map((student) => (
            <div
              key={student.id}
              className="student-card bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div className="p-4">
                <img
                  src={
                    student.Image ? `${baseurl}/${student.Image}` : "/default-avatar.png"
                  }
                  alt={student.full_name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-purple-700 text-center">
                  {student.full_name || "N/A"}
                </h3>
                <p className="text-sm text-gray-500 text-center mb-2">
                  Year: {student.student_profile?.current_year_of_study || "N/A"}
                </p>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>
                    <strong>Branch:</strong> {student.Branch || "N/A"}
                  </li>
                  <li>
                    <strong>Grad Year:</strong> {student.graduation_year || "N/A"}
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right">
                <button
                  onClick={() => handleViewProfile(student)}
                  className="bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-gray-500 text-xl">No Students Found!</p>
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

const AllStudents = () => (
  <Home
    DynamicContent={AllStudentsContent}
    url="all_students"
    heading="All Students"
  />
);

export default AllStudents;
