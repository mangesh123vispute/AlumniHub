import React from 'react';

function MemberCard({ name, title, description, imgSrc }) {
  return (
    <div className="relative group bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center transition-transform duration-300 ease-in-out transform hover:scale-105">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />

      <div className="member-img relative mb-4 w-full h-48 sm:h-56 lg:h-64">
        <img
          src={imgSrc}
          alt={name}
          className="rounded-lg shadow-lg w-full h-full object-cover"
        />
      </div>
      <div className="member-info mb-4">
        <h4 className="text-lg font-semibold">{name}</h4>
        <span className="text-sm font-bold text-gray-500">{title}</span>
        <hr className="border-2 bg-black mt-2" />
        <p className="text-gray-600 text-sm mt-3">{description}</p>
      </div>

      {/* Vertical Bar for Social Icons */}
      <div className="social-bar bg-white z-30 absolute top-0 right-0 h-full w-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:w-24 flex flex-col items-center justify-center">
        <a href="#" className="text-white mb-4">
          <i className="fab fa-twitter text-2xl hover:text-blue-500"></i>
        </a>
        <a href="#" className="text-white mb-4">
          <i className="fab fa-facebook text-2xl hover:text-blue-500"></i>
        </a>
        <a href="#" className="text-white mb-4">
          <i className="fab fa-instagram text-2xl hover:text-pink-500"></i>
        </a>
        <a href="#" className="text-white">
          <i className="fab fa-linkedin text-2xl hover:text-blue-600"></i>
        </a>
      </div>
    </div>
  );
}

export default MemberCard;
