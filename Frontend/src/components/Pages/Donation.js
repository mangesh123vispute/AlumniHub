import React from "react";
import { FaUsers, FaTrophy, FaUniversity } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import Home from "../Dashboard/Home"; // Import the Home layout

const donationSections = [
  {
    icon: <FaUsers className="text-3xl text-purple-600" />,
    title: "Associations",
    desc: "Support initiatives that foster alumni engagement, networking events, and mentorship programs for students.",
  },
  {
    icon: <MdGroups className="text-3xl text-purple-600" />,
    title: "Student Clubs",
    desc: "Contribute to various student-run clubs like the Debate Society, Robotics Club, and Cultural Arts Group to promote creativity.",
  },
  {
    icon: <FaUniversity className="text-3xl text-purple-600" />,
    title: "Academic Groups",
    desc: "Fund academic projects, research, workshops organized by departments, ensuring students get hands-on experience.",
  },
  {
    icon: <FaTrophy className="text-3xl text-purple-600" />,
    title: "Sports Department",
    desc: "Help our athletes achieve excellence by supporting facilities, equipment, and coaching for sports teams.",
  },
];

const DonationPageContent = () => {
  return (
    <div >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-purple-700">
          Support the Future of Our Community
        </h2>
        <p className="italic text-sm text-gray-600">
          Make a lasting impact by contributing to various initiatives.
        </p>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Your donations help strengthen our university’s legacy by supporting
          the association, student clubs, academic groups, and the sports
          department. Every contribution makes a difference in providing
          valuable resources, fostering student development, and enhancing
          campus life.
        </p>
        <hr className="mt-6 border-purple-200" />
      </div>

      {/* Donation Options */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {donationSections.map((section, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 p-6 rounded-xl text-center shadow-sm"
          >
            <div className="mb-3">{section.icon}</div>
            <h4 className="font-bold text-lg text-purple-700 mb-2">
              {section.title}
            </h4>
            <p className="text-sm text-gray-600">{section.desc}</p>
            <button className="mt-4 bg-purple-100 text-purple-700 font-semibold px-4 py-1 text-sm rounded hover:bg-purple-200 transition">
              Donate
            </button>
          </div>
        ))}
      </div>

      {/* Message Section */}
      <div className="bg-white rounded-xl p-6 shadow-md mb-10">
        <p className="text-sm text-gray-800 leading-relaxed">
          <strong>Dear Esteemed Alumni,</strong>
          <br />
          Your journey with our institution doesn’t end with graduation; in
          fact, it marks the beginning of a lifelong connection. By giving back
          to the place that helped shape your future, you strengthen the bond
          between past and present, while playing a pivotal role in creating
          opportunities for the next generation of students.
          <br />
          <br />
          Your contribution, no matter the size, can make a lasting impact.
          With your support, we can:
          <ul className="list-disc list-inside mt-3">
            <li>
              Build modern infrastructure such as advanced classrooms,
              state-of-the-art laboratories, and digital learning tools.
            </li>
            <li>
              Provide scholarships to outstanding students who excel
              academically and need financial assistance to pursue their
              dreams.
            </li>
            <li>
              Foster innovation by enhancing research activities and
              establishing platforms for new ideas and creativity, including an
              innovation and entrepreneurship hub.
            </li>
            <li>
              Develop a vibrant Science and Technology Park that drives
              groundbreaking projects and collaboration.
            </li>
            <li>
              Enhance sports facilities to nurture talent and promote physical
              well-being among our students.
            </li>
          </ul>
          <br />
          By contributing to these initiatives, you not only support the growth
          of the institution but also invest in the bright futures of students
          who will follow in your footsteps.
          <br />
          <br />
          We invite you to join us in this exciting journey of growth, and we
          thank you in advance for your generosity and support.
          <br />
          <br />
          Warm regards,
          <br />
          Alumni Relations Team
        </p>
      </div>

      {/* Bank Details */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Bank Details</h3>
        <div className="text-sm space-y-1 text-gray-700">
          <p>
            <strong>Bank Name</strong> : National Bank of Education
          </p>
          <p>
            <strong>Branch</strong> : Central Campus Branch
          </p>
          <p>
            <strong>Account Holder</strong> : Government Engineering College
            Alumni Association
          </p>
          <p>
            <strong>Account Number</strong> : 12345678901234
          </p>
          <p>
            <strong>IFSC Code</strong> : NBED0001234
          </p>
          <p>
            <strong>SWIFT Code</strong> : NBEDINBBXXX
          </p>
          <p>
            <strong>Bank Address</strong> : 123 University Avenue, City, State,
            456789
          </p>
        </div>

        <button className="mt-6 bg-purple-100 text-purple-700 font-semibold px-6 py-2 rounded hover:bg-purple-200 transition">
          Donate now
        </button>
      </div>
    </div>
  );
};


const DonationPage = () => (
    <Home
        DynamicContent={DonationPageContent}
        url="donation_page"
        heading="Donation Page"
    />
);

export default DonationPage;
