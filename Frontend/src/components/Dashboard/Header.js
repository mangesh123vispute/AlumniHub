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
          {/* Navbar Search */}
          {/* <li className="nav-item">
            <a
              className="nav-link"
              data-widget="navbar-search"
              href="#"
              role="button"
            >
              <i className="fas fa-search" />
            </a>
            <div className="navbar-search-block">
              <form className="form-inline">
                <div className="input-group input-group-sm">
                  <input
                    className="form-control form-control-navbar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-navbar" type="submit">
                      <i className="fas fa-search" />
                    </button>
                    <button
                      className="btn btn-navbar"
                      type="button"
                      data-widget="navbar-search"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li> */}
          {/* Messages Dropdown Menu */}
         
          {/* Notifications Dropdown Menu */}
          
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
