import React, { useState, useContext, useEffect } from "react";
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
  const [totalPages,setTotalPages] = useState(1)
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
  } = useContext(AuthContext);
setFilter(true);
  const navigate = useNavigate();
  

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
  }, [page, reloadFilter]);

 

 
  const getAllPosts = async (pageNumber) => {
    setLoading(true);

    const filteredPostFilters = Object.fromEntries(
      Object.entries(postFilters).filter(([_, value]) => value !== "")
    );


    const queryParams = new URLSearchParams({
      page: pageNumber || 1,
      page_size: 10,
      ...filteredPostFilters,
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
      showNotification(
        "Error fetching posts, please try again.",
        "error",
        "Error"
      );
    } finally {
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
                padding: "15px",
                boxSizing: "border-box",
                width: "auto",
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
                  }}
                >
                  No Posts Available
                </div>
              ) : (
                <>
                  {" "}
                  {posts?.map((post, ind) => (
                    <div key={ind} className="post">
                      {console.log(post)}
                      <div
                        className="user-block"
                        style={{
                          borderBottom: "0.8px dashed  #ccc",
                          paddingBottom: "10px", // Change the width and color as needed
                        }}
                      >
                        <img
                          className="img-circle img-bordered-sm"
                          src={`${baseurl}/${post?.author?.Image || "#"}`}
                          alt="user image"
                        />

                        <span className="username">
                          <a
                            onClick={() => handleViewProfile(post?.author)}
                            className="view-profile-button "
                            style={{
                              cursor: "pointer",
                            }}
                          >
                            {post?.author?.full_name || "Author"}
                          </a>
                        </span>

                        <span className="description">
                          {formatDate(post?.created_at) || "Date"}
                          <br></br>
                          <span>
                            {" "}
                            <b
                              style={{
                                color: "Green",
                                textTransform: "capitalize",
                              }}
                            >
                              {post?.tag || "Tag"}
                            </b>
                          </span>
                        </span>
                      </div>
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.09em",
                        }}
                      >
                        {post?.title || "Title"}
                      </span>
                      <p
                        className="postfont"
                        style={{
                          marginTop: "0.5em",
                          marginBottom: "0.5em",
                          whiteSpace: "pre-wrap",
                          wordWrap: "break-word",
                          hyphens: "auto",
                          overflowWrap: "break-word",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {post?.content || "Content"}
                      </p>
                      <div className="row">
                        {post?.Image !== "/media/default/def.jpeg" &&
                          post?.Image && (
                            <div className="col-auto mt-3">
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleImageClick();
                                }}
                                className="mr-3"
                              >
                                <i className="fas fa-image mr-1" /> Image
                              </a>

                              {isImageOpen && (
                                <div
                                  style={{
                                    position: "fixed",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "tranparent",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    zIndex: 1050,
                                  }}
                                  onClick={handleCloseModal}
                                >
                                  <div
                                    style={{
                                      position: "relative",
                                      maxWidth: "100%",
                                      maxHeight: "100%",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <img
                                      src={post?.Image}
                                      alt="Post"
                                      style={{
                                        // maxWidth: "100%",
                                        // maxHeight: "100%",
                                        width: "100%",
                                        height: "auto",
                                        borderRadius: "5px",
                                        boxShadow:
                                          "0 4px 12px rgba(0, 0, 0, 0.3)",
                                      }}
                                    />
                                    <span
                                      style={{
                                        position: "absolute",
                                        top: "10px",
                                        right: "10px",
                                        fontSize: "1.5em",
                                        color: "#fff",
                                        cursor: "pointer",
                                      }}
                                      onClick={handleCloseModal}
                                    >
                                      &times;
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                        {post?.DocUrl && (
                          <div className="col-auto mt-3">
                            <a
                              href={post?.DocUrl || "#"}
                              target="_blank"
                              rel="noreferrer"
                              className="mr-3"
                            >
                              <i className="fas fa-file-alt mr-1" /> Document
                            </a>
                          </div>
                        )}
                        {post?.link && (
                          <div className="col-auto">
                            <a
                              href={post?.link || "#"}
                              target="_blank"
                              rel="noreferrer"
                              className="mr-3"
                            >
                              <i className="fas fa-link mr-1" /> Link
                            </a>
                          </div>
                        )}
                      </div>
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
