import React from "react";
import Moment from "react-moment";
import { TailSpin } from "react-loader-spinner";

const ProfileExperience = ({ experience: exp }) => {
  if (!exp)
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
    <div className="m-0 pb-0">
      <h3 className="text-dark">{exp.company}</h3>
      <p>
        <Moment format="DD/MM/YYYY">{exp.from}</Moment>-
        {exp.current === true ? (
          "Now"
        ) : (
          <Moment format="DD/MM/YYYY">{exp.to}</Moment>
        )}
      </p>
      <p>
        <strong>Position: </strong>
        {exp.title}
      </p>
      <p>
        <strong>Description: </strong>
        {exp.description ? exp.description : <span>No description added</span>}
      </p>
    </div>
  );
};

export default ProfileExperience;
