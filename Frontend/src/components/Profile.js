import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import SideNav from "./SideNav";

function Profile() {
  return (
    <>
      <Header />
      <SideNav />

      <div className="wrapper">
        <div className="content-wrapper">
          <section className="content-header bg-white">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6 text-black">
                  <h1>Profile</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active">User Profile</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <div className="card card-primary card-outline">
                  <div className="card-body box-profile">
                    <div className="text-center">
                      <img
                        className="profile-user-img img-fluid img-circle"
                        src="../../dist/img/user4-128x128.jpg"
                        alt="User profile picture"
                      />
                    </div>
                    <h3 className="profile-username text-center " style={{color:"black"}} >
                     User Name 
                    </h3>
                    <p className="text-muted text-center"></p>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header p-2">
                    <ul className="nav nav-pills">
                      <li className="nav-item"><a className="nav-link active" href="#about" data-toggle="tab">About</a></li>
                    </ul>
                  </div>
                  <div className="card-body" style={{color:"black"}}>
                    <div className="tab-content">
                      <div className="active tab-pane" id="about">
                        <div className="card-body">
                          <strong><i className="fas fa-user mr-1" /> Name</strong>
                          <p className="text-muted">
                            
                          </p>
                          <hr />
                          <strong><i className="fas fa-envelope mr-1" /> Email</strong>
                          <p className="text-muted">

                          </p>
                          <hr />
                          <p className="text-muted text-right mt-3">
                            <a href="/settings" className="btn btn-danger">Edit Details</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>         
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
