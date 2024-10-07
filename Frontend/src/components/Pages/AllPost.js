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
  const [singlePost, setSinglePost] = useState(null);
  const {
    verifyaccessToken,
    isOpen,
    message,
    icon,
    title,
    handleClose,
    showNotification,
  } = useContext(AuthContext);

  const getAllPosts = async () => {
    const token = localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null;
    setLoading(true);
    try {
      const urls = [
        "http://127.0.0.1:8000/hodposts/",
        "http://127.0.0.1:8000/alumni/posts/",
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
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="card mb-4 shadow-lg rounded-lg overflow-hidden"
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            {/* Tag as a badge */}
            <div className="ribbon-wrapper ribbon-lg">
              <div className="ribbon bg-primary">{post.tag}</div>
            </div>
  
            <div className="card-body">
              {/* Title */}
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
  
              {/* Content */}
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
  
              {/* Timestamp and Author */}
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
        <p className="text-center text-gray-500">No posts available.</p>
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
