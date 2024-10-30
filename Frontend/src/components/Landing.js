import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import AuthContext from "../context/AuthContext";
import AboutSection from "./AboutSection";
import TeamSection from "./TeamSection";
import ContactSection from "./ContactSection";
import FooterSection from "./FooterSection";
gsap.registerPlugin(ScrollTrigger);

function Landing() {
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);
  const textDivRef = useRef(null);
  const bgDivRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const teamSectionRef = useRef(null);
  const h3Ref = useRef(null);
  const [navOpen, setNavOpen] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  const backgroundImages = [
    "url('https://media.istockphoto.com/id/1371896330/photo/happy-asian-woman-in-his-graduation-day.jpg?s=612x612&w=0&k=20&c=Ur3moWl1fKFms-6UACseglMjoYAynYKzsanZpgK8lFk=')",
    "url('https://media.istockphoto.com/id/483479827/photo/indian-college-students-preparing-for-examination.jpg?s=612x612&w=0&k=20&c=XM_-nmmikh4I6MYioUCGaCTK2cjYNYvzsApD1VrR85k=')",
    "url('https://media.istockphoto.com/id/1138138146/photo/rear-view-of-large-group-of-students-on-a-class-at-lecture-hall.jpg?s=612x612&w=0&k=20&c=x2DlCU-1Acw5YwEBfo82QyeL1zvbg57smQ935mp6gv8=')"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      textDivRef.current,
      { y: 150, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.6, ease: "power4.out" }
    );

    tl.fromTo(
      h3Ref.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
      "-=0.8"
    );

    tl.fromTo(
      bgDivRef.current,
      { y: "100%", opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" },
      "-=0.6"
    );

    return () => tl.kill();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      aboutSectionRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      teamSectionRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: teamSectionRef.current,
          start: "top 50%",
          end: "bottom 25%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div>
      <nav className="bg-white text-black w-full fixed top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="w-8 h-8" /> {/* Logo */}
            <Link to="/" className="text-lg md:text-2xl font-bold">
              Alumni Hub
            </Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="/" className="hover:text-blue-700">
              Home
            </a>
            <a href="#about" className="hover:text-blue-700">
              About
            </a>
            <a href="#team" className="hover:text-blue-700">
              Team
            </a>
            <a href="#contact" className="hover:text-blue-700">
              Contact
            </a>
          </div>
          <div className="hidden md:flex space-x-2">
            <Link
              to="/register"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Register / Login
            </Link>
           
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="text-black focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    navOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
        {navOpen && (
          <div className="md:hidden bg-white">
            <a
              href="/"
              className="block px-4 py-2 text-black hover:bg-blue-100"
              onClick={() => setNavOpen(false)}
            >
              Home
            </a>
            <a
              href="#about"
              className="block px-4 py-2 text-black hover:bg-blue-100"
              onClick={() => setNavOpen(false)}
            >
              About
            </a>
            <a
              href="#team"
              className="block px-4 py-2 text-black hover:bg-blue-100"
              onClick={() => setNavOpen(false)}
            >
              Team
            </a>
            <a
              href="#contact"
              className="block px-4 py-2 text-black hover:bg-blue-100"
              onClick={() => setNavOpen(false)}
            >
              Contact
            </a>
            <div className="px-4 py-2 space-y-2">
              <button className="w-full  bg-blue-500 text-white px-4 py-2 rounde hover:bg-blue-600 transition">
                Register
              </button>
            </div>
          </div>
        )}
      </nav>

      <div
        className="w-full h-screen flex justify-center items-center pt-16 transition-opacity duration-1000"
        style={{
          backgroundImage: backgroundImages[bgIndex],
          backgroundSize: "80%", // Make the image width less
          backgroundPosition: "center", // Center the image horizontally
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div ref={textDivRef} className="text-center space-y-2 px-4 sm:px-0">
          <h1 className="text-3xl md:text-4xl font-bold">Welcome To</h1>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-500">
            Alumni Hub
          </h1>
          <h3
            ref={h3Ref}
            className="text-center text-sm md:text-base font-semibold mt-2"
          >
            Here Meets Future Hands
          </h3>
        </div>
      </div>

      {/* About Section */}
      <div
        id="about"
        ref={aboutSectionRef}
        className="w-full min-h-screen flex justify-center items-center px-4"
      >
        <AboutSection />
      </div>

      {/* Team Section */}
      <div
        id="team"
        ref={teamSectionRef}
        className="w-full min-h-screen flex justify-center items-center px-4"
      >
        <TeamSection />
      </div>

      {/* Contact Section */}
      <div
        id="contact"
        className="w-full min-h-screen flex justify-center items-center px-4"
      >
        <ContactSection />
      </div>
      <FooterSection />
    </div>
  );
}

export default Landing;
