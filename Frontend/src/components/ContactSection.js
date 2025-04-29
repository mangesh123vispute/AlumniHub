import React from "react";

const features = [
  {
    icon: "bi bi-wifi",
    title: "24x7 Wifi Facility",
    description: "We provide 24x7 High Speed WiFi facility in our campus.",
  },
  {
    icon: "bi bi-trophy",
    title: "Sport Facilities",
    description: "We provide various sports facilities for our students.",
  },
  {
    icon: "bi bi-house-door",
    title: "Hostel Facility",
    description: "We have well-equipped boys and girls hostels.",
  },
  {
    icon: "bi bi-people",
    title: "Best Teachers",
    description: "We have expert and efficient staff of 150+ teachers.",
  },
  {
    icon: "bi bi-heart-pulse",
    title: "Medical Facility",
    description: "We have on-campus medical facilities with visiting doctors.",
  },
  {
    icon: "bi bi-tree-fill",
    title: "Green Lush Campus",
    description: "Our 23-acre campus offers green spaces with various amenities.",
  },
];

const ContactSection = () => {
  return (
    <section className="contact py-16 px-4 bg-gradient-to-b from-white via-purple-50 to-purple-100">
      {/* Section Title */}
      <div className="max-w-7xl mx-auto text-center mb-14 px-4">
        <h3 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 animate-fadeIn">
          Welcome To <span className="text-purple-600">SSBT's</span> College of Engineering & Technology
        </h3>
        <p className="text-lg md:text-xl text-gray-600 font-medium border-b-4 border-purple-600 inline-block pb-2 animate-fadeIn">
          EXCELLENCE IN EDUCATION
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 md:px-8">
        {features.map((info, index) => (
          <div
            key={index}
            className="group bg-white bg-opacity-80 backdrop-blur-md rounded-3xl p-6 lg:p-8 shadow-2xl hover:shadow-purple-300 hover:scale-105 transform transition-all duration-300 ease-in-out border border-purple-100"
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-purple-600 text-5xl mb-4 transition-transform duration-300 group-hover:rotate-12">
                <i className={info.icon}></i>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">{info.title}</h4>
              <p className="text-gray-600 text-base">{info.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactSection;
