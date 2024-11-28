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
  const [Image,setImage] = useState(null)
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
  // Handle form submission (upload post details)
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if ((await verifyaccessToken()) === -1) {
      return;
    }

    if (!Title || !content || !tag ) {
      showNotification(
        "Please fill in all fields and upload an image.",
        "warning",
        "Missing fields"
      );
      setLoading(false);
      return;
    }

     // Create FormData object
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
      <section className="content">
        <div className="container-fluid">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Create New Post</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter title"
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tag (e.g., event, news)"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Content</label>
                  <textarea
                    className="form-control"
                    placeholder="Enter content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                {/* <div className="form-group">
                  <label>Image Upload</label>
                  <div className="input-group">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setImage(e.target.files[0])}
                      
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Document Upload</label>
                  <div className="input-group">
                    <input
                      type="url"
                      className="form-control"
                      placeholder="Enter document URL"
                      value={docUrl}
                      onChange={(e) => setDocUrl(e.target.value)}
                    />
                  </div>
                </div> */}
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
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
