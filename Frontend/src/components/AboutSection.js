import React from 'react';

const AboutSection = ({title,desc,imgSrc,secondTitle}) => {
  return (
    <section id="about" className="about  py-16 md:py-28 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Text Content */}
          <div className="lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
            <div className="content px-4">
              <h3 className="text-xl font-semibold text-red-900">{title}</h3>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-4 md:mt-6 text-black">
              {secondTitle}
              </h2>
              <p className="mt-4 text-gray-700 leading-relaxed">
               {desc}
              </p>

            </div>
          </div>

          {/* Right Image Content */}
          <div className="lg:w-1/2 flex justify-center items-center">
            <img
              src={imgSrc}
              alt="About Us"
              className="rounded-lg shadow-lg w-full md:w-3/4 lg:w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
