import React, { useState, useContext, useEffect } from "react";
import Home from "../Dashboard/Home";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import LoadingSpinner from "../Loading/Loading";
import Notification from "../Notification/Notification";
import moment from "moment"; // Optional library for better date formatting

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
  } = useContext(AuthContext);
setFilter(true);


  const getAllPosts = async () => {
    const token = localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null;
    setLoading(true);
    try {
      const urls = [
        `http://127.0.0.1:8000/hodposts/?page=${page}&page_size=10`,
        `http://127.0.0.1:8000/alumni/posts/?page=${page}&page_size=10`,
      ];

      const responses = await Promise.all(
        urls.map((url) =>
          axios.get(url, {
            headers: { Authorization: `Bearer ${token?.access}` },
          })
        )
      );

      const combinedData = responses.flatMap((response) => response.data);
      setPosts(combinedData);
    } catch (error) {
      console.error("Error fetching posts:", error);
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


  const getSinglePost = async (postId, e) => {
    if (e) e.preventDefault();

    const token = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;

    setLoading(true);

    if ((await verifyaccessToken()) === -1) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/hodposts/${postId}/`,
        {
          headers: {
            Authorization: `Bearer ${token?.access}`,
          },
        }
      );
      setSinglePost(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);


  //user , formatDate page setPage totalPages

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
  
    <div className="container-fluid" >
      {/* {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="card mb-4 shadow-lg rounded-lg overflow-hidden"
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            
            <div className="ribbon-wrapper ribbon-lg">
              <div className="ribbon bg-primary">{post.tag}</div>
            </div>
            
  
            <div className="card-body">
              
              <h1
                className="card-title"
                style={{
                  fontSize: "1.5em",
                  fontWeight: "bold",
                  marginBottom: "1.5em",
                }}
              >
                {post.title}
              </h1>
  
              {post.image_url && (
                <div className="position-relative">
                  <img
                    src={post.image_url}
                    alt="Post Image"
                    className="card-img-top"
                    style={{
                      width: "100%",
                      maxWidth: "100%", 
                      height: "auto",  
                      objectFit: "cover", 
                      borderRadius: "10px",
                    }}
                  />
  
                  <a
                    href={post.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                      backgroundColor: "#fff",
                      padding: "0.3em 0.6em",
                      borderRadius: "5px",
                      fontSize: "1.2em",
                      textDecoration: "none",
                      color: "#007bff",
                    }}
                  >
                    <i className="fa fa-download"></i>
                  </a>
                </div>
              )}
  
              
              <div
                className="card-text"
                style={{
                  fontSize: "1em",
                  fontWeight: "bold",
                  marginTop: "1.5em",
                }}
              >
                {post.content}
              </div>
  
              
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "1.5em",
                }}
              >
                <p className="d-flex flex-column">
                  <small style={{ fontSize: "0.8em", fontWeight: "bold" }}>
                    Author: {post.author_name || post.author_username}
                  </small>
                  <small style={{ fontSize: "0.7em", marginTop: "2px" }}>
                    {moment(post.created_at).format("MMMM Do YYYY, h:mm a")}
                  </small>
                </p>
  
                {post.DocUrl && (
                  <a
                    href={post.DocUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "0.9em",
                    }}
                  >
                    Docs <i className="fa fa-file-alt ml-2"></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500" style={{ fontSize: "1.5em", fontWeight: "bold",height:"100vh" }}>No posts available.</p>
      )} */}

                         <div
                          className="tab-pane"
                          id="activity"
                          style={{
                            maxHeight: "131vh",
                            overflowY: "auto",
                            overflowX: "hidden",
                            padding: "15px",
                            boxSizing: "border-box",
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
                              {posts.map((post) => (
                                <div key={post.id} className="post">
                                  <div className="user-block">
                                    {/* <img
                                      className="img-circle img-bordered-sm"
                                      src={`http://127.0.0.1:8000/${
                                        user?.Image || "#"
                                      }`}
                                      alt="user image"
                                    /> */}
                                    <span className="username">
                                      <a href="#">
                                        {post?.author_name ||
                                          (post?.author_username
                                            ? post?.author_username
                                            : "Author")}
                                      </a>
                                    </span>

                                    <span className="description">
                                      Created at -{" "}
                                      {formatDate(post?.created_at) || "Date"}
                                      <br></br>
                                      <span
                                        className="badge bg-success"
                                        style={{
                                          fontSize: "0.8em",
                                          padding: "0.5em",
                                        }}
                                      >
                                        {" "}
                                        {post?.tag || "Tag"}
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
                                    }}
                                  >
                                    {post?.content || "Content"}
                                  </p>
                                  <div className="row">
                                    <div className="col-auto">
                                      <a
                                        href={post?.image_url || "#"}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mr-3"
                                      >
                                        <i className="fas fa-image mr-1" />{" "}
                                        Image
                                      </a>
                                    </div>
                                    <div className="col-auto">
                                      <a
                                        href={post?.DocUrl || "#"}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mr-3"
                                      >
                                        <i className="fas fa-file-alt mr-1" />{" "}
                                        Document
                                      </a>
                                    </div>
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
                                <li
                                  className={`page-item ${
                                    page === 1 ? "disabled" : ""
                                  }`}
                                >
                                  <button
                                    className={`page-link ${
                                      page === 1
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
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
  </section>
  
  );
};

const AllPost = () => {
  return (
    <Home DynamicContent={AllPostContent} url="All Posts" heading="All Posts" />
  );
};

export default AllPost;
