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
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFileName, setImageFileName] = useState("");

  
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
     // eslint-disable-next-line react-hooks/exhaustive-deps
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
       setPreviewImage(null);
       setImageFileName("");
       const fileInput = document.getElementById("image-upload");
       if (fileInput) fileInput.value = "";
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageFileName(file.name);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreviewImage(null);
    setImageFileName("");
    // Reset file input
    const fileInput = document.getElementById("image-upload");
    if (fileInput) fileInput.value = "";
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
      <section className="content" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        <div className="container-fluid">
          <div
            className="card"
            style={{
              border: "none",
              borderRadius: "16px",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
              overflow: "hidden",
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            <div
              className="card-header"
              style={{
                backgroundColor: "#007bff",
                color: "white",
                borderBottom: "none",
                padding: "24px",
              }}
            >
              <h3
                className="card-title"
                style={{
                  margin: 0,
                  fontSize: "1.75rem",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <i className="fas fa-edit"></i>
                Create New Post
              </h3>
              <p style={{ margin: "8px 0 0 0", opacity: 0.9, fontSize: "0.95rem" }}>
                Share your thoughts, updates, or announcements with the community
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="card-body" style={{ padding: "32px" }}>
                {/* Title Field */}
                <div className="form-group" style={{ marginBottom: "28px" }}>
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "1rem",
                      color: "#2c3e50",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <i className="fas fa-heading" style={{ color: "#007bff" }}></i>
                    Title <span style={{ color: "#dc3545" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a catchy title for your post..."
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                      padding: "14px 16px",
                      fontSize: "1rem",
                      borderRadius: "8px",
                      border: "2px solid #e9ecef",
                      transition: "all 0.3s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#007bff";
                      e.target.style.boxShadow = "0 0 0 0.2rem rgba(0, 123, 255, 0.15)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e9ecef";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  {Title && (
                    <small
                      style={{
                        color: "#6c757d",
                        fontSize: "0.875rem",
                        marginTop: "6px",
                        display: "block",
                      }}
                    >
                      {Title.length} characters
                    </small>
                  )}
                </div>

                {/* Tag Field */}
                <div className="form-group" style={{ marginBottom: "28px" }}>
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "1rem",
                      color: "#2c3e50",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <i className="fas fa-tag" style={{ color: "#28a745" }}></i>
                    Category/Tag <span style={{ color: "#dc3545" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., event, news, announcement, job, general"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    style={{
                      padding: "14px 16px",
                      fontSize: "1rem",
                      borderRadius: "8px",
                      border: "2px solid #e9ecef",
                      transition: "all 0.3s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#007bff";
                      e.target.style.boxShadow = "0 0 0 0.2rem rgba(0, 123, 255, 0.15)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e9ecef";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  {tag && (
                    <div
                      style={{
                        marginTop: "10px",
                        display: "inline-block",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        backgroundColor: "#e8f5e9",
                        color: "#2e7d32",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        textTransform: "capitalize",
                      }}
                    >
                      {tag}
                    </div>
                  )}
                </div>

                {/* Content Field */}
                <div className="form-group" style={{ marginBottom: "28px" }}>
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "1rem",
                      color: "#2c3e50",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <i className="fas fa-align-left" style={{ color: "#ffc107" }}></i>
                    Content <span style={{ color: "#dc3545" }}>*</span>
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="Write your post content here... Share what's on your mind!"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="8"
                    style={{
                      padding: "14px 16px",
                      fontSize: "1rem",
                      borderRadius: "8px",
                      border: "2px solid #e9ecef",
                      transition: "all 0.3s ease",
                      resize: "vertical",
                      fontFamily: "inherit",
                      lineHeight: "1.6",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#007bff";
                      e.target.style.boxShadow = "0 0 0 0.2rem rgba(0, 123, 255, 0.15)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e9ecef";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  {content && (
                    <small
                      style={{
                        color: "#6c757d",
                        fontSize: "0.875rem",
                        marginTop: "6px",
                        display: "block",
                      }}
                    >
                      {content.length} characters • {content.split(/\s+/).filter(Boolean).length} words
                    </small>
                  )}
                </div>

                {/* Image Upload Field */}
                <div className="form-group" style={{ marginBottom: "28px" }}>
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "1rem",
                      color: "#2c3e50",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <i className="fas fa-image" style={{ color: "#17a2b8" }}></i>
                    Image Upload <span style={{ color: "#6c757d", fontSize: "0.875rem" }}>(Optional)</span>
                  </label>
                  <div
                    style={{
                      border: "2px dashed #e9ecef",
                      borderRadius: "8px",
                      padding: "20px",
                      textAlign: "center",
                      transition: "all 0.3s ease",
                      backgroundColor: "#fafafa",
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.currentTarget.style.borderColor = "#007bff";
                      e.currentTarget.style.backgroundColor = "#f0f7ff";
                    }}
                    onDragLeave={(e) => {
                      e.currentTarget.style.borderColor = "#e9ecef";
                      e.currentTarget.style.backgroundColor = "#fafafa";
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files[0];
                      if (file && file.type.startsWith("image/")) {
                        handleImageChange({ target: { files: [file] } });
                      }
                      e.currentTarget.style.borderColor = "#e9ecef";
                      e.currentTarget.style.backgroundColor = "#fafafa";
                    }}
                  >
                    {!previewImage ? (
                      <>
                        <i
                          className="fas fa-cloud-upload-alt"
                          style={{ fontSize: "2.5rem", color: "#6c757d", marginBottom: "12px" }}
                        ></i>
                        <p style={{ margin: "8px 0", color: "#6c757d" }}>
                          Drag and drop an image here, or{" "}
                          <label
                            htmlFor="image-upload"
                            style={{
                              color: "#007bff",
                              cursor: "pointer",
                              textDecoration: "underline",
                            }}
                          >
                            browse
                          </label>
                        </p>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          style={{ display: "none" }}
                        />
                        <small style={{ color: "#6c757d", display: "block", marginTop: "8px" }}>
                          Supported formats: JPG, PNG, GIF (Max 5MB)
                        </small>
                      </>
                    ) : (
                      <div style={{ position: "relative" }}>
                        <img
                          src={previewImage}
                          alt="Preview"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "300px",
                            borderRadius: "8px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          }}
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            backgroundColor: "rgba(220, 53, 69, 0.9)",
                            color: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "32px",
                            height: "32px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.2rem",
                          }}
                        >
                          ×
                        </button>
                        <p style={{ marginTop: "12px", color: "#6c757d", fontSize: "0.875rem" }}>
                          {imageFileName}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Document URL Field */}
                <div className="form-group" style={{ marginBottom: "28px" }}>
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "1rem",
                      color: "#2c3e50",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <i className="fas fa-link" style={{ color: "#6f42c1" }}></i>
                    Document URL <span style={{ color: "#6c757d", fontSize: "0.875rem" }}>(Optional)</span>
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://example.com/document.pdf"
                    value={docUrl}
                    onChange={(e) => setDocUrl(e.target.value)}
                    style={{
                      padding: "14px 16px",
                      fontSize: "1rem",
                      borderRadius: "8px",
                      border: "2px solid #e9ecef",
                      transition: "all 0.3s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#007bff";
                      e.target.style.boxShadow = "0 0 0 0.2rem rgba(0, 123, 255, 0.15)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e9ecef";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>
              <div
                className="card-footer"
                style={{
                  backgroundColor: "#f8f9fa",
                  borderTop: "1px solid #e9ecef",
                  padding: "24px 32px",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setTitle("");
                    setContent("");
                    setTag("");
                    setImage(null);
                    setDocUrl("");
                    setPreviewImage(null);
                    setImageFileName("");
                  }}
                  className="btn"
                  style={{
                    padding: "12px 24px",
                    borderRadius: "8px",
                    border: "2px solid #6c757d",
                    color: "#6c757d",
                    backgroundColor: "white",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#6c757d";
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "white";
                    e.target.style.color = "#6c757d";
                  }}
                >
                  <i className="fas fa-redo mr-2"></i>
                  Clear
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={Loading}
                  style={{
                    padding: "12px 32px",
                    borderRadius: "8px",
                    fontWeight: "600",
                    fontSize: "1rem",
                    boxShadow: "0 2px 8px rgba(0, 123, 255, 0.3)",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) => {
                    if (!Loading) {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 4px 12px rgba(0, 123, 255, 0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 2px 8px rgba(0, 123, 255, 0.3)";
                  }}
                >
                  {Loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Posting...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      Publish Post
                    </>
                  )}
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
