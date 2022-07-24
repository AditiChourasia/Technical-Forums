import React from "react";
import { Navigate, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

const Landing = ({ auth }) => {
  if (auth.isAuthenticated) return <Navigate to="/dashboard" />;
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">RGPV Student Forums</h1>
          <p className="lead">
            Create a profile, ask questions and get help from other technical
            enthusiasts.
          </p>
          <p className="lead">
            Education, experience, other social media links all at one profile.
          </p>
          <div className="buttons">
            <NavLink to="/register" className="btn btn-info">
              Sign Up
            </NavLink>
            <NavLink to="/login" className="btn btn-light">
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Landing);
