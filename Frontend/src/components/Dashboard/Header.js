  /* eslint-disable jsx-a11y/anchor-is-valid */
  import React, { useContext } from "react";
  import { Link } from "react-router-dom";
  import AuthContext from "../../context/AuthContext.js";
  import Notification from "../Notification/Notification.js";


  const Header = () => {
    // console.log("i am user", useContext(AuthContext));
    let {
      user,
      logoutUser,
      isOpen,
      message,
      icon,
      title,
      handleClose,
      filter,
      setFilterClicked,
      isAllAdminPage,
      userData,
      toggleModal,
      toggleAddAdminModal,
      showNotification,
    } = useContext(AuthContext);
    return (
      <div className="wrapper">
        <Notification
          message={message}
          isOpen={isOpen}
          onClose={handleClose}
          icon={icon}
          title={title}
        />{" "}
        {/* Navbar */}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="pushmenu"
                href="#"
                role="button"
              >
                <i className="fas fa-bars" />
              </a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              {" "}
              <Link to="/home2" className="nav-link">
                Home
              </Link>
            </li>
            {user ? (
              <li className="nav-item d-none d-sm-inline-block">
                <a
                  onClick={logoutUser}
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </a>
              </li>
            ) : (
              <div>
                <li className="nav-item d-none d-sm-inline-block">
                  {" "}
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </div>
            )}
          </ul>
          {/* Right navbar links */}
          <ul className="navbar-nav ml-auto">
            {/* Messages Dropdown Menu */}
            {isAllAdminPage && userData.is_superuser && (
              <li className="nav-item ">
                <button
                  className="btn btn-sm btn-default mt-2"
                  type="button"
                  onClick={() => {
                   showNotification(
                     "By adding an admin, you are granting them full authority. Please proceed carefully.",
                     "info",
                     "Info"
                   );
                    toggleAddAdminModal();
                  }}
                >
                 <i class="fas fa-user-plus mr-1"></i> Add Admin
                </button>
              </li>
            )}

            {filter ? (
              <>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-widget="control-sidebar"
                    href="#"
                    role="button"
                    onClick={() => setFilterClicked(true)}
                  >
                    <i class="fas fa-filter  text-sm"></i>
                  </a>
                </li>
              </>
            ) : null}

            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="fullscreen"
                href="#"
                role="button"
              >
                <i className="fas fa-expand-arrows-alt" />
              </a>
            </li>
          </ul>
        </nav>
        {/* /.navbar */}
      </div>
    );
  };

  export default Header;
