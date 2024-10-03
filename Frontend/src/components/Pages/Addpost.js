/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import Home from "../Dashboard/Home.js";
import AuthContext from "../../context/AuthContext.js";
const PostContent = () => {
  let { userData } = useContext(AuthContext);
  console.log("userData", userData);
  return (
    <>
      {/* Content Wrapper. Contains page content */}

 
  {/* Main content */}
 {/* Main content */}
<section className="content">
  <div className="container-fluid">
    <div className="row">
      {/* left column */}
      <div className="col-md-6">
        {/* general form elements */}
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Quick Example</h3>
          </div>
          {/* /.card-header */}
          {/* form start */}
          <form>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputFile">File input</label>
                <div className="input-group">
                  <div className="custom-file">
                    <input type="file" className="custom-file-input" id="exampleInputFile" />
                    <label className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                  </div>
                  <div className="input-group-append">
                    <span className="input-group-text">Upload</span>
                  </div>
                </div>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
              </div>
            </div>
            {/* /.card-body */}
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
       
      </div>
      
    </div>
    {/* /.row */}
  </div>{/* /.container-fluid */}
</section>
{/* /.content */}

  


    </>
  );
};

const Addpost = () => {
  return (
    
    <Home DynamicContent={PostContent} url="add-post" heading="Add Post" />
  );
};

export default Addpost;
