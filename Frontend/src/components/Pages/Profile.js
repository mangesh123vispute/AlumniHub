/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext ,useState , useEffect } from "react";
import axios from 'axios'
import Home from "../Dashboard/Home.js";
import AuthContext from "../../context/AuthContext.js";
const AlumniProfileContent = () => {
  let { userData } = useContext(AuthContext);
  console.log("userData", userData);


  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch alumni data when the component mounts
    const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;

    axios
      .get(`http://127.0.0.1:8000/getalumni/${userData?.user_id}`, {
        headers: {
          Authorization: `Bearer ${token?.access}`,
        },
      })
      .then((response) => {
        
        setUser(response.data);
        
      })
      .catch((error) => {
        console.error('Error fetching alumni data:', error);
      });
  }, [userData?.user_id]);

  console.log("user ",user);


  return (
    <>
      <div>
        {/* Content Header (Page header) */}

        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
            <div className="col-md-3 " style={{fontSize:'0.9em'}}>
                  {/* Profile Image */}
                  <div className="card card-primary card-outline position-relative">
                    {/* Ribbon */}
                    <div className="ribbon-wrapper ribbon-lg">
                      <div className="ribbon bg-primary">
                        {user
                          ? user.is_alumni
                            ? "Alumni"
                            : user.is_student
                            ? "Student"
                            : "College"
                          : "User"}
                      </div>
                    </div>

                    <div className="card-body box-profile">
                      <div className="text-center">
                        <img
                          className="profile-user-img img-fluid img-circle"
                          src={user?.alumni_profile?.profile_picture_url || "../../dist/img/user4-128x128.jpg"}
                          alt="User profile picture"
                        />
                      </div>
                      <h3 className="profile-username text-center">
                        {user ? user.full_name || user.username : "User"}
                      </h3>
                      <p className="text-muted text-center">
                        {user?.alumni_profile?.job_title || "Not Specified"}
                      </p>
                    </div>
                    {/* /.card-body */}
                  </div>
                  {/* /.card */}

                  {/* About Me Box */}
                  <div className="card card-primary">
                    <div className="card-header">
                      <h3 className="card-title">About Me</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                      <strong>
                        <i className="fas fa-graduation-cap mr-1" /> Education
                      </strong>
                      <p className="text-muted">
                        {user?.alumni_profile?.Education || "Not Provided"}
                      </p>
                      <hr />
                      
                      <strong>
                        <i className="fas fa-code-branch mr-1" /> Branch
                      </strong>
                      <p className="text-muted">
                        <span className="tag tag-danger">{user?.Branch || "Not Specified"}</span> <br />
                      </p>
                      <hr />
                      
                      <strong>
                        <i className="fas fa-map-marker-alt mr-1" /> Location
                      </strong>
                      <p className="text-muted">
                        {user?.alumni_profile?.current_city || "Not Provided"}, 
                        {user?.alumni_profile?.current_country || "Not Provided"}
                      </p>
                      <hr />
                      
                      <strong>
                        <i className="fas fa-laptop-code mr-1" /> Skills
                      </strong>
                      <p className="text-muted">
                        <span className="tag tag-danger">{user?.skills || "Not Specified"}</span> <br />
                      </p>
                      <hr />
                      
                      <strong>
                        <i className="fas fa-industry mr-1" /> Industry
                      </strong>
                      <p className="text-muted">
                        <span className="tag tag-danger">{user?.alumni_profile?.industry || "Not Specified"}</span> <br />
                      </p>
                      <hr />
                      
                      <strong>
                        <i className="fas fa-info-circle mr-1" /> About
                      </strong>
                      <p className="text-muted">
                        <span className="tag tag-danger">{user?.About || "Not Specified"}</span> <br />
                      </p>
                      <hr />
                      
                      <strong>
                        <i className="fas fa-trophy mr-1" /> Achievements
                      </strong>
                      <p className="text-muted">
                        <span className="tag tag-success">{user?.alumni_profile?.achievements || "No Achievements"}</span>
                      </p>
                      <hr />
                      
                      <strong>
                        <i className="fas fa-building mr-1" /> Current Company
                      </strong>
                      <p className="text-muted">
                        <span className="tag tag-danger">{user?.alumni_profile?.current_company_name || "Not Specified"}</span> <br />
                      </p>
                      <hr />
                      
                      <strong>
                        <i className="fas fa-calendar-alt mr-1" /> Graduation Year
                      </strong>
                      <p className="text-muted">
                        <span className="tag tag-danger">{user?.alumni_profile?.graduation_year || "Not Specified"}</span> <br />
                      </p>
                      <hr />
                      
                      <strong>
                        <i className="fas fa-briefcase mr-1" /> Years of Experience
                      </strong>
                      <p className="text-muted">
                        <span className="tag tag-danger">{user?.alumni_profile?.years_of_experience || "Not Specified"}</span> <br />
                      </p>
                      <hr />
                      
                      <strong>
                        <i className="fas fa-building mr-1" /> Previous Companies
                      </strong>
                      <p className="text-muted">
                        {user?.alumni_profile?.previous_companies || "No Notes Available"}
                      </p>
                    </div>
                    {/* /.card-body */}
                  </div>
                  {/* /.card */}
                </div>


              {/* /.col */}
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header p-2">
                    <ul className="nav nav-pills">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          href="#activity"
                          data-toggle="tab"
                        >
                          Your Posts
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#timeline"
                          data-toggle="tab"
                        >
                          Contacts
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#settings"
                          data-toggle="tab"
                        >
                          Edit Profile
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="tab-content">
                      <div className="active tab-pane" id="activity">
                        {/* Post */}
                        <div className="post">
                          <div className="user-block">
                            <img
                              className="img-circle img-bordered-sm"
                              src="../../dist/img/user1-128x128.jpg"
                              alt="user image"
                            />
                            <span className="username">
                              <a href="#">Jonathan Burke Jr.</a>
                              <a href="#" className="float-right btn-tool">
                                <i className="fas fa-times" />
                              </a>
                            </span>
                            <span className="description">
                              Shared publicly - 7:30 PM today
                            </span>
                          </div>
                          {/* /.user-block */}
                          <p>
                            Lorem ipsum represents a long-held tradition for
                            designers, typographers and the like. Some people
                            hate it and argue for its demise, but others ignore
                            the hate as they create awesome tools to help create
                            filler text for everyone from bacon lovers to
                            Charlie Sheen fans.
                          </p>
                          <p>
                            <a href="#" className="link-black text-sm mr-2">
                              <i className="fas fa-share mr-1" /> Share
                            </a>
                            <a href="#" className="link-black text-sm">
                              <i className="far fa-thumbs-up mr-1" /> Like
                            </a>
                            <span className="float-right">
                              <a href="#" className="link-black text-sm">
                                <i className="far fa-comments mr-1" /> Comments
                                (5)
                              </a>
                            </span>
                          </p>
                          <input
                            className="form-control form-control-sm"
                            type="text"
                            placeholder="Type a comment"
                          />
                        </div>
                        {/* /.post */}
                        {/* Post */}
                        <div className="post clearfix">
                          <div className="user-block">
                            <img
                              className="img-circle img-bordered-sm"
                              src="../../dist/img/user7-128x128.jpg"
                              alt="User Image"
                            />
                            <span className="username">
                              <a href="#">Sarah Ross</a>
                              <a href="#" className="float-right btn-tool">
                                <i className="fas fa-times" />
                              </a>
                            </span>
                            <span className="description">
                              Sent you a message - 3 days ago
                            </span>
                          </div>
                          {/* /.user-block */}
                          <p>
                            Lorem ipsum represents a long-held tradition for
                            designers, typographers and the like. Some people
                            hate it and argue for its demise, but others ignore
                            the hate as they create awesome tools to help create
                            filler text for everyone from bacon lovers to
                            Charlie Sheen fans.
                          </p>
                          <form className="form-horizontal">
                            <div className="input-group input-group-sm mb-0">
                              <input
                                className="form-control form-control-sm"
                                placeholder="Response"
                              />
                              <div className="input-group-append">
                                <button
                                  type="submit"
                                  className="btn btn-danger"
                                >
                                  Send
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                        {/* /.post */}
                        {/* Post */}
                        <div className="post">
                          <div className="user-block">
                            <img
                              className="img-circle img-bordered-sm"
                              src="../../dist/img/user6-128x128.jpg"
                              alt="User Image"
                            />
                            <span className="username">
                              <a href="#">Adam Jones</a>
                              <a href="#" className="float-right btn-tool">
                                <i className="fas fa-times" />
                              </a>
                            </span>
                            <span className="description">
                              Posted 5 photos - 5 days ago
                            </span>
                          </div>
                          {/* /.user-block */}
                          <div className="row mb-3">
                            <div className="col-sm-6">
                              <img
                                className="img-fluid"
                                src="../../dist/img/photo1.png"
                                alt="Photo"
                              />
                            </div>
                            {/* /.col */}
                            <div className="col-sm-6">
                              <div className="row">
                                <div className="col-sm-6">
                                  <img
                                    className="img-fluid mb-3"
                                    src="../../dist/img/photo2.png"
                                    alt="Photo"
                                  />
                                  <img
                                    className="img-fluid"
                                    src="../../dist/img/photo3.jpg"
                                    alt="Photo"
                                  />
                                </div>
                                {/* /.col */}
                                <div className="col-sm-6">
                                  <img
                                    className="img-fluid mb-3"
                                    src="../../dist/img/photo4.jpg"
                                    alt="Photo"
                                  />
                                  <img
                                    className="img-fluid"
                                    src="../../dist/img/photo1.png"
                                    alt="Photo"
                                  />
                                </div>
                                {/* /.col */}
                              </div>
                              {/* /.row */}
                            </div>
                            {/* /.col */}
                          </div>
                          {/* /.row */}
                          <p>
                            <a href="#" className="link-black text-sm mr-2">
                              <i className="fas fa-share mr-1" /> Share
                            </a>
                            <a href="#" className="link-black text-sm">
                              <i className="far fa-thumbs-up mr-1" /> Like
                            </a>
                            <span className="float-right">
                              <a href="#" className="link-black text-sm">
                                <i className="far fa-comments mr-1" /> Comments
                                (5)
                              </a>
                            </span>
                          </p>
                          <input
                            className="form-control form-control-sm"
                            type="text"
                            placeholder="Type a comment"
                          />
                        </div>
                        {/* /.post */}
                      </div>
                      {/* /.tab-pane */}
                      <div className="tab-pane" id="timeline">
                        {/* The timeline */}
                        <div className="timeline timeline-inverse">
                          {/* timeline time label */}
                         {/* timeline time label */}
                         <div className="time-label">
                             <span className="bg-danger">Contact Details</span>
                              </div>
                              {/* / Contact-label */}
                              {/* Contact Details Item */}
                              <div>
                                <i className="fas fa-address-book bg-primary" />
                                <div className="timeline-item">
                                 
                                 

                                  <div className="timeline-body">
                                    <strong>Email:</strong>
                                    <p>{user?.email || "Not Provided"}</p>
                                    <hr />

                                    <strong>Mobile:</strong>
                                    <p>{user?.mobile || "Not Provided"}</p>
                                    <hr />

                                    <strong>LinkedIn:</strong>
                                    <p>
                                      <a href={user?.linkedin || "#"} target="_blank" rel="noopener noreferrer">
                                        {user?.linkedin ? user.linkedin : "Not Provided"}
                                      </a>
                                    </p>
                                    <hr />

                                    <strong>GitHub:</strong>
                                    <p>
                                      <a href={user?.Github || "#"} target="_blank" rel="noopener noreferrer">
                                        {user?.Github ? user.Github : "Not Provided"}
                                      </a>
                                    </p>
                                    <hr />

                                    <strong>Instagram:</strong>
                                    <p>
                                      <a href={user?.instagram || "#"} target="_blank" rel="noopener noreferrer">
                                        {user?.instagram ? user.instagram : "Not Provided"}
                                      </a>
                                    </p>
                                  </div>

                                 
                                </div>
                              </div>
                              {/* END Contact Details Item */}
                          {/* END timeline item */}
                          {/* timeline item */}
                         
                          <div>
                            <i className="fas fa-camera bg-purple" />
                            <div className="timeline-item">
                              <span className="time">
                                <i className="far fa-clock" /> 2 days ago
                              </span>
                              <h3 className="timeline-header">
                                <a href="#">Mina Lee</a> uploaded new photos
                              </h3>
                              <div className="timeline-body">
                                <img
                                  src="https://placehold.it/150x100"
                                  alt="..."
                                />
                                <img
                                  src="https://placehold.it/150x100"
                                  alt="..."
                                />
                                <img
                                  src="https://placehold.it/150x100"
                                  alt="..."
                                />
                                <img
                                  src="https://placehold.it/150x100"
                                  alt="..."
                                />
                              </div>
                            </div>
                          </div>
                          {/* END timeline item */}
                          <div>
                            <i className="far fa-clock bg-gray" />
                          </div>
                        </div>
                      </div>
                      {/* /.tab-pane */}
                      <div className="tab-pane" id="settings">
                        <form className="form-horizontal">
                          <div className="form-group row">
                            <label
                              htmlFor="inputName"
                              className="col-sm-2 col-form-label"
                            >
                              Name
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="email"
                                className="form-control"
                                id="inputName"
                                placeholder="Name"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputEmail"
                              className="col-sm-2 col-form-label"
                            >
                              Email
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="email"
                                className="form-control"
                                id="inputEmail"
                                placeholder="Email"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputName2"
                              className="col-sm-2 col-form-label"
                            >
                              Name
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="inputName2"
                                placeholder="Name"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputExperience"
                              className="col-sm-2 col-form-label"
                            >
                              Experience
                            </label>
                            <div className="col-sm-10">
                              <textarea
                                className="form-control"
                                id="inputExperience"
                                placeholder="Experience"
                                defaultValue={""}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputSkills"
                              className="col-sm-2 col-form-label"
                            >
                              Skills
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="inputSkills"
                                placeholder="Skills"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
                              <div className="checkbox">
                                <label>
                                  <input type="checkbox" /> I agree to the{" "}
                                  <a href="#">terms and conditions</a>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
                              <button type="submit" className="btn btn-danger">
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      {/* /.tab-pane */}
                    </div>
                    {/* /.tab-content */}
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>





          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </>
  );
};

