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
    "url('https://www.sscoetjalgaon.ac.in/public/images/slider/snap105.jpg')",
    "url('https://www.sscoetjalgaon.ac.in/public/images/slider/slide21.jpg')",
    "url('https://www.sscoetjalgaon.ac.in/public/images/slider/snap1041.jpg')"
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
      <nav className="bg-yellow-500 text-white w-full fixed top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <img src="/Logo.jfif" alt="Logo" className="w-12 h-18 rounded-3xl" /> {/* Logo */}
            <Link to="/" className="text-lg md:text-2xl font-bold">
              Alumni Hub
            </Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="/" className=" text-white px-2 py-1 rounded-2xl hover:bg-red-900">
              Home
            </a>
            <a href="#about" className="text-white px-2 py-1 rounded-2xl hover:bg-red-900">
              About
            </a>
            <a href="#team" className="text-white px-2 py-1 rounded-2xl hover:bg-red-900">
              Team
            </a>
            <a href="#contact" className="text-white px-2 py-1 rounded-2xl hover:bg-red-900">
              Contact
            </a>
          </div>
          <div className="hidden md:flex space-x-2">
            <Link
              to="/register"
              className="bg-red-900 text-white px-4 py-2 rounded "
            >
              Register / Login
            </Link>
           
          </div>
          <div className="md:hidden text-white">
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="focus:outline-none"
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
          <div className="md:hidden bg-white text-white">
            <a
              href="/"
              className="block px-2 py-1 rounded-3xl text-white hover:bg-red-900"
              onClick={() => setNavOpen(false)}
            >
              Home
            </a>
            <a
              href="#about"
              className="block px-2 py-1 rounded-3xl text-white hover:bg-red-900"
              onClick={() => setNavOpen(false)}
            >
              About
            </a>
            <a
              href="#team"
              className="block px-2 py-1 rounded-3xl text-white hover:bg-red-900"
              onClick={() => setNavOpen(false)}
            >
              Team
            </a>
            <a
              href="#contact"
              className="block px-2 py-1 rounded-3xl text-white hover:bg-red-900"
              onClick={() => setNavOpen(false)}
            >
              Contact
            </a>
            <div className="px-4 py-2 space-y-2">
              <button className="w-full bg-red-900  text-white px-4 py-2 rounded ">
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
    backgroundSize: window.innerWidth < 768 ? "cover" : "90%", // 'cover' for small screens
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
  }}
>
  <div ref={textDivRef} className="text-center space-y-2 px-4 sm:px-0">
    <h1 className="text-3xl md:text-4xl font-bold">Welcome To</h1>
    <h1 className="text-4xl md:text-5xl font-bold">
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

      <div
        
        ref={aboutSectionRef}
        className="w-full  flex justify-center items-center px-4"
      >
        <AboutSection title={"Our Inspiration"} secondTitle={"Hon. Sau. Pratibhatai Patil"} desc={"I am deeply committed to the cause of education and would like to see every person, man and woman, boy and girl, be touched by the light of modern education."} imgSrc={"https://www.sscoetjalgaon.ac.in/public/images/management/pratibhatai-patil.jpg"} />
      </div>

      {/* About Section */}
 

        <AboutSection title={"About Us"} desc={"Something"} imgSrc={"https://bootstrapmade.com/content/demo/FlexStart/assets/img/about.jpg"} />
  

      {/* Team Section */}
      <div
        id="team"
        ref={teamSectionRef}
        className="w-full min-h-screen bg-zinc-200 flex justify-center items-center px-4"
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
