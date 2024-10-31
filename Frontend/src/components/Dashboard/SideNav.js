/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext.js";
import { Link } from "react-router-dom";

const SideNav = () => {
  let { userData, numberOfInactiveAlumni } = useContext(AuthContext);
  console.log("userData", userData);
  const [activeDropdown, setActiveDropdown] = useState(null);
  // const [isOpen, setIsOpen] = useState(false); // State to control dropdown visibility

  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <Link to="/" className="brand-link" style={{ textDecoration: "none" }}>
          <img
            src="./Logo.jfif"
            alt="SSBT COET"
            class="brand-image img-circle elevation-3"
            style={{
              marginTop: "5px",
            }}
          ></img>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              className="brand-text font-weight-light"
              style={{ fontSize: "18px", color: "#FFF" }}
            >
              <span style={{ color: "red" }}>Alumni</span>Hub
            </span>
            <small style={{ fontSize: "0.6em", color: "white" }}>
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
                  userData?.image
                    ? `http://127.0.0.1:8000/${userData?.image}`
                    : `../../dist/img/user1-128x128.jpg`
                }
                className="img-circle elevation-2 mt-1"
                alt="User Image"
              />
            </div>
            <div className="info">
              <Link
                to="/myprofile"
                className="d-block"
                style={{ textDecoration: "none" }}
              >
                Welcome!!
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
                            <p style={{ fontSize: "1em" }}>Alumnies</p>
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
                            <p style={{ fontSize: "1em" }}>Alumnies</p>
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
                        {/* <li className="nav-item">
                          <Link to="/your_posts" className="nav-link">
                            <i
                              className="fas fa-newspaper mr-2"
                              style={{ fontSize: "1em" }}
                            />
                            <p style={{ fontSize: "1em" }}>Your Posts</p>
                          </Link>
                        </li> */}
                        <li className="nav-item">
                          <Link to="/add_alumni_post" className="nav-link">
                            <i
                              className="fas fa-plus mr-2"
                              style={{ fontSize: "1em" }}
                            />
                            <p style={{ fontSize: "1em" }}>Add Post</p>
                          </Link>
                        </li>
                      </div>
                    )}
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
                            <p style={{ fontSize: "1em" }}>Alumnies</p>
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
                        {/* <li className="nav-item">
                          <Link to="/your_posts" className="nav-link">
                            <i
                              className="fas fa-newspaper mr-2"
                              style={{ fontSize: "1em" }}
                            />
                            <p style={{ fontSize: "1em" }}>Your Posts</p>
                          </Link>
                        </li> */}
                        <li className="nav-item">
                          <Link to="/add_hod_post" className="nav-link">
                            <i
                              className="fas fa-plus mr-2"
                              style={{ fontSize: "1em" }}
                            />
                            <p style={{ fontSize: "1em" }}>Add Post</p>
                          </Link>
                        </li>
                      </div>
                    )}
                  </li>

                  <li className="nav-item">
                    <Link to="/requests" className="nav-link">
                      <p style={{ fontSize: "1em" }}>
                        <i
                          className="fas fa-user-plus nav-icon"
                          style={{ fontSize: "1em" }}
                          title="Request to Join"
                        ></i>
                        Join Requests
                        {numberOfInactiveAlumni ? ( <span
                          className="left badge badge-danger "
                          style={{
                            fontSize: "0.6em",
                            position: "relative",
                            bottom: "1em",
                            left: "0.5em",
                          }}
                        >
                          
                          {numberOfInactiveAlumni}
                        </span>) : null}
                       
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="http://127.0.0.1:8000/admin/"
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
                </>
              )}

              {/* <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon fas fa-copy" />
            <p>
              Layout Options
              <i className="fas fa-angle-left right" />
              <span className="badge badge-info right">6</span>
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <a href="pages/layout/top-nav.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Top Navigation</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/layout/top-nav-sidebar.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Top Navigation + Sidebar</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/layout/boxed.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Boxed</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/layout/fixed-sidebar.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Fixed Sidebar</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/layout/fixed-sidebar-custom.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Fixed Sidebar <small>+ Custom Area</small></p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/layout/fixed-topnav.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Fixed Navbar</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/layout/fixed-footer.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Fixed Footer</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/layout/collapsed-sidebar.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Collapsed Sidebar</p>
              </a>
            </li>
          </ul>
        </li> */}
              {/* <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon fas fa-chart-pie" />
            <p>
              Charts
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <a href="pages/charts/chartjs.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>ChartJS</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/charts/flot.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Flot</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/charts/inline.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Inline</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/charts/uplot.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>uPlot</p>
              </a>
            </li>
          </ul>
        </li> */}
              {/* <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon fas fa-tree" />
            <p>
              UI Elements
              <i className="fas fa-angle-left right" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <a href="pages/UI/general.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>General</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/UI/icons.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Icons</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/UI/buttons.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Buttons</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/UI/sliders.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Sliders</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/UI/modals.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Modals &amp; Alerts</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/UI/navbar.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Navbar &amp; Tabs</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/UI/timeline.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Timeline</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/UI/ribbons.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Ribbons</p>
              </a>
            </li>
          </ul>
        </li> */}
              {/* <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon fas fa-edit" />
            <p>
              Forms
              <i className="fas fa-angle-left right" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <a href="pages/forms/general.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>General Elements</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/forms/advanced.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Advanced Elements</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/forms/editors.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Editors</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/forms/validation.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Validation</p>
              </a>
            </li>
          </ul>
        </li> */}
              {/* <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon fas fa-table" />
            <p>
              Tables
              <i className="fas fa-angle-left right" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <a href="pages/tables/simple.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Simple Tables</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/tables/data.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>DataTables</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/tables/jsgrid.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>jsGrid</p>
              </a>
            </li>
          </ul>
        </li> */}
              {/* <li className="nav-header">EXAMPLES</li>
        <li className="nav-item">
          <a href="pages/calendar.html" className="nav-link">
            <i className="nav-icon far fa-calendar-alt" />
            <p>
              Calendar
              <span className="badge badge-info right">2</span>
            </p>
          </a>
        </li> */}
              {/* <li className="nav-item">
          <a href="pages/gallery.html" className="nav-link">
            <i className="nav-icon far fa-image" />
            <p>
              Gallery
            </p>
          </a>
        </li> */}
              {/* <li className="nav-item">
          <a href="pages/kanban.html" className="nav-link">
            <i className="nav-icon fas fa-columns" />
            <p>
              Kanban Board
            </p>
          </a>
        </li> */}
              {/* <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon far fa-envelope" />
            <p>
              Mailbox
              <i className="fas fa-angle-left right" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <a href="pages/mailbox/mailbox.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Inbox</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/mailbox/compose.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Compose</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/mailbox/read-mail.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Read</p>
              </a>
            </li>
          </ul>
        </li> */}
              {/* <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon fas fa-book" />
            <p>
              Pages
              <i className="fas fa-angle-left right" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <a href="pages/examples/invoice.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Invoice</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/profile.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Profile</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/e-commerce.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>E-commerce</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/projects.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Projects</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/project-add.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Project Add</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/project-edit.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Project Edit</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/project-detail.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Project Detail</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/contacts.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Contacts</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/faq.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>FAQ</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/contact-us.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Contact us</p>
              </a>
            </li>
          </ul>
        </li> */}
              {/* <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon far fa-plus-square" />
            <p>
              Extras
              <i className="fas fa-angle-left right" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>
                  Login &amp; Register v1
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="pages/examples/login.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Login v1</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/register.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Register v1</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/forgot-password.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Forgot Password v1</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/recover-password.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Recover Password v1</p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>
                  Login &amp; Register v2
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="pages/examples/login-v2.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Login v2</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/register-v2.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Register v2</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/forgot-password-v2.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Forgot Password v2</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/examples/recover-password-v2.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Recover Password v2</p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="pages/examples/lockscreen.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Lockscreen</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/legacy-user-menu.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Legacy User Menu</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/language-menu.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Language Menu</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/404.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Error 404</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/500.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Error 500</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/pace.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Pace</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/examples/blank.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Blank Page</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="starter.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Starter Page</p>
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon fas fa-search" />
            <p>
              Search
              <i className="fas fa-angle-left right" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <a href="pages/search/simple.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Simple Search</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="pages/search/enhanced.html" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Enhanced</p>
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-header">MISCELLANEOUS</li>
        <li className="nav-item">
          <a href="iframe.html" className="nav-link">
            <i className="nav-icon fas fa-ellipsis-h" />
            <p>Tabbed IFrame Plugin</p>
          </a>
        </li>
        <li className="nav-item">
          <a href="https://adminlte.io/docs/3.1/" className="nav-link">
            <i className="nav-icon fas fa-file" />
            <p>Documentation</p>
          </a>
        </li>
        <li className="nav-header">MULTI LEVEL EXAMPLE</li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="fas fa-circle nav-icon" />
            <p>Level 1</p>
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon fas fa-circle" />
            <p>
              Level 1
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Level 2</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>
                  Level 2
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="far fa-dot-circle nav-icon" />
                    <p>Level 3</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="far fa-dot-circle nav-icon" />
                    <p>Level 3</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="far fa-dot-circle nav-icon" />
                    <p>Level 3</p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Level 2</p>
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="fas fa-circle nav-icon" />
            <p>Level 1</p>
          </a>
        </li>
        <li className="nav-header">LABELS</li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon far fa-circle text-danger" />
            <p className="text">Important</p>
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon far fa-circle text-warning" />
            <p>Warning</p>
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="nav-icon far fa-circle text-info" />
            <p>Informational</p>
          </a>
        </li> */}
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
};

export default SideNav;
