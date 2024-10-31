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
import {HashLink} from "react-router-hash-link";
gsap.registerPlugin(ScrollTrigger);

function Landing() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);
  const textDivRef = useRef(null);
  const aboutSectionRef1 = useRef(null);
  const aboutSectionRef2 = useRef(null);
  const teamSectionRef = useRef(null);
  const h3Ref = useRef(null);
  const [navOpen, setNavOpen] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  const backgroundImages = [
    "url('https://www.sscoetjalgaon.ac.in/public/images/slider/snap105.jpg')",
    "url('https://www.sscoetjalgaon.ac.in/public/images/slider/slide21.jpg')",
    "url('https://www.sscoetjalgaon.ac.in/public/images/slider/snap1041.jpg')"
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 4000);
    localStorage.getItem("authTokens") ? setIsLoggedin(true) : setIsLoggedin(false);
    return () => clearInterval(interval);
  }, []);
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
    return () => tl.kill();
  }, []);

  useEffect(() => {
    const aboutSectionAnimation = (ref) => {
      gsap.fromTo(
        ref.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
          },
        }
      );
    };
   
    aboutSectionAnimation(aboutSectionRef1);
    aboutSectionAnimation(aboutSectionRef2);

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
      <nav className="bg-yellow-500 text-white w-full fixed top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <img src="/Logo.jfif" alt="Logo" className="w-10 h-10 -ml-8 rounded-full" />
            <Link to="/" className="text-[15vh] md:text-2xl font-bold hover:text-red-800">
              AlumniHub |
            </Link> <span className="text-[3vh] mt-1  text-red-800">SSBT COET</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <HashLink to="/#home" className="text-white px-3 py-1 rounded-[5vh] hover:bg-red-800">
              Home
            </HashLink>
            <HashLink to="#about" className="text-white px-3 py-1 rounded-[5vh] hover:bg-red-800">
              About
            </HashLink>
            <HashLink to="#team" className="text-white px-3 py-1 rounded-[5vh] hover:bg-red-800">
              Team
            </HashLink>
            <HashLink to="#contact" className="text-white px-3 py-1 rounded-[5vh] hover:bg-red-800">
              Contact
            </HashLink>
          </div>
          <div className="hidden md:flex">
          {isLoggedin ? (
              <Link
                to="/home2"
                className="hover:bg-red-900 rounded-[5vh] text-white px-4 py-2  "
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/register"
                className="bg-red-900 text-white px-4 py-2  "
              >
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

      {/* Image Section with Marquee */}
      <div id="home"
        className="w-full h-[90vh] flex justify-center items-center pt-16 relative transition-opacity duration-1000"
        style={{
          backgroundImage: backgroundImages[bgIndex],
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute -bottom-[9vh] z-10 w-full bg-yellow-500 py-3 text-center text-white">
          <div className="animate-marquee whitespace-nowrap">
            Welcome to Alumni Hub! Join us in celebrating achievements and connections.
          </div>
        </div>
      </div>
      
      <div ref={aboutSectionRef1} className="w-full flex justify-center items-center px-4">
        <AboutSection
          title="Our Inspiration"
          secondTitle="Hon. Sau. Pratibhatai Patil"
          desc="I am deeply committed to the cause of education and would like to see every person, man and woman, boy and girl, be touched by the light of modern education."
          imgSrc="https://www.sscoetjalgaon.ac.in/public/images/management/pratibhatai-patil.jpg"
        />
      </div>
      
      <div ref={aboutSectionRef2} className="w-full -mt-3 flex justify-center items-center px-4">
        <AboutSection 
          title="Our Objective"
          secondTitle="Our Vision"
          desc="To create an environment that nurtures the growth of our students in all dimensions, leading to their all-round development."
          imgSrc="https://www.sscoetjalgaon.ac.in/public/images/home-page/undergraduate1.jpg"
        />
      </div>
      <div id="topalumini">
      <TopAlumni/>
      </div>
      <div ref={teamSectionRef}>
        <TeamSection />
      </div>

      <ContactSection />
      <FooterSection />
    </div>
  );
}

export default Landing;
