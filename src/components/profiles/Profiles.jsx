import React, { Fragment, useEffect } from "react";
import { PropTypes } from "prop-types";
import { TailSpin } from "react-loader-spinner";
import { connect } from "react-redux";
import { getAllProfiles } from "../../actions/profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileItem from "./ProfileItem";
import { Button } from "reactstrap";
import axios from "axios";
import { BASE_URL } from "../../config/default";
import { exportToExcel } from "react-json-to-excel";

const Profiles = ({
  getAllProfiles: getProfiles,
  profile: { profiles, loading },
}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const downloadAcademicData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/api/profile/getAllAcademicInfo");
      const data = res.data
        ? res.data.map((d) => ({
            Name: d.user.name,
            "semester 1 sgpa": d.academics?.semester1sgpa,
            "semester 2 sgpa": d.academics?.semester2sgpa,
            "semester 3 sgpa": d.academics?.semester3sgpa,
            "semester 4 sgpa": d.academics?.semester4sgpa,
            "semester 5 sgpa": d.academics?.semester5sgpa,
            "semester 6 sgpa": d.academics?.semester6sgpa,
            "semester 7 sgpa": d.academics?.semester7sgpa,
            "semester 8 sgpa": d.academics?.semester8sgpa,
            "Current Semester": d.academics.currentsemester
              ? d.academics.currentsemester
              : "Not available",
            Scholarship: d.academics.scholarship,
            "Fee paid": d.academics.fee,
          }))
        : [];

      exportToExcel(data, "Academic report");

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

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
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <div>
              <h1 className="large text-info" style={{ float: "left" }}>
                Developers
              </h1>
            </div>
            <div></div>
            <div className="my-auto" style={{ float: "right" }}>
              <Button
                onClick={downloadAcademicData}
                style={{ marginRight: "0" }}
              >
                Download Academic data
              </Button>
            </div>
          </div>
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
