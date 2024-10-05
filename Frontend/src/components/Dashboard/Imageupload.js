// src/components/ImageUpload.js

import React, { useState } from 'react';
import { storage } from '../../utils/firebase'; // Import storage from Firebase config
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import Home from './Home';
import axios from 'axios';
const accessToken = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;
// const ImageUpload = () => {
 const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI4MTM4NDM2LCJpYXQiOjE3MjgxMzgxMzYsImp0aSI6IjM2MmI3ZjdkNzEzOTQxMWZhZWZlYjVjMzM5ZmE4NWM5IiwidXNlcl9pZCI6NCwidXNlcm5hbWUiOiJSYW0iLCJlbWFpbCI6InJhbUBnbWFpbC5jb20iLCJmdWxsX25hbWUiOiIiLCJpc19hbHVtbmkiOmZhbHNlLCJpc19zdHVkZW50IjpmYWxzZSwiaXNfc3VwZXJ1c2VyIjp0cnVlLCJDb2xsZWdlIjoiU1NCVCBDT0VUIiwibW9iaWxlIjoiIiwibGlua2VkaW4iOiIiLCJHaXRodWIiOiIiLCJpbnN0YWdyYW0iOiIiLCJza2lsbHMiOiIiLCJmaXJzdF9uYW1lIjoiIiwibGFzdF9uYW1lIjoiIn0.2Me3o_wWbWHDPuaO94Sfta8UeVlasR97Kb7u_jUhhc0"
// };

// export default ImageUpload;

const ImageUploadContent = ()=>{
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [file, setFile] = useState(null);
  const [doc, setDoc] = useState(null); // Optional document upload
  const [imageUrl, setImageUrl] = useState('');
  const [docUrl, setDocUrl] = useState(''); // Optional document URL
  const [uploadProgress, setUploadProgress] = useState(0);

//   const storage = getStorage();

  // Handle file change for image
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Handle file change for document (if needed)
  const handleDocChange = (e) => {
    if (e.target.files[0]) {
      setDoc(e.target.files[0]);
    }
  };

  // Handle image upload to Firebase
  const handleImageUpload = (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select an image first.');
      return;
    }

    const storageRef = ref(storage, `posts/images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Track upload progress
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Error during upload:', error);
      },
      () => {
        // Get the download URL once the file is uploaded
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          alert('Image uploaded successfully!');
        });
      }
    );
  };

  // Handle document upload to Firebase (optional)
  const handleDocUpload = (e) => {
    e.preventDefault();

    if (!doc) {
      alert('Please select a document first.');
      return;
    }

    const storageRef = ref(storage, `posts/docs/${doc.name}`);
    const uploadTask = uploadBytesResumable(storageRef, doc);

    // Track document upload progress
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Error during document upload:', error);
      },
      () => {
        // Get the download URL once the file is uploaded
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDocUrl(downloadURL);
          alert('Document uploaded successfully!');
        });
      }
    );
  };

  // Handle form submission (upload post details)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content || !tag || !imageUrl) {
      alert('Please fill in all fields and upload an image.');
      return;
    }

    // Send form data to the backend API
    const postData = {
      title,          // Title of the post
      content,        // Content of the post
      tag,            // Tag for the post (e.g., "event")
      image_url: imageUrl,  // The image URL from Firebase
      DocUrl: docUrl        // Optional document URL
    };

    console.log("token  ",accessToken);

    axios.post(
        'http://127.0.0.1:8000/hodposts/', 
        postData, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((response) => {
        console.log(response.data);
        alert('Post created successfully!');
      })
      .catch((error) => {
        console.error('Error during submission:', error);
        alert('Error submitting the post.');
      });
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
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
                      value={title}
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
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          onChange={handleFileChange}
                        />
                        <label className="custom-file-label">Choose image</label>
                      </div>
                      <div className="input-group-append">
                        <button className="input-group-text" onClick={handleImageUpload}>
                          Upload Image
                        </button>
                      </div>
                    </div>
                    <div>Upload progress: {uploadProgress}%</div>
                    {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: '200px' }} />}
                  </div>
                  <div className="form-group">
                    <label>Optional Document Upload</label>
                    <div className="input-group">
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          onChange={handleDocChange}
                        />
                        <label className="custom-file-label">Choose document</label>
                      </div>
                      <div className="input-group-append">
                        <button className="input-group-text" onClick={handleDocUpload}>
                          Upload Document
                        </button>
                      </div>
                    </div>
                    <div>Upload progress: {uploadProgress}%</div>
                  </div>
                </div>
                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">
                    Submit Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ImageUpload = () => {
    return (
      
      <Home DynamicContent={ImageUploadContent} url="add" heading="Add Post" />
    );
  };
  
  export default ImageUpload;
