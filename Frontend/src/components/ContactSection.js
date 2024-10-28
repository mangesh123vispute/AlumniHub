import React from "react";

const ContactSection = () => {
  return (
    <section id="contact" className="contact py-16 bg-gray-100">
      {/* Section Title */}
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-600 mb-2">Contact</h2>
        <p className="text-gray-600">Contact Us</p>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full sm:w-1/2 px-4 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <i className="bi bi-geo-alt text-4xl text-indigo-600 mb-4"></i>
                  <h3 className="text-lg font-semibold text-gray-700">Address</h3>
                  <p className="text-gray-600">A108 Adam Street</p>
                  <p className="text-gray-600">New York, NY 535022</p>
                </div>
              </div>

              <div className="w-full sm:w-1/2 px-4 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <i className="bi bi-telephone text-4xl text-indigo-600 mb-4"></i>
                  <h3 className="text-lg font-semibold text-gray-700">Call Us</h3>
                  <p className="text-gray-600">+1 5589 55488 55</p>
                  <p className="text-gray-600">+1 6678 254445 41</p>
                </div>
              </div>

              <div className="w-full sm:w-1/2 px-4 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <i className="bi bi-envelope text-4xl text-indigo-600 mb-4"></i>
                  <h3 className="text-lg font-semibold text-gray-700">Email Us</h3>
                  <p className="text-gray-600">info@example.com</p>
                  <p className="text-gray-600">contact@example.com</p>
                </div>
              </div>

              <div className="w-full sm:w-1/2 px-4 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <i className="bi bi-clock text-4xl text-indigo-600 mb-4"></i>
                  <h3 className="text-lg font-semibold text-gray-700">Open Hours</h3>
                  <p className="text-gray-600">Monday - Friday</p>
                  <p className="text-gray-600">9:00AM - 05:00PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 px-4">
            <form className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/2 px-4 mb-4">
                  <input
                    type="text"
                    name="name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div className="w-full md:w-1/2 px-4 mb-4">
                  <input
                    type="email"
                    name="email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    placeholder="Your Email"
                    required
                  />
                </div>

                <div className="w-full px-4 mb-4">
                  <input
                    type="text"
                    name="subject"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    placeholder="Subject"
                    required
                  />
                </div>

                <div className="w-full px-4 mb-4">
                  <textarea
                    name="message"
                    rows="6"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    placeholder="Message"
                    required
                  ></textarea>
                </div>

                <div className="w-full px-4 text-center">
                  <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 transition duration-200"
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
