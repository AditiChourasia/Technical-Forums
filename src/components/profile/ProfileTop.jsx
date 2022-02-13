import React, { Fragment } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TailSpin } from "react-loader-spinner";

const ProfileTop = ({ profile }) => {
  const isValidHttpUrl = (string) => {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  };

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
    <div className="profile-top bg-info p-2">
      <img
        className="round-img my-1"
        style={{ height: "10rem", width: "10rem" }}
        src={profile.user.avatar}
        alt=""
      />
      <h1 className="large">{profile.user.name}</h1>
      <p className="lead">
        <strong>
          {profile.status} at {profile.company}
        </strong>
      </p>
      <p>{profile.location}</p>
      <div className="icons my-1">
        {isValidHttpUrl(profile.website) && (
          <a href={profile.website} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={["fas", "globe"]} />
          </a>
        )}
        {profile.social && (
          <Fragment>
            {profile.social.twitter && (
              <a
                href={profile.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={["fab", "twitter"]} />
              </a>
            )}
            {profile.social.facebook && (
              <a
                href={profile.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={["fab", "facebook"]} />
              </a>
            )}
            {profile.social.linkedin && (
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={["fab", "linkedin"]} />
              </a>
            )}
            {profile.social.youtube && (
              <a
                href={profile.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={["fab", "youtube"]} />
              </a>
            )}
            {profile.social.instagram && (
              <a
                href={profile.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={["fab", "instagram"]} />
              </a>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = { profile: PropTypes.object.isRequired };

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {})(ProfileTop);
