import React from 'react';
import MemberCard from './MemberCard';

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Rohan Sapkale",
      title:
        "Full Stack Developer | UI-UX | JavaScript | PHP | MySQL | ExpressJs | Web Security",
      description:
        "Passionate computer engineering graduate skilled in web development and data science, known for my proactive drive and recognized by mentors for delivering results. Eager to bring fresh ideas and energy to a forward-thinking tech team.",
      imgSrc: "/RohanPic.jpeg",
      github: "https://github.com/rohansapkale",
      linkDIN: "https://www.linkedin.com/in/rohan-sapkale-738a46264/",
      gmail: "sapkalerohan07@gmail.com",
    },
    {
      name: "Mangesh Vispute",
      title:
        " Team Leader | Python | Django | DRF | Full Stack Developer | and Passionate Problem Solver",
      description:
        "🚀 Team Leader & Experienced Full Stack Developer skilled in Python, Django, React, and JavaScript, dedicated to creating seamless, innovative web solutions with strong problem-solving abilities.",
      imgSrc: "/MangeshPic.jfif",
      github: "https://github.com/mangesh123vispute",
      linkDIN: "https://www.linkedin.com/in/mangesh-vispute-020532232/",
      gmail: "mangesh2003vispute@gmail.com",
    },
    {
      name: "Unnati Patil",
      title: "Full Stack developer | React.js | JS | Passionate Problem Solver",
      description:
        "Frontend Developer passionate about creating dynamic user interfaces with React.js and JavaScript, bringing strong problem-solving skills and a commitment to delivering exceptional user experiences.",
      imgSrc: "/womenImg.webp",
      github: "https://github.com/unnatipatil9112003",
      linkDIN:
        "https://www.linkedin.com/in/unnati-patil-50698b24a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      gmail: "unnatipatil911@gmail.com",
    },
    {
      name: "Aditya Patil",
      title:
        "Full-Stack Developer | React js | Node js | Next js | MERN stack | DSA ",
      description:
        "Computer Engineering student passionate about full-stack web development and frontend development, with hands-on experience in the MERN stack and React, strong DSA skills, and a track record of improving user engagement and backend performance.",
      imgSrc: "/Aditya.jpeg",
      github: "https://github.com/Adityapatil1203",
      linkDIN: "https://www.linkedin.com/in/aditya-patil-b7b435258/",
      gmail: "adityapatil9226@gmail.com",
    },
  ];

  return (
    <section id="team" className="team section py-12 bg-gray-100">
      {/* Section Title */}
      <div
        className="container mx-auto text-center mb-12 px-4"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold text-red-900 ">Our Team</h2>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Team Members */}
          {teamMembers.map((member, index) => (
            <MemberCard
              key={index}
              name={member.name}
              title={member.title}
              description={member.description}
              imgSrc={member.imgSrc}
              linkDIN={member.linkDIN}
              github={member.github}
              gmail={member.gmail}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
