import React from 'react';

const AlumniCard = ({ name, text1, text2, img, linkedIn, facebook, twitter, instagram }) => (
  <div className="relative group bg-white rounded-lg shadow-md flex flex-col items-center text-center transition-transform duration-300 ease-in-out transform hover:scale-105 w-full">
    {/* Image Section */}
    <div className="w-full h-48 sm:h-56 lg:h-64">
      <img
        src={img}
        alt={name}
        className="rounded-t-lg shadow-lg w-full h-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-70"
      />
    </div>

    {/* Info Section */}
    <div className="member-info p-4 flex flex-col items-center">
      <h4 className="text-xl sm:text-2xl font-semibold">{name}</h4>       
      <span className="text-gray-500 text-sm font-bold text-center mt-1">
        {text1}
      </span>
      <span className="text-gray-500 text-sm font-bold text-center mb-3">
        {text2}
      </span>
      <hr className="border-t-2 w-full mt-2" />
    </div>

    {/* Social Icons Section */}
    <div className="flex justify-center space-x-4 mt-3">
      {twitter && (
        <a href={twitter} className="text-gray-600 hover:text-blue-500" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter text-2xl"></i>
        </a>
      )}
      {facebook && (
        <a href={facebook} className="text-gray-600 hover:text-blue-500" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook text-2xl"></i>
        </a>
      )}
      {instagram && (
        <a href={instagram} className="text-gray-600 hover:text-pink-500" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram text-2xl"></i>
        </a>
      )}
      {linkedIn && (
        <a href={linkedIn} className="text-gray-600 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin text-2xl"></i>
        </a>
      )}
    </div>
    
    {/* Bottom Accent Border */}
    <div className="w-full h-1 bg-red-500 rounded-b-lg mt-4"></div>
  </div>
);

export default AlumniCard;
