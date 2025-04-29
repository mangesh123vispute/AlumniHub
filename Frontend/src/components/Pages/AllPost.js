import React, { useState, useContext, useEffect, useRef } from "react";
import Home from "../Dashboard/Home";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import LoadingSpinner from "../Loading/Loading";
import Notification from "../Notification/Notification";
import moment from "moment"; // Optional library for better date formatting
import baseurl from "../const";
import { useNavigate } from "react-router-dom";

const AllPostContent = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);     // Keep track of the page number
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1)
  const [singlePost, setSinglePost] = useState(null);
  const {
    verifyaccessToken,
    isOpen,
    message,
    icon,
    title,
    handleClose,
    showNotification,
    setFilter,
    setShowProfileOfId,
    setIsAllStudentPage,
    setIsAllAdminPage,
    setIsAllAlumniPage,
    setIsAllPostPage,
    postFilters,
    reloadFilter,
    setPostFilters,
  } = useContext(AuthContext);
  setFilter(true);
  const navigate = useNavigate();

  const isFirstLoad = useRef(true);
  const handleViewProfile = (userData) => {
    setShowProfileOfId(true);
    navigate("/profile", { state: userData });
  };

  const [isImageOpen, setIsImageOpen] = useState(false);

  const handleImageClick = () => {
    setIsImageOpen(true);
  };

  const handleCloseModal = () => {
    setIsImageOpen(false);
  };


  useEffect(() => {
    setIsAllStudentPage(false);
    setIsAllAdminPage(false);
    setIsAllAlumniPage(false);
    setIsAllPostPage(true);
    setFilter(true);
  }, []);


  useEffect(() => {
    getAllPosts(page);
    if (isFirstLoad.current) {
      setPostFilters({});
      getAllPosts(page);
      isFirstLoad.current = false;
    } else {
      getAllPosts(page);
    }

  }, [page, reloadFilter]);




  const getAllPosts = async (pageNumber) => {
    setLoading(true);

    const filteredPostFilters = Object.fromEntries(
      Object.entries(postFilters).filter(([_, value]) => value !== "")
    );


    const queryParams = new URLSearchParams({
      page: pageNumber || 1,
      page_size: 10,
      ...(isFirstLoad.current ? {} : filteredPostFilters),
    }).toString();

    try {
      const response = await axios.get(`${baseurl}/posts?${queryParams}`);
      if (response.status === 200) {
        setPosts(response.data.results); // Set fetched posts
        setHasMore(response.data.next !== null); // Determine if there are more posts
        const totalItems = response.data.count;
        setTotalPages(Math.ceil(totalItems / 10));
      }
    } catch (error) {
      console.error("Error fetching posts:", error);

      // Check if the error matches the specific criteria
      if (
        error.message === "Request failed with status code 404" &&
        error.name === "AxiosError" &&
        error.code === "ERR_BAD_REQUEST" &&
        error.response &&
        error.response.status === 404
      ) {

        setPage(1);
      }
    }
    finally {
      setLoading(false);
    }
  };


  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };



  return (
    <section className="content px-4 py-6  min-h-screen">
      <LoadingSpinner isLoading={loading} />
      <Notification
        message={message}
        isOpen={isOpen}
        onClose={handleClose}
        icon={icon}
        title={title}
      />

      <div className="max-w-5xl mx-auto">
        {posts?.length === 0 ? (
          <div className="flex items-center justify-center h-[60vh]">
            <h2 className="text-2xl font-bold text-gray-500">🚫 No Posts Available</h2>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post, ind) => (
              <div
                key={ind}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    className="w-12 h-12 rounded-full border-2 border-gray-200 object-cover"
                    src={`${baseurl}/${post?.author?.Image || "#"}`}
                    alt="Author"
                  />
                  <div>
                    <button
                      onClick={() => handleViewProfile(post?.author)}
                      className="text-lg font-semibold text-blue-600 hover:underline"
                    >
                      {post?.author?.full_name || "Author"}
                    </button>
                    <div className="text-sm text-gray-500">
                      {formatDate(post?.created_at)} ·{" "}
                      <span className="text-green-600 font-medium capitalize">
                        {post?.tag || "Tag"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{post?.title}</h3>
                <p className="text-gray-700 whitespace-pre-wrap break-words leading-relaxed">
                  {post?.content}
                </p>

                {/* Media Section */}
                <div className="mt-4 flex flex-wrap gap-4">
                  {post?.Image && post?.Image !== "/media/default/def.jpeg" && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleImageClick();
                      }}
                      className="text-blue-500 hover:underline flex items-center gap-1"
                    >
                      <i className="fas fa-image" /> View Image
                    </button>
                  )}

                  {post?.DocUrl && (
                    <a
                      href={post?.DocUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-purple-600 hover:underline flex items-center gap-1"
                    >
                      <i className="fas fa-file-alt" /> View Document
                    </a>
                  )}

                  {post?.link && (
                    <a
                      href={post?.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-teal-600 hover:underline flex items-center gap-1"
                    >
                      <i className="fas fa-link" /> Visit Link
                    </a>
                  )}
                </div>

                {/* Image Modal */}
                {isImageOpen && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
                    onClick={handleCloseModal}
                  >
                    <div className="relative max-w-[90%] max-h-[90%]">
                      <img
                        src={post?.Image}
                        alt="Post"
                        className="rounded-lg shadow-2xl object-contain w-full h-auto"
                      />
                      <span
                        className="absolute top-2 right-3 text-white text-2xl cursor-pointer"
                        onClick={handleCloseModal}
                      >
                        &times;
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="flex justify-center items-center space-x-4 pt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="p-3 bg-purple-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition"
                disabled={page === 1}
              >
                &larr;
              </button>
              <span className="text-purple-700 font-bold">Page {page}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="p-3 bg-purple-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition"
                disabled={page === totalPages}
              >
                &rarr;
              </button>
            </div>

          </div>
        )}
      </div>
    </section>

  );
};

const AllPost = () => {
  return (
    <Home DynamicContent={AllPostContent} url="All Posts" heading="All Posts" />
  );
};

export default AllPost;
