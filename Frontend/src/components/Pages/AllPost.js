import React, { useState, useContext, useEffect, useRef } from "react";
import Home from "../Dashboard/Home";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import LoadingSpinner from "../Loading/Loading";
import Notification from "../Notification/Notification";
import baseurl from "../const";
import { useNavigate } from "react-router-dom";

const AllPostContent = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);     // Keep track of the page number
  const [totalPages,setTotalPages] = useState(1)
  const [singlePost, setSinglePost] = useState(null);
  const {
    isOpen,
    message,
    icon,
    title,
    handleClose,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <section className="content">
      <LoadingSpinner isLoading={loading} />
      <Notification
        message={message}
        isOpen={isOpen}
        onClose={handleClose}
        icon={icon}
        title={title}
      />

      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <div
              className="tab-pane"
              id="activity"
              style={{
                maxHeight: "131vh",
                overflowY: "auto",
                overflowX: "hidden",
                padding: "24px",
                boxSizing: "border-box",
                width: "auto",
                backgroundColor: "#f8f9fa",
              }}
            >
              {/* Post */}
              {posts?.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "1.5em",
                    fontWeight: "bold",
                    height: "100vh",
                    paddingTop: "50px",
                    color: "#6c757d",
                  }}
                >
                  No Posts Available
                </div>
              ) : (
                <>
                  {posts?.map((post, ind) => (
                    <div
                      key={ind}
                      className="post"
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "12px",
                        padding: "24px",
                        marginBottom: "24px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                        border: "1px solid #e9ecef",
                        transition: "all 0.3s ease",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 4px 16px rgba(0, 0, 0, 0.12)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 2px 8px rgba(0, 0, 0, 0.08)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      {/* Author Header Section */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "16px",
                          paddingBottom: "16px",
                          borderBottom: "1px solid #e9ecef",
                        }}
                      >
                        <div
                          style={{
                            position: "relative",
                            marginRight: "16px",
                          }}
                        >
                          <img
                            src={`${baseurl}/${post?.author?.Image || "#"}`}
                            alt={post?.author?.full_name || "Author"}
                            style={{
                              width: "56px",
                              height: "56px",
                              borderRadius: "50%",
                              objectFit: "cover",
                              border: "3px solid #f0f0f0",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            }}
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/56?text=N/A";
                              e.target.style.backgroundColor = "#e9ecef";
                            }}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flexWrap: "wrap",
                              gap: "12px",
                              marginBottom: "4px",
                            }}
                          >
                            <button
                              onClick={() => handleViewProfile(post?.author)}
                              style={{
                                cursor: "pointer",
                                fontSize: "1.1rem",
                                fontWeight: "600",
                                color: "#2c3e50",
                                textDecoration: "none",
                                transition: "color 0.2s ease",
                                background: "none",
                                border: "none",
                                padding: 0,
                                textAlign: "left",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.color = "#007bff";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.color = "#2c3e50";
                              }}
                            >
                              {post?.author?.full_name || "Author"}
                            </button>
                            {post?.tag && (
                              <span
                                style={{
                                  display: "inline-block",
                                  padding: "4px 12px",
                                  borderRadius: "20px",
                                  backgroundColor: "#e8f5e9",
                                  color: "#2e7d32",
                                  fontSize: "0.85rem",
                                  fontWeight: "600",
                                  textTransform: "capitalize",
                                  letterSpacing: "0.3px",
                                }}
                              >
                                {post?.tag}
                              </span>
                            )}
                          </div>
                          <div
                            style={{
                              fontSize: "0.875rem",
                              color: "#6c757d",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <i
                              className="fas fa-clock"
                              style={{ fontSize: "0.75rem" }}
                            ></i>
                            <span>{formatDate(post?.created_at) || "Date"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Post Title */}
                      <h3
                        style={{
                          fontWeight: "700",
                          fontSize: "1.5rem",
                          color: "#1a1a1a",
                          marginBottom: "12px",
                          lineHeight: "1.4",
                          letterSpacing: "-0.3px",
                        }}
                      >
                        {post?.title || "Title"}
                      </h3>

                      {/* Post Content */}
                      <div
                        className="postfont"
                        style={{
                          fontSize: "1rem",
                          lineHeight: "1.7",
                          color: "#4a4a4a",
                          whiteSpace: "pre-wrap",
                          wordWrap: "break-word",
                          hyphens: "auto",
                          overflowWrap: "break-word",
                          marginTop: "0.5em",
                          marginBottom: "0.5em",
                          textAlign: "justify",
                        }}
                      >
                        {post?.content || "Content"}
                      </div>

                      {/* Optional: Post Actions Footer */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          gap: "20px",
                          marginTop: "16px",
                          paddingTop: "16px",
                          borderTop: "1px solid #f0f0f0",
                        }}
                      >
                        {post?.Image &&
                          post?.Image !== "/media/default/def.jpeg" && (
                            <button
                              onClick={() => {
                                handleImageClick();
                                setSinglePost(post);
                              }}
                              style={{
                                color: "#6c757d",
                                textDecoration: "none",
                                fontSize: "0.9rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                transition: "color 0.2s ease",
                                background: "none",
                                border: "none",
                                padding: 0,
                                cursor: "pointer",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.color = "#007bff";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.color = "#6c757d";
                              }}
                            >
                              <i className="fas fa-image"></i>
                              <span>Image</span>
                            </button>
                          )}

                        {post?.DocUrl && (
                          <a
                            href={post?.DocUrl || "#"}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              color: "#6c757d",
                              textDecoration: "none",
                              fontSize: "0.9rem",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              transition: "color 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.color = "#007bff";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.color = "#6c757d";
                            }}
                          >
                            <i className="fas fa-file-alt"></i>
                            <span>Document</span>
                          </a>
                        )}

                        {post?.link && (
                          <a
                            href={post?.link || "#"}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              color: "#6c757d",
                              textDecoration: "none",
                              fontSize: "0.9rem",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              transition: "color 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.color = "#007bff";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.color = "#6c757d";
                            }}
                          >
                            <i className="fas fa-link"></i>
                            <span>Link</span>
                          </a>
                        )}
                      </div>

                      {/* Image Modal */}
                      {isImageOpen && singlePost?.Image && (
                        <div
                          style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.85)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 1050,
                            cursor: "pointer",
                          }}
                          onClick={handleCloseModal}
                        >
                          <div
                            style={{
                              position: "relative",
                              maxWidth: "90%",
                              maxHeight: "90%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <img
                              src={`${baseurl}/${singlePost?.Image}`}
                              alt="Post"
                              style={{
                                maxWidth: "100%",
                                maxHeight: "90vh",
                                borderRadius: "8px",
                                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
                              }}
                            />
                            <button
                              onClick={handleCloseModal}
                              style={{
                                position: "absolute",
                                top: "15px",
                                right: "15px",
                                fontSize: "2rem",
                                color: "#fff",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                border: "none",
                                borderRadius: "50%",
                                width: "40px",
                                height: "40px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "background-color 0.2s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor =
                                  "rgba(0, 0, 0, 0.8)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor =
                                  "rgba(0, 0, 0, 0.5)";
                              }}
                            >
                              &times;
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}

              {/* Pagination controls */}
              <div className="card-footer">
                <nav aria-label="Page Navigation">
                  <ul className="pagination justify-content-center m-0">
                    {/* Previous button */}
                    <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                      <button
                        className={`page-link ${
                          page === 1 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
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
                        {page}
                      </button>
                    </li>

                    {/* Next button */}
                    <li
                      className={`page-item ${
                        page === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className={`page-link ${
                          page === totalPages
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
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
              {/* /.post */}
            </div>
          </div>
        </div>
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
