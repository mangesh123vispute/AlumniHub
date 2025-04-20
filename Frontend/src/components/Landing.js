import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import AuthContext from "../context/AuthContext";
import AboutSection from "./AboutSection";
import TeamSection from "./TeamSection";
import ContactSection from "./ContactSection";
import FooterSection from "./FooterSection";
import TopAlumni from "./TopAlumni";
import { HashLink } from "react-router-hash-link";

gsap.registerPlugin(ScrollTrigger);

function Landing() {
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);
  const [navOpen, setNavOpen] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const [isLoggedin, setIsLoggedin] = useState(false);

  const backgroundImages = [
    "./sliderImg1.jpg",
    "./sliderImg2.jpg",
    "./sliderImg3.jpg",
    "./sliderImg4.jpg",
    "./sliderImg5.jpg",
  ];

  useEffect(() => {
    localStorage.getItem("authTokens") ? setIsLoggedin(true) : setIsLoggedin(false);
  }, []);

  const nextSlide = () => setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
  const prevSlide = () => setBgIndex((prevIndex) => (prevIndex - 1 + backgroundImages.length) % backgroundImages.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll-triggered animations
  useEffect(() => {
    gsap.from("#aboutImage", {
      scrollTrigger: "#aboutImage",
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
    gsap.from("#aboutText", {
      scrollTrigger: "#aboutText",
      x: 100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
    gsap.from("#topAlumniSection", {
      scrollTrigger: "#topAlumniSection",
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
    gsap.from("#contactSection", {
      scrollTrigger: "#contactSection",
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
    gsap.from("#footerSection", {
      scrollTrigger: "#footerSection",
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  return (
    <div className="bg-gradient-to-br from-white via-purple-50 to-purple-100 text-gray-800 scroll-smooth">
      {/* Navigation Bar */}
      <nav className="bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-purple-300 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center justify-start">
            <Link to="/" className="md:text-lg font-extrabold text-purple-900 hover:text-purple-500">
              AlumniX |
            </Link>
            <span className="text-purple-600 font-semibold sm:text-lg">SSBT COET</span>
          </div>

          <div className="hidden md:flex space-x-6">
            <HashLink to="/#home" className="hover:bg-purple-700 hover:text-white font-medium py-1 px-4 rounded-xl transition">
              Home
            </HashLink>
            <HashLink to="#about" className="hover:bg-purple-700 hover:text-white font-medium py-1 px-4 rounded-xl transition">
              About
            </HashLink>
            {/* <HashLink to="#team" className="hover:bg-purple-700 hover:text-white font-medium py-1 px-4 rounded-xl transition">
              Team
            </HashLink> */}
            <HashLink to="#contact" className="hover:bg-purple-700 hover:text-white font-medium py-1 px-4 rounded-xl transition">
              Contact
            </HashLink>
          </div>

          <div className="flex items-center justify-end">
            {isLoggedin ? (
              <Link to="/myprofile" className="bg-purple-600 text-white font-bold py-2 px-4 rounded-full hover:bg-purple-800 transition">
                Dashboard
              </Link>
            ) : (
              <Link to="/register" className="bg-purple-600 text-white font-bold py-2 px-4 rounded-full hover:bg-purple-800 transition">
                Register
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setNavOpen(!navOpen)} className="focus:outline-none">
              <svg className="w-6 h-6 text-purple-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={navOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {navOpen && (
          <div className="md:hidden bg-purple-700 text-white px-4 py-2 space-y-1">
            <HashLink to="/#home" onClick={() => setNavOpen(false)} className="block hover:bg-purple-600 rounded py-1 px-2">
              Home
            </HashLink>
            <HashLink to="#about" onClick={() => setNavOpen(false)} className="block hover:bg-purple-600 rounded py-1 px-2">
              About
            </HashLink>
            <HashLink to="#team" onClick={() => setNavOpen(false)} className="block hover:bg-purple-600 rounded py-1 px-2">
              Team
            </HashLink>
            <HashLink to="#contact" onClick={() => setNavOpen(false)} className="block hover:bg-purple-600 rounded py-1 px-2">
              Contact
            </HashLink>
            <Link to="/register" onClick={() => setNavOpen(false)} className="block hover:bg-purple-600 rounded py-1 px-2">
              Register
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div id="home" className="relative w-full h-[70vh] md:h-[85vh] lg:h-[95vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105" style={{ backgroundImage: `url(${backgroundImages[bgIndex]})` }}></div>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-extrabold drop-shadow-xl animate-fadeIn text-center px-4">
            Welcome to AlumniX
          </h1>
        </div>
        <button onClick={prevSlide} className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white bg-white/30 hover:bg-white/50 text-xl rounded-full p-3 transition">
          &#10094;
        </button>
        <button onClick={nextSlide} className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white bg-white/30 hover:bg-white/50 text-xl rounded-full p-3 transition">
          &#10095;
        </button>
      </div>

      {/* About Section */}
      <section id="about" className="py-16 px-4 text-center">
        <div className="container mx-auto max-w-screen-xl">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            <div className="lg:w-1/2" id="aboutImage">
              <img src="./about1.jpg" alt="About Us" className="rounded-xl shadow-2xl w-full max-h-[500px] object-cover" />
            </div>
            <div className="lg:w-1/2 text-center lg:text-left space-y-6" id="aboutText">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900">About Us</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Welcome to <span className="text-purple-700 font-semibold">AlumniX</span>! We connect students, alumni, and college staff to foster lasting relationships and opportunities.
                Students can reach out to alumni for career guidance, internships, and job openings. Alumni can mentor students and stay connected with events and updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Alumni */}
      <section id="topAlumniSection">
        <TopAlumni />
      </section>

      {/* Contact Section */}
      <section id="contactSection">
        <ContactSection />
      </section>

      {/* Footer */}
      <section id="footerSection">
        <FooterSection />
      </section>
    </div>
  );
}

export default Landing;
