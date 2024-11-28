import React, { useState, useContext, useEffect } from "react";
import Home from "../Dashboard/Home";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import LoadingSpinner from "../Loading/Loading";
import Notification from "../Notification/Notification";
import moment from "moment"; // Optional library for better date formatting
import baseurl from "../const";

const YourPostContent = () => {
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
    userData,
    setFilter,
  } = useContext(AuthContext);
setFilter(true);
  const getAllPosts = async (e) => {
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
      const authorId = userData.user_id;
      const response = await axios.get(
        // eslint-disable-next-line no-template-curly-in-string
        `${baseurl}/posts/author/${authorId}`,
        {
          headers: {
            Authorization: `Bearer ${token?.access}`,
          },
        }
      );
      setPosts(response.data);
    } catch (error) {
      console.error(error);
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
        `${baseurl}/hodposts/${postId}/`,
        {
          headers: {
            Authorization: `Bearer ${token?.access}`,
          },
        }
      );
      setSinglePost(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <section className="content ">
      <LoadingSpinner isLoading={loading} />
      <Notification
        message={message}
        isOpen={isOpen}
        onClose={handleClose}
        icon={icon}
        title={title}
      />

      <div className="container mx-auto" style={{ width: "60vw" }}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="card mb-6 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
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
                    marginBottom: "2em",
                  }}
                >
                  {post.title}
                </h1>
                {post.image_url ? (
                  <div className="position-relative">
                    <img
                      src={post.image_url}
                      alt="Post Image"
                      className="card-img-top"
                      style={{ height: "50vh", objectFit: "cover" }}
                    />

                    {post.image_url && (
                      <a
                        href={post.image_url} // Make sure to use the correct URL for the download link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                        style={{
                          position: "absolute",
                          bottom: "10px", // Adjust to position the button where you want it
                          right: "10px", // Adjust to position the button where you want it
                          backgroundColor: "white", // Optional: Background color for better visibility
                          padding: "0.1em", // Optional: Padding for the button
                          borderRadius: "5px",
                        }}
                      >
                        <i className="fa fa-download"></i>
                      </a>
                    )}
                  </div>
                ) : null}

                {/* Content */}
                <div
                  className="card-text"
                  style={{
                    fontSize: "1em",
                    fontWeight: "bold",
                  }}
                >
                  {post.content}
                </div>

                {/* Timestamp */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "right",
                  }}
                >
                  <p className="d-flex flex-column">
                    <small style={{ fontSize: "0.6em", fontWeight: "bold" }}>
                      Author:{" "}
                      {post.author_name
                        ? post.author_name
                        : post.author_username}
                      <span style={{ marginLeft: "1em" }}>
                        <span style={{ marginRight: "0.5em" }}> Docs</span>
                        {post.DocUrl && (
                          <a
                            href={post.DocUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            <i className="fa fa-file-alt"></i>
                          </a>
                        )}
                      </span>
                    </small>

                    <small style={{ fontSize: "0.6em", marginTop: "2px" }}>
                      {moment(post.created_at).format("MMMM Do YYYY, h:mm a")}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p
            className="text-center text-gray-500"
            style={{ fontSize: "1.5em", fontWeight: "bold", height: "100vh" }}
          >
            No posts available.
          </p>
        )}
      </div>
    </section>
  );
};

const YourPosts = () => {
  return (
    <Home
      DynamicContent={YourPostContent}
      url="Your Posts"
      heading="Your Posts"
    />
  );
};

export default YourPosts;
