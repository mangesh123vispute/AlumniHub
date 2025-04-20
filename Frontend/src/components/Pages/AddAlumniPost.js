import React, { useState, useContext, useEffect } from "react";
import Home from "../Dashboard/Home";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import LoadingSpinner from "../Loading/Loading";
import Notification from "../Notification/Notification";
import baseurl from "../const";

const accessToken = localStorage.getItem("authTokens")
  ? JSON.parse(localStorage.getItem("authTokens")).access
  : null;

const AddAlumniPostContent = () => {
  const [Title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [docUrl, setDocUrl] = useState("");
  const [Image, setImage] = useState(null);
  const [Loading, setLoading] = useState(false);

  const {
    verifyaccessToken,
    isOpen,
    message,
    icon,
    title,
    handleClose,
    showNotification,
    setIsAllStudentPage,
    setIsAllAdminPage,
    setIsAllAlumniPage,
    setIsAllPostPage,
    setFilter,
    userData,
  } = useContext(AuthContext);

  useEffect(() => {
    setIsAllStudentPage(false);
    setIsAllAdminPage(false);
    setIsAllAlumniPage(false);
    setFilter(false);
    setIsAllPostPage(false);
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if ((await verifyaccessToken()) === -1) {
      return;
    }

    if (!Title || !content || !tag) {
      showNotification(
        "Please fill in all fields and upload an image.",
        "warning",
        "Missing fields"
      );
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", Title);
    formData.append("content", content);
    formData.append("tag", tag);
    if (Image) formData.append("Image", Image);
    formData.append("DocUrl", docUrl);

    await axios
      .post(`${baseurl}/alumni/posts/${userData?.user_id}/`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setTitle("");
        setContent("");
        setTag("");
        setImage(null);
        setDocUrl("");
        showNotification(
          "Post created successfully.",
          "success",
          "Post created"
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error during submission:", error);
        showNotification(
          "Error submitting the post.",
          "warning",
          "Submission failed"
        );
        setLoading(false);
      });
  };

  return (
    <>
      <LoadingSpinner isLoading={Loading} />
      <Notification
        message={message}
        isOpen={isOpen}
        onClose={handleClose}
        icon={icon}
        title={title}
      />
      <section className=" min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl transform transition duration-500 hover:scale-105">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create New Post
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter title"
                value={Title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">
                Tag
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter tag (e.g., event, news)"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">
                Content
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">
                Image Upload
              </label>
              <input
                type="file"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">
                Document URL
              </label>
              <input
                type="url"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter document URL"
                value={docUrl}
                onChange={(e) => setDocUrl(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

const AddAlumniPost = () => {
  return (
    <Home
      DynamicContent={AddAlumniPostContent}
      url="Add Post"
      heading="Add Post"
    />
  );
};

export default AddAlumniPost;