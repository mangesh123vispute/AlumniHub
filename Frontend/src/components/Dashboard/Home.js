import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import SideNav from "./SideNav";

const Home = ({ DynamicContent }) => {
  return (
    <div className="bg-white">
      <Header />
      <SideNav />
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
            {/* Render the dynamic content passed as a prop */}
            {DynamicContent ? <DynamicContent /> : null}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
