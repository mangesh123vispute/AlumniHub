import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="about section py-16 md:py-28 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Text Content */}
          <div className="lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
            <div className="content px-4">
              <h3 className="text-lg font-semibold text-blue-600">About Us</h3>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-4 md:mt-6 text-black">
                Expedita voluptas omnis cupiditate totam eveniet nobis sint iste.
              </h2>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Quisquam vel ut sint cum eos hic dolores aperiam. Sed deserunt et. Inventore et dolor consequatur itaque ut voluptate sed et. Magnam nam ipsum tenetur suscipit voluptatum nam et est corrupti.
              </p>
              <div className="mt-6 flex justify-center lg:justify-start">
                <a
                  href="#"
                  className="btn-read-more inline-flex items-center justify-center py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded transition duration-300"
                >
                  <span>Read More</span>
                  <i className="bi bi-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Right Image Content */}
          <div className="lg:w-1/2 flex justify-center items-center">
            <img
              src="https://bootstrapmade.com/content/demo/FlexStart/assets/img/about.jpg"
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
