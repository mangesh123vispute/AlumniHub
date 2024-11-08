import {React, useEffect} from "react";
import Footer from "./Footer";
import Header from "./Header";
import SideNav from "./SideNav";
import AddAdmin from "../Pages/AddAdmin";

const Home = ({ DynamicContent, url, heading = "Dashboard" }) => {
  

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
                <h1 className="m-0">{heading}</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active">
                    {url ? url : "Home"}
                  </li>
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
            <hr style={{ marginBottom: "10px", borderWidth: "2px" }}></hr>
            {/* Render the dynamic content passed as a prop */}
            {DynamicContent ? <DynamicContent /> : null}
            <hr
              style={{
                marginBottom: "10px",
                marginTop: "10px",
                borderWidth: "2px",
              }}
            ></hr>
          </div>
        </section>
      </div>
      <AddAdmin/>
      <Footer />
    </div>
  );
};

export default Home;
