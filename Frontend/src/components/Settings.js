import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import SideNav from "./SideNav";
function Settings() {
  return (
    <>
      <div>
        <Header />
        <SideNav />
        <div className="wrapper">
          <div
            className="content-wrapper"
            style={{ color: "black", textAlign: "center" }}
          >
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">
                  
                  <div className="card card-primary">
                    <div className="card-header">
                      <h3 className="card-title">Edit Profile</h3>
                    </div>
                    <form
                      action="/api/settings"
                      method="post"
                      id="settings-form"
                    >
                      
                      <div className="card-body">
                        <div className="form-group">
                          <label htmlFor="first_name">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="first_name"
                            name="first_name"
                            placeholder="First Name"
                            defaultValue=""
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="last_name">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="last_name"
                            name="last_name"
                            placeholder="Last Name"
                            defaultValue=""
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Email"
                            readOnly
                            defaultValue=""
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="username">Username</label>
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            placeholder="Username"
                            readOnly
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <p className="login-box-msg text-danger" id="login-msg" />
                      <div className="card-footer row">
                        <div className="col-5 text-right">
                          <i
                            className="fas fa-spinner fa-pulse d-none"
                            id="settings-loading"
                            style={{ fontSize: 30 }}
                          />
                        </div>
                        <div className="col-7">
                          <button
                            type="submit"
                            className="btn btn-success btn-block"
                            id="settings-submit"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card card-primary">
                    <div className="card-header">
                      <h3 className="card-title">Reset Password</h3>
                    </div>
                    <form action="/accounts/reset_password" method="get">
                      
                      <div className="card-footer text-center">
                        <button type="submit" className="btn btn-danger w-75">
                          Want to Reset Password ?
                        </button>
                      </div>
                    </form>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Settings;
