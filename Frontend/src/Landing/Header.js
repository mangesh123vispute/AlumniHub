import React from 'react'

const Header = () => {
  return (
   <header id="header" className="header d-flex align-items-center fixed-top">
  <div className="container-fluid container-xl position-relative d-flex align-items-center">
    <a href="index.html" className="logo d-flex align-items-center me-auto">
      {/* Uncomment the line below if you also wish to use an image logo */}
      <img src="assets/img/logo.png" alt />
      <h1 className="sitename">FlexStart</h1>
    </a>
    <nav id="navmenu" className="navmenu">
      <ul>
        <li><a href="#hero" className="active">Home<br /></a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#team">Team</a></li>
        <li><a href="blog.html">Blog</a></li>
        <li className="dropdown"><a href="#"><span>Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown" /></a>
          <ul>
            <li><a href="#">Dropdown 1</a></li>
            <li className="dropdown"><a href="#"><span>Deep Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown" /></a>
              <ul>
                <li><a href="#">Deep Dropdown 1</a></li>
                <li><a href="#">Deep Dropdown 2</a></li>
                <li><a href="#">Deep Dropdown 3</a></li>
                <li><a href="#">Deep Dropdown 4</a></li>
                <li><a href="#">Deep Dropdown 5</a></li>
              </ul>
            </li>
            <li><a href="#">Dropdown 2</a></li>
            <li><a href="#">Dropdown 3</a></li>
            <li><a href="#">Dropdown 4</a></li>
          </ul>
        </li>
        <li className="listing-dropdown"><a href="#"><span>Listing Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown" /></a>
          <ul>
            <li>
              <a href="#">Column 1 link 1</a>
              <a href="#">Column 1 link 2</a>
              <a href="#">Column 1 link 3</a>
            </li>
            <li>
              <a href="#">Column 2 link 1</a>
              <a href="#">Column 2 link 2</a>
              <a href="#">Column 3 link 3</a>
            </li>
            <li>
              <a href="#">Column 3 link 1</a>
              <a href="#">Column 3 link 2</a>
              <a href="#">Column 3 link 3</a>
            </li>
            <li>
              <a href="#">Column 4 link 1</a>
              <a href="#">Column 4 link 2</a>
              <a href="#">Column 4 link 3</a>
            </li>
            <li>
              <a href="#">Column 5 link 1</a>
              <a href="#">Column 5 link 2</a>
              <a href="#">Column 5 link 3</a>
            </li>
          </ul>
        </li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <i className="mobile-nav-toggle d-xl-none bi bi-list" />
    </nav>
    <a className="btn-getstarted flex-md-shrink-0" href="index.html#about">Get Started</a>
  </div>
</header>

  );
}

export default Header
