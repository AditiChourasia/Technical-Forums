import React, { Fragment } from "react";
import { PropTypes } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TailSpin } from "react-loader-spinner";

const ProfileAbout = ({ profile }) => {
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
    <div className="profile-about bg-light p-2 border-0">
      {profile.bio && (
        <Fragment>
          <h3 className="text-info">About The Person</h3>
          <p>{profile.bio}</p>
        </Fragment>
      )}

      <div className="line"></div>
      {profile.skills.length > 0 && (
        <div className="border-0">
          {" "}
          <h3 className="text-info">Skill Set</h3>
          <div className="skills">
            {profile.skills.map((skill) => (
              <div key={skill} className="p-1 m-2">
                <FontAwesomeIcon
                  className="text-info"
                  //   size="sm"
                  icon={["fas", "check-circle"]}
                />{" "}
                {skill}
              </div>
            ))}
          </div>
        </div>
      )}
      {profile.academics && (
        <div className="border-0">
          {" "}
          <h3 className="text-info">Academics</h3>
          <div className="Academics">
            <label>Current Semester: </label>
            {profile.academics.currentsemester}
            <br />
            <label>Current Cgpa: </label>
            {profile.academics.currentcgpa}
          </div>
        </div>
      )}
    </div>
  );
};

ProfileAbout.propTypes = { profile: PropTypes.object.isRequired };
export default ProfileAbout;
