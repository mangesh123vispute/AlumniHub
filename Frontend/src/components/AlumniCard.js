import React from 'react';

const AlumniCard = ({ name, text1, text2, img, linkedIn, facebook, twitter, instagram }) => (
  <div className="bg-white rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 mx-auto w-full sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
    {/* Image Section */}
    <div className="w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 overflow-hidden rounded-t-lg">
      <img
        src={img}
        alt={name}
        className="w-full h-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-80"
      />
    </div>

    {/* Info Section */}
    <div className="p-4 text-center">
      <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">{name}</h4>
      <p className="text-gray-600 text-sm md:text-base font-medium mb-1">{text1}</p>
      <p className="text-gray-500 text-sm md:text-base font-medium mb-3">{text2}</p>

      {/* Social Icons */}
      <div className="flex justify-center space-x-3 mt-2">
        {twitter && (
          <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400">
            <i className="fab fa-twitter text-lg md:text-xl"></i>
          </a>
        )}
        {facebook && (
          <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600">
            <i className="fab fa-facebook text-lg md:text-xl"></i>
          </a>
        )}
        {instagram && (
          <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500">
            <i className="fab fa-instagram text-lg md:text-xl"></i>
          </a>
        )}
        {linkedIn && (
          <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700">
            <i className="fab fa-linkedin text-lg md:text-xl"></i>
          </a>
        )}
      </div>
    </div>

    {/* Bottom Accent Border */}
    <div className="w-full h-1 bg-indigo-500 rounded-b-lg"></div>
  </div>
);

export default AlumniCard;
