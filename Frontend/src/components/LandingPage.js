import React, { useContext,useEffect } from "react";
import { NavLink } from "react-router-dom";
import home_background from "../Images/home_background.webp"; // Import the background image
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function  LandingPage() {
const navigate = useNavigate();
  const { userData } = useContext(AuthContext);

  return (
    <>
      <div
        className="bg-dark text-white"
        style={{
          position: "relative",
          minHeight: "100vh", // Set minimum height to fill the viewport
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="bg-image"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${home_background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(20%)", // Adjust the brightness value as needed
          }}
        ></div>

        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title> Alumni Hub </title>
        {/* <div
          style={{
            position: "absolute",
            top: "70px",
            left: "200px",
            fontSize: "2em",
          }}
        >
          <h1>
            Alumni <span style={{ color: "red" }}>Hub</span>{" "}
          </h1>
        </div> */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
        <div
          style={{
            position: "absolute",
            top: "50px",
            right: "100px",
            fontSize: "1.5em",
          }}
        >
          <NavLink
            to="/myprofile"
            className="text-white me-3 p-2 font-weight-bold"
            activeClassName="underline"
          >
            Go to DashBoard
          </NavLink>
        </div>

        <header>
          <div className="header-content" style={{ fontSize: "1.2em" }}>
            <h1>
              Alumni <span style={{ color: "red" }}>Hub</span>{" "}
            </h1>
            <p>Lets Connect ,Lets Grow</p>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <NavLink to="/login">
                <button
                  type="button"
                  class="btn btn-success btn-lg"
                  style={{
                    fontSize: "1.2em",
                    borderRadius: "10px",
                    border: "1px solid white",
                    
                  }}
                >
                  Login
                </button>
              </NavLink>
              <NavLink to="/register">
                <button
                  type="button"
                  class="btn btn-success btn-lg"
                  style={{
                    fontSize: "1.2em",
                    borderRadius: "10px",
                    border: "1px solid white",
                  }}
                >
                  Register
                </button>
              </NavLink>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default LandingPage;
