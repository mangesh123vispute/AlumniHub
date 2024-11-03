import React, { useContext, useEffect, useRef, useState } from "react";
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
     {/* Static Header (only visible on medium screens and up) */}
<div id="dontMov" className="bg-white text-black hidden md:flex justify-between py-2 text-center text-[1.1rem] z-10 relative">
  <img src="https://www.sscoetjalgaon.ac.in/public/images/logo/logo.jpg" className="w-[40%] h-[8vh]" />
  <div className="flex w-full h-[100%] justify-evenly">
    <div className="card-1 flex gap-2">
      <div className="img-part">
        <i className="fa fa-phone-square text-[3rem] text-yellow-500 sm-display-block"></i>
      </div>
      <div className="written-part mt-2">
        <h3 className="text-[1rem] text-black">Call us today!</h3>
        <h3 className="text-[0.9rem] text-black">0257-225 8393/94/95</h3>
      </div>
    </div>
    <div className="card-2 flex gap-2">
      <div className="img-part">
        <i className="fa fa-phone-square text-[3rem] text-yellow-500 sm-display-block"></i>
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
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
    <div className="flex items-center -ml-[5vh] space-x-2">
      <Link to="/" className="text-lg md:text-2xl font-bold hover:text-red-800">
        Alumni Hub |
      </Link>
      <span className="text-red-800 text-lg">SSBT COET</span>
    </div>
    <div className="hidden md:flex space-x-6">
      <HashLink to="/#home" className="text-white text-[1.2rem] px-2 py-1 rounded-[15px] hover:bg-red-800">
        Home
      </HashLink>
      <HashLink to="#about" className="text-white text-[1.2rem] px-2 py-1 rounded-[15px] hover:bg-red-800">
        About
      </HashLink>
      <HashLink to="#team" className="text-white text-[1.2rem] px-2 py-1 rounded-[15px] hover:bg-red-800">
        Team
      </HashLink>
      <HashLink to="#contact" className="text-white text-[1.2rem] px-2 py-1 rounded-[15px] hover:bg-red-800">
        Contact
      </HashLink>
    </div>
    <div className="hidden md:flex space-x-2">
      {isLoggedin ? (
        <Link to="/home2" className="hover:bg-red-900 text-[1.2rem] text-white px-4 py-2 rounded-[15px]">
          Dashboard
        </Link>
      ) : (
        <Link to="/register" className="hover:bg-red-900 text-[1.2rem] text-white px-4 py-2 rounded-[15px]">
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
      <div id="home" className="relative w-full h-[90vh] sm:h-[60vh] md:h-[75vh] lg:h-[90vh]">
  <div
    className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
    style={{ backgroundImage: `url(${backgroundImages[bgIndex]})` }}
  ></div>
  {/* Prev Button */}
  <button
    onClick={prevSlide}
    className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 md:p-3"
  >
    &#10094;
  </button>
  {/* Next Button */}
  <button
    onClick={nextSlide}
    className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 md:p-3"
  >
    &#10095;
  </button>
  {/* Marquee Text */}
  <div className="absolute -bottom-[6vh] md:-bottom-[8vh] lg:-bottom-[9vh] z-10 w-full bg-yellow-500 py-2 md:py-3 text-center text-white">
    <div className="animate-marquee text-[0.9rem] md:text-[1rem] lg:text-[1.2rem] whitespace-nowrap">
      Welcome to Alumni Hub! Join us in celebrating achievements and connections.
    </div>
  </div>
</div>


     {/* About and Other Sections */}
<div className="mx-5 text-[1.2rem] -mt-3 flex justify-center items-center px-4">
  <section id="about" className="py-10 mt-5 md:py-20 px-4 sm:px-8 lg:px-16">
    <div className="container mx-auto max-w-screen-xl">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* Left Image Content */}
        <div className="lg:w-1/2 flex justify-center items-center">
          <img
            src="https://www.sscoetjalgaon.ac.in/public/images/home-page/undergraduate1.jpg"
            alt="About Us"
            className="rounded-xl shadow-lg w-full sm:w-3/4 lg:w-full object-cover max-h-[300px] sm:max-h-[400px] lg:max-h-[500px]"
          />
        </div>

        {/* Right Text Content */}
        <div className="lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-4 md:space-y-6">
          <h2 className="text-2xl md:text-3xl mx-auto mb-2 lg:text-4xl font-bold text-black">
            About Us
          </h2>
          <p className="text-[1rem] md:text-base text-gray-700 leading-relaxed">
            Welcome to AlumniHub! We connect students, alumni, and college staff to foster lasting relationships and opportunities. Students can reach out to alumni for career guidance, apply for internships, and access job openings. Alumni can mentor students and engage in college activities, while administrators manage alumni data and organize events. With easy-to-use features for networking, event planning, and secure donations, AlumniHub supports everyone’s journey from student to proud alumni. Join us in keeping the college community connected and thriving!
          </p>
        </div>
      </div>
    </div>
  </section>
</div>

{/* Our Inspiration Section */}
<div className="mx-5 text-[1.2rem] flex justify-center items-center px-4" id="inspiration">
  <AboutSection
    title="Our Inspiration"
    secondTitle="Hon. Sau. Pratibhatai Patil"
    desc="I am deeply committed to the cause of education and would like to see every person, man and woman, boy and girl, be touched by the light of modern education."
    imgSrc="https://www.sscoetjalgaon.ac.in/public/images/management/pratibhatai-patil.jpg"
  />
</div>

{/* Top Alumni Section */}
<div id="topalumini" className="mx-5">
  <TopAlumni />
</div>

{/* Team Section */}
<div className="mx-5 -mt-3" id="team">
  <TeamSection />
</div>

{/* Contact Section */}
<div id="contact" className="mx-5 -mt-3">
  <ContactSection />
</div>

{/* Footer Section */}
<div>
  <FooterSection />
</div>

    </div>
  );
}

export default Landing;