const StudentProfileContent = () => {
  let { userData } = useContext(AuthContext);
  console.log("userData", userData);


  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch alumni data when the component mounts
    const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;

    axios
      .get(`http://127.0.0.1:8000/students/${userData?.user_id}`, {
        headers: {
          Authorization: `Bearer ${token?.access}`,
        },
      })
      .then((response) => {
        
        setUser(response.data);
        
      })
      .catch((error) => {
        console.error('Error fetching alumni data:', error);
      });
  }, [userData?.user_id]);

  console.log("user ",user);


  return (
    <>
      <div>
        {/* Content Header (Page header) */}

        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
            <div className="col-md-3" style={{ fontSize: '0.9em' }}>
                  {/* Profile Image */}
                  <div className="card card-primary card-outline position-relative">
                    {/* Ribbon */}
                    <div className="ribbon-wrapper ribbon-lg">
                      <div className="ribbon bg-primary">
                        {user
                          ? user.is_alumni
                            ? "Alumni"
                            : user.is_student
                            ? "Student"
                            : "College"
                          : "User"}
                      </div>
                    </div>

                    <div className="card-body box-profile">
                      <div className="text-center">
                        <img
                          className="profile-user-img img-fluid img-circle"
                          src={"../../dist/img/user4-128x128.jpg"} 
                          alt="User profile picture"
                        />
                      </div>
                      <h3 className="profile-username text-center">
                        {user ? user.full_name || user.username : "User"}
                      </h3>
                      <p className="text-muted text-center">
                        {user?.Work || "Not Specified"}
                      </p>
                    </div>
                    {/* /.card-body */}
                  </div>
                  {/* /.card */}

                  {/* About Me Box */}
                  <div className="card card-primary">
                    <div className="card-header">
                      <h3 className="card-title">About Me</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                      {/* <strong>
                        <i className="fas fa-graduation-cap mr-1" /> Education
                      </strong>
                      <p className="text-muted">
                        {user?.student_profile?.graduation_year ? `Graduation Year: ${user.student_profile.graduation_year}` : "Not Provided"}
                      </p>
                      <hr /> */}

                      <strong>
                        <i className="fas fa-calendar-alt mr-1" /> Current Year of Study
                      </strong>
                      <p className="text-muted">
                        {user?.student_profile?.current_year_of_study || "Not Specified"}
                      </p>
                      <hr />

                      <strong>
                        <i className="fas fa-code-branch mr-1" /> Branch
                      </strong>
                      <p className="text-muted">
                        <span className="tag tag-danger">{user?.Branch || "Not Specified"}</span>
                      </p>
                      <hr />

                      <strong>
                        <i className="fas fa-info-circle mr-1" /> About
                      </strong>
                      <p className="text-muted">
                        <span className="tag tag-danger">{user?.About || "Not Specified"}</span>
                      </p>
                      <hr />

                      <strong>
                        <i className="fas fa-laptop-code mr-1" /> Skills
                      </strong>
                      <p className="text-muted">
                        <span className="tag tag-danger">{user?.skills || "Not Specified"}</span>
                      </p>
                      <hr />

                      <strong>
                        <i className="fas fa-building mr-1" /> Department
                      </strong>
                      <p className="text-muted">
                        {user?.student_profile?.department || "Not Specified"}
                      </p>
                      <hr />

                      {/* <strong>
                        <i className="fas fa-link mr-1" /> LinkedIn
                      </strong>
                      <p className="text-muted">
                        <a href={user?.linkedin || "#"}>{user?.linkedin || "Not Provided"}</a>
                      </p>
                      <hr />

                      <strong>
                        <i className="fas fa-code-branch mr-1" /> Github
                      </strong>
                      <p className="text-muted">
                        <a href={user?.Github || "#"}>{user?.Github || "Not Provided"}</a>
                      </p>
                      <hr />

                      <strong>
                        <i className="fas fa-camera mr-1" /> Instagram
                      </strong>
                      <p className="text-muted">
                        <a href={user?.instagram || "#"}>{user?.instagram || "Not Provided"}</a>
                      </p> */}
                    </div>
                    {/* /.card-body */}
                  </div>
                  {/* /.card */}
                </div>



              {/* /.col */}
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header p-2">
                    <ul className="nav nav-pills">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          href="#activity"
                          data-toggle="tab"
                        >
                          Your Posts
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#timeline"
                          data-toggle="tab"
                        >
                         Contacts
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#settings"
                          data-toggle="tab"
                        >
                          Edit Profile
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="tab-content">
                      <div className="active tab-pane" id="activity">
                        {/* Post */}
                        <div className="post">
                          <div className="user-block">
                            <img
                              className="img-circle img-bordered-sm"
                              src="../../dist/img/user1-128x128.jpg"
                              alt="user image"
                            />
                            <span className="username">
                              <a href="#">Jonathan Burke Jr.</a>
                              <a href="#" className="float-right btn-tool">
                                <i className="fas fa-times" />
                              </a>
                            </span>
                            <span className="description">
                              Shared publicly - 7:30 PM today
                            </span>
                          </div>
                          {/* /.user-block */}
                          <p>
                            Lorem ipsum represents a long-held tradition for
                            designers, typographers and the like. Some people
                            hate it and argue for its demise, but others ignore
                            the hate as they create awesome tools to help create
                            filler text for everyone from bacon lovers to
                            Charlie Sheen fans.
                          </p>
                          <p>
                            <a href="#" className="link-black text-sm mr-2">
                              <i className="fas fa-share mr-1" /> Share
                            </a>
                            <a href="#" className="link-black text-sm">
                              <i className="far fa-thumbs-up mr-1" /> Like
                            </a>
                            <span className="float-right">
                              <a href="#" className="link-black text-sm">
                                <i className="far fa-comments mr-1" /> Comments
                                (5)
                              </a>
                            </span>
                          </p>
                          <input
                            className="form-control form-control-sm"
                            type="text"
                            placeholder="Type a comment"
                          />
                        </div>
                        {/* /.post */}
                        {/* Post */}
                        <div className="post clearfix">
                          <div className="user-block">
                            <img
                              className="img-circle img-bordered-sm"
                              src="../../dist/img/user7-128x128.jpg"
                              alt="User Image"
                            />
                            <span className="username">
                              <a href="#">Sarah Ross</a>
                              <a href="#" className="float-right btn-tool">
                                <i className="fas fa-times" />
                              </a>
                            </span>
                            <span className="description">
                              Sent you a message - 3 days ago
                            </span>
                          </div>
                          {/* /.user-block */}
                          <p>
                            Lorem ipsum represents a long-held tradition for
                            designers, typographers and the like. Some people
                            hate it and argue for its demise, but others ignore
                            the hate as they create awesome tools to help create
                            filler text for everyone from bacon lovers to
                            Charlie Sheen fans.
                          </p>
                          <form className="form-horizontal">
                            <div className="input-group input-group-sm mb-0">
                              <input
                                className="form-control form-control-sm"
                                placeholder="Response"
                              />
                              <div className="input-group-append">
                                <button
                                  type="submit"
                                  className="btn btn-danger"
                                >
                                  Send
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                        {/* /.post */}
                        {/* Post */}
                        <div className="post">
                          <div className="user-block">
                            <img
                              className="img-circle img-bordered-sm"
                              src="../../dist/img/user6-128x128.jpg"
                              alt="User Image"
                            />
                            <span className="username">
                              <a href="#">Adam Jones</a>
                              <a href="#" className="float-right btn-tool">
                                <i className="fas fa-times" />
                              </a>
                            </span>
                            <span className="description">
                              Posted 5 photos - 5 days ago
                            </span>
                          </div>
                          {/* /.user-block */}
                          <div className="row mb-3">
                            <div className="col-sm-6">
                              <img
                                className="img-fluid"
                                src="../../dist/img/photo1.png"
                                alt="Photo"
                              />
                            </div>
                            {/* /.col */}
                            <div className="col-sm-6">
                              <div className="row">
                                <div className="col-sm-6">
                                  <img
                                    className="img-fluid mb-3"
                                    src="../../dist/img/photo2.png"
                                    alt="Photo"
                                  />
                                  <img
                                    className="img-fluid"
                                    src="../../dist/img/photo3.jpg"
                                    alt="Photo"
                                  />
                                </div>
                                {/* /.col */}
                                <div className="col-sm-6">
                                  <img
                                    className="img-fluid mb-3"
                                    src="../../dist/img/photo4.jpg"
                                    alt="Photo"
                                  />
                                  <img
                                    className="img-fluid"
                                    src="../../dist/img/photo1.png"
                                    alt="Photo"
                                  />
                                </div>
                                {/* /.col */}
                              </div>
                              {/* /.row */}
                            </div>
                            {/* /.col */}
                          </div>
                          {/* /.row */}
                          <p>
                            <a href="#" className="link-black text-sm mr-2">
                              <i className="fas fa-share mr-1" /> Share
                            </a>
                            <a href="#" className="link-black text-sm">
                              <i className="far fa-thumbs-up mr-1" /> Like
                            </a>
                            <span className="float-right">
                              <a href="#" className="link-black text-sm">
                                <i className="far fa-comments mr-1" /> Comments
                                (5)
                              </a>
                            </span>
                          </p>
                          <input
                            className="form-control form-control-sm"
                            type="text"
                            placeholder="Type a comment"
                          />
                        </div>
                        {/* /.post */}
                      </div>
                      {/* /.tab-pane */}
                      <div className="tab-pane" id="timeline">
                        {/* The timeline */}
                        <div className="timeline timeline-inverse">
                          {/* timeline time label */}
                          <div className="time-label">
                             <span className="bg-danger">Contact Details</span>
                              </div>
                              {/* / Contact-label */}
                              {/* Contact Details Item */}
                              <div>
                                <i className="fas fa-address-book bg-primary" />
                                <div className="timeline-item">
                                 
                                 

                                  <div className="timeline-body">
                                    <strong>Email:</strong>
                                    <p>{user?.email || "Not Provided"}</p>
                                    <hr />

                                    <strong>Mobile:</strong>
                                    <p>{user?.mobile || "Not Provided"}</p>
                                    <hr />

                                    <strong>LinkedIn:</strong>
                                    <p>
                                      <a href={user?.linkedin || "#"} target="_blank" rel="noopener noreferrer">
                                        {user?.linkedin ? user.linkedin : "Not Provided"}
                                      </a>
                                    </p>
                                    <hr />

                                    <strong>GitHub:</strong>
                                    <p>
                                      <a href={user?.Github || "#"} target="_blank" rel="noopener noreferrer">
                                        {user?.Github ? user.Github : "Not Provided"}
                                      </a>
                                    </p>
                                    <hr />

                                    <strong>Instagram:</strong>
                                    <p>
                                      <a href={user?.instagram || "#"} target="_blank" rel="noopener noreferrer">
                                        {user?.instagram ? user.instagram : "Not Provided"}
                                      </a>
                                    </p>
                                  </div>

                                 
                                </div>
                              </div>
                              {/* END Contact Details Item */}

                         
                         
                          <div>
                            <i className="far fa-clock bg-gray" />
                          </div>
                        </div>
                      </div>
                      {/* /.tab-pane */}
                      <div className="tab-pane" id="settings">
                        <form className="form-horizontal">
                          <div className="form-group row">
                            <label
                              htmlFor="inputName"
                              className="col-sm-2 col-form-label"
                            >
                              Name
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="email"
                                className="form-control"
                                id="inputName"
                                placeholder="Name"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputEmail"
                              className="col-sm-2 col-form-label"
                            >
                              Email
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="email"
                                className="form-control"
                                id="inputEmail"
                                placeholder="Email"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputName2"
                              className="col-sm-2 col-form-label"
                            >
                              Name
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="inputName2"
                                placeholder="Name"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputExperience"
                              className="col-sm-2 col-form-label"
                            >
                              Experience
                            </label>
                            <div className="col-sm-10">
                              <textarea
                                className="form-control"
                                id="inputExperience"
                                placeholder="Experience"
                                defaultValue={""}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputSkills"
                              className="col-sm-2 col-form-label"
                            >
                              Skills
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="inputSkills"
                                placeholder="Skills"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
                              <div className="checkbox">
                                <label>
                                  <input type="checkbox" /> I agree to the{" "}
                                  <a href="#">terms and conditions</a>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
                              <button type="submit" className="btn btn-danger">
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      {/* /.tab-pane */}
                    </div>
                    {/* /.tab-content */}
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>





          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </>
  );
};

