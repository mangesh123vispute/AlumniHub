import React from 'react';

const AlumniCard = ({ name, position, img, linkedIn, facebook }) => (
  <>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    />
    <div className="flex flex-col items-center p-5 bg-white border border-gray-200 shadow-lg rounded-lg w-full max-w-xs sm:max-w-sm lg:max-w-md mx-4 relative overflow-hidden">
      {/* Image Section */}
      <img
        className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-t-lg"
        src={img}
        alt={name}
      />

      {/* Content Section */}
      <div className="p-4 text-center flex flex-col items-center justify-between h-full">
        <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
        <p className="text-gray-600 mt-2 text-sm sm:text-base lg:text-lg text-center">
          {position}
        </p>

        {/* Social Icons */}
        <div className="mt-4 flex space-x-4 justify-center">
          {linkedIn && (
            <a
              href={linkedIn}
              className="text-yellow-500 hover:text-yellow-600 text-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          )}
          {facebook && (
            <a
              href={facebook}
              className="text-yellow-500 hover:text-yellow-600 text-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
          )}
        </div>
      </div>

      {/* Red Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 rounded-b-lg"></div>
    </div>
  </>
);

export default AlumniCard;
