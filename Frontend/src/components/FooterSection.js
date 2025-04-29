import React from 'react';

const FooterSection = () => {
  return (
    <footer id="contact" className="bg-gray-900 relative text-gray-300">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://www.sscoetjalgaon.ac.in/public/images/backgrounds/footer-section-background.png)",
          opacity: 0.1,
        }}
      ></div>
      <div className="container mx-auto relative z-10 px-6 md:px-12 py-10">
        <div className="border-b border-gray-700 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Details */}
            <div>
              <h4 className="font-semibold text-xl mb-4 text-purple-400 border-b-2 border-purple-500 pb-2">
                Contact Details
              </h4>
              <p className="text-sm leading-relaxed">
                If you have any doubt regarding our courses, admission, or
                anything else, feel free to contact us. We are ready to help
                you.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <i className="fa fa-building text-purple-400 mr-3"></i>
                  <a
                    className="hover:text-purple-400 transition"
                    href="#"
                  >
                    PO Box#94, Bambhori, Jalgaon (MS).
                  </a>
                </li>
                <li className="flex items-center">
                  <i className="fa fa-phone text-purple-400 mr-3"></i>
                  <a
                    className="hover:text-purple-400 transition"
                    href="#"
                  >
                    0257 225 8393/94/95
                  </a>
                </li>
                <li className="flex items-center">
                  <i className="fa fa-envelope text-purple-400 mr-3"></i>
                  <a
                    className="hover:text-purple-400 transition"
                    href="#"
                  >
                    sscoetjal@gmail.com
                  </a>
                </li>
                <li className="flex items-center">
                  <i className="fa fa-globe text-purple-400 mr-3"></i>
                  <a
                    className="hover:text-purple-400 transition"
                    href="https://www.sscoetjalgaon.ac.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.sscoetjalgaon.ac.in
                  </a>
                </li>
              </ul>
            </div>

            {/* Useful Links */}
            <div>
              <h4 className="font-semibold text-xl mb-4 text-purple-400 border-b-2 border-purple-500 pb-2">
                Useful Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    className="hover:text-purple-400 transition"
                    href="https://www.sscoetjalgaon.ac.in/aicte/"
                  >
                    AICTE
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-purple-400 transition"
                    href="https://www.sscoetjalgaon.ac.in/naac/"
                  >
                    NAAC
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-purple-400 transition"
                    href="https://www.sscoetjalgaon.ac.in/nirf/"
                  >
                    NIRF
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-purple-400 transition"
                    href="https://www.sscoetjalgaon.ac.in/approvals-from-statuatory-bodies/"
                  >
                    Approvals from Statutory Bodies
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-purple-400 transition"
                    href="https://www.sscoetjalgaon.ac.in/mandatory-disclosures/"
                  >
                    Mandatory Disclosures &amp; Shikshan Shulka Samiti Proposals
                  </a>
                </li>
              </ul>
            </div>

            {/* Mandatory Disclosures */}
            <div>
              <h4 className="font-semibold text-xl mb-4 text-purple-400 border-b-2 border-purple-500 pb-2">
                Mandatory Disclosures
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    className="hover:text-purple-400 transition"
                    href="https://www.sscoetjalgaon.ac.in/iqac/"
                  >
                    IQAC
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-purple-400 transition"
                    href="https://www.sscoetjalgaon.ac.in/aqar/"
                  >
                    AQAR
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-purple-400 transition"
                    href="https://www.sscoetjalgaon.ac.in/audit-reports/"
                  >
                    Audit Reports
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-purple-400 transition"
                    href="https://www.sscoetjalgaon.ac.in/eoa-reports/"
                  >
                    EOA Reports
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-purple-400 transition"
                    href="https://www.sscoetjalgaon.ac.in/fees-approval-proposals/"
                  >
                    Fees Approval Proposal
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-lg text-purple-400">Call Us Now</h5>
            <p className="text-lg">0257 225 8393/94/95</p>
          </div>
          <div className="text-right">
            <h5 className="font-semibold text-lg text-purple-400">Connect With Us</h5>
            <ul className="flex justify-end space-x-4">
              <li>
                <a
                  href="https://www.facebook.com/SSBTCOETOfficial"
                  target="_blank"
                  className="hover:text-purple-400 transition"
                >
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/coetjalgaon/"
                  target="_blank"
                  className="hover:text-purple-400 transition"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/channel/UCaxPLE3NlG6FdRHJfMGUWXA"
                  target="_blank"
                  className="hover:text-purple-400 transition"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/SSBTCOET"
                  target="_blank"
                  className="hover:text-purple-400 transition"
                >
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 py-4">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 text-center md:text-left">
            Copyright © 1983-2024. All Rights Reserved
          </p>
          <ul className="flex space-x-4 text-sm text-gray-500">
            <li>
              <a
                className="hover:text-purple-400 transition"
                href="https://www.sscoetjalgaon.ac.in/privacy-policy/"
              >
                Privacy Policy
              </a>
            </li>
            <li>|</li>
            <li>
              <a
                className="hover:text-purple-400 transition"
                href="https://www.sscoetjalgaon.ac.in/disclaimer/"
              >
                Disclaimer
              </a>
            </li>
            <li>|</li>
            <li>
              <a
                className="hover:text-purple-400 transition"
                href="https://www.sscoetjalgaon.ac.in/sitemap/"
              >
                Sitemap
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection; 