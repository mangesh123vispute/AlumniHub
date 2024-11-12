import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext.js";

const AlumniFilter = () => {
  let { setAlumniFilters, Alumnifilters, toggelFilter } =
    useContext(AuthContext);
  const handleChange = (e) => {
    setAlumniFilters({ ...Alumnifilters, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    // Reset the Alumnifilters to an empty object or default values
    setAlumniFilters({});
    toggelFilter();
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setAlumniFilters(Alumnifilters);
  };

  return (
    <div
      className="p-3"
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
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
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.2rem",
          fontWeight: "bold",
          cursor: "pointer",
          width: "100%",
          margin: "auto",
        }}
      >
        <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          Filter All Alumni
        </span>
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
            value={Alumnifilters.full_name || ""}
            onChange={handleChange}
            style={{ marginBottom: "0.5em" }}
            placeholder="Enter Full Name"
          />
        </div>

        {/* Branch */}
        <div>
          <label>Branch:</label>
          <input
            type="text"
            className="form-control"
            name="Branch"
            value={Alumnifilters.Branch || ""}
            onChange={handleChange}
            style={{ marginBottom: "0.5em" }}
            placeholder="Enter Branch"
          />
        </div>

        {/* Education */}
        <div>
          <label>Education:</label>
          <input
            type="text"
            className="form-control"
            name="Education"
            value={Alumnifilters.Education || ""}
            onChange={handleChange}
            style={{ marginBottom: "0.5em" }}
            placeholder="Enter Education"
          />
        </div>

        <div className="form-row">
          <label className="ml-1">Graduation Year</label>
          <input
            type="number"
            className="form-control col-5 mr-2 ml-1"
            name="graduation_year_min"
            value={Alumnifilters.graduation_year_min || ""}
            onChange={handleChange}
            style={{ marginBottom: "0.5em" }}
            placeholder="Min"
            min={1990}
            max={2100}
          />
          <input
            type="number"
            className="form-control col-5"
            name="graduation_year_max"
            value={Alumnifilters.graduation_year_max || ""}
            onChange={handleChange}
            style={{ marginBottom: "0.5em" }}
            placeholder="Max"
            min={1990}
            max={2100}
          />
        </div>
        {/* Current Company */}
        <div>
          <label>Current Company:</label>
          <input
            type="text"
            className="form-control"
            name="current_company_name"
            value={Alumnifilters.current_company_name || ""}
            onChange={handleChange}
            style={{ marginBottom: "0.5em" }}
            placeholder="Enter Current Company "
          />
        </div>
        <div>
          <label>Previous companies:</label>
          <input
            type="text"
            className="form-control"
            name="previous_companies"
            value={Alumnifilters.previous_companies || ""}
            onChange={handleChange}
            style={{ marginBottom: "0.5em" }}
            placeholder="Enter Previous Companies"
          />
        </div>

        {/* Job Title */}
        <div>
          <label>Job Title:</label>
          <input
            type="text"
            className="form-control"
            name="job_title"
            value={Alumnifilters.job_title || ""}
            onChange={handleChange}
            style={{ marginBottom: "0.5em" }}
            placeholder="Enter Job Title"
          />
        </div>

        {/* Years of Experience Max */}
        <div className="form-row ">
          <label className="ml-1">Years of Experience</label>
          <input
            type="number"
            className="form-control col-5 mr-2 ml-1"
            name="years_of_experience_min"
            value={Alumnifilters.years_of_experience_min || ""}
            onChange={handleChange}
            style={{ marginBottom: "0.5em" }}
            placeholder="Min"
            min={0}
            max={100}
          />
          <input
            type="number"
            className="form-control col-5"
            name="years_of_experience_max"
            value={Alumnifilters.years_of_experience_max || ""}
            onChange={handleChange}
            style={{ marginBottom: "0.5em" }}
            placeholder="Max"
            min={0}
            max={100}
          />
        </div>

        {/* Current City */}
        <div>
          <label>Current City:</label>
          <input
            type="text"
            className="form-control"
            name="current_city"
            value={Alumnifilters.current_city || ""}
            onChange={handleChange}
            style={{ marginBottom: "0.5em" }}
            placeholder="Enter Current City"
          />
        </div>
        {/* Current Country */}
        <div>
          <label>Current Country:</label>
          <input
            type="text"
            className="form-control"
            name="current_country"
            value={Alumnifilters.current_country || ""}
            onChange={handleChange}
            style={{ marginBottom: "0.5em" }}
            placeholder="Enter Current Country"
          />
        </div>
        {/* Industry */}
        <div>
          <label>Industry:</label>
          <input
            type="text"
            className="form-control"
            name="industry"
            value={Alumnifilters.industry || ""}
            onChange={handleChange}
            style={{ marginBottom: "0.5em" }}
            placeholder="Enter Industry"
          />
        </div>

        {/* Skills (Normal Input) */}
        <div>
          <label>Skills:</label>
          <input
            className="form-control"
            type="text"
            name="skills"
            value={Alumnifilters.skills || ""}
            onChange={handleChange}
            style={{ marginBottom: "0.5em" }}
            placeholder="Enter Skills"
          />
        </div>

        <div>
          <label htmlFor="preferred_contact_method">Preferred Contact:</label>
          <div>
            <select
              className="form-control"
              id="preferred_contact_method"
              name="preferred_contact_method"
              value={Alumnifilters.preferred_contact_method || ""}
              onChange={handleChange}
            >
              <option value="" disabled>
                Preferred Contact
              </option>
              <option value="email">Email</option>
              <option value="mobile">Mobile</option>
              <option value="linkedin">LinkedIn</option>
              <option value="instagram">Instagram</option>
            </select>
          </div>
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
          style={{ width: "100%", height: "2.5em" }}
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

export default AlumniFilter;
