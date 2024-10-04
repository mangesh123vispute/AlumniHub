import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="wrapper" style={{ fontSize: "1vw", textAlign: "center"}}>
        <strong>
          © 2014-2021 <a href="/">AlumniHub</a>.
          <span style={{ color: "rgba(0, 255, 255, 0.7)",marginLeft: "1rem" }}>
            Building Connections for the Future.All rights reserved.
          </span>
        </strong>

       
        <div
          className="float-right d-none d-sm-inline-block"
          style={{ color: "rgba(0, 255, 255, 0.7)", marginRight: "1rem" }}
        >
          <a
            href="https://github.com/mangesh123vispute"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Version 1.0.0 | Mangesh Vispute
          </a>
        </div>
      </footer>
      {/* Control Sidebar */}
      <aside className="control-sidebar control-sidebar-dark">
        {/* Control sidebar content goes here */}
      </aside>
    </>
  );
};

export default Footer;
