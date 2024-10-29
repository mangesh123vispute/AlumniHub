import React, {
  useContext,
  useState,
  useEffect,
} from "react";
import AuthContext from "../../context/AuthContext.js";
import Home from "../Dashboard/Home.js";
import LoadingSpinner from "../Loading/Loading.js";
import Notification from "../Notification/Notification.js";

const Requests = () => {
      let {
        userData,
        setFilter,
        isOpen,
        message,
        icon,
        title,
        handleClose,
        loading,
        setIsAllAdminPage,
      } = useContext(AuthContext);
    const requestContent = () => {
      
        return (
          <>
            <section className="content">
              {/* Default box */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Alumni Connect Requests</h3>
                </div>
                <div className="card-body p-0">
                  <table className="table table-striped projects">
                    <thead>
                      <tr>
                        <th style={{ width: "1%" }}>#</th>
                        <th style={{ width: "20%" }}>Project Name</th>
                        <th style={{ width: "30%" }}>Team Members</th>
                        <th>Project Progress</th>
                        <th style={{ width: "8%" }} className="text-center">
                          Status
                        </th>
                        <th style={{ width: "20%" }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>#</td>
                        <td>
                          <a>AdminLTE v3</a>
                          <br />
                          <small>Created 01.01.2019</small>
                        </td>
                        <td>
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar.png"
                              />
                            </li>
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar2.png"
                              />
                            </li>
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar3.png"
                              />
                            </li>
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar4.png"
                              />
                            </li>
                          </ul>
                        </td>
                        <td className="project_progress">
                          <div className="progress progress-sm">
                            <div
                              className="progress-bar bg-green"
                              role="progressbar"
                              aria-valuenow={57}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: "57%" }}
                            ></div>
                          </div>
                          <small>57% Complete</small>
                        </td>
                        <td className="project-state">
                          <span className="badge badge-success">Success</span>
                        </td>
                        <td className="project-actions text-right">
                          <a className="btn btn-primary btn-sm" href="#">
                            <i className="fas fa-folder"></i>
                            View
                          </a>
                          <a className="btn btn-info btn-sm" href="#">
                            <i className="fas fa-pencil-alt"></i>
                            Edit
                          </a>
                          <a className="btn btn-danger btn-sm" href="#">
                            <i className="fas fa-trash"></i>
                            Delete
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>#</td>
                        <td>
                          <a>AdminLTE v3</a>
                          <br />
                          <small>Created 01.01.2019</small>
                        </td>
                        <td>
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar.png"
                              />
                            </li>
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar2.png"
                              />
                            </li>
                          </ul>
                        </td>
                        <td className="project_progress">
                          <div className="progress progress-sm">
                            <div
                              className="progress-bar bg-green"
                              role="progressbar"
                              aria-valuenow={47}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: "47%" }}
                            ></div>
                          </div>
                          <small>47% Complete</small>
                        </td>
                        <td className="project-state">
                          <span className="badge badge-success">Success</span>
                        </td>
                        <td className="project-actions text-right">
                          <a className="btn btn-primary btn-sm" href="#">
                            <i className="fas fa-folder"></i>
                            View
                          </a>
                          <a className="btn btn-info btn-sm" href="#">
                            <i className="fas fa-pencil-alt"></i>
                            Edit
                          </a>
                          <a className="btn btn-danger btn-sm" href="#">
                            <i className="fas fa-trash"></i>
                            Delete
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>#</td>
                        <td>
                          <a>AdminLTE v3</a>
                          <br />
                          <small>Created 01.01.2019</small>
                        </td>
                        <td>
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar.png"
                              />
                            </li>
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar2.png"
                              />
                            </li>
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar3.png"
                              />
                            </li>
                          </ul>
                        </td>
                        <td className="project_progress">
                          <div className="progress progress-sm">
                            <div
                              className="progress-bar bg-green"
                              role="progressbar"
                              aria-valuenow={77}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: "77%" }}
                            ></div>
                          </div>
                          <small>77% Complete</small>
                        </td>
                        <td className="project-state">
                          <span className="badge badge-success">Success</span>
                        </td>
                        <td className="project-actions text-right">
                          <a className="btn btn-primary btn-sm" href="#">
                            <i className="fas fa-folder"></i>
                            View
                          </a>
                          <a className="btn btn-info btn-sm" href="#">
                            <i className="fas fa-pencil-alt"></i>
                            Edit
                          </a>
                          <a className="btn btn-danger btn-sm" href="#">
                            <i className="fas fa-trash"></i>
                            Delete
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>#</td>
                        <td>
                          <a>AdminLTE v3</a>
                          <br />
                          <small>Created 01.01.2019</small>
                        </td>
                        <td>
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar.png"
                              />
                            </li>
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar2.png"
                              />
                            </li>
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar3.png"
                              />
                            </li>
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar4.png"
                              />
                            </li>
                          </ul>
                        </td>
                        <td className="project_progress">
                          <div className="progress progress-sm">
                            <div
                              className="progress-bar bg-green"
                              role="progressbar"
                              aria-valuenow={60}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: "60%" }}
                            ></div>
                          </div>
                          <small>60% Complete</small>
                        </td>
                        <td className="project-state">
                          <span className="badge badge-success">Success</span>
                        </td>
                        <td className="project-actions text-right">
                          <a className="btn btn-primary btn-sm" href="#">
                            <i className="fas fa-folder"></i>
                            View
                          </a>
                          <a className="btn btn-info btn-sm" href="#">
                            <i className="fas fa-pencil-alt"></i>
                            Edit
                          </a>
                          <a className="btn btn-danger btn-sm" href="#">
                            <i className="fas fa-trash"></i>
                            Delete
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>#</td>
                        <td>
                          <a>AdminLTE v3</a>
                          <br />
                          <small>Created 01.01.2019</small>
                        </td>
                        <td>
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar.png"
                              />
                            </li>
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar4.png"
                              />
                            </li>
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar5.png"
                              />
                            </li>
                          </ul>
                        </td>
                        <td className="project_progress">
                          <div className="progress progress-sm">
                            <div
                              className="progress-bar bg-green"
                              role="progressbar"
                              aria-valuenow={12}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: "12%" }}
                            ></div>
                          </div>
                          <small>12% Complete</small>
                        </td>
                        <td className="project-state">
                          <span className="badge badge-success">Success</span>
                        </td>
                        <td className="project-actions text-right">
                          <a className="btn btn-primary btn-sm" href="#">
                            <i className="fas fa-folder"></i>
                            View
                          </a>
                          <a className="btn btn-info btn-sm" href="#">
                            <i className="fas fa-pencil-alt"></i>
                            Edit
                          </a>
                          <a className="btn btn-danger btn-sm" href="#">
                            <i className="fas fa-trash"></i>
                            Delete
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>#</td>
                        <td>
                          <a>AdminLTE v3</a>
                          <br />
                          <small>Created 01.01.2019</small>
                        </td>
                        <td>
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar.png"
                              />
                            </li>
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar2.png"
                              />
                            </li>
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar3.png"
                              />
                            </li>
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar4.png"
                              />
                            </li>
                          </ul>
                        </td>
                        <td className="project_progress">
                          <div className="progress progress-sm">
                            <div
                              className="progress-bar bg-green"
                              role="progressbar"
                              aria-valuenow={35}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: "35%" }}
                            ></div>
                          </div>
                          <small>35% Complete</small>
                        </td>
                        <td className="project-state">
                          <span className="badge badge-success">Success</span>
                        </td>
                        <td className="project-actions text-right">
                          <a className="btn btn-primary btn-sm" href="#">
                            <i className="fas fa-folder"></i>
                            View
                          </a>
                          <a className="btn btn-info btn-sm" href="#">
                            <i className="fas fa-pencil-alt"></i>
                            Edit
                          </a>
                          <a className="btn btn-danger btn-sm" href="#">
                            <i className="fas fa-trash"></i>
                            Delete
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>#</td>
                        <td>
                          <a>AdminLTE v3</a>
                          <br />
                          <small>Created 01.01.2019</small>
                        </td>
                        <td>
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar4.png"
                              />
                            </li>
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar5.png"
                              />
                            </li>
                          </ul>
                        </td>
                        <td className="project_progress">
                          <div className="progress progress-sm">
                            <div
                              className="progress-bar bg-green"
                              role="progressbar"
                              aria-valuenow={87}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: "87%" }}
                            ></div>
                          </div>
                          <small>87% Complete</small>
                        </td>
                        <td className="project-state">
                          <span className="badge badge-success">Success</span>
                        </td>
                        <td className="project-actions text-right">
                          <a className="btn btn-primary btn-sm" href="#">
                            <i className="fas fa-folder"></i>
                            View
                          </a>
                          <a className="btn btn-info btn-sm" href="#">
                            <i className="fas fa-pencil-alt"></i>
                            Edit
                          </a>
                          <a className="btn btn-danger btn-sm" href="#">
                            <i className="fas fa-trash"></i>
                            Delete
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>#</td>
                        <td>
                          <a>AdminLTE v3</a>
                          <br />
                          <small>Created 01.01.2019</small>
                        </td>
                        <td>
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar.png"
                              />
                            </li>
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar3.png"
                              />
                            </li>
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar4.png"
                              />
                            </li>
                          </ul>
                        </td>
                        <td className="project_progress">
                          <div className="progress progress-sm">
                            <div
                              className="progress-bar bg-green"
                              role="progressbar"
                              aria-valuenow={77}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: "77%" }}
                            ></div>
                          </div>
                          <small>77% Complete</small>
                        </td>
                        <td className="project-state">
                          <span className="badge badge-success">Success</span>
                        </td>
                        <td className="project-actions text-right">
                          <a className="btn btn-primary btn-sm" href="#">
                            <i className="fas fa-folder"></i>
                            View
                          </a>
                          <a className="btn btn-info btn-sm" href="#">
                            <i className="fas fa-pencil-alt"></i>
                            Edit
                          </a>
                          <a className="btn btn-danger btn-sm" href="#">
                            <i className="fas fa-trash"></i>
                            Delete
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>#</td>
                        <td>
                          <a>AdminLTE v3</a>
                          <br />
                          <small>Created 01.01.2019</small>
                        </td>
                        <td>
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar.png"
                              />
                            </li>
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar3.png"
                              />
                            </li>
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar4.png"
                              />
                            </li>
                            <li className="list-inline-item">
                              <img
                                alt="Avatar"
                                className="table-avatar"
                                src="../../dist/img/avatar5.png"
                              />
                            </li>
                          </ul>
                        </td>
                        <td className="project_progress">
                          <div className="progress progress-sm">
                            <div
                              className="progress-bar bg-green"
                              role="progressbar"
                              aria-valuenow={77}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: "77%" }}
                            ></div>
                          </div>
                          <small>77% Complete</small>
                        </td>
                        <td className="project-state">
                          <span className="badge badge-success">Success</span>
                        </td>
                        <td className="project-actions text-right">
                          <a className="btn btn-primary btn-sm" href="#">
                            <i className="fas fa-folder"></i>
                            View
                          </a>
                          <a className="btn btn-info btn-sm" href="#">
                            <i className="fas fa-pencil-alt"></i>
                            Edit
                          </a>
                          <a className="btn btn-danger btn-sm" href="#">
                            <i className="fas fa-trash"></i>
                            Delete
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </section>
          </>
        );
  };

  return (
    <>
      <LoadingSpinner isLoading={loading} />
      <Notification
        message={message}
        isOpen={isOpen}
        onClose={handleClose}
        icon={icon}
        title={title}
      />
      <Home DynamicContent={requestContent} url="requests" heading="Requests" />
    </>
  );
};

export default Requests;
