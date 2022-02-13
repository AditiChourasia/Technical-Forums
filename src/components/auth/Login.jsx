import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "reactstrap";
import { Navigate, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "./../../actions/alert";
import { login } from "./../../actions/auth";
import { PropTypes } from "prop-types";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pwd: "",
    };
  }

  submitForm = async (e) => {
    e.preventDefault();
    const { pwd, email } = this.state;

    this.props.login(email, pwd);
  };

  render() {
    const { email, pwd } = this.state;
    const { submitForm } = this;

    if (this.props.isAuthenticated) {
      return <Navigate to="/dashboard" />;
    }

    return (
      <section className="container register">
        <h1 className="medium text-center">Sign In</h1>
        <p className="lead text-center">
          <FontAwesomeIcon icon={["fas", "user"]} />
          <span className="ml-3" style={{ marginLeft: "0.5rem" }}>
            {" "}
            Log Into Your Account
          </span>
        </p>
        <form className="form w-50 mx-auto" onSubmit={(e) => submitForm(e)}>
          <div className="form-group my-4">
            <Input
              type="email"
              name="email"
              required
              placeholder="Email address"
              style={{ fontSize: "1rem" }}
              value={email}
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
            />
          </div>
          <div className="form-group my-4">
            <Input
              type="password"
              name="password"
              required
              placeholder="Password"
              minLength="6"
              value={pwd}
              style={{ fontSize: "1rem" }}
              onChange={(e) => {
                this.setState({ pwd: e.target.value });
              }}
            />
          </div>

          <input
            type="submit"
            className="btn btn-info"
            value="Login"
            style={{ color: "white" }}
          />
          <p className="my-3">
            Don't have an account? <NavLink to="/register">Sign Up</NavLink>
          </p>
        </form>
      </section>
    );
  }
}
Login.protoTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, login })(Login);
