import React from 'react';

function Reset_password() {
  return (
    <div className='container d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <a href className="h1"><b></b></a>
          </div>
          <div className="card-body">
            <h5 className="text-center" style={{color:'black'}}><b>Reset Password</b></h5>
            <p className="login-box-msg" id="reset-msg" />
            <form action="/api/accounts/reset_password" method="post" id="reset-form">

              <input type="text" className="form-control d-none" name="id" defaultValue="" required readOnly />
              <div className="input-group mb-3">
                <input type="password" className="form-control" placeholder="Password" name="password" id="password" required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-eye" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input type="password" className="form-control" placeholder="Confirm Password" name="retype_password" id="retype_password" required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-5 text-right">
                  <i className="fas fa-spinner fa-pulse d-none" id="reset-loading" style={{ fontSize: 30 }} />
                </div>
                <div className="col-7">
                  <button type="submit" className="btn btn-primary btn-block" id="reset-submit">Change password</button>
                </div>
              </div>
            </form>

            <p className="mt-3 mb-1" style={{color:'blue'}}>
              <a href="/settings">Back</a>
            </p>

            <p className="mt-3 mb-1" style={{color:'blue'}}>
              <a href="/accounts/login">Login</a>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Reset_password;
