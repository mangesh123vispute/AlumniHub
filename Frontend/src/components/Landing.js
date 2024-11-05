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
    "./sliderImg5.jpg"

  ];

  useEffect(() => {
    localStorage.getItem("authTokens") ? setIsLoggedin(true) : setIsLoggedin(false);
  }, []);

  const nextSlide = () => setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
  const prevSlide = () => setBgIndex((prevIndex) => (prevIndex - 1 + backgroundImages.length) % backgroundImages.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-gray-800">

      {/* Static Header */}
      <div id="dontMov" className="bg-white text-black hidden md:flex justify-between py-2 text-center text-[1.1rem] z-10 relative">
        <img src="https://www.sscoetjalgaon.ac.in/public/images/logo/logo.jpg" className="w-[40%] h-[8vh]" alt="Logo" />
        <div className="flex w-full justify-evenly">
          <div className="card-1 flex gap-2 items-center">
            <i className="fa fa-phone-square text-[3rem] text-yellow-500"></i>
            <div className="text-center">
              <h3 className="text-[1rem]">Call us today!</h3>
              <h3 className="text-[0.9rem]">0257-225 8393/94/95</h3>
            </div>
          </div>
          <div className="card-2 flex gap-2 items-center">
            <i className="fa fa-map-marker text-[3rem] text-yellow-500"></i>
            <div className="text-center">
              <h3 className="text-[1rem]">Address</h3>
              <h3 className="text-[0.9rem]">PO Box 94, Bambhori, Jalgaon(MS)</h3>
            </div>
          </div>
        </div>
      </div>

      <nav className="bg-yellow-500 border-b-2 border-red-700 text-white sticky top-0 z-50 shadow-lg w-full">
  <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
    {/* Left-aligned logo */}
    <div className="flex items-center justify-start">
      <Link to="/" className=" md:text-lg sm:text-lg font-bold hover:text-red-800">
        Alumni Hub |
      </Link>
      <span className="text-red-800  sm:text-lg">SSBT COET</span>
    </div>
    
    {/* Centered Links (hidden on smaller screens) */}
    <div className="hidden md:flex space-x-6">
      <HashLink to="/#home" className="hover:bg-red-800 text-white rounded-[15px] py-1 px-3">Home</HashLink>
      <HashLink to="#about" className="hover:bg-red-800 text-white rounded-[15px] py-1 px-3">About</HashLink>
      <HashLink to="#team" className="hover:bg-red-800 text-white rounded-[15px] py-1 px-3">Team</HashLink>
      <HashLink to="#contact" className="hover:bg-red-800 text-white rounded-[15px] py-1 px-3">Contact</HashLink>
    </div>

    {/* Right-aligned Register/Dashboard button */}
    <div className="flex items-center justify-end">
      {isLoggedin ? (
        <Link to="/myprofile" className="hover:bg-red-900 text-white py-2 px-4 rounded-[15px]">Dashboard</Link>
      ) : (
        <Link to="/register" className="hover:bg-red-900 text-white py-2 px-4 rounded-[15px]">Register</Link>
      )}
    </div>

    {/* Mobile menu button */}
    <div className="md:hidden flex items-center">
      <button onClick={() => setNavOpen(!navOpen)} className="focus:outline-none">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={navOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>
    </div>
  </div>

  {/* Mobile menu items */}
  {navOpen && (
    <div className="md:hidden bg-white text-black">
      <HashLink to="/#home" onClick={() => setNavOpen(false)} className="block hover:bg-red-800 text-white py-1 px-2">Home</HashLink>
      <HashLink to="#about" onClick={() => setNavOpen(false)} className="block hover:bg-red-800 text-white py-1 px-2">About</HashLink>
      <HashLink to="#team" onClick={() => setNavOpen(false)} className="block hover:bg-red-800 text-white py-1 px-2">Team</HashLink>
      <HashLink to="#contact" onClick={() => setNavOpen(false)} className="block hover:bg-red-800 text-white py-1 px-2">Contact</HashLink>
      <Link to="/register" onClick={() => setNavOpen(false)} className="block hover:bg-red-800 text-white py-1 px-2">Register</Link>
    </div>
  )}
</nav>

      {/* Carousel Section */}
      <div id="home" className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh]">
        <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000" style={{ backgroundImage: `url(${backgroundImages[bgIndex]})` }}></div>
        <button onClick={prevSlide} className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2">&#10094;</button>
        <button onClick={nextSlide} className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2">&#10095;</button>
      </div>
      {/* About and Other Sections */}
      <section id="about" className="py-10 px-4 text-center">
        <div className="container mx-auto max-w-screen-xl">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            <div className="lg:w-1/2 flex justify-center items-center">
              <img src="./about1.jpg" alt="About Us" className="rounded-xl shadow-lg w-full max-h-[500px] object-cover" />
            </div>
            <div className="lg:w-1/2 text-center relative   lg:text-left space-y-4">
              <h2 className="text-3xl font-bold mt-5 mb-2">About Us</h2>
              <i>
              <p className="text-base text-gray-700 leading-relaxed">Welcome to AlumniHub! We connect students, alumni, and college staff to foster lasting relationships and opportunities. Students can reach out to alumni for career guidance, apply for internships, and access job openings. Alumni can mentor students and engage in college activities, while administrators manage alumni data and organize events. With easy-to-use features for networking, event planning, and secure donations, AlumniHub supports everyone’s journey from student to proud alumni. Join us in keeping the college community connected and thriving!</p>
              </i>
            </div>
          </div>
        </div>
      </section>
      {/* Our Inspiration Section */}
      <div id="inspirati on" className="py-10 text-center">
        <AboutSection
          title="Our Inspiration"
          secondTitle="Hon. Sau. Pratibhatai Patil"
          desc="I am deeply committed to the cause of education and would like to see every person..."
          imgUrl="./pratibhatai-patil.jpg"
          direction="left"
        />
      </div>

      {/* Additional Sections */}
      <TopAlumni />
      <TeamSection />      
      <ContactSection />
      <FooterSection />
    </div>
  );
}

export default Landing;
