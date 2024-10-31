import React from 'react';

const AlumniCard = ({ name, position, img, linkedIn }) => (
  <div className="flex flex-col items-center p-5 bg-white border border-gray-200 shadow-lg rounded-lg w-full max-w-xs sm:max-w-sm lg:max-w-md mx-4">
    <img className="w-full h-64 sm:h-64 lg:h-72 object-cover rounded-t-lg" src={img} alt={name} />
    <div className="p-4 text-center flex flex-col items-center">
      <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
      <p className="text-gray-600 mt-2 text-sm sm:text-base lg:text-lg text-center">{position}</p>
      {linkedIn && (
        <a
          href={linkedIn}
          className="text-blue-500 hover:text-blue-600 mt-2 inline-block"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin fa-lg"></i>
        </a>
      )}
    </div>
  </div>
);

export default AlumniCard;
