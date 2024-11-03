import React from 'react';

const AboutSection = ({ title, desc, imgSrc, secondTitle }) => {
  return (
    <section id="about" className="py-10 md:py-20 px-4 sm:px-8 lg:px-16">
      <div className="container mx-auto max-w-screen-xl">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* Left Text Content */}
          <div className="lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-4 md:space-y-6">
            <h3 className="text-[2rem] mx-auto font-semibold text-red-900">
              {title}
            </h3>
            <h2 className="text-2xl mx-auto md:text-3xl lg:text-4xl font-bold text-black">
              {secondTitle}
            </h2>
            <p className="text-[1rem] md:text-base text-gray-700 leading-relaxed">
            <i>
            {desc}
            </i>
              
            </p>
          </div>

          {/* Right Image Content */}
          <div className="lg:w-1/2 flex justify-center items-center">
            <img
              src={imgSrc}
              alt="About Us"
              className="rounded-xl shadow-lg w-full sm:w-3/4 lg:w-full object-cover max-h-[400px] lg:max-h-[500px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
