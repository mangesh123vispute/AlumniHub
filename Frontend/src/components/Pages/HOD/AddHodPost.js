import React, { useState, useContext } from "react";
import { storage } from "../../../utils/firebase"; // Firebase config
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Home from "../../Dashboard/Home";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
import LoadingSpinner from "../../Loading/Loading";
import Notification from "../../Notification/Notification";

const accessToken = localStorage.getItem("authTokens")
  ? JSON.parse(localStorage.getItem("authTokens")).access
  : null;

const AddHodPostContent = () => {
  const [Title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [file, setFile] = useState(null);
  const [doc, setDoc] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [docUrl, setDocUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [Loading, setLoading] = useState(false);

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

  // Handle file change for image
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  setFilter(false);

  // Handle file change for document (if needed)
  const handleDocChange = (e) => {
    if (e.target.files[0]) {
      setDoc(e.target.files[0]);
    }
  };

  // Handle image upload to Firebase
  const handleImageUpload = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (await verifyaccessToken() === -1) {
      
      return;
    };
    if (!file) {
      showNotification(
        "Please select an image file to upload.",
        "warning",
        "No file selected"
      );
      setLoading(false);
      return;
    }

    const storageRef = ref(storage, `posts/images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error during upload:", error);
        showNotification(error.message, "warning", "Upload failed");
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          showNotification(
            "Image uploaded successfully.",
            "success",
            "Image uploaded"
          );
          setLoading(false);
        });
      }
    );
  };

  // Handle document upload to Firebase (optional)
  const handleDocUpload = async (e) => {
    setLoading(true);
    e.preventDefault();
    if ((await verifyaccessToken()) === -1) {
      return;
    }

    if (!doc) {
      showNotification(
        "Please select a document to upload.",
        "warning",
        "No document selected"
      );
      setLoading(false);
      return;
    }

    const storageRef = ref(storage, `posts/docs/${doc.name}`);
    const uploadTask = uploadBytesResumable(storageRef, doc);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error during document upload:", error);
        showNotification(error.message,"Error", "Document upload failed" );
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDocUrl(downloadURL);
          showNotification(
            "Document uploaded successfully.",
            "success",
            "Document uploaded"
          );
          setLoading(false);
        });
      }
    );
  };

  // Handle form submission (upload post details)
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if ((await verifyaccessToken()) === -1) {
      return;
    }

    if (!Title || !content || !tag || !imageUrl) {
      showNotification(
        "Please fill in all fields and upload an image.",
        "warning",
        "Missing fields"
      );
      setLoading(false);
      return;
    }

    const postData = {
      Title,
      content,
      tag,
      image_url: imageUrl,
      DocUrl: docUrl,
    };

    axios
      .post("http://127.0.0.1:8000/hodposts/", postData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setUploadProgress(0);
        setTitle("");
        setContent("");
        setTag("");
        setImageUrl("");
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
                  <label>Content</label>
                  <textarea
                    className="form-control"
                    placeholder="Enter content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
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
                  <label>Image Upload (required)</label>
                  <div className="input-group">
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-secondary"
                        onClick={handleImageUpload}
                      >
                        Upload Image
                      </button>
                    </div>
                  </div>
                  <div>Upload progress: {uploadProgress}%</div>
                </div>
                <div className="form-group">
                  <label>Optional Document Upload</label>
                  <div className="input-group">
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleDocChange}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-secondary"
                        onClick={handleDocUpload}
                      >
                        Upload Document
                      </button>
                    </div>
                  </div>
                  <div>Upload progress: {uploadProgress}%</div>
                </div>
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

const AddHodPost = () => {
  return (
    <Home
      DynamicContent={AddHodPostContent}
      url="Add Post"
      heading="Add Post"
    />
  );
};

export default AddHodPost;
