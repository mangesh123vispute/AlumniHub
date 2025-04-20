import React, { useState, useContext, useEffect, useRef } from "react";
import Home from "../Dashboard/Home";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import LoadingSpinner from "../Loading/Loading";
import Notification from "../Notification/Notification";
import baseurl from "../const";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const UnverifiedAlumniPostContent = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postRefs = useRef([]);

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
  } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    setIsAllStudentPage(false);
    setIsAllAdminPage(false);
    setIsAllAlumniPage(false);
    setIsAllPostPage(false);
    setFilter(false);
  }, []);

  useEffect(() => {
    getAllPosts(page);
  }, [page]);

  useEffect(() => {
    gsap.from(postRefs.current, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
    });
  }, [posts]);

  const handleViewProfile = (userData) => {
    setShowProfileOfId(true);
    navigate("/profile", { state: userData });
  };

  const verifyPost = async (id) => {
    if (!window.confirm("Are you sure you want to verify this post?")) return;
    try {
      setLoading(true);
      verifyaccessToken();
      const token = JSON.parse(localStorage.getItem("authTokens"));
      await axios.post(
        `${baseurl}/verify-alumni-post/${id}/`,
        {},
        { headers: { Authorization: `Bearer ${token?.access}` } }
      );
      showNotification("Post Verified successfully", "success", "Success");
      getAllPosts(page);
    } catch (err) {
      console.error(err);
      showNotification("Error verifying post", "error", "Error");
    } finally {
      setLoading(false);
    }
  };

  const rejectPost = async (id) => {
    if (!window.confirm("Are you sure you want to reject this post?")) return;
    try {
      setLoading(true);
      verifyaccessToken();
      const token = JSON.parse(localStorage.getItem("authTokens"));
      await axios.delete(`${baseurl}/reject-alumni-post/${id}/`, {
        headers: { Authorization: `Bearer ${token?.access}` },
      });
      showNotification("Post rejected successfully", "success", "Success");
      getAllPosts(page);
    } catch (err) {
      console.error(err);
      showNotification("Error rejecting post", "error", "Error");
    } finally {
      setLoading(false);
    }
  };

  const getAllPosts = async (pageNum) => {
    setLoading(true);
    const activeFilters = Object.fromEntries(
      Object.entries(postFilters).filter(([_, value]) => value !== "")
    );
    const queryParams = new URLSearchParams({
      page: pageNum || 1,
      page_size: 10,
      ...activeFilters,
    });

    try {
      verifyaccessToken();
      const token = JSON.parse(localStorage.getItem("authTokens"));
      const res = await axios.get(`${baseurl}/unverified-alumni-posts?${queryParams}`, {
        headers: { Authorization: `Bearer ${token?.access}` },
      });

      setPosts(res.data.results);
      setTotalPages(Math.ceil(res.data.count / 10));
    } catch (err) {
      console.error(err);
      showNotification("Error fetching posts", "error", "Error");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <section className="relative p-4">
      <LoadingSpinner isLoading={loading} />
      <Notification
        message={message}
        isOpen={isOpen}
        onClose={handleClose}
        icon={icon}
        title={title}
      />

      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center text-2xl font-semibold py-20 text-gray-500">
            No Posts Available
          </div>
        ) : (
          posts.map((post, index) => (
            <div
              key={index}
              ref={(el) => (postRefs.current[index] = el)}
              className="bg-white shadow-lg rounded-xl p-5 relative border border-purple-200"
            >
              <div className="flex items-start gap-4 mb-2">
                <img
                  src={`${baseurl}/${post?.author?.Image || "#"}`}
                  alt="User"
                  className="w-12 h-12 rounded-full border object-cover"
                />
                <div>
                  <h2
                    onClick={() => handleViewProfile(post?.author)}
                    className="text-purple-600 font-semibold text-lg cursor-pointer hover:underline"
                  >
                    {post?.author?.full_name || "Author"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {formatDate(post?.created_at)} |{" "}
                    <span className="capitalize font-medium text-green-600">
                      {post?.tag}
                    </span>
                  </p>
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow transition-transform duration-200 hover:scale-105"
                    onClick={() => verifyPost(post.id)}
                  >
                    <i className="fas fa-check" />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow transition-transform duration-200 hover:scale-105"
                    onClick={() => rejectPost(post.id)}
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
              <div className="text-lg font-bold text-gray-800">{post?.title}</div>
              <p className="text-gray-700 whitespace-pre-wrap my-2">{post?.content}</p>

              <div className="flex flex-wrap gap-4 mt-3">
                {post?.Image && post?.Image !== "/media/default/def.jpeg" && (
                  <a href={post?.Image} target="_blank" rel="noreferrer" className="text-purple-600 hover:underline">
                    <i className="fas fa-image mr-1" /> Image
                  </a>
                )}
                {post?.DocUrl && (
                  <a href={post?.DocUrl} target="_blank" rel="noreferrer" className="text-purple-600 hover:underline">
                    <i className="fas fa-file-alt mr-1" /> Document
                  </a>
                )}
                {post?.link && (
                  <a href={post?.link} target="_blank" rel="noreferrer" className="text-purple-600 hover:underline">
                    <i className="fas fa-link mr-1" /> Link
                  </a>
                )}
              </div>
            </div>
          ))
        )}

        {posts.length > 0 && (
          <div className="flex justify-center items-center space-x-4 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-2 bg-purple-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed shadow transition duration-200 hover:bg-purple-700"
              disabled={page === 1}
            >
              &larr;
            </button>
            <span className="text-purple-700 font-medium">Page {page}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="p-2 bg-purple-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed shadow transition duration-200 hover:bg-purple-700"
              disabled={page === totalPages}
            >
              &rarr;
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const UnverifiedAlumniPost = () => (
  <Home
    DynamicContent={UnverifiedAlumniPostContent}
    url="unverifiedalumni_posts"
    heading="Verify Alumni Posts"
  />
);

export default UnverifiedAlumniPost;
