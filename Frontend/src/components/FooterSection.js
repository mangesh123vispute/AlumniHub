import React from 'react';

const FooterSection = () => {
  return (
    <footer id="contact" className="bg-black bg-opacity-80 relative">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://www.sscoetjalgaon.ac.in/public/images/backgrounds/footer-section-background.png)",
          opacity: 0.2,
        }}
      ></div>
      <div className="container mx-auto relative z-10 px-4 md:px-8">
        <div className="border-b border-gray-700 pb-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-white">
              <h4 className="font-bold text-lg mb-4 border-b-2 border-yellow-500">
                Contact Details
              </h4>
              <p className="text-[1rem]">
                If you have any doubt regarding our courses, admission or
                anything else, feel free to contact us. We are ready to help
                you.
              </p>
              <ul className="mt-5">
                <li className="flex items-center mb-2">
                  <i className="fa fa-building-o text-theme-color-2 mr-2"></i>
                  <a className="text-gray-400 hover:text-yellow-500" href="#">
                    PO Box#94, Bambhori, Jalgaon (MS).
                  </a>
                </li>
                <li className="flex items-center mb-2">
                  <i className="fa fa-phone text-theme-color-2 mr-2"></i>
                  <a className="text-gray-400 hover:text-yellow-500" href="#">
                    0257 225 8393/94/95
                  </a>
                </li>
                <li className="flex items-center mb-2">
                  <i className="fa fa-envelope-o text-theme-color-2 mr-2"></i>
                  <a className="text-gray-400 hover:text-yellow-500" href="#">
                    sscoetjal@gmail.com
                  </a>
                </li>
                <li className="flex items-center mb-2">
                  <i className="fa fa-globe text-theme-color-2 mr-2"></i>
                  <a
                    className="text-gray-400 hover:text-yellow-500"
                    href="https://www.sscoetjalgaon.ac.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.sscoetjalgaon.ac.in
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-white">
              <h4 className="font-bold text-lg mb-4 border-b-2 border-yellow-500">
                Useful Links
              </h4>
              <ul className="list-none space-y-2">
                <li>
                  <a
                    className="text-gray-400 hover:text-yellow-500"
                    href="https://www.sscoetjalgaon.ac.in/aicte/"
                  >
                    AICTE
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-400 hover:text-yellow-500"
                    href="https://www.sscoetjalgaon.ac.in/naac/"
                  >
                    NAAC
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-400 hover:text-yellow-500"
                    href="https://www.sscoetjalgaon.ac.in/nirf/"
                  >
                    NIRF
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-400 hover:text-yellow-500"
                    href="https://www.sscoetjalgaon.ac.in/approvals-from-statuatory-bodies/"
                  >
                    Approvals from Statutory Bodies
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-400 hover:text-yellow-500"
                    href="https://www.sscoetjalgaon.ac.in/mandatory-disclosures/"
                  >
                    Mandatory Disclosures &amp; Shikshan Shulka Samiti Proposals
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-400 hover:text-yellow-500"
                    href="https://www.aicte-india.org/feedback/index.php"
                    target="_blank"
                  >
                    Feedback System for Students and Faculty on AICTE Web Portal
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-400 hover:text-yellow-500"
                    href="https://www.sscoetjalgaon.ac.in/ariia/"
                  >
                    ARIIA
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-white">
              <h4 className="font-bold text-lg mb-4 border-b-2 border-yellow-500">
                Mandatory Disclosures
              </h4>
              <ul className="list-none space-y-2">
                <li>
                  <a
                    className="text-gray-400 hover:text-yellow-500"
                    href="https://www.sscoetjalgaon.ac.in/iqac/"
                  >
                    IQAC
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-400 hover:text-yellow-500"
                    href="https://www.sscoetjalgaon.ac.in/aqar/"
                  >
                    AQAR
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-400 hover:text-yellow-500"
                    href="https://www.sscoetjalgaon.ac.in/audit-reports/"
                  >
                    Audit Reports
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-400 hover:text-yellow-500"
                    href="https://www.sscoetjalgaon.ac.in/eoa-reports/"
                  >
                    EOA Reports
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-400 hover:text-yellow-500"
                    href="https://www.sscoetjalgaon.ac.in/fees-approval-proposals/"
                  >
                    Fees Approval Proposal
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-400 hover:text-yellow-500"
                    target="_blank"
                    href="https://www.sscoetjalgaon.ac.in/public/pdfs/RTI-Statutory-Declaration.pdf"
                  >
                    Right to Information Act
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-white">
            <h5 className="font-bold mb-2">Call Us Now</h5>
            <div>
              <h4 className="text-lg">0257 225 8393/94/95</h4>
            </div>
          </div>
          <div className="text-right text-white">
            <h5 className="font-bold mb-2">Connect With Us</h5>
            <ul className="flex justify-end space-x-3">
              <li>
                <a
                  href="https://www.facebook.com/SSBTCOETOfficial"
                  target="_blank"
                  className="text-gray-400 hover:text-yellow-500"
                >
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/coetjalgaon/"
                  target="_blank"
                  className="text-gray-400 hover:text-yellow-500 "
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/channel/UCaxPLE3NlG6FdRHJfMGUWXA"
                  target="_blank"
                  className="text-gray-400 hover:text-yellow-500"
                >
                  <i class="fab fa-youtube"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/SSBTCOET"
                  target="_blank"
                  className="text-gray-400 hover:text-yellow-500"
                >
                  <i class="fab fa-twitter"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-black-333 pt-5 pb-5">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm text-center md:text-left">
              <p>Copyright © 1983-2024. All Rights Reserved</p>
            </div>
            <div>
              <ul className="flex space-x-2 text-gray-500 text-sm justify-center md:justify-end">
                <li>
                  <a href="https://www.sscoetjalgaon.ac.in/privacy-policy/">
                    Privacy Policy
                  </a>
                </li>
                <li>|</li>
                <li>
                  <a href="https://www.sscoetjalgaon.ac.in/disclaimer/">
                    Disclaimer
                  </a>
                </li>
                <li>|</li>
                <li>
                  <a href="https://www.sscoetjalgaon.ac.in/sitemap/">Sitemap</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
