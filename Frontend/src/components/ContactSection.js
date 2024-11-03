import React from "react";

const ContactSection = () => {
  return (
    <section id="contact" className="contact py-12 px-5 md:py-16">
      {/* Section Title */}
      <div className="container mx-auto text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">Contact Us</h2>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center lg:justify-between">
          {/* Contact Info */}
          <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
            <h3 className="text-2xl text-gray-700 text-center lg:text-left mb-2">
              Welcome To <span className="text-yellow-500">SSBT's</span> College of Engineering & Technology
            </h3>
            <p className="text-gray-600 text-base text-center lg:text-left border-b-2 border-red-800 mb-6">
              EXCELLENCE IN EDUCATION
            </p>
            
            <div className="flex flex-wrap -mx-4">
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
                <div key={index} className="w-full sm:w-1/2 px-4 mb-6">
                  <div className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center">
                    <i className={`${info.icon} text-3xl md:text-4xl text-indigo-600 mb-2 md:mb-4`}></i>
                    <h3 className="text-lg font-semibold text-gray-700">{info.title}</h3>
                    <p className="text-gray-600 text-sm">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-5/12 px-4">
            <form className="bg-yellow-500 p-6 md:p-8 rounded-lg shadow-md">
              <h3 className="text-2xl mb-3 text-center">Request a <span className="text-red-800">Callback</span></h3>
              <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/2 px-4 mb-4">
                  <input
                    type="text"
                    name="name"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="w-full md:w-1/2 px-4 mb-4">
                  <input
                    type="email"
                    name="email"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div className="w-full px-4 mb-4">
                  <input
                    type="text"
                    name="subject"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    placeholder="Subject"
                    required
                  />
                </div>
                <div className="w-full px-4 mb-4">
                  <textarea
                    name="message"
                    rows="5"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    placeholder="Message"
                    required
                  ></textarea>
                </div>
                <div className="w-full px-4 text-center">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-red-900 text-white font-semibold rounded hover:bg-red-700 focus:outline-none transition duration-200"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
