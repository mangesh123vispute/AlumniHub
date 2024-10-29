import React from 'react';

function MemberCard({ name, title, description, imgSrc }) {
  return (
    <div className="relative group bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center transition-transform duration-300 ease-in-out transform hover:scale-105">
      <div className="member-img relative mb-4 w-3/4 sm:w-full">
        <img
          src={imgSrc}
          alt={name}
          className="rounded-lg shadow-lg w-full object-cover"
        />
      </div>
      <div className="member-info">
        <h4 className="text-xl font-semibold">{name}</h4>
        <span className="text-sm text-gray-500">{title}</span>
        <p className="text-gray-600 mt-3">{description}</p>
      </div>
      
      {/* Vertical Bar for Social Icons */}
      <div className="social-bar absolute top-0 right-0 h-full w-0 overflow-hidden transition-all duration-300 ease-in-out bg-white group-hover:w-24 flex flex-col items-center justify-center">
        <a href="#" className="text-black hover:text-blue-500 mb-2">
          <i className="bi bi-twitter"></i>
        </a>
        <a href="#" className="text-black hover:text-blue-500 mb-2">
          <i className="bi bi-facebook"></i>
        </a>
        <a href="#" className="text-black hover:text-pink-500 mb-2">
          <i className="bi bi-instagram"></i>
        </a>
        <a href="#" className="text-black hover:text-blue-600">
          <i className="bi bi-linkedin"></i>
        </a>
      </div>
    </div>
  );
}

export default MemberCard;
