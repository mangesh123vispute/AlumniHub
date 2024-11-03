import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext.js";

const AdminFilter = () => {
  let { setHODFilters, hodFilters, toggelFilter } = useContext(AuthContext);

  const handleChange = (e) => {
    setHODFilters({ ...hodFilters, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setHODFilters({});
  toggelFilter()
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setHODFilters(hodFilters);
  };

  return (
    <div
      className="p-3"
      style={{ height: "90%", overflowY: "auto", overflowX: "hidden" }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "10px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          color: "black",
          textAlign: "center",
          borderRadius: "8px",
          marginBottom: "10px",
          fontWeight: "bold",
        }}
      >
        Filter All HODs
      </div>
      <hr
        style={{
          marginTop: "1em",
          marginBottom: "1em",
          border: "2px solid white",
        }}
      ></hr>
      <form onSubmit={handleFilter}>
        {/* Full Name */}
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            className="form-control"
            name="full_name"
            value={hodFilters.full_name || ""}
            onChange={handleChange}
            placeholder="Enter Full Name"
            style={{ marginBottom: "0.5em" }}
          />
        </div>

        {/* Branch */}
        <div>
          <label>Branch:</label>
          <input
            type="text"
            className="form-control"
            name="Branch"
            value={hodFilters.Branch || ""}
            onChange={handleChange}
            placeholder="Enter Branch"
            style={{ marginBottom: "0.5em" }}
          />
        </div>

        {/* Designation */}
        <div>
          <label>Designation:</label>
          <input
            type="text"
            className="form-control"
            name="designation"
            value={hodFilters.designation || ""}
            onChange={handleChange}
            placeholder="Enter Designation"
            style={{ marginBottom: "0.5em" }}
          />
        </div>

        <hr
          style={{
            marginTop: "1em",
            marginBottom: "1em",
            border: "1px solid white",
          }}
        ></hr>
        <button
          type="submit"
          className="btn btn-primary mb-2"
          onClick={toggelFilter}
          style={{
            width: "100%",
          }}
        >
          Filter
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleReset}
          style={{
            width: "100%",
          }}
        >
          Reset
        </button>
        <hr
          style={{
            marginTop: "1em",
            marginBottom: "1em",
            border: "1px solid white",
          }}
        ></hr>
      </form>
    </div>
  );
};

export default AdminFilter;
