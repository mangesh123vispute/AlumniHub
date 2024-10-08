import React from 'react'

const Content = () => {
  return (
      <main className="main">
  {/* Hero Section */}
  <section id="hero" className="hero section">
    <div className="container">
      <div className="row gy-4">
        <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
          <h1 data-aos="fade-up">We offer modern solutions for growing your business</h1>
          <p data-aos="fade-up" data-aos-delay={100}>We are team of talented designers making websites with Bootstrap</p>
          <div className="d-flex flex-column flex-md-row" data-aos="fade-up" data-aos-delay={200}>
            <a href="#about" className="btn-get-started">Get Started <i className="bi bi-arrow-right" /></a>
            <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox btn-watch-video d-flex align-items-center justify-content-center ms-0 ms-md-4 mt-4 mt-md-0"><i className="bi bi-play-circle" /><span>Watch Video</span></a>
          </div>
        </div>
        <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-out">
          <img src="assets/img/hero-img.png" className="img-fluid animated" alt />
        </div>
      </div>
    </div>
  </section>{/* /Hero Section */}
  {/* About Section */}
  <section id="about" className="about section">
    <div className="container" data-aos="fade-up">
      <div className="row gx-0">
        <div className="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay={200}>
          <div className="content">
            <h3>Who We Are</h3>
            <h2>Expedita voluptas omnis cupiditate totam eveniet nobis sint iste. Dolores est repellat corrupti reprehenderit.</h2>
            <p>
              Quisquam vel ut sint cum eos hic dolores aperiam. Sed deserunt et. Inventore et et dolor consequatur itaque ut voluptate sed et. Magnam nam ipsum tenetur suscipit voluptatum nam et est corrupti.
            </p>
            <div className="text-center text-lg-start">
              <a href="#" className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
                <span>Read More</span>
                <i className="bi bi-arrow-right" />
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-6 d-flex align-items-center" data-aos="zoom-out" data-aos-delay={200}>
          <img src="assets/img/about.jpg" className="img-fluid" alt />
        </div>
      </div>
    </div>
  </section>{/* /About Section */}
  {/* Values Section */}
  <section id="values" className="values section">
    {/* Section Title */}
    <div className="container section-title" data-aos="fade-up">
      <h2>Our Values</h2>
      <p>What we value most<br /></p>
    </div>{/* End Section Title */}
    <div className="container">
      <div className="row gy-4">
        <div className="col-lg-4" data-aos="fade-up" data-aos-delay={100}>
          <div className="card">
            <img src="assets/img/values-1.png" className="img-fluid" alt />
            <h3>Ad cupiditate sed est odio</h3>
            <p>Eum ad dolor et. Autem aut fugiat debitis voluptatem consequuntur sit. Et veritatis id.</p>
          </div>
        </div>{/* End Card Item */}
        <div className="col-lg-4" data-aos="fade-up" data-aos-delay={200}>
          <div className="card">
            <img src="assets/img/values-2.png" className="img-fluid" alt />
            <h3>Voluptatem voluptatum alias</h3>
            <p>Repudiandae amet nihil natus in distinctio suscipit id. Doloremque ducimus ea sit non.</p>
          </div>
        </div>{/* End Card Item */}
        <div className="col-lg-4" data-aos="fade-up" data-aos-delay={300}>
          <div className="card">
            <img src="assets/img/values-3.png" className="img-fluid" alt />
            <h3>Fugit cupiditate alias nobis.</h3>
            <p>Quam rem vitae est autem molestias explicabo debitis sint. Vero aliquid quidem commodi.</p>
          </div>
        </div>{/* End Card Item */}
      </div>
    </div>
  </section>{/* /Values Section */}
  {/* Stats Section */}
  <section id="stats" className="stats section">
    <div className="container" data-aos="fade-up" data-aos-delay={100}>
      <div className="row gy-4">
        <div className="col-lg-3 col-md-6">
          <div className="stats-item d-flex align-items-center w-100 h-100">
            <i className="bi bi-emoji-smile color-blue flex-shrink-0" />
            <div>
              <span data-purecounter-start={0} data-purecounter-end={232} data-purecounter-duration={1} className="purecounter" />
              <p>Happy Clients</p>
            </div>
          </div>
        </div>{/* End Stats Item */}
        <div className="col-lg-3 col-md-6">
          <div className="stats-item d-flex align-items-center w-100 h-100">
            <i className="bi bi-journal-richtext color-orange flex-shrink-0" style={{color: '#ee6c20'}} />
            <div>
              <span data-purecounter-start={0} data-purecounter-end={521} data-purecounter-duration={1} className="purecounter" />
              <p>Projects</p>
            </div>
          </div>
        </div>{/* End Stats Item */}
        <div className="col-lg-3 col-md-6">
          <div className="stats-item d-flex align-items-center w-100 h-100">
            <i className="bi bi-headset color-green flex-shrink-0" style={{color: '#15be56'}} />
            <div>
              <span data-purecounter-start={0} data-purecounter-end={1463} data-purecounter-duration={1} className="purecounter" />
              <p>Hours Of Support</p>
            </div>
          </div>
        </div>{/* End Stats Item */}
        <div className="col-lg-3 col-md-6">
          <div className="stats-item d-flex align-items-center w-100 h-100">
            <i className="bi bi-people color-pink flex-shrink-0" style={{color: '#bb0852'}} />
            <div>
              <span data-purecounter-start={0} data-purecounter-end={15} data-purecounter-duration={1} className="purecounter" />
              <p>Hard Workers</p>
            </div>
          </div>
        </div>{/* End Stats Item */}
      </div>
    </div>
  </section>{/* /Stats Section */}
  {/* Features Section */}
  <section id="features" className="features section">
    {/* Section Title */}
    <div className="container section-title" data-aos="fade-up">
      <h2>Features</h2>
      <p>Our Advacedd Features<br /></p>
    </div>{/* End Section Title */}
    <div className="container">
      <div className="row gy-5">
        <div className="col-xl-6" data-aos="zoom-out" data-aos-delay={100}>
          <img src="assets/img/features.png" className="img-fluid" alt />
        </div>
        <div className="col-xl-6 d-flex">
          <div className="row align-self-center gy-4">
            <div className="col-md-6" data-aos="fade-up" data-aos-delay={200}>
              <div className="feature-box d-flex align-items-center">
                <i className="bi bi-check" />
                <h3>Eos aspernatur rem</h3>
              </div>
            </div>{/* End Feature Item */}
            <div className="col-md-6" data-aos="fade-up" data-aos-delay={300}>
              <div className="feature-box d-flex align-items-center">
                <i className="bi bi-check" />
                <h3>Facilis neque ipsa</h3>
              </div>
            </div>{/* End Feature Item */}
            <div className="col-md-6" data-aos="fade-up" data-aos-delay={400}>
              <div className="feature-box d-flex align-items-center">
                <i className="bi bi-check" />
                <h3>Volup amet volupt</h3>
              </div>
            </div>{/* End Feature Item */}
            <div className="col-md-6" data-aos="fade-up" data-aos-delay={500}>
              <div className="feature-box d-flex align-items-center">
                <i className="bi bi-check" />
                <h3>Rerum omnis sint</h3>
              </div>
            </div>{/* End Feature Item */}
            <div className="col-md-6" data-aos="fade-up" data-aos-delay={600}>
              <div className="feature-box d-flex align-items-center">
                <i className="bi bi-check" />
                <h3>Alias possimus</h3>
              </div>
            </div>{/* End Feature Item */}
            <div className="col-md-6" data-aos="fade-up" data-aos-delay={700}>
              <div className="feature-box d-flex align-items-center">
                <i className="bi bi-check" />
                <h3>Repellendus molli</h3>
              </div>
            </div>{/* End Feature Item */}
          </div>
        </div>
      </div>
    </div>
  </section>{/* /Features Section */}
  {/* Alt Features Section */}
  <section id="alt-features" className="alt-features section">
    <div className="container">
      <div className="row gy-5">
        <div className="col-xl-7 d-flex order-2 order-xl-1" data-aos="fade-up" data-aos-delay={200}>
          <div className="row align-self-center gy-5">
            <div className="col-md-6 icon-box">
              <i className="bi bi-award" />
              <div>
                <h4>Corporis voluptates sit</h4>
                <p>Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut aliquip</p>
              </div>
            </div>{/* End Feature Item */}
            <div className="col-md-6 icon-box">
              <i className="bi bi-card-checklist" />
              <div>
                <h4>Ullamco laboris nisi</h4>
                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt</p>
              </div>
            </div>{/* End Feature Item */}
            <div className="col-md-6 icon-box">
              <i className="bi bi-dribbble" />
              <div>
                <h4>Labore consequatur</h4>
                <p>Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut maiores omnis facere</p>
              </div>
            </div>{/* End Feature Item */}
            <div className="col-md-6 icon-box">
              <i className="bi bi-filter-circle" />
              <div>
                <h4>Beatae veritatis</h4>
                <p>Expedita veritatis consequuntur nihil tempore laudantium vitae denat pacta</p>
              </div>
            </div>{/* End Feature Item */}
            <div className="col-md-6 icon-box">
              <i className="bi bi-lightning-charge" />
              <div>
                <h4>Molestiae dolor</h4>
                <p>Et fuga et deserunt et enim. Dolorem architecto ratione tensa raptor marte</p>
              </div>
            </div>{/* End Feature Item */}
            <div className="col-md-6 icon-box">
              <i className="bi bi-patch-check" />
              <div>
                <h4>Explicabo consectetur</h4>
                <p>Est autem dicta beatae suscipit. Sint veritatis et sit quasi ab aut inventore</p>
              </div>
            </div>{/* End Feature Item */}
          </div>
        </div>
        <div className="col-xl-5 d-flex align-items-center order-1 order-xl-2" data-aos="fade-up" data-aos-delay={100}>
          <img src="assets/img/alt-features.png" className="img-fluid" alt />
        </div>
      </div>
    </div>
  </section>{/* /Alt Features Section */}
  {/* Services Section */}
  <section id="services" className="services section">
    {/* Section Title */}
    <div className="container section-title" data-aos="fade-up">
      <h2>Services</h2>
      <p>Check Our Services<br /></p>
    </div>{/* End Section Title */}
    <div className="container">
      <div className="row gy-4">
        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={100}>
          <div className="service-item item-cyan position-relative">
            <i className="bi bi-activity icon" />
            <h3>Nesciunt Mete</h3>
            <p>Provident nihil minus qui consequatur non omnis maiores. Eos accusantium minus dolores iure perferendis tempore et consequatur.</p>
            <a href="#" className="read-more stretched-link"><span>Read More</span> <i className="bi bi-arrow-right" /></a>
          </div>
        </div>{/* End Service Item */}
        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={200}>
          <div className="service-item item-orange position-relative">
            <i className="bi bi-broadcast icon" />
            <h3>Eosle Commodi</h3>
            <p>Ut autem aut autem non a. Sint sint sit facilis nam iusto sint. Libero corrupti neque eum hic non ut nesciunt dolorem.</p>
            <a href="#" className="read-more stretched-link"><span>Read More</span> <i className="bi bi-arrow-right" /></a>
          </div>
        </div>{/* End Service Item */}
        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={300}>
          <div className="service-item item-teal position-relative">
            <i className="bi bi-easel icon" />
            <h3>Ledo Markt</h3>
            <p>Ut excepturi voluptatem nisi sed. Quidem fuga consequatur. Minus ea aut. Vel qui id voluptas adipisci eos earum corrupti.</p>
            <a href="#" className="read-more stretched-link"><span>Read More</span> <i className="bi bi-arrow-right" /></a>
          </div>
        </div>{/* End Service Item */}
        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={400}>
          <div className="service-item item-red position-relative">
            <i className="bi bi-bounding-box-circles icon" />
            <h3>Asperiores Commodi</h3>
            <p>Non et temporibus minus omnis sed dolor esse consequatur. Cupiditate sed error ea fuga sit provident adipisci neque.</p>
            <a href="#" className="read-more stretched-link"><span>Read More</span> <i className="bi bi-arrow-right" /></a>
          </div>
        </div>{/* End Service Item */}
        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={500}>
          <div className="service-item item-indigo position-relative">
            <i className="bi bi-calendar4-week icon" />
            <h3>Velit Doloremque.</h3>
            <p>Cumque et suscipit saepe. Est maiores autem enim facilis ut aut ipsam corporis aut. Sed animi at autem alias eius labore.</p>
            <a href="#" className="read-more stretched-link"><span>Read More</span> <i className="bi bi-arrow-right" /></a>
          </div>
        </div>{/* End Service Item */}
        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={600}>
          <div className="service-item item-pink position-relative">
            <i className="bi bi-chat-square-text icon" />
            <h3>Dolori Architecto</h3>
            <p>Hic molestias ea quibusdam eos. Fugiat enim doloremque aut neque non et debitis iure. Corrupti recusandae ducimus enim.</p>
            <a href="#" className="read-more stretched-link"><span>Read More</span> <i className="bi bi-arrow-right" /></a>
          </div>
        </div>{/* End Service Item */}
      </div>
    </div>
  </section>{/* /Services Section */}
  {/* Pricing Section */}
  <section id="pricing" className="pricing section">
    {/* Section Title */}
    <div className="container section-title" data-aos="fade-up">
      <h2>Pricing</h2>
      <p>Check Our Affordable Pricing<br /></p>
    </div>{/* End Section Title */}
    <div className="container">
      <div className="row gy-4">
        <div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay={100}>
          <div className="pricing-tem">
            <h3 style={{color: '#20c997'}}>Free Plan</h3>
            <div className="price"><sup>$</sup>0<span> / mo</span></div>
            <div className="icon">
              <i className="bi bi-box" style={{color: '#20c997'}} />
            </div>
            <ul>
              <li>Aida dere</li>
              <li>Nec feugiat nisl</li>
              <li>Nulla at volutpat dola</li>
              <li className="na">Pharetra massa</li>
              <li className="na">Massa ultricies mi</li>
            </ul>
            <a href="#" className="btn-buy">Buy Now</a>
          </div>
        </div>{/* End Pricing Item */}
        <div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay={200}>
          <div className="pricing-tem">
            <span className="featured">Featured</span>
            <h3 style={{color: '#0dcaf0'}}>Starter Plan</h3>
            <div className="price"><sup>$</sup>19<span> / mo</span></div>
            <div className="icon">
              <i className="bi bi-send" style={{color: '#0dcaf0'}} />
            </div>
            <ul>
              <li>Aida dere</li>
              <li>Nec feugiat nisl</li>
              <li>Nulla at volutpat dola</li>
              <li>Pharetra massa</li>
              <li className="na">Massa ultricies mi</li>
            </ul>
            <a href="#" className="btn-buy">Buy Now</a>
          </div>
        </div>{/* End Pricing Item */}
        <div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay={300}>
          <div className="pricing-tem">
            <h3 style={{color: '#fd7e14'}}>Business Plan</h3>
            <div className="price"><sup>$</sup>29<span> / mo</span></div>
            <div className="icon">
              <i className="bi bi-airplane" style={{color: '#fd7e14'}} />
            </div>
            <ul>
              <li>Aida dere</li>
              <li>Nec feugiat nisl</li>
              <li>Nulla at volutpat dola</li>
              <li>Pharetra massa</li>
              <li>Massa ultricies mi</li>
            </ul>
            <a href="#" className="btn-buy">Buy Now</a>
          </div>
        </div>{/* End Pricing Item */}
        <div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay={400}>
          <div className="pricing-tem">
            <h3 style={{color: '#0d6efd'}}>Ultimate Plan</h3>
            <div className="price"><sup>$</sup>49<span> / mo</span></div>
            <div className="icon">
              <i className="bi bi-rocket" style={{color: '#0d6efd'}} />
            </div>
            <ul>
              <li>Aida dere</li>
              <li>Nec feugiat nisl</li>
              <li>Nulla at volutpat dola</li>
              <li>Pharetra massa</li>
              <li>Massa ultricies mi</li>
            </ul>
            <a href="#" className="btn-buy">Buy Now</a>
          </div>
        </div>{/* End Pricing Item */}
      </div>{/* End pricing row */}
    </div>
  </section>{/* /Pricing Section */}
  {/* Faq Section */}
  <section id="faq" className="faq section">
    {/* Section Title */}
    <div className="container section-title" data-aos="fade-up">
      <h2>F.A.Q</h2>
      <p>Frequently Asked Questions</p>
    </div>{/* End Section Title */}
    <div className="container">
      <div className="row">
        <div className="col-lg-6" data-aos="fade-up" data-aos-delay={100}>
          <div className="faq-container">
            <div className="faq-item faq-active">
              <h3>Non consectetur a erat nam at lectus urna duis?</h3>
              <div className="faq-content">
                <p>Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.</p>
              </div>
              <i className="faq-toggle bi bi-chevron-right" />
            </div>{/* End Faq item*/}
            <div className="faq-item">
              <h3>Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque?</h3>
              <div className="faq-content">
                <p>Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.</p>
              </div>
              <i className="faq-toggle bi bi-chevron-right" />
            </div>{/* End Faq item*/}
            <div className="faq-item">
              <h3>Dolor sit amet consectetur adipiscing elit pellentesque?</h3>
              <div className="faq-content">
                <p>Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis</p>
              </div>
              <i className="faq-toggle bi bi-chevron-right" />
            </div>{/* End Faq item*/}
          </div>
        </div>{/* End Faq Column*/}
        <div className="col-lg-6" data-aos="fade-up" data-aos-delay={200}>
          <div className="faq-container">
            <div className="faq-item">
              <h3>Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla?</h3>
              <div className="faq-content">
                <p>Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.</p>
              </div>
              <i className="faq-toggle bi bi-chevron-right" />
            </div>{/* End Faq item*/}
            <div className="faq-item">
              <h3>Tempus quam pellentesque nec nam aliquam sem et tortor consequat?</h3>
              <div className="faq-content">
                <p>Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in</p>
              </div>
              <i className="faq-toggle bi bi-chevron-right" />
            </div>{/* End Faq item*/}
            <div className="faq-item">
              <h3>Perspiciatis quod quo quos nulla quo illum ullam?</h3>
              <div className="faq-content">
                <p>Enim ea facilis quaerat voluptas quidem et dolorem. Quis et consequatur non sed in suscipit sequi. Distinctio ipsam dolore et.</p>
              </div>
              <i className="faq-toggle bi bi-chevron-right" />
            </div>{/* End Faq item*/}
          </div>
        </div>{/* End Faq Column*/}
      </div>
    </div>
  </section>{/* /Faq Section */}
  {/* Portfolio Section */}
  <section id="portfolio" className="portfolio section">
    {/* Section Title */}
    <div className="container section-title" data-aos="fade-up">
      <h2>Portfolio</h2>
      <p>Check our latest work</p>
    </div>{/* End Section Title */}
    <div className="container">
      <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
        <ul className="portfolio-filters isotope-filters" data-aos="fade-up" data-aos-delay={100}>
          <li data-filter="*" className="filter-active">All</li>
          <li data-filter=".filter-app">App</li>
          <li data-filter=".filter-product">Product</li>
          <li data-filter=".filter-branding">Branding</li>
          <li data-filter=".filter-books">Books</li>
        </ul>{/* End Portfolio Filters */}
        <div className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay={200}>
          <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
            <div className="portfolio-content h-100">
              <img src="assets/img/portfolio/app-1.jpg" className="img-fluid" alt />
              <div className="portfolio-info">
                <h4>App 1</h4>
                <p>Lorem ipsum, dolor sit amet consectetur</p>
                <a href="assets/img/portfolio/app-1.jpg" title="App 1" data-gallery="portfolio-gallery-app" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
              </div>
            </div>
          </div>{/* End Portfolio Item */}
          <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-product">
            <div className="portfolio-content h-100">
              <img src="assets/img/portfolio/product-1.jpg" className="img-fluid" alt />
              <div className="portfolio-info">
                <h4>Product 1</h4>
                <p>Lorem ipsum, dolor sit amet consectetur</p>
                <a href="assets/img/portfolio/product-1.jpg" title="Product 1" data-gallery="portfolio-gallery-product" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
              </div>
            </div>
          </div>{/* End Portfolio Item */}
          <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-branding">
            <div className="portfolio-content h-100">
              <img src="assets/img/portfolio/branding-1.jpg" className="img-fluid" alt />
              <div className="portfolio-info">
                <h4>Branding 1</h4>
                <p>Lorem ipsum, dolor sit amet consectetur</p>
                <a href="assets/img/portfolio/branding-1.jpg" title="Branding 1" data-gallery="portfolio-gallery-branding" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
              </div>
            </div>
          </div>{/* End Portfolio Item */}
          <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-books">
            <div className="portfolio-content h-100">
              <img src="assets/img/portfolio/books-1.jpg" className="img-fluid" alt />
              <div className="portfolio-info">
                <h4>Books 1</h4>
                <p>Lorem ipsum, dolor sit amet consectetur</p>
                <a href="assets/img/portfolio/books-1.jpg" title="Branding 1" data-gallery="portfolio-gallery-book" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
              </div>
            </div>
          </div>{/* End Portfolio Item */}
          <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
            <div className="portfolio-content h-100">
              <img src="assets/img/portfolio/app-2.jpg" className="img-fluid" alt />
              <div className="portfolio-info">
                <h4>App 2</h4>
                <p>Lorem ipsum, dolor sit amet consectetur</p>
                <a href="assets/img/portfolio/app-2.jpg" title="App 2" data-gallery="portfolio-gallery-app" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
              </div>
            </div>
          </div>{/* End Portfolio Item */}
          <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-product">
            <div className="portfolio-content h-100">
              <img src="assets/img/portfolio/product-2.jpg" className="img-fluid" alt />
              <div className="portfolio-info">
                <h4>Product 2</h4>
                <p>Lorem ipsum, dolor sit amet consectetur</p>
                <a href="assets/img/portfolio/product-2.jpg" title="Product 2" data-gallery="portfolio-gallery-product" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
              </div>
            </div>
          </div>{/* End Portfolio Item */}
          <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-branding">
            <div className="portfolio-content h-100">
              <img src="assets/img/portfolio/branding-2.jpg" className="img-fluid" alt />
              <div className="portfolio-info">
                <h4>Branding 2</h4>
                <p>Lorem ipsum, dolor sit amet consectetur</p>
                <a href="assets/img/portfolio/branding-2.jpg" title="Branding 2" data-gallery="portfolio-gallery-branding" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
              </div>
            </div>
          </div>{/* End Portfolio Item */}
          <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-books">
            <div className="portfolio-content h-100">
              <img src="assets/img/portfolio/books-2.jpg" className="img-fluid" alt />
              <div className="portfolio-info">
                <h4>Books 2</h4>
                <p>Lorem ipsum, dolor sit amet consectetur</p>
                <a href="assets/img/portfolio/books-2.jpg" title="Branding 2" data-gallery="portfolio-gallery-book" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
              </div>
            </div>
          </div>{/* End Portfolio Item */}
          <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
            <div className="portfolio-content h-100">
              <img src="assets/img/portfolio/app-3.jpg" className="img-fluid" alt />
              <div className="portfolio-info">
                <h4>App 3</h4>
                <p>Lorem ipsum, dolor sit amet consectetur</p>
                <a href="assets/img/portfolio/app-3.jpg" title="App 3" data-gallery="portfolio-gallery-app" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
              </div>
            </div>
          </div>{/* End Portfolio Item */}
          <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-product">
            <div className="portfolio-content h-100">
              <img src="assets/img/portfolio/product-3.jpg" className="img-fluid" alt />
              <div className="portfolio-info">
                <h4>Product 3</h4>
                <p>Lorem ipsum, dolor sit amet consectetur</p>
                <a href="assets/img/portfolio/product-3.jpg" title="Product 3" data-gallery="portfolio-gallery-product" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
              </div>
            </div>
          </div>{/* End Portfolio Item */}
          <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-branding">
            <div className="portfolio-content h-100">
              <img src="assets/img/portfolio/branding-3.jpg" className="img-fluid" alt />
              <div className="portfolio-info">
                <h4>Branding 3</h4>
                <p>Lorem ipsum, dolor sit amet consectetur</p>
                <a href="assets/img/portfolio/branding-3.jpg" title="Branding 2" data-gallery="portfolio-gallery-branding" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
              </div>
            </div>
          </div>{/* End Portfolio Item */}
          <div className="col-lg-4 col-md-6 portfolio-item isotope-item filter-books">
            <div className="portfolio-content h-100">
              <img src="assets/img/portfolio/books-3.jpg" className="img-fluid" alt />
              <div className="portfolio-info">
                <h4>Books 3</h4>
                <p>Lorem ipsum, dolor sit amet consectetur</p>
                <a href="assets/img/portfolio/books-3.jpg" title="Branding 3" data-gallery="portfolio-gallery-book" className="glightbox preview-link"><i className="bi bi-zoom-in" /></a>
                <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg" /></a>
              </div>
            </div>
          </div>{/* End Portfolio Item */}
        </div>{/* End Portfolio Container */}
      </div>
    </div>
  </section>{/* /Portfolio Section */}
  {/* Testimonials Section */}
  <section id="testimonials" className="testimonials section">
    {/* Section Title */}
    <div className="container section-title" data-aos="fade-up">
      <h2>Testimonials</h2>
      <p>What they are saying about us<br /></p>
    </div>{/* End Section Title */}
    <div className="container" data-aos="fade-up" data-aos-delay={100}>
      <div className="swiper init-swiper">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="testimonial-item">
              <div className="stars">
                <i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" />
              </div>
              <p>
                Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.
              </p>
              <div className="profile mt-auto">
                <img src="assets/img/testimonials/testimonials-1.jpg" className="testimonial-img" alt />
                <h3>Saul Goodman</h3>
                <h4>Ceo &amp; Founder</h4>
              </div>
            </div>
          </div>{/* End testimonial item */}
          <div className="swiper-slide">
            <div className="testimonial-item">
              <div className="stars">
                <i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" />
              </div>
              <p>
                Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.
              </p>
              <div className="profile mt-auto">
                <img src="assets/img/testimonials/testimonials-2.jpg" className="testimonial-img" alt />
                <h3>Sara Wilsson</h3>
                <h4>Designer</h4>
              </div>
            </div>
          </div>{/* End testimonial item */}
          <div className="swiper-slide">
            <div className="testimonial-item">
              <div className="stars">
                <i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" />
              </div>
              <p>
                Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.
              </p>
              <div className="profile mt-auto">
                <img src="assets/img/testimonials/testimonials-3.jpg" className="testimonial-img" alt />
                <h3>Jena Karlis</h3>
                <h4>Store Owner</h4>
              </div>
            </div>
          </div>{/* End testimonial item */}
          <div className="swiper-slide">
            <div className="testimonial-item">
              <div className="stars">
                <i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" />
              </div>
              <p>
                Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.
              </p>
              <div className="profile mt-auto">
                <img src="assets/img/testimonials/testimonials-4.jpg" className="testimonial-img" alt />
                <h3>Matt Brandon</h3>
                <h4>Freelancer</h4>
              </div>
            </div>
          </div>{/* End testimonial item */}
          <div className="swiper-slide">
            <div className="testimonial-item">
              <div className="stars">
                <i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" /><i className="bi bi-star-fill" />
              </div>
              <p>
                Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.
              </p>
              <div className="profile mt-auto">
                <img src="assets/img/testimonials/testimonials-5.jpg" className="testimonial-img" alt />
                <h3>John Larson</h3>
                <h4>Entrepreneur</h4>
              </div>
            </div>
          </div>{/* End testimonial item */}
        </div>
        <div className="swiper-pagination" />
      </div>
    </div>
  </section>{/* /Testimonials Section */}
  {/* Team Section */}
  <section id="team" className="team section">
    {/* Section Title */}
    <div className="container section-title" data-aos="fade-up">
      <h2>Team</h2>
      <p>Our hard working team</p>
    </div>{/* End Section Title */}
    <div className="container">
      <div className="row gy-4">
        <div className="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay={100}>
          <div className="team-member">
            <div className="member-img">
              <img src="assets/img/team/team-1.jpg" className="img-fluid" alt />
              <div className="social">
                <a href><i className="bi bi-twitter-x" /></a>
                <a href><i className="bi bi-facebook" /></a>
                <a href><i className="bi bi-instagram" /></a>
                <a href><i className="bi bi-linkedin" /></a>
              </div>
            </div>
            <div className="member-info">
              <h4>Walter White</h4>
              <span>Chief Executive Officer</span>
              <p>Velit aut quia fugit et et. Dolorum ea voluptate vel tempore tenetur ipsa quae aut. Ipsum exercitationem iure minima enim corporis et voluptate.</p>
            </div>
          </div>
        </div>{/* End Team Member */}
        <div className="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay={200}>
          <div className="team-member">
            <div className="member-img">
              <img src="assets/img/team/team-2.jpg" className="img-fluid" alt />
              <div className="social">
                <a href><i className="bi bi-twitter-x" /></a>
                <a href><i className="bi bi-facebook" /></a>
                <a href><i className="bi bi-instagram" /></a>
                <a href><i className="bi bi-linkedin" /></a>
              </div>
            </div>
            <div className="member-info">
              <h4>Sarah Jhonson</h4>
              <span>Product Manager</span>
              <p>Quo esse repellendus quia id. Est eum et accusantium pariatur fugit nihil minima suscipit corporis. Voluptate sed quas reiciendis animi neque sapiente.</p>
            </div>
          </div>
        </div>{/* End Team Member */}
        <div className="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay={300}>
          <div className="team-member">
            <div className="member-img">
              <img src="assets/img/team/team-3.jpg" className="img-fluid" alt />
              <div className="social">
                <a href><i className="bi bi-twitter-x" /></a>
                <a href><i className="bi bi-facebook" /></a>
                <a href><i className="bi bi-instagram" /></a>
                <a href><i className="bi bi-linkedin" /></a>
              </div>
            </div>
            <div className="member-info">
              <h4>William Anderson</h4>
              <span>CTO</span>
              <p>Vero omnis enim consequatur. Voluptas consectetur unde qui molestiae deserunt. Voluptates enim aut architecto porro aspernatur molestiae modi.</p>
            </div>
          </div>
        </div>{/* End Team Member */}
        <div className="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay={400}>
          <div className="team-member">
            <div className="member-img">
              <img src="assets/img/team/team-4.jpg" className="img-fluid" alt />
              <div className="social">
                <a href><i className="bi bi-twitter-x" /></a>
                <a href><i className="bi bi-facebook" /></a>
                <a href><i className="bi bi-instagram" /></a>
                <a href><i className="bi bi-linkedin" /></a>
              </div>
            </div>
            <div className="member-info">
              <h4>Amanda Jepson</h4>
              <span>Accountant</span>
              <p>Rerum voluptate non adipisci animi distinctio et deserunt amet voluptas. Quia aut aliquid doloremque ut possimus ipsum officia.</p>
            </div>
          </div>
        </div>{/* End Team Member */}
      </div>
    </div>
  </section>{/* /Team Section */}
  {/* Clients Section */}
  <section id="clients" className="clients section">
    {/* Section Title */}
    <div className="container section-title" data-aos="fade-up">
      <h2>Clients</h2>
      <p>We work with best clients<br /></p>
    </div>{/* End Section Title */}
    <div className="container" data-aos="fade-up" data-aos-delay={100}>
      <div className="swiper init-swiper">
        <div className="swiper-wrapper align-items-center">
          <div className="swiper-slide"><img src="assets/img/clients/client-1.png" className="img-fluid" alt /></div>
          <div className="swiper-slide"><img src="assets/img/clients/client-2.png" className="img-fluid" alt /></div>
          <div className="swiper-slide"><img src="assets/img/clients/client-3.png" className="img-fluid" alt /></div>
          <div className="swiper-slide"><img src="assets/img/clients/client-4.png" className="img-fluid" alt /></div>
          <div className="swiper-slide"><img src="assets/img/clients/client-5.png" className="img-fluid" alt /></div>
          <div className="swiper-slide"><img src="assets/img/clients/client-6.png" className="img-fluid" alt /></div>
          <div className="swiper-slide"><img src="assets/img/clients/client-7.png" className="img-fluid" alt /></div>
          <div className="swiper-slide"><img src="assets/img/clients/client-8.png" className="img-fluid" alt /></div>
        </div>
        <div className="swiper-pagination" />
      </div>
    </div>
  </section>{/* /Clients Section */}
  {/* Recent Posts Section */}
  <section id="recent-posts" className="recent-posts section">
    {/* Section Title */}
    <div className="container section-title" data-aos="fade-up">
      <h2>Recent Posts</h2>
      <p>Recent posts form our Blog</p>
    </div>{/* End Section Title */}
    <div className="container">
      <div className="row gy-5">
        <div className="col-xl-4 col-md-6">
          <div className="post-item position-relative h-100" data-aos="fade-up" data-aos-delay={100}>
            <div className="post-img position-relative overflow-hidden">
              <img src="assets/img/blog/blog-1.jpg" className="img-fluid" alt />
              <span className="post-date">December 12</span>
            </div>
            <div className="post-content d-flex flex-column">
              <h3 className="post-title">Eum ad dolor et. Autem aut fugiat debitis</h3>
              <div className="meta d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <i className="bi bi-person" /> <span className="ps-2">Julia Parker</span>
                </div>
                <span className="px-3 text-black-50">/</span>
                <div className="d-flex align-items-center">
                  <i className="bi bi-folder2" /> <span className="ps-2">Politics</span>
                </div>
              </div>
              <hr />
              <a href="blog-details.html" className="readmore stretched-link"><span>Read More</span><i className="bi bi-arrow-right" /></a>
            </div>
          </div>
        </div>{/* End post item */}
        <div className="col-xl-4 col-md-6">
          <div className="post-item position-relative h-100" data-aos="fade-up" data-aos-delay={200}>
            <div className="post-img position-relative overflow-hidden">
              <img src="assets/img/blog/blog-2.jpg" className="img-fluid" alt />
              <span className="post-date">July 17</span>
            </div>
            <div className="post-content d-flex flex-column">
              <h3 className="post-title">Et repellendus molestiae qui est sed omnis</h3>
              <div className="meta d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <i className="bi bi-person" /> <span className="ps-2">Mario Douglas</span>
                </div>
                <span className="px-3 text-black-50">/</span>
                <div className="d-flex align-items-center">
                  <i className="bi bi-folder2" /> <span className="ps-2">Sports</span>
                </div>
              </div>
              <hr />
              <a href="blog-details.html" className="readmore stretched-link"><span>Read More</span><i className="bi bi-arrow-right" /></a>
            </div>
          </div>
        </div>{/* End post item */}
        <div className="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay={300}>
          <div className="post-item position-relative h-100">
            <div className="post-img position-relative overflow-hidden">
              <img src="assets/img/blog/blog-3.jpg" className="img-fluid" alt />
              <span className="post-date">September 05</span>
            </div>
            <div className="post-content d-flex flex-column">
              <h3 className="post-title">Quia assumenda est et veritati tirana ploder</h3>
              <div className="meta d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <i className="bi bi-person" /> <span className="ps-2">Lisa Hunter</span>
                </div>
                <span className="px-3 text-black-50">/</span>
                <div className="d-flex align-items-center">
                  <i className="bi bi-folder2" /> <span className="ps-2">Economics</span>
                </div>
              </div>
              <hr />
              <a href="blog-details.html" className="readmore stretched-link"><span>Read More</span><i className="bi bi-arrow-right" /></a>
            </div>
          </div>
        </div>{/* End post item */}
      </div>
    </div>
  </section>{/* /Recent Posts Section */}
  {/* Contact Section */}
  <section id="contact" className="contact section">
    {/* Section Title */}
    <div className="container section-title" data-aos="fade-up">
      <h2>Contact</h2>
      <p>Contact Us</p>
    </div>{/* End Section Title */}
    <div className="container" data-aos="fade-up" data-aos-delay={100}>
      <div className="row gy-4">
        <div className="col-lg-6">
          <div className="row gy-4">
            <div className="col-md-6">
              <div className="info-item" data-aos="fade" data-aos-delay={200}>
                <i className="bi bi-geo-alt" />
                <h3>Address</h3>
                <p>A108 Adam Street</p>
                <p>New York, NY 535022</p>
              </div>
            </div>{/* End Info Item */}
            <div className="col-md-6">
              <div className="info-item" data-aos="fade" data-aos-delay={300}>
                <i className="bi bi-telephone" />
                <h3>Call Us</h3>
                <p>+1 5589 55488 55</p>
                <p>+1 6678 254445 41</p>
              </div>
            </div>{/* End Info Item */}
            <div className="col-md-6">
              <div className="info-item" data-aos="fade" data-aos-delay={400}>
                <i className="bi bi-envelope" />
                <h3>Email Us</h3>
                <p>info@example.com</p>
                <p>contact@example.com</p>
              </div>
            </div>{/* End Info Item */}
            <div className="col-md-6">
              <div className="info-item" data-aos="fade" data-aos-delay={500}>
                <i className="bi bi-clock" />
                <h3>Open Hours</h3>
                <p>Monday - Friday</p>
                <p>9:00AM - 05:00PM</p>
              </div>
            </div>{/* End Info Item */}
          </div>
        </div>
        <div className="col-lg-6">
          <form action="forms/contact.php" method="post" className="php-email-form" data-aos="fade-up" data-aos-delay={200}>
            <div className="row gy-4">
              <div className="col-md-6">
                <input type="text" name="name" className="form-control" placeholder="Your Name" required />
              </div>
              <div className="col-md-6 ">
                <input type="email" className="form-control" name="email" placeholder="Your Email" required />
              </div>
              <div className="col-12">
                <input type="text" className="form-control" name="subject" placeholder="Subject" required />
              </div>
              <div className="col-12">
                <textarea className="form-control" name="message" rows={6} placeholder="Message" required defaultValue={""} />
              </div>
              <div className="col-12 text-center">
                <div className="loading">Loading</div>
                <div className="error-message" />
                <div className="sent-message">Your message has been sent. Thank you!</div>
                <button type="submit">Send Message</button>
              </div>
            </div>
          </form>
        </div>{/* End Contact Form */}
      </div>
    </div>
  </section>{/* /Contact Section */}
</main>


  );
}

export default Content
