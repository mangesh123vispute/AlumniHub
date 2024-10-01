import React, { useContext } from "react";
import Home from "../Dashboard/Home.js";
import AuthContext from "../../context/AuthContext.js";

const ErrorContent = () => {
    return (
      <div>
        {/* Main content */}
        <section className="content">
          <div className="error-page">
            <h2 className="headline text-warning"> 404</h2>
            <div className="error-content">
              <h3>
                <i className="fas fa-exclamation-triangle text-warning" /> Oops!
                Page not found.
              </h3>
              <p>
                We could not find the page you were looking for. Meanwhile, you
                may{" "}
                <span className="text-primary">
                  <a href="/home">return to dashboard</a>
                </span>{" "}
                or try using the search form.
              </p>
            </div>
            {/* /.error-content */}
          </div>
          {/* /.error-page */}
        </section>
        {/* /.content */}
      </div>
    );
};

const Error = () => {
  return <Home DynamicContent={ErrorContent} url="404 Error" heading="404 Error" />;
};
export default Error;
