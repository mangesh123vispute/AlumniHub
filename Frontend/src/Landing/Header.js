// import React from 'react';

const Header = () => {
  return (
    <header className="bg-purple-700 text-white fixed top-0 w-full z-50 shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <a href="index.html" className="flex items-center space-x-2">
          <img src="assets/img/logo.png" alt="Logo" className="h-8 w-8" />
          <h1 className="text-2xl font-bold">FlexStart</h1>
        </a>
        <nav className="hidden md:flex space-x-6">
          <a href="#hero" className="hover:text-purple-300">Home</a>
          <a href="#about" className="hover:text-purple-300">About</a>
          <a href="#services" className="hover:text-purple-300">Services</a>
          <a href="#portfolio" className="hover:text-purple-300">Portfolio</a>
          <a href="#team" className="hover:text-purple-300">Team</a>
          <a href="blog.html" className="hover:text-purple-300">Blog</a>
          <div className="relative group">
            <button className="hover:text-purple-300 flex items-center">
              Dropdown <i className="bi bi-chevron-down ml-1"></i>
            </button>
            <ul className="absolute hidden group-hover:block bg-purple-800 text-white mt-2 rounded shadow-lg">
              <li><a href="#" className="block px-4 py-2 hover:bg-purple-600">Dropdown 1</a></li>
              <li className="relative group">
                <a href="#" className="block px-4 py-2 hover:bg-purple-600 flex items-center">
                  Deep Dropdown <i className="bi bi-chevron-right ml-auto"></i>
                </a>
                <ul className="absolute hidden group-hover:block bg-purple-700 text-white left-full top-0 mt-0 rounded shadow-lg">
                  <li><a href="#" className="block px-4 py-2 hover:bg-purple-600">Deep Dropdown 1</a></li>
                  <li><a href="#" className="block px-4 py-2 hover:bg-purple-600">Deep Dropdown 2</a></li>
                  <li><a href="#" className="block px-4 py-2 hover:bg-purple-600">Deep Dropdown 3</a></li>
                </ul>
              </li>
              <li><a href="#" className="block px-4 py-2 hover:bg-purple-600">Dropdown 2</a></li>
            </ul>
          </div>
          <a href="#contact" className="hover:text-purple-300">Contact</a>
        </nav>
        <a
          href="index.html#about"
          className="hidden md:inline-block bg-white text-purple-700 px-4 py-2 rounded hover:bg-purple-300 hover:text-white transition"
        >
          Get Started
        </a>
        <button className="md:hidden text-white">
          <i className="bi bi-list text-2xl"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;