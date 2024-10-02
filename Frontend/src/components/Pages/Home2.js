import React, { useContext } from "react";
import Home from "../Dashboard/Home.js";
import AuthContext from "../../context/AuthContext.js";

const Home2Content = () => {
  let { userData } = useContext(AuthContext);
  return (
    <div>
      <section classname="content">
        
        <div id="carouselExampleCaptions" className="carousel slide">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={0}
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={1}
              aria-label="Slide 2"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={2}
              aria-label="Slide 3"
            />
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="./alumni2.jpeg"
                className="d-block w-100"
                alt="alumni"
                style={{ height: "80vh", borderRadius: "10px" }}
              />
              <div className="carousel-caption d-none d-md-block">
                <p style={{ fontWeight: "bold", fontSize: "2em" }}>Welcome to the AlumniHub</p>
                <p style={{ fontSize: "1.5em" }}>
                  Join our Alumni Network to connect with fellow graduates,
                  explore diverse posts, and discover valuable opportunities,
                  including jobs, mentorship, and engaging meetups. Elevate your
                  alumni experience today!
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="..." className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>
                  Some representative placeholder content for the second slide.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="./stu.jpg" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>
                  Some representative placeholder content for the third slide.
                </p>
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            {/* <span className="visually-hidden">Previous</span> */}
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            {/* <span className="visually-hidden">Next</span> */}
          </button>
        </div>
      </section>
    </div>
  );
};
const Home2 = () => {
  return <Home DynamicContent={Home2Content} url="home" heading="Home"/>;
};
export default Home2;
