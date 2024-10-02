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
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "1.5em",
                }}
              >
                Welcome to the AlumniHub !!
              </p>
              <i style={{ fontSize: "1em" }}>
                Welcome to our platform!{" "}
                <span style={{ fontWeight: "bold" }}>
                  We bridge the gap between students, alumni, and college
                  administration,{" "}
                </span>
                offering an interactive experience centered on networking,
                career development, and alumni engagement. Thank you for being a
                part of this vibrant community!
              </i>
              <img
                src="./Home.jpg"
                className="d-block w-100"
                alt="alumni"
                style={{
                  height: "80vh",
                  borderRadius: "10px",
                  marginTop: "1em",
                }}
              />
              <div className="carousel-caption  d-md-block">
                <i>
                  Welcome to our platform! We connect students, alumni, and
                  college administration through an interactive experience,
                  focusing on networking, career development, and alumni
                  engagement. Thank you for joining us!
                </i>
              </div>
            </div>
            <div className="carousel-item">
              <p style={{ fontWeight: "bold", fontSize: "1.5em" }}>
                User: Students
              </p>
              <i style={{ fontSize: "1em" }}>
                Follow the guidelines below to{" "}
                <span style={{ fontWeight: "bold" }}>
                  accelerate your career growth and become a part of this
                  thriving network.{" "}
                </span>{" "}
                Take advantage of the opportunities to{" "}
                <span style={{ fontWeight: "bold" }}>
                  connect, learn, and succeed alongside your peers and mentors!
                </span>
              </i>
              <img
                src="./coding2.webp"
                className="d-block w-100"
                alt="..."
                style={{
                  height: "80vh",
                  borderRadius: "10px",
                  marginTop: "1em",
                }}
              />
              <div
                className="carousel-caption d-md-block "
                style={{ textAlign: "left" }}
              >
                <i>
                  1. Register as a student and join the community.
                  <br />
                  2. Update your profile with your resume and relevant details.
                  <br />
                  3. Connect with alumni on the alumni portal and explore career
                  opportunities.
                  <br />
                  <span style={{ fontWeight: "bold", color: "red" }}>
                    4. Reach out to alumni for referrals and guidance in your
                    career journey.
                  </span>
                  <br />
                  5. Seek mentorship from experienced alumni to help shape your
                  career path.
                </i>
              </div>
            </div>
            <div className="carousel-item">
              <p style={{ fontWeight: "bold", fontSize: "1.5em" }}>
                User: Alumnis
              </p>
              <i style={{ fontSize: "1em", marginTop: "0%" }}>
                {" "}
                We invite you to follow the guidelines below and connect with us
                <span style={{ fontWeight: "bold", marginLeft: "0.2em" }}>
                  to support your alma mater's juniors
                </span>{" "}
                . Your involvement can make a significant impact on their
                journey, and as a token of our appreciation,{" "}
                <span style={{ fontWeight: "bold" }}>
                  we are pleased to offer rewards for your contributions.
                </span>{" "}
                Join us in fostering a strong alumni network that empowers the
                next generation of students!
              </i>
              <img
                src="./alumni2.jpeg"
                className="d-block w-100"
                alt="..."
                style={{
                  height: "80vh",
                  borderRadius: "10px",
                  marginTop: "1em",
                }}
              />
              <div
                className="carousel-caption  d-md-block"
                style={{ textAlign: "left" }}
              >
                <i>
                  1.Register yourself as an alumnus.
                  <br />
                  2. Update your profile with your resume and relevant details
                  <br />
                  3. Connect with students through the student portal and review
                  their requests for referrals and guidance.
                  <br />
                  <span style={{ fontWeight: "bold", color: "red" }}>
                    4.Provide referrals if you come across any opportunities.
                  </span>
                  <br />
                  <span style={{ fontWeight: "bold", color: "red" }}>
                    5.Earn 5% from student first salary once they are
                    successfully placed.
                  </span>
                </i>
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
