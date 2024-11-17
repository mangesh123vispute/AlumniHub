import React from "react";

const ContactSection = () => {
  return (
    <section className="contact py-12 px-2 md:py-16">
      {/* Section Title */}
      <div className="container max-w-full mx-auto text-center mb-8 md:mb-12 px-2 md:px-5 lg:px-8">
        <div className="flex flex-wrap justify-center lg:justify-between">
          {/* Contact Info */}
          <div className="w-full lg:w-11/12 px-2 md:px-4 mb-8 lg:mb-0 mx-auto">
            <h3 className="text-[clamp(1.8rem, 3vw, 2.3rem)] font-bold text-gray-700 text-center lg:text-left mb-2">
              Welcome To <span className="text-yellow-500">SSBT's</span> College of Engineering & Technology
            </h3>
            <p className="text-gray-600 text-[clamp(0.8rem, 1.2vw, 1rem)] text-center lg:text-left border-b-2 border-red-800 mb-6">
              EXCELLENCE IN EDUCATION
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start">
              {/* Contact Details */}
              {[
                {
                  icon: "bi bi-geo-alt",
                  title: "24x7 Wifi Facility",
                  description: "We provide 24x7 High Speed WiFi facility in our campus."
                },
                {
                  icon: "bi bi-telephone",
                  title: "Sport Facilities",
                  description: "We provide various sports facilities for our students."
                },
                {
                  icon: "bi bi-envelope",
                  title: "Hostel Facility",
                  description: "We have well-equipped boys and girls hostels."
                },
                {
                  icon: "bi bi-clock",
                  title: "Best Teachers",
                  description: "We have expert and efficient staff of 150+ teachers."
                },
                {
                  icon: "bi bi-geo-alt",
                  title: "Medical Facility",
                  description: "We have on-campus medical facilities with visiting doctors."
                },
                {
                  icon: "bi bi-tree",
                  title: "Green Lush Campus",
                  description: "Our 23-acre campus offers green spaces with various amenities."
                },
              ].map((info, index) => (
                <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-6">
                  <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md text-center h-full">
                    <i className={`${info.icon} text-[clamp(1.5rem, 3.5vw, 2.5rem)] text-indigo-600 mb-4`}></i>
                    <h3 className="text-[clamp(1.2rem, 2.5vw, 1.6rem)] font-semibold text-gray-700">{info.title}</h3>
                    <p className="text-[clamp(0.75rem, 1vw, 0.9rem)] text-gray-600 mt-2">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
