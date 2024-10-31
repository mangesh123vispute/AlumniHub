import React from 'react';
import MemberCard from './MemberCard';

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Rohan Sapkale",
      title: "Chief Executive Officer",
      description: "Velit aut quia fugit et et. Dolorum ea voluptate vel tempore tenetur ipsa quae aut.",
      imgSrc: "assets/img/team/team-1.jpg",
    },
    {
      name: "Mangesh Vispute",
      title: "Chief Technology Officer",
      description: "Innovative leader with a passion for technology.",
      imgSrc: "https://media.licdn.com/dms/image/v2/D5603AQE3xC5TtB0Www/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1686927708950?e=1735776000&v=beta&t=-REeZmpWPSPs7egn9DtYAr-qNszs7LS3MQ2LmD6xiV8",
    },
    {
      name: "Unnati Patil",
      title: "Marketing Manager",
      description: "Expert in brand strategy and marketing.",
      imgSrc: "assets/img/team/team-3.jpg",
    },
    {
      name: "Aditya Patil",
      title: "Product Manager",
      description: "Driven product manager with a keen eye for detail.",
      imgSrc: "https://media.licdn.com/dms/image/v2/D5635AQG_oCecahCEkQ/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1727628393265?e=1730808000&v=beta&t=nCAK9jEJyr5jXQNaHpoW_aGp9uKy68Qwv5Lxs0-85m4",
    },
  ];

  return (
    <section id="team" className="team section py-12">
      {/* Section Title */}
      <div className="container mx-auto text-center mb-12 px-4" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-black">Our Team</h2>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Team Members */}
          {teamMembers.map((member, index) => (
            <MemberCard
              key={index}
              name={member.name}
              title={member.title}
              description={member.description}
              imgSrc={member.imgSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
