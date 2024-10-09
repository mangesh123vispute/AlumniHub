import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import Home from "../Dashboard/Home.js";
import AuthContext from "../../context/AuthContext.js";
import LoadingSpinner from "../Loading/Loading.js";
import Notification from "../Notification/Notification.js";
import { useNavigate } from "react-router-dom";

const AllAlumnisContent = () => {
    const [alumni, setAlumni] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [Loading, setLoading] = useState(false);
    const {
        isOpen,
        message,
        icon,
        title,
        showNotification,
        handleClose,
      } = useContext(AuthContext);

 
    const fetchAlumni = async () => {
     const token = localStorage.getItem("authTokens")
       ? JSON.parse(localStorage.getItem("authTokens"))
       : null;
   try {
     const response = await axios.get("http://127.0.0.1:8000/getalumni/", {
       headers: { Authorization: `Bearer ${token?.access}` }, 
     });
     setAlumni(response.data); 
     setLoading(false);
   } catch (err) {
     console.error("Error fetching alumni: ", err);
     setError(err.message);
     setLoading(false);
   }
 };

 // Fetch alumni on component mount
 useEffect(() => {
   
     fetchAlumni();
   
 }, []);
  return (
    <div>
      <LoadingSpinner isLoading={Loading} />
      <Notification
        message={message}
        isOpen={isOpen}
        onClose={handleClose}
        icon={icon}
        title={title}
      />
      <section className="content">
        {/* Default box */}
        <div className="card card-solid">
          <div className="card-body pb-0">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
                <div className="card bg-light d-flex flex-fill">
                  <div className="card-header text-muted border-bottom-0">
                    Digital Strategist
                  </div>
                  <div className="card-body pt-0">
                    <div className="row">
                      <div className="col-7">
                        <h2 className="lead">
                          <b>Nicole Pearson</b>
                        </h2>
                        <p className="text-muted text-sm">
                          <b>About: </b> Web Designer / UX / Graphic Artist /
                          Coffee Lover{" "}
                        </p>
                        <ul className="ml-4 mb-0 fa-ul text-muted">
                          <li className="small">
                            <span className="fa-li">
                              <i className="fas fa-lg fa-building" />
                            </span>{" "}
                            Address: Demo Street 123, Demo City 04312, NJ
                          </li>
                          <li className="small">
                            <span className="fa-li">
                              <i className="fas fa-lg fa-phone" />
                            </span>{" "}
                            Phone #: + 800 - 12 12 23 52
                          </li>
                        </ul>
                      </div>
                      <div className="col-5 text-center">
                        <img
                          src="../../dist/img/user1-128x128.jpg"
                          alt="user-avatar"
                          className="img-circle img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="text-right">
                      <a href="#" className="btn btn-sm btn-primary">
                        <i className="fas fa-user" /> View Profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /.card-body */}
          <div className="card-footer">
            <nav aria-label="Contacts Page Navigation">
              <ul className="pagination justify-content-center m-0">
                <li className="page-item active">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    4
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    5
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    6
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    7
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    8
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          {/* /.card-footer */}
        </div>
        {/* /.card */}
      </section>
    </div>
  );
}

const AllAlumnis = () => {
  return (
    <Home DynamicContent={AllAlumnisContent} url="all_alumnis" heading="All Alumnis" />
  );
};

export default AllAlumnis