const SuperUserProfileContent = () => {
  let { userData } = useContext(AuthContext);
  console.log("userData", userData);


  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch alumni data when the component mounts
    const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;

    axios
      .get(`http://127.0.0.1:8000/hods/${userData?.user_id}`, {
        headers: {
          Authorization: `Bearer ${token?.access}`,
        },
      })
      .then((response) => {
        
        setUser(response.data);
        
      })
      .catch((error) => {
        console.error('Error fetching alumni data:', error);
      });
  }, [userData?.user_id]);

  console.log("user ",user);


  return (
    <>
      <div>
        {/* Content Header (Page header) */}

        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
            <div className="col-md-3" style={{ fontSize: '0.9em' }}>
                    {/* Profile Image */}
                    <div className="card card-primary card-outline position-relative">
                      {/* Ribbon */}
                      <div className="ribbon-wrapper ribbon-lg">
                        <div className="ribbon bg-primary">
                          {user
                            ? user.is_alumni
                              ? "Alumni"
                              : user.is_student
                              ? "Student"
                              : "College"
                            : "User"}
                        </div>
                      </div>

                      <div className="card-body box-profile">
                        <div className="text-center">
                          <img
                            className="profile-user-img img-fluid img-circle"
                            src={user?.hod_profile?.profile_picture_url || "../../dist/img/user4-128x128.jpg"}
                            alt="User profile picture"
                          />
                        </div>
                        <h3 className="profile-username text-center">
                          {user ? user.full_name || user.username : "User"}
                        </h3>
                        <p className="text-muted text-center">
                          {user?.hod_profile?.designation || "Not Specified"}
                        </p>
                      </div>
                      {/* /.card-body */}
                    </div>
                    {/* /.card */}

                    {/* About Me Box */}
                    <div className="card card-primary">
                      <div className="card-header">
                        <h3 className="card-title">About Me</h3>
                      </div>
                      {/* /.card-header */}
                      <div className="card-body">
                        <strong>
                          <i className="fas fa-university mr-1" /> Department
                        </strong>
                        <p className="text-muted">
                          {user?.hod_profile?.department || "Not Specified"}
                        </p>
                        <hr />
                        
                        <strong>
                          <i className="fas fa-phone mr-1" /> Mobile
                        </strong>
                        <p className="text-muted">
                          {user?.mobile || "Not Provided"}
                        </p>
                        <hr />

                        {/* <strong>
                          <i className="fas fa-code-branch mr-1" /> Branch
                        </strong>
                        <p className="text-muted">
                          <span className="tag tag-danger">{user?.Branch || "Not Specified"}</span> <br />
                        </p>
                        <hr /> */}
                        
                        <strong>
                          <i className="fas fa-envelope mr-1" /> Email
                        </strong>
                        <p className="text-muted">
                          {user?.email || "Not Provided"}
                        </p>
                        <hr />

                        <strong>
                          <i className="fas fa-info-circle mr-1" /> About
                        </strong>
                        <p className="text-muted">
                          <span className="tag tag-danger">{user?.About || "Not Specified"}</span> <br />
                        </p>
                        <hr />
                        
                        <strong>
                          <i className="fas fa-laptop-code mr-1" /> Year Joined
                        </strong>
                        <p className="text-muted">
                          <span className="tag tag-danger">{user?.Year_Joined || "Not Specified"}</span> <br />
                        </p>
                        <hr />
                        
                        <strong>
                          <i className="fas fa-building mr-1" /> Designation
                        </strong>
                        <p className="text-muted">
                          {user?.hod_profile?.designation || "Not Specified"}
                        </p>
                      </div>
                      {/* /.card-body */}
                    </div>
                    {/* /.card */}
                  </div>



              {/* /.col */}
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header p-2">
                    <ul className="nav nav-pills">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          href="#activity"
                          data-toggle="tab"
                        >
                          Your Posts
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#timeline"
                          data-toggle="tab"
                        >
                          Contacts
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#settings"
                          data-toggle="tab"
                        >
                          Edit Profile
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="tab-content">
                      <div className="active tab-pane" id="activity">
                        {/* Post */}
                        <div className="post">
                          <div className="user-block">
                            <img
                              className="img-circle img-bordered-sm"
                              src="../../dist/img/user1-128x128.jpg"
                              alt="user image"
                            />
                            <span className="username">
                              <a href="#">Jonathan Burke Jr.</a>
                              <a href="#" className="float-right btn-tool">
                                <i className="fas fa-times" />
                              </a>
                            </span>
                            <span className="description">
                              Shared publicly - 7:30 PM today
                            </span>
                          </div>
                          {/* /.user-block */}
                          <p>
                            Lorem ipsum represents a long-held tradition for
                            designers, typographers and the like. Some people
                            hate it and argue for its demise, but others ignore
                            the hate as they create awesome tools to help create
                            filler text for everyone from bacon lovers to
                            Charlie Sheen fans.
                          </p>
                          <p>
                            <a href="#" className="link-black text-sm mr-2">
                              <i className="fas fa-share mr-1" /> Share
                            </a>
                            <a href="#" className="link-black text-sm">
                              <i className="far fa-thumbs-up mr-1" /> Like
                            </a>
                            <span className="float-right">
                              <a href="#" className="link-black text-sm">
                                <i className="far fa-comments mr-1" /> Comments
                                (5)
                              </a>
                            </span>
                          </p>
                          <input
                            className="form-control form-control-sm"
                            type="text"
                            placeholder="Type a comment"
                          />
                        </div>
                        {/* /.post */}
                        {/* Post */}
                        <div className="post clearfix">
                          <div className="user-block">
                            <img
                              className="img-circle img-bordered-sm"
                              src="../../dist/img/user7-128x128.jpg"
                              alt="User Image"
                            />
                            <span className="username">
                              <a href="#">Sarah Ross</a>
                              <a href="#" className="float-right btn-tool">
                                <i className="fas fa-times" />
                              </a>
                            </span>
                            <span className="description">
                              Sent you a message - 3 days ago
                            </span>
                          </div>
                          {/* /.user-block */}
                          <p>
                            Lorem ipsum represents a long-held tradition for
                            designers, typographers and the like. Some people
                            hate it and argue for its demise, but others ignore
                            the hate as they create awesome tools to help create
                            filler text for everyone from bacon lovers to
                            Charlie Sheen fans.
                          </p>
                          <form className="form-horizontal">
                            <div className="input-group input-group-sm mb-0">
                              <input
                                className="form-control form-control-sm"
                                placeholder="Response"
                              />
                              <div className="input-group-append">
                                <button
                                  type="submit"
                                  className="btn btn-danger"
                                >
                                  Send
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                        {/* /.post */}
                        {/* Post */}
                        <div className="post">
                          <div className="user-block">
                            <img
                              className="img-circle img-bordered-sm"
                              src="../../dist/img/user6-128x128.jpg"
                              alt="User Image"
                            />
                            <span className="username">
                              <a href="#">Adam Jones</a>
                              <a href="#" className="float-right btn-tool">
                                <i className="fas fa-times" />
                              </a>
                            </span>
                            <span className="description">
                              Posted 5 photos - 5 days ago
                            </span>
                          </div>
                          {/* /.user-block */}
                          <div className="row mb-3">
                            <div className="col-sm-6">
                              <img
                                className="img-fluid"
                                src="../../dist/img/photo1.png"
                                alt="Photo"
                              />
                            </div>
                            {/* /.col */}
                            <div className="col-sm-6">
                              <div className="row">
                                <div className="col-sm-6">
                                  <img
                                    className="img-fluid mb-3"
                                    src="../../dist/img/photo2.png"
                                    alt="Photo"
                                  />
                                  <img
                                    className="img-fluid"
                                    src="../../dist/img/photo3.jpg"
                                    alt="Photo"
                                  />
                                </div>
                                {/* /.col */}
                                <div className="col-sm-6">
                                  <img
                                    className="img-fluid mb-3"
                                    src="../../dist/img/photo4.jpg"
                                    alt="Photo"
                                  />
                                  <img
                                    className="img-fluid"
                                    src="../../dist/img/photo1.png"
                                    alt="Photo"
                                  />
                                </div>
                                {/* /.col */}
                              </div>
                              {/* /.row */}
                            </div>
                            {/* /.col */}
                          </div>
                          {/* /.row */}
                          <p>
                            <a href="#" className="link-black text-sm mr-2">
                              <i className="fas fa-share mr-1" /> Share
                            </a>
                            <a href="#" className="link-black text-sm">
                              <i className="far fa-thumbs-up mr-1" /> Like
                            </a>
                            <span className="float-right">
                              <a href="#" className="link-black text-sm">
                                <i className="far fa-comments mr-1" /> Comments
                                (5)
                              </a>
                            </span>
                          </p>
                          <input
                            className="form-control form-control-sm"
                            type="text"
                            placeholder="Type a comment"
                          />
                        </div>
                        {/* /.post */}
                      </div>
                      {/* /.tab-pane */}
                      <div className="tab-pane" id="timeline">
                        {/* The timeline */}
                        <div className="timeline timeline-inverse">
                          {/* timeline time label */}
                         {/* timeline time label */}
                         <div className="time-label">
                             <span className="bg-danger">Contact Details</span>
                              </div>
                              {/* / Contact-label */}
                              {/* Contact Details Item */}
                              <div>
                                <i className="fas fa-address-book bg-primary" />
                                <div className="timeline-item">
                                 
                                 

                                  <div className="timeline-body">
                                    <strong>Email:</strong>
                                    <p>{user?.email || "Not Provided"}</p>
                                    <hr />

                                    <strong>Mobile:</strong>
                                    <p>{user?.mobile || "Not Provided"}</p>
                                    <hr />

                                    <strong>LinkedIn:</strong>
                                    <p>
                                      <a href={user?.linkedin || "#"} target="_blank" rel="noopener noreferrer">
                                        {user?.linkedin ? user.linkedin : "Not Provided"}
                                      </a>
                                    </p>
                                    <hr />

                                    <strong>GitHub:</strong>
                                    <p>
                                      <a href={user?.Github || "#"} target="_blank" rel="noopener noreferrer">
                                        {user?.Github ? user.Github : "Not Provided"}
                                      </a>
                                    </p>
                                    <hr />

                                    <strong>Instagram:</strong>
                                    <p>
                                      <a href={user?.instagram || "#"} target="_blank" rel="noopener noreferrer">
                                        {user?.instagram ? user.instagram : "Not Provided"}
                                      </a>
                                    </p>
                                  </div>

                                 
                                </div>
                              </div>
                              {/* END Contact Details Item */}
                         
                          <div>
                            <i className="fas fa-camera bg-purple" />
                            <div className="timeline-item">
                              <span className="time">
                                <i className="far fa-clock" /> 2 days ago
                              </span>
                              <h3 className="timeline-header">
                                <a href="#">Mina Lee</a> uploaded new photos
                              </h3>
                              <div className="timeline-body">
                                <img
                                  src="https://placehold.it/150x100"
                                  alt="..."
                                />
                                <img
                                  src="https://placehold.it/150x100"
                                  alt="..."
                                />
                                <img
                                  src="https://placehold.it/150x100"
                                  alt="..."
                                />
                                <img
                                  src="https://placehold.it/150x100"
                                  alt="..."
                                />
                              </div>
                            </div>
                          </div>
                          {/* END timeline item */}
                          <div>
                            <i className="far fa-clock bg-gray" />
                          </div>
                        </div>
                      </div>
                      {/* /.tab-pane */}
                      <div className="tab-pane" id="settings">
                        <form className="form-horizontal">
                          <div className="form-group row">
                            <label
                              htmlFor="inputName"
                              className="col-sm-2 col-form-label"
                            >
                              Name
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="email"
                                className="form-control"
                                id="inputName"
                                placeholder="Name"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputEmail"
                              className="col-sm-2 col-form-label"
                            >
                              Email
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="email"
                                className="form-control"
                                id="inputEmail"
                                placeholder="Email"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputName2"
                              className="col-sm-2 col-form-label"
                            >
                              Name
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="inputName2"
                                placeholder="Name"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputExperience"
                              className="col-sm-2 col-form-label"
                            >
                              Experience
                            </label>
                            <div className="col-sm-10">
                              <textarea
                                className="form-control"
                                id="inputExperience"
                                placeholder="Experience"
                                defaultValue={""}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputSkills"
                              className="col-sm-2 col-form-label"
                            >
                              Skills
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="inputSkills"
                                placeholder="Skills"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
                              <div className="checkbox">
                                <label>
                                  <input type="checkbox" /> I agree to the{" "}
                                  <a href="#">terms and conditions</a>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
                              <button type="submit" className="btn btn-danger">
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      {/* /.tab-pane */}
                    </div>
                    {/* /.tab-content */}
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>





          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </>
  );
};

const Profile = () => {
  let { userData } = useContext(AuthContext);
  const getProfileContent = () => {
    if (userData.is_student) {
      return StudentProfileContent;
    } else if (userData.is_alumni) {
      return AlumniProfileContent;
    } else if (userData.is_superuser) {
      return SuperUserProfileContent;
    }
  };
  return (
     
    <Home DynamicContent={getProfileContent()} url="profile" heading="Profile" />
  );
};

export default Profile;
