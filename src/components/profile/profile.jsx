import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { getProfileById } from "./../../actions/profile";
import { TailSpin } from "react-loader-spinner";
import { Navigate, NavLink, useParams } from "react-router-dom";
import { connect } from "react-redux";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const Profile = ({
  profile: { profile, loading },
  auth,
  getProfileById: getProfileOfUser,
}) => {
  const { id } = useParams();
  useEffect(() => {
    getProfileOfUser(id);
  }, [getProfileOfUser, id]);

  if (!auth.isAuthenticated && !auth.loading) return <Navigate to="/login" />;

  if (!profile)
    return (
      <div className="container">
        <div className="d-flex" style={{ height: "70vh" }}>
          <div className="mx-auto my-auto">
            <TailSpin color="#17a2b8" height={40} width={40} />
          </div>
        </div>
      </div>
    );

  return (
    <div className="container">
      {loading ? (
        <div className="d-flex" style={{ height: "70vh" }}>
          <div className="mx-auto my-auto">
            <TailSpin color="#17a2b8" height={40} width={40} />
          </div>
        </div>
      ) : (
        <div className="container">
          <NavLink to="/profiles" className="btn btn-light">
            Back To Profiles
          </NavLink>
          {auth.isAuthenticated &&
            auth.loading === false &&
            profile &&
            auth.user._id === profile.user._id && (
              <NavLink to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </NavLink>
            )}
          <div className="profile-grid">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white  p-2">
              <h2 className="text-info">Experience</h2>
              {profile.experience.length > 0 ? (
                profile.experience.map((exp) => (
                  <ProfileExperience key={exp._id} experience={exp} />
                ))
              ) : (
                <span>No experience credentials</span>
              )}
            </div>
            <div className="profile-edu bg-white  p-2">
              <h2 className="text-info">Education</h2>
              {profile.education.length > 0 ? (
                profile.education.map((edu) => (
                  <ProfileEducation key={edu._id} education={edu} />
                ))
              ) : (
                <span>No Education added</span>
              )}
            </div>
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProfileById })(Profile);
