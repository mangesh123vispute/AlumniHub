import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext.js";

const StudentFilter = () => {
  let { setStudentFilters, studentFilters, toggelFilter } =
    useContext(AuthContext);

  const handleChange = (e) => {
    setStudentFilters({ ...studentFilters, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setStudentFilters({});
    toggelFilter();
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setStudentFilters(studentFilters);
  };

  return (
    <div
      className="p-3"
      style={{ height: "90vh", overflowY: "auto", overflowX: "hidden" }}
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
        Filter All Students
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
            value={studentFilters.full_name || ""}
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
            value={studentFilters.Branch || ""}
            onChange={handleChange}
            placeholder="Enter Branch"
            style={{ marginBottom: "0.5em" }}
          />
        </div>

        {/* Education */}
        <div>
          <label>Education:</label>
          <input
            type="text"
            className="form-control"
            name="Education"
            value={studentFilters.Education || ""}
            onChange={handleChange}
            placeholder="Enter Education"
            style={{ marginBottom: "0.5em" }}
          />
        </div>

        {/* Graduation Year */}
        <div className="form-row" style={{ marginBottom: "0.5em" }}>
          <label className="ml-1">Graduation Year:</label>
          <input
            type="number"
            className="form-control col-5 mr-2 ml-1"
            name="graduation_year_min"
            value={studentFilters.graduation_year_min || ""}
            onChange={handleChange}
            placeholder="Min"
            min={1990}
            max={2100}
          />
          <input
            type="number"
            className="form-control col-5"
            name="graduation_year_max"
            value={studentFilters.graduation_year_max || ""}
            onChange={handleChange}
            placeholder="Max"
            min={1990}
            max={2100}
          />
        </div>

        {/* Skills */}
        <div>
          <label>Skills:</label>
          <input
            type="text"
            className="form-control"
            name="skills"
            value={studentFilters.skills || ""}
            onChange={handleChange}
            placeholder="Enter Skills"
            style={{ marginBottom: "0.5em" }}
          />
        </div>

        {/* Heading */}
        <div>
          <label>Heading:</label>
          <input
            type="text"
            className="form-control"
            name="Heading"
            value={studentFilters.Heading || ""}
            onChange={handleChange}
            placeholder="Enter Heading"
            style={{ marginBottom: "0.5em" }}
          />
        </div>

        {/* Current Year of Study */}
        <div className="form-row" style={{ marginBottom: "0.5em" }}>
          <label className="ml-1">Current Year of Study:</label>
          <input
            type="number"
            className="form-control col-5 mr-2 ml-1"
            name="current_year_of_study_min"
            value={studentFilters.current_year_of_study_min || ""}
            onChange={handleChange}
            placeholder="Min"
            min={1}
            max={4}
          />
          <input
            type="number"
            className="form-control col-5"
            name="current_year_of_study_max"
            value={studentFilters.current_year_of_study_max || ""}
            onChange={handleChange}
            placeholder="Max"
            min={1}
            max={4}
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

export default StudentFilter;
