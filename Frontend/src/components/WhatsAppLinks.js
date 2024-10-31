import React from "react";

const WhatsAppGroupLinks = () => {
  return (
    <section className="clients">
      <div className="container pt-3 pb-5">
        <div className="row">
          <div className="col-12 col-md-3 d-flex justify-content-center align-items-center mb-4 mb-md-0">
            <h4 className="font-weight-600 text-center text-md-left">
              Join WhatsApp group for Admission 2024-25:
            </h4>
          </div>

          <div className="col-6 col-md-3 mb-3 mb-md-0 d-flex flex-column align-items-center">
            <a
              href="https://chat.whatsapp.com/HvjzUKlV6u8CUgzOdjeVTt"
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: "100%" }}
            >
              <img
                src="https://www.sscoetjalgaon.ac.in/public/buttons/1.png"
                alt="Engineering Group"
                style={{ width: "100%", maxWidth: "150px" }}
              />
            </a>
            <p className="text-center mt-2">Engineering</p>
          </div>

          <div className="col-6 col-md-3 mb-3 mb-md-0 d-flex flex-column align-items-center">
            <a
              href="https://chat.whatsapp.com/EP8IcEQ3nSs3yhO79tTfYB"
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: "100%" }}
            >
              <img
                src="https://www.sscoetjalgaon.ac.in/public/buttons/2.png"
                alt="MBA Group"
                style={{ width: "100%", maxWidth: "150px" }}
              />
            </a>
            <p className="text-center mt-2">M. B. A.</p>
          </div>

          <div className="col-6 col-md-3 d-flex flex-column align-items-center">
            <a
              href="https://chat.whatsapp.com/KgwbajSMSI7CJy7hSbu1mC"
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: "100%" }}
            >
              <img
                src="https://www.sscoetjalgaon.ac.in/public/buttons/3.png"
                alt="MCA Group"
                style={{ width: "100%", maxWidth: "150px" }}
              />
            </a>
            <p className="text-center mt-2">M. C. A.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppGroupLinks;
