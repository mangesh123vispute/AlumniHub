/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import SideNav from "./SideNav";
const Home = () => {
  return (
    <div className="bg-white">
      <Header />
      <SideNav />
      {" "}
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Dashboard v1</li>
                </ol>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>

        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}

            <div className="row">
              <div className="col-lg-3 col-6" style={{ maxWidth: '300px', marginBottom: '20px' }}>
                {/* small box */}
                <div className="small-box bg-info">
                  <div className="inner" style={{ padding: '10px' }}>
                    <h3 style={{ fontSize: '18px' }}>Latest Uploaded Test</h3>
                    <p style={{ fontSize: '14px' }}>No Recent Upload</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-book" />
                  </div>
                  <a href="#" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-6" style={{ maxWidth: '300px', marginBottom: '20px' }}>
                {/* small box */}
                <div className="small-box bg-success">
                  <div className="inner" style={{ padding: '10px' }}>
                    <h3 style={{ fontSize: '18px' }}>In Progress Test</h3>
                    <p style={{ fontSize: '14px' }}>No Recent Process</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-file-alt" />
                  </div>
                  <a href="#" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-6" style={{ maxWidth: '300px', marginBottom: '20px' }}>
                {/* small box */}
                <div className="small-box bg-warning">
                  <div className="inner" style={{ padding: '10px' }}>
                    <h3 style={{ fontSize: '18px' }}>Recent Solved Test</h3>
                    <p style={{ fontSize: '14px' }}>Recent Solved Test</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-check-circle" />
                  </div>
                  <a href="#" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
            </div>

          </div>


          {/* Calendar */}
          <div className="row">
            <section className="col-lg-7 connectedSortable">
              {/* Calendar */}
              <div className="card bg-gradient-success">
                <div className="card-header border-0">
                  <h3 className="card-title">
                    <i className="far fa-calendar-alt" />
                    Calendar
                  </h3>
                  <div className="card-tools">
                    {/* Button with dropdown */}
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-success btn-sm dropdown-toggle"
                        data-toggle="dropdown"
                        data-offset={-52}
                      >
                        <i className="fas fa-bars" />
                      </button>
                      <div className="dropdown-menu" role="menu">
                        <a href="#" className="dropdown-item">
                          Add new event
                        </a>
                        <a href="#" className="dropdown-item">
                          Clear events
                        </a>
                        <div className="dropdown-divider" />
                        <a href="#" className="dropdown-item">
                          View calendar
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      data-card-widget="collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      data-card-widget="remove"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
                <div className="card-body pt-0">
                  {/* Calendar content */}
                  <div id="calendar" style={{ width: "100%" }} />
                </div>
              </div>
            </section>
          </div>
        </section>

      </div>
      <Footer />
    </div>


  );
};

export default Home;
