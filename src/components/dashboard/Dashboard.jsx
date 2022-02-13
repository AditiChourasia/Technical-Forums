import React, { Fragment, useEffect } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getCurrentProfile, deleteAccount } from "./../../actions/profile";
import { TailSpin } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "reactstrap";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = (props) => {
  const {
    auth: { user, isAuthenticated, loading },
    profile: { profile },
  } = props;

  useEffect(() => {
    if (isAuthenticated || loading) props.getCurrentProfile();
  }, [getCurrentProfile]);

  if (!isAuthenticated && !loading) return <Navigate to="/login" />;

  if (loading)
    return (
      <div className="d-flex" style={{ height: "80vh" }}>
        <div className="mx-auto my-auto">
          <TailSpin color="#17a2b8" height={40} width={40} />
        </div>
      </div>
    );

  return (
    <Fragment>
      <div className="container">
        <h2 className="large text-info">Dashboard</h2>
        <p className="lead">
          {" "}
          <FontAwesomeIcon icon={["fas", "user"]} />
          <strong className="ml-2">Welcome {user && user.name}</strong>
        </p>
        {profile !== null ? (
          <div>
            <DashboardActions />
            <div style={{ height: "3rem" }} />
            <Experience experience={profile.experience || []} />
            <div style={{ height: "3rem" }} />
            <Education education={profile.education || []} />
          </div>
        ) : (
          <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <NavLink to="/create-profile">
              <Button className="info" color="info">
                Create Profile
              </Button>
            </NavLink>
          </Fragment>
        )}
        <div className="my-2">
          <Button
            className="btn btn-danger"
            onClick={() => props.deleteAccount()}
          >
            Delete Account
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
