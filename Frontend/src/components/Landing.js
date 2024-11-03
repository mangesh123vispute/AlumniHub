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
    "https://www.sscoetjalgaon.ac.in/public/images/slider/snap105.jpg",
    "https://www.sscoetjalgaon.ac.in/public/images/slider/slide21.jpg",
    "https://www.sscoetjalgaon.ac.in/public/images/slider/snap1041.jpg"
  ];

  useEffect(() => {
    localStorage.getItem("authTokens") ? setIsLoggedin(true) : setIsLoggedin(false);
  }, []);

  // Carousel effect with buttons and auto-slide every 3 seconds
  const nextSlide = () => setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
  const prevSlide = () => setBgIndex((prevIndex) => (prevIndex - 1 + backgroundImages.length) % backgroundImages.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Static Header (does not stick to the top) */}
      <div className="bg-white text-black flex justify-between mx-5 py-2 text-center text-[1rem] z-10 relative flex-wrap">
        <img src="https://www.sscoetjalgaon.ac.in/public/images/logo/logo.jpg" className="w-[40%] h-[8vh] md:w-[25%]" alt="Logo" />
        <div className="flex w-full justify-evenly flex-wrap">
          <div className="card-1 flex gap-2 items-center">
            <div className="img-part">
              <i className="fa fa-phone-square text-[2rem] text-yellow-500" />
            </div>
            <div className="written-part mt-2">
              <h3 className="text-[1rem] text-black">Call us today!</h3>
              <h3 className="text-[0.9rem] text-black">0257-225 8393/94/95</h3>
            </div>
          </div>
          <div className="card-2 flex gap-2 items-center">
            <div className="img-part">
              <i className="fa fa-map-marker text-[2rem] text-yellow-500" />
            </div>
            <div className="written-part mt-2">
              <h3 className="text-[1rem] text-black">Address!</h3>
              <h3 className="text-[0.9rem] text-black">PO Box 94, Bambhori, Jalgaon(MS)</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Navbar */}
      <nav className="bg-yellow-500 border-b-2 border-red-700 text-white w-full sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 flex-wrap">
          <div className="flex items-center space-x-2">
            <img src="/Logo.jfif" alt="Logo" className="w-10 h-10 rounded-full" />
            <Link to="/" className="text-lg md:text-2xl font-bold hover:text-red-800">
              Alumni Hub |
            </Link>
            <span className="text-red-800 text-lg">SSBT COET</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <HashLink to="/#home" className="text-white text-[1rem] md:text-[1.2rem] px-2 py-1 rounded-[15px] hover:bg-red-800">
              Home
            </HashLink>
            <HashLink to="#about" className="text-white text-[1rem] md:text-[1.2rem] px-2 py-1 rounded-[15px] hover:bg-red-800">
              About
            </HashLink>
            <HashLink to="#team" className="text-white text-[1rem] md:text-[1.2rem] px-2 py-1 rounded-[15px] hover:bg-red-800">
              Team
            </HashLink>
            <HashLink to="#contact" className="text-white text-[1rem] md:text-[1.2rem] px-2 py-1 rounded-[15px] hover:bg-red-800">
              Contact
            </HashLink>
          </div>
          <div className="hidden md:flex space-x-2">
            {isLoggedin ? (
              <Link to="/home2" className="hover:bg-red-900 text-[1rem] md:text-[1.2rem] text-white px-4 py-2 rounded-[15px]">
                Dashboard
              </Link>
            ) : (
              <Link to="/register" className="hover:bg-red-900 text-[1rem] md:text-[1.2rem] text-white px-4 py-2 rounded-[15px]">
                Register
              </Link>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={() => setNavOpen(!navOpen)} className="focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={navOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        {navOpen && (
          <div className="md:hidden bg-white text-black">
            <HashLink to="/#home" className="block px-2 py-1 hover:bg-red-800 text-white" onClick={() => setNavOpen(false)}>
              Home
            </HashLink>
            <HashLink to="#about" className="block px-2 py-1 hover:bg-red-800 text-white" onClick={() => setNavOpen(false)}>
              About
            </HashLink>
            <HashLink to="#team" className="block px-2 py-1 hover:bg-red-800 text-white" onClick={() => setNavOpen(false)}>
              Team
            </HashLink>
            <HashLink to="#contact" className="block px-2 py-1 hover:bg-red-800 text-white" onClick={() => setNavOpen(false)}>
              Contact
            </HashLink>
            <div className="px-4 py-2">
              <Link to="/register" className="w-full hover:bg-red-800 text-white px-4 py-2 rounded block text-center">
                Register
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Carousel Section */}
      <div id="home" className="relative w-full h-[90vh]">
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url(${backgroundImages[bgIndex]})` }}
        ></div>
        <button onClick={prevSlide} className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-3">
          &#10094;
        </button>
        <button onClick={nextSlide} className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-3">
          &#10095;
        </button>
        <div className="absolute -bottom-[9vh] z-10 w-full bg-yellow-500 py-3 text-center text-white">
          <div className="animate-marquee text-[1rem] md:text-[1.2rem] whitespace-nowrap">
            Welcome to Alumni Hub! Join us in celebrating achievements and connections.
          </div>
        </div>
      </div>

      {/* About and Other Sections */}
      <div className="mx-5 text-[1rem] md:text-[1.2rem] flex justify-center items-center flex-wrap mt-5">
        <AboutSection />
        <TeamSection />
        <ContactSection />
      </div>

      {/* Top Alumni Section */}
      <div id="team" className="py-10 bg-gray-100">
        <TopAlumni />
      </div>

      {/* Footer Section */}
      <FooterSection />
    </div>
  );
}

export default Landing;
