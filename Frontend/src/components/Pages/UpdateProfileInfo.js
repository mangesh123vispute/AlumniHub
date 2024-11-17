import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Home from "../Dashboard/Home.js";
import AuthContext from "../../context/AuthContext.js";
import LoadingSpinner from "../Loading/Loading.js";
import Notification from "../Notification/Notification.js";
import { useNavigate } from "react-router-dom";
import baseurl from "../const.js";

const UpdateProfileInfoContent = () => {

  useEffect(() => {
    localStorage.removeItem("authTokens");
  }, []);
  
  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          {/* Left column */}
          <div className="col-md-12">
            {/* General form elements */}
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Update Student Profile</h3>
              </div>
              {/* /.card-header */}
              {/* Form start */}
              <form>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Full Name"
                      value="{{user.full_name}}"
                     
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="education">Education</label>
                    <input
                      type="text"
                      className="form-control"
                      id="education"
                      placeholder="Education"
                      value="{{student_profile.Education}}"
                     
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="branch">Branch</label>
                    <input
                      type="text"
                      className="form-control"
                      id="branch"
                      placeholder="Branch"
                      value="{{user.Branch}}"
                     
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="academic_year">Academic Year</label>
                    <input
                      type="number"
                      className="form-control"
                      id="academic_year"
                      placeholder="Academic Year"
                      value="{{student_profile.current_year_of_study}}"
                     
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      value="{{user.email}}"
                     
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="mobile">Mobile No.</label>
                    <input
                      type="text"
                      className="form-control"
                      id="mobile"
                      placeholder="Mobile"
                      value="{{user.mobile}}"
                     
                    />
                  </div>

                  {/* New fields */}
                  <div className="form-group">
                    <label htmlFor="linkedin">LinkedIn</label>
                    <input
                      type="text"
                      className="form-control"
                      id="linkedin"
                      placeholder="LinkedIn Profile URL"
                      value="{{user.linkedin}}"
                     
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="instagram">Instagram</label>
                    <input
                      type="text"
                      className="form-control"
                      id="instagram"
                      placeholder="Instagram Profile URL"
                      value="{{user.instagram}}"
                     
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="github">GitHub</label>
                    <input
                      type="text"
                      className="form-control"
                      id="github"
                      placeholder="GitHub Profile URL"
                      value="{{user.Github}}"
                     
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="portfolio_link">Portfolio Link</label>
                    <input
                      type="text"
                      className="form-control"
                      id="portfolio_link"
                      placeholder="Portfolio URL"
                      value="{{user.portfolio_link}}"
                     
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="resume_link">Resume Link</label>
                    <input
                      type="text"
                      className="form-control"
                      id="resume_link"
                      placeholder="Resume URL"
                      value="{{user.resume_link}}"
                     
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="heading">Heading</label>
                    <textarea
                      className="form-control"
                      id="heading"
                      placeholder="Profile Heading"
                      value="{{student_profile.Heading}}"
                     
                      style={{ resize: "vertical", minHeight: "100px" }}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="about">About</label>
                    <textarea
                      className="form-control"
                      id="about"
                      placeholder="About Me"
                      value="{{student_profile.About}}"
                     
                      style={{ resize: "vertical", minHeight: "100px" }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="about">Work</label>
                    <textarea
                      className="form-control"
                      id="about"
                      placeholder="About Me"
                      value="{{student_profile.About}}"
                     
                      style={{ resize: "vertical", minHeight: "100px" }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="about">Skills</label>
                    <textarea
                      className="form-control"
                      id="about"
                      placeholder="About Me"
                      value="{{student_profile.About}}"
                     
                      style={{ resize: "vertical", minHeight: "100px" }}
                    />
                  </div>
                </div>

                {/* /.card-body */}
                <div className="card-footer">
                  <button type="button" className="btn btn-primary">
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
            {/* /.card */}
          </div>
        </div>
        {/* /.row */}
      </div>
    </section>
  );
};






const UpdateProfileInfo = () => {
  return (
    <Home
      DynamicContent={UpdateProfileInfoContent}
      url="update_Student_profile_info"
      heading="Update Student Profile Info"
    />
  );
};

export default UpdateProfileInfo;
