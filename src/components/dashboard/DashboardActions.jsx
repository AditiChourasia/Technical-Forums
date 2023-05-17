import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardActions = (props) => {
  return (
    <div className="dash-buttons">
      <NavLink to="/edit-profile" className="btn btn-light">
        <FontAwesomeIcon icon={["fas", "user-circle"]} color="#17a2b8" /> Edit
        Profile
      </NavLink>
      <NavLink to="/add-experience" className="btn btn-light">
        <FontAwesomeIcon icon={["fab", "black-tie"]} color="#17a2b8" /> Add
        Experience
      </NavLink>
      <NavLink to="/add-education" className="btn btn-light">
        <FontAwesomeIcon icon={["fas", "graduation-cap"]} color="#17a2b8" /> Add
        Education
      </NavLink>
      <NavLink to="/add-academics" className="btn btn-light">
        <FontAwesomeIcon icon={["fas", "book"]} color="#17a2b8" /> Add Academics
      </NavLink>
    </div>
  );
};

export default DashboardActions;
