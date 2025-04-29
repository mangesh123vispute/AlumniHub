import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext.js";
import baseurl from "../const.js";
import { Link } from "react-router-dom";

const SideNav = () => {
  let {
    userData,
    numberOfInactiveAlumni,
    ProfileImage,
    showNotification,
    toggleAddAdminModal,
  } = useContext(AuthContext);
 
  const [activeDropdown, setActiveDropdown] = useState(null);
  // const [isOpen, setIsOpen] = useState(false); // State to control dropdown visibility

  return (
    <div>
      <aside className="main-sidebar bg-white elevation-4">
        {/* Brand Logo */}
        <Link to="/" className="brand-link" style={{ textDecoration: "none" }}>
          <img
            src="/Logo.jfif"
            alt=""
            class="brand-image img-circle elevation-3"
            style={{ marginTop: "5px" }}
          />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              className="brand-text font-weight-light"
              style={{ fontSize: "18px", color: "#FFF" }}
            >
              <span style={{ color: "black", fontWeight: 'bold' }}>AlumniX</span>
            </span>
            <small style={{ fontSize: "0.6em", color: "black" }}>
              SSBT COET
            </small>
          </div>
        </Link>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src={
                  ProfileImage
                    ? `${ProfileImage}`
                    : '/profile.jpg'
                }
                className="img-circle elevation-2 mt-1"
                alt=""
              />
            </div>
            <div className="info">
              <Link
                to="/myprofile"
                className="d-block"
                style={{ textDecoration: "none" }}
              >
                <span style={{ textTransform: "uppercase" }}>{` ${
                  userData ? userData?.username : "User"
                }`}</span>{" "}
              </Link>
            </div>
          </div>

          {/* Sidebar Menu */}

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Students  */}
              {userData?.is_student && (
                <>
                  <li className="nav-item">
                    <Link
                      to="#"
                      className="nav-link"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default anchor behavior
                        setActiveDropdown(
                          activeDropdown === "user" ? null : "user"
                        ); // Toggle dropdown state
                      }}
                    >
                      <i
                        className="nav-icon fas fa-user"
                        style={{ fontSize: "1em" }}
                      />
                      <p style={{ fontSize: "1em" }}>
                        Users
                        <i
                          className={`right fas ${
                            activeDropdown === "user"
                              ? "fa-angle-down"
                              : "fa-angle-left"
                          }`}
                        />{" "}
                      </p>
                    </Link>
                    {activeDropdown === "user" && ( // Only render the list if activeDropdown is 'user'
                      <div style={{ marginLeft: "1em" }}>
                        <li className="nav-item">
                          <Link to="/all_alumnis" className="nav-link">
                            <i
                              className="fas fa-users nav-icon"
                              style={{ fontSize: "1em" }}
                            />
                            <p style={{ fontSize: "1em" }}>Alumni Directory</p>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/all_students" className="nav-link">
                            <i
                              className="fas fa-user-graduate nav-icon"
                              style={{ fontSize: "1em" }}
                            />
                            <p style={{ fontSize: "1em" }}>Students</p>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/all_hods" className="nav-link">
                            <i
                              className="fas fa-user-tie nav-icon"
                              style={{ fontSize: "1em" }}
                            />
                            <p style={{ fontSize: "1em" }}>Admins</p>
                          </Link>
                        </li>
                      </div>
                    )}
                  </li>

                  <li className="nav-item">
                    <Link
                      to="#"
                      className="nav-link"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default anchor behavior
                        setActiveDropdown(
                          activeDropdown === "post" ? null : "post"
                        ); // Toggle dropdown state
                      }}
                    >
                      <i
                        className="fas fa-pencil-alt nav-icon"
                        style={{ fontSize: "1em" }}
                      ></i>
                      <p style={{ fontSize: "1em" }}>
                        Posts
                        <i
                          className={`right fas ${
                            activeDropdown === "post"
                              ? "fa-angle-down"
                              : "fa-angle-left"
                          }`}
                        />
                      </p>
                    </Link>
                    {activeDropdown === "post" && ( // Only render the list if activeDropdown is 'post'
                      <div style={{ marginLeft: "1em" }}>
                        <li className="nav-item">
                          <Link to="/all_posts" className="nav-link">
                            <i
                              className="fas fa-list mr-2"
                              style={{ fontSize: "1em" }}
                            />
                            <p style={{ fontSize: "1em" }}>All Posts</p>
                          </Link>
                        </li>
                      </div>
                    )}
                  </li>

                  {/* test below */}
                  <li className="nav-item">
                    <Link
                      to="/JobPortal"
                      className="nav-link"
                    >
                      <i
                        className="fas fa-briefcase nav-icon"
                        style={{ fontSize: "1em" }}
                      ></i>
                      <p style={{ fontSize: "1em" }}>
                        Job Portal
                        
                      </p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/Event"
                      className="nav-link"
                    >
                      <i
                        className="fas fa-calendar nav-icon"
                        style={{ fontSize: "1em" }}
                      ></i>
                      <p style={{ fontSize: "1em" }}>
                        Events & Reunions
                      </p>
                    </Link>
                  </li>
                </>
              )}

              {/* Alumni  */}
              {userData?.is_alumni && (
                <>
                  <li className="nav-item">
                    <Link
                      to="#"
                      className="nav-link"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default anchor behavior
                        setActiveDropdown(
                          activeDropdown === "user" ? null : "user"
                        ); // Toggle dropdown state
                      }}
                    >
                      <i
                        className="nav-icon fas fa-user"
                        style={{ fontSize: "1em" }}
                      />
                      <p style={{ fontSize: "1em" }}>
                        Users
                        <i
                          className={`right fas ${
                            activeDropdown === "user"
                              ? "fa-angle-down"
                              : "fa-angle-left"
                          }`}
                        />{" "}
                      </p>
                    </Link>
                    {activeDropdown === "user" && ( // Only render the list if activeDropdown is 'user'
                      <div style={{ marginLeft: "1em" }}>
                        <li className="nav-item">
                          <Link to="/all_alumnis" className="nav-link">
                            <i
                              className="fas fa-users nav-icon"
                              style={{ fontSize: "1em" }}
                            />
                            <p style={{ fontSize: "1em" }}>Alumni Directory</p>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/all_students" className="nav-link">
                            <i
                              className="fas fa-user-graduate nav-icon"
                              style={{ fontSize: "1em" }}
                            />
                            <p style={{ fontSize: "1em" }}>Students</p>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/all_hods" className="nav-link">
                            <i
                              className="fas fa-user-tie nav-icon"
                              style={{ fontSize: "1em" }}
                            />
                            <p style={{ fontSize: "1em" }}>Admins</p>
                          </Link>
                        </li>
                      </div>
                    )}
                  </li>

                  <li className="nav-item">
                    <Link
                      to="#"
                      className="nav-link"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default anchor behavior
                        setActiveDropdown(
                          activeDropdown === "post" ? null : "post"
                        ); // Toggle dropdown state
                      }}
                    >
                      <i
                        className="fas fa-pencil-alt nav-icon"
                        style={{ fontSize: "1em" }}
                      ></i>
                      <p style={{ fontSize: "1em" }}>
                        Posts
                        <i
                          className={`right fas ${
                            activeDropdown === "post"
                              ? "fa-angle-down"
                              : "fa-angle-left"
                          }`}
                        />
                      </p>
                    </Link>
                    {activeDropdown === "post" && ( // Only render the list if activeDropdown is 'post'
                      <div style={{ marginLeft: "1em" }}>
                        <li className="nav-item">
                          <Link to="/all_posts" className="nav-link">
                            <i
                              className="fas fa-list mr-2"
                              style={{ fontSize: "1em" }}
                            />
                            <p style={{ fontSize: "1em" }}>All Posts</p>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/add_alumni_post" className="nav-link">
                            <i
                              className="fas fa-plus mr-2"
                              style={{ fontSize: "1em" }}
                            />
                            <p style={{ fontSize: "1em" }}>Create Post</p>
                          </Link>
                        </li>
                      </div>
                    )}
                  </li>

                  {/* test below pc */}
                  <li className="nav-item">
                    <Link
                      to="/JobPortal"
                      className="nav-link"
                    >
                      <i
                        className="fas fa-briefcase nav-icon"
                        style={{ fontSize: "1em" }}
                      ></i>
                      <p style={{ fontSize: "1em" }}>
                        Job Portal
                      </p>
                    </Link>
                  </li>
                  
                  <li className="nav-item">
                    <Link
                      to="/Event"
                      className="nav-link"
                    >
                      <i
                        className="fas fa-calendar nav-icon"
                        style={{ fontSize: "1em" }}
                      ></i>
                      <p style={{ fontSize: "1em" }}>
                        Events & Reunions
                      </p>
                    </Link>
                  </li>


                  <li className="nav-item">
                    <Link
                      to="/Donation"
                      className="nav-link"
                    >
                      <i
                        className="fas fa-credit-card nav-icon"
                        style={{ fontSize: "1em" }}
                      ></i>
                      <p style={{ fontSize: "1em" }}>
                        Donation
                      </p>
                    </Link>
                  </li>
                </>
              )}

              {/* HOD  */}
              {(userData?.is_superuser ||
                (!userData?.is_alumni && !userData?.is_student)) && (
                <>
                  <li className="nav-item">
                    <Link
                      to="#"
                      className="nav-link"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default anchor behavior
                        setActiveDropdown(
                          activeDropdown === "user" ? null : "user"
                        ); // Toggle dropdown state
                      }}
                    >
                      <i
                        className="nav-icon fas fa-user"
                        style={{ fontSize: "1em" }}
                      />
                      <p style={{ fontSize: "1em" }}>
                        Users
                        <i
                          className={`right fas ${
                            activeDropdown === "user"
                              ? "fa-angle-down"
                              : "fa-angle-left"
                          }`}
                        />{" "}
                      </p>
                    </Link>
                    {activeDropdown === "user" && ( // Only render the list if activeDropdown is 'user'
                      <div style={{ marginLeft: "1em" }}>
                        <li className="nav-item">
                          <Link to="/all_alumnis" className="nav-link">
                            <i
                              className="fas fa-users nav-icon"
                              style={{ fontSize: "1em" }}
                            />
                            <p style={{ fontSize: "1em" }}>Alumni Directory</p>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/all_students" className="nav-link">
                            <i
                              className="fas fa-user-graduate nav-icon"
                              style={{ fontSize: "1em" }}
                            />
                            <p style={{ fontSize: "1em" }}>Students</p>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/all_hods" className="nav-link">
                            <i
                              className="fas fa-user-tie nav-icon"
                              style={{ fontSize: "1em" }}
                            />
                            <p style={{ fontSize: "1em" }}>Admins</p>
                          </Link>
                        </li>
                      </div>
                    )}
                  </li>

                  <li className="nav-item">
                    <Link
                      to="#"
                      className="nav-link"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default anchor behavior
                        setActiveDropdown(
                          activeDropdown === "post" ? null : "post"
                        ); // Toggle dropdown state
                      }}
                    >
                      <i
                        className="fas fa-pencil-alt nav-icon"
                        style={{ fontSize: "1em" }}
                      ></i>
                      <p style={{ fontSize: "1em" }}>
                        Posts
                        <i
                          className={`right fas ${
                            activeDropdown === "post"
                              ? "fa-angle-down"
                              : "fa-angle-left"
                          }`}
                        />
                      </p>
                    </Link>
                    {activeDropdown === "post" && ( 
                      <div style={{ marginLeft: "1em" }}>
                        <li className="nav-item">
                          <Link to="/all_posts" className="nav-link">
                            <i
                              className="fas fa-list mr-2"
                              style={{ fontSize: "1em" }}
                            />
                            <p style={{ fontSize: "1em" }}>All Posts</p>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/add_hod_post" className="nav-link">
                            <i
                              className="fas fa-plus mr-2"
                              style={{ fontSize: "1em" }}
                            />
                            <p style={{ fontSize: "1em" }}>Create Post</p>
                          </Link>
                        </li>
                      </div>
                    )}
                  </li>

                  {(userData?.is_allowedToAddAdmin ||
                    userData?.username === "Admin") && (
                    <li className="nav-item">
                      <Link
                        type="button"
                        className="nav-link"
                        onClick={() => {
                          showNotification(
                            "While adding an admin, ensure that you grant them appropriate permissions to give them the right level of access..",
                            "info",
                            "Info"
                          );
                          toggleAddAdminModal();
                        }}
                      >
                        <p style={{ fontSize: "1em" }}>
                          <i
                            className="fas fa-user-plus nav-icon"
                            style={{ fontSize: "1em" }}
                            title="Add New Administrator"
                          ></i>
                          Create Admin
                        </p>
                      </Link>
                    </li>
                  )}

                  {(userData?.is_allowedToJoinAlumni ||
                    userData?.username === "Admin") && (
                    <li className="nav-item">
                      <Link to="/requests" className="nav-link">
                        <p style={{ fontSize: "1em" }}>
                          <i
                            className="fas fa-hands-helping nav-icon"
                            style={{ fontSize: "1em" }}
                            title="Request to Join"
                          ></i>
                          Alumni Join Requests
                          {numberOfInactiveAlumni ? (
                            <span
                              className="left badge badge-danger "
                              style={{
                                fontSize: "0.6em",
                                position: "relative",
                                bottom: "1em",
                                left: "0.5em",
                              }}
                            >
                              {numberOfInactiveAlumni}
                            </span>
                          ) : null}
                        </p>
                      </Link>
                    </li>
                  )}

                  {(userData?.is_allowedToAccessPostRequestTab ||
                    userData?.username === "Admin") && (
                    <li className="nav-item">
                      <Link to={`/unverifiedalumni_posts`} className="nav-link">
                        <p style={{ fontSize: "1em" }}>
                          <i
                            className="fas fa-paper-plane nav-icon"
                            style={{ fontSize: "1em" }}
                          ></i>
                          Alumni Post Requests
                        </p>
                      </Link>
                    </li>
                  )}

                  <li className="nav-item">
                    <Link
                      to="#"
                      className="nav-link"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default anchor behavior
                        setActiveDropdown(
                          activeDropdown === "job" ? null : "job"
                        ); // Toggle dropdown state
                      }}
                    >
                      <i
                        className="nav-icon fas fa-briefcase"
                        style={{ fontSize: "1em" }}
                      />
                      <p style={{ fontSize: "1em" }}>
                        Job Portal
                        <i
                          className={`right fas ${
                            activeDropdown === "job"
                              ? "fa-angle-down"
                              : "fa-angle-left"
                          }`}
                        />{" "}
                      </p>
                    </Link>
                    {activeDropdown === "job" && ( // Only render the list if activeDropdown is 'user'
                      <div style={{ marginLeft: "1em" }}>
                        <li className="nav-item">
                          <Link to="/JobPortal" className="nav-link">
                            <i
                              className="fas fa-list-alt nav-icon"
                              style={{ fontSize: "1em" }}
                            />
                            <p style={{ fontSize: "1em" }}>Job List</p>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/PostJob" className="nav-link">
                            <i
                              className="fas fa-pencil-alt nav-icon"
                              style={{ fontSize: "1em" }}
                            />
                            <p style={{ fontSize: "1em" }}>Post Job Opportunity</p>
                          </Link>
                        </li>
                      </div>
                    )}
                  </li>

                  <li className="nav-item">
                    <Link
                      to="#"
                      className="nav-link"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default anchor behavior
                        setActiveDropdown(
                          activeDropdown === "event" ? null : "event"
                        ); // Toggle dropdown state
                      }}
                    >
                      <i
                        className="nav-icon fas fa-calendar"
                        style={{ fontSize: "1em" }}
                      />
                      <p style={{ fontSize: "1em" }}>
                        Event & Reunions
                        <i
                          className={`right fas ${
                            activeDropdown === "job"
                              ? "fa-angle-down"
                              : "fa-angle-left"
                          }`}
                        />{" "}
                      </p>
                    </Link>
                    {activeDropdown === "event" && ( // Only render the list if activeDropdown is 'user'
                      <div style={{ marginLeft: "1em" }}>
                        <li className="nav-item">
                          <Link to="/Event" className="nav-link">
                            <i
                              className="fas fa-list-alt nav-icon"
                              style={{ fontSize: "1em" }}
                            />
                            <p style={{ fontSize: "1em" }}>Event List</p>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/PostEvent" className="nav-link">
                            <i
                              className="fas fa-pencil-alt nav-icon"
                              style={{ fontSize: "1em" }}
                            />
                            <p style={{ fontSize: "1em" }}>Post Event or Reunion</p>
                          </Link>
                        </li>
                      </div>
                    )}
                  </li>

                  {(userData?.is_allowedToAccessSettings ||
                    userData?.username === "Admin") && (
                    <li className="nav-item">
                      <Link
                        to={`${baseurl}/admin/`}
                        className="nav-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p style={{ fontSize: "1em" }}>
                          <i
                            className="fas fa-cog nav-icon"
                            style={{ fontSize: "1em" }}
                          ></i>
                          Settings
                        </p>
                      </Link>
                    </li>
                  )}
                </>
              )}
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default SideNav;
