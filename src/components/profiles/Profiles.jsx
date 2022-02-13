import React, { Fragment, useEffect } from "react";
import { PropTypes } from "prop-types";
import { TailSpin } from "react-loader-spinner";
import { connect } from "react-redux";
import { getAllProfiles } from "../../actions/profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileItem from "./ProfileItem";

const Profiles = ({
  getAllProfiles: getProfiles,
  profile: { profiles, loading },
}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <div className="container">
      {loading ? (
        <div className="d-flex" style={{ height: "70vh" }}>
          <div className="mx-auto my-auto">
            <TailSpin color="#17a2b8" height={40} width={40} />
          </div>
        </div>
      ) : (
        <Fragment>
          <h1 className="large text-info">Developers</h1>
          <p className="lead">
            <FontAwesomeIcon
              style={{ marginRight: "0.5rem" }}
              icon={["fab", "connectdevelop"]}
            />
            Browse and connect with developers
          </p>
          <div className="profiles">
            {profiles && profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No Profiles found</h4>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getAllProfiles })(Profiles);
