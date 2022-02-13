import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <NavLink to="/profiles">Developers</NavLink>
      </li>
      <li>
        <NavLink to="/posts">Questions</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">
          <FontAwesomeIcon icon={["fas", "user"]} />
          {"    "}
          <span className="hide-sm">Dashboard</span>
        </NavLink>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <NavLink to="/profiles">Developers</NavLink>
      </li>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <NavLink to="/">
          <FontAwesomeIcon icon={["fas", "code"]} /> Technical Forums
        </NavLink>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
