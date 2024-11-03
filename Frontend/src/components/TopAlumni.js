import React, { useRef, useEffect } from 'react';
import AlumniCard from './AlumniCard';

const TopAlumni = () => {
  const alumniData = [
    {
      name: "Pragya Pratik",
      text1: "Care Program Manager",
      text2:" at Nokia Networks",
      img: "https://www.sscoetjalgaon.ac.in/public/images/top-alumni/team7.jpg",
      linkedIn: "https://www.linkedin.com/in/pragya-pratik-a6379816/",
      facebook: "#",
    },
    {
      name: "Sharad V. Pawar",
      text1: "Field Officer at",
      text2:" Maharashtra Pollution Control Board, Thane",
      img: "https://www.sscoetjalgaon.ac.in/public/images/top-alumni/team8.jpg",
      linkedIn: ".",
      facebook: "#",
    },
    {
      name: "Ameya Shirwadkar",
      text1: "Energy Analyst at",
      text2:" LCG Consulting, California (U.S.A.)",
      img: "https://www.sscoetjalgaon.ac.in/public/images/top-alumni/team9.jpg",
      linkedIn: ".",
      facebook: "#",
    },
    {
      name: "Rohan Patil",
      text1: "Data Scientist at",
      text2:" GE Healthcare, Bengaluru",
      img: "https://www.sscoetjalgaon.ac.in/public/images/top-alumni/team8.JPG",
      linkedIn: ".",
      facebook: "#",
    },
    {
      name: "Nitin Ingale",
      text1: "Assistant Commandant/ ",
      text2:"DySP (CRPF)",
      img: "https://www.sscoetjalgaon.ac.in/public/images/top-alumni/team9.jpeg",
      linkedIn: ".",
      facebook: "#",
    },
    {
      name: "Shitalkumar V. Dagade",
      text1: "Co-founder & COO of Samyak Software ",
      text2:"& Esamyak Software Pvt Ltd, Mumbai",
      img: "https://www.sscoetjalgaon.ac.in/public/images/top-alumni/team5.jpg",
      linkedIn: "https://www.linkedin.com/in/shitalkumar-dagade-4b0bba21",
      facebook: "#",
    },
    {
      name: "Aditya Baraskar",
      text1: "Director and Co-Founder of Entropy",
      text2:" Research and Development Pvt Ltd India",
      img: "https://www.sscoetjalgaon.ac.in/public/images/top-alumni/team6.jpg",
      linkedIn: "https://www.linkedin.com/in/aditya-baraskar-aba738173/",
      facebook: "#",
    },
  ];

  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    let scrollAmount = 0;

    const startScrolling = () => {
      scrollAmount += 0.5; // Reduced speed for smoother scroll
      carousel.scrollLeft = scrollAmount;

      if (scrollAmount >= carousel.scrollWidth / 2) {
        scrollAmount = 0; // Reset scroll for infinite effect
      }

      requestAnimationFrame(startScrolling);
    };

    startScrolling();
  }, []);

  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black text-center mb-6 md:mb-10">
          Our Top <span className="text-black"> Alumni</span>
        </h2>
        <div
          ref={carouselRef}
          className="flex overflow-hidden whitespace-nowrap space-x-4 md:space-x-6 lg:space-x-8"
        >
          {[...alumniData, ...alumniData].map((alumni, index) => (
            <div key={index} className="flex-shrink-0 w-48 sm:w-56 md:w-64 lg:w-72 mx-2">
              <AlumniCard
                name={alumni.name}
                text1={alumni.text1}
                text2={alumni.text2}
                img={alumni.img}
                linkedIn={alumni.linkedIn}
                facebook={alumni.facebook}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopAlumni;
