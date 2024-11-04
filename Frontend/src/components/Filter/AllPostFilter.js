import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext.js";

const AllPostFilter = () => {
  let { setPostFilters, postFilters, toggelFilter } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setPostFilters({
      ...postFilters,
      [name]: type === "checkbox" ? checked : value,
    });
  };


  const handleReset = () => {
    setPostFilters({});
    toggelFilter();
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setPostFilters(postFilters);
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
        Filter All Posts
      </div>
      <hr
        style={{
          marginTop: "1em",
          marginBottom: "1em",
          border: "2px solid white",
        }}
      ></hr>
      <form onSubmit={handleFilter}>
        {/* Author */}
        <div>
          <label>Author:</label>
          <input
            type="text"
            className="form-control"
            name="full_name"
            value={postFilters.full_name || ""}
            onChange={handleChange}
            placeholder="Enter Author Name"
            style={{ marginBottom: "0.5em" }}
          />
        </div>

        {/* Tag */}
        <div>
          <label>Tag:</label>
          <input
            type="text"
            className="form-control"
            name="tag"
            value={postFilters.tag || ""}
            onChange={handleChange}
            placeholder="Enter Tag"
            style={{ marginBottom: "0.5em" }}
          />
        </div>

        {/* Title */}
        <div>
          <label>Title:</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={postFilters.title || ""}
            onChange={handleChange}
            placeholder="Enter Post Title"
            style={{ marginBottom: "0.5em" }}
          />
        </div>

        <div>
          <label>Date From:</label>
          <input
            type="date"
            className="form-control"
            name="date_min"
            value={postFilters.created_at_min || ""}
            onChange={(e) =>
              setPostFilters({ ...postFilters, created_at_min: e.target.value })
            }
            style={{ marginBottom: "0.5em" }}
          />
        </div>

        <div>
          <label>Date To:</label>
          <input
            type="date"
            className="form-control"
            name="date_max"
            value={postFilters.created_at_max || ""}
            onChange={(e) =>
              setPostFilters({ ...postFilters, created_at_max: e.target.value })
            }
            style={{ marginBottom: "0.5em" }}
          />
        </div>

        <div className="form-group mt-3">
          {/* Is Alumni Option */}
          <div className="col-sm-12">
            <button
              type="button"
              className={`btn ${
                postFilters.is_alumni ? "btn-success" : "btn-outline-secondary"
              } btn-sm btn-block`}
              onClick={() =>
                setPostFilters({
                  ...postFilters,
                  is_alumni: true, // Set is_alumni to true
                  is_superuser: false, // Set is_superuser to false
                })
              }
              style={{
                marginBottom: "0.3em",
                fontWeight: "normal",
                fontSize: "0.875rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {postFilters.is_alumni ? (
                <>
                  <i className="fas fa-user-graduate mr-1"></i> Alumni
                </>
              ) : (
                <>Only Alumni</>
              )}
            </button>
          </div>

          {/* Is Superuser Option */}
          <div className="col-sm-12">
            <button
              type="button"
              className={`btn ${
                postFilters.is_superuser
                  ? "btn-primary"
                  : "btn-outline-secondary"
              } btn-sm btn-block`}
              onClick={() =>
                setPostFilters({
                  ...postFilters,
                  is_alumni: false, // Set is_alumni to false
                  is_superuser: true, // Set is_superuser to true
                })
              }
              style={{
                marginBottom: "0.3em",
                fontWeight: "normal",
                fontSize: "0.875rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {postFilters.is_superuser ? (
                <>
                  <i className="fas fa-shield-alt mr-1"></i> Admin
                </>
              ) : (
                <>
                  <i className="far fa-shield mr-1"></i> Only Admin
                </>
              )}
            </button>
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

export default AllPostFilter;
