import React from "react";

const AboutUs = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center mb-4">About AlumniHub</h1>
          <p className="lead">
            Welcome to AlumniHub, the comprehensive platform designed to foster
            engagement and collaboration between students, alumni, and the
            college administration. Our mission is to strengthen connections,
            promote career development, and facilitate meaningful interactions
            within the academic community.
          </p>
          <p>
            This user-friendly platform offers an interactive experience through
            both web and mobile applications, aiming to resolve key challenges
            such as maintaining accurate alumni records, supporting job
            placements, and tracking success stories. Whether you are a student,
            an alumnus, or a member of the college administration, AlumniHub
            provides tailored features to meet your needs.
          </p>
        </div>
      </div>

      <div className="row my-5">
        <div className="col-md-12">
          <h2>Key Features</h2>
          <h4>For College Administration (HOD/Principal):</h4>
          <ul>
            <li>
              Alumni Data Management: Add, remove, or manage alumni profiles
              with ease. Import data from Excel and other formats, and generate
              reports with insightful statistics.
            </li>
            <li>
              Event Management: Organize alumni events, reunions, and workshops
              to foster engagement.
            </li>
            <li>
              Donation Portal: Secure and streamlined donation mechanisms to
              support college projects.
            </li>
            <li>
              Communication Hub: Easily communicate with alumni and students via
              email and LinkedIn, and create user groups for targeted outreach.
            </li>
          </ul>

          <h4>For Students:</h4>
          <ul>
            <li>
              Networking & Career Development: Connect with alumni, post
              resumes, and apply for internships and job opportunities.
            </li>
            <li>
              Alumni Interaction: Request additional information from alumni to
              expand your professional network.
            </li>
            <li>
              Seamless Transition: Automatically become part of the alumni
              community upon graduation, ensuring continuous engagement.
            </li>
          </ul>

          <h4>For Alumni:</h4>
          <ul>
            <li>
              Incentivized Engagement: Earn financial rewards by helping
              students secure job placements.
            </li>
            <li>
              Mentorship & Networking: Offer guidance to students and explore
              job opportunities through the platform’s job portal.
            </li>
            <li>
              Success Story Tracking: Share your journey and inspire future
              generations by showcasing your achievements.
            </li>
          </ul>
        </div>
      </div>

      <div className="row my-5">
        <div className="col-md-12">
          <h2>Why Choose AlumniHub?</h2>
          <p>
            Our platform stands out with its seamless student-to-alumni
            transition, ensuring that students are automatically integrated into
            the alumni network upon graduation. We also offer an incentivized
            engagement model, where alumni receive rewards for referring
            students to job opportunities. With integrated communication tools,
            event management capabilities, and a strong focus on community
            building, AlumniHub is designed to enhance both personal and
            professional growth for all users.
          </p>
        </div>
      </div>

      <div className="row my-5">
        <div className="col-md-12">
          <h2>Contributing & Support</h2>
          <p>
            We welcome community contributions! Check our Contribution
            Guidelines to learn how you can be part of this journey. For any
            issues or questions, feel free to reach out at{" "}
            <a href="mailto:mangesh2003vispute@gmail.com">
              mangesh2003vispute@gmail.com
            </a>
            .
          </p>
          <p>
            Join us today and be a part of a thriving network that fosters
            growth, collaboration, and success!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
