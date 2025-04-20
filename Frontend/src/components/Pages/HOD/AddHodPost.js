import React, { useState, useContext, useEffect } from "react";
import Home from "../../Dashboard/Home";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
import LoadingSpinner from "../../Loading/Loading";
import Notification from "../../Notification/Notification";
import baseurl from "../../const";

const accessToken = localStorage.getItem("authTokens")
  ? JSON.parse(localStorage.getItem("authTokens")).access
  : null;

const AddHodPostContent = () => {
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
    e.preventDefault();
    setLoading(true);

    if ((await verifyaccessToken()) === -1) return;

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

    axios
      .post(`${baseurl}/hodposts/${userData.user_id}/`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setTitle("");
        setContent("");
        setTag("");
        setImage(null);
        setDocUrl("");
        showNotification("Post created successfully.", "success", "Post created");
        setLoading(false);
      })
      .catch((error) => {
        showNotification(
          error.response?.data?.detail || "Error submitting the post.",
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

      <section className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden animate-fade-in-up">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
            <h3 className="text-white text-2xl font-bold">Create New Post</h3>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="block text-purple-700 font-semibold mb-1">Title</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="Enter title"
                value={Title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-purple-700 font-semibold mb-1">Tag</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="Enter tag (e.g., event, news)"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-purple-700 font-semibold mb-1">Content</label>
              <textarea
                rows="5"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="Enter content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>

            <div>
              <label className="block text-purple-700 font-semibold mb-1">Image Upload</label>
              <input
                type="file"
                className="w-full px-3 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div>
              <label className="block text-purple-700 font-semibold mb-1">Document URL</label>
              <input
                type="url"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="Enter document URL"
                value={docUrl}
                onChange={(e) => setDocUrl(e.target.value)}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Submit Post
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

const AddHodPost = () => {
  return (
    <Home DynamicContent={AddHodPostContent} url="Add Post" heading="Add Post" />
  );
};

export default AddHodPost;
