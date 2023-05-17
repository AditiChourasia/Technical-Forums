import React from "react";
import Moment from "react-moment";
import { TailSpin } from "react-loader-spinner";

const ProfileEducation = ({ education: edu }) => {
  if (!edu)
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
      <h3 className="text-dark">{edu.school}</h3>
      <p>
        <Moment format="DD/MM/YYYY">{edu.from}</Moment>-
        {edu.current === true ? (
          "Now"
        ) : (
          <Moment format="DD/MM/YYYY">{edu.to}</Moment>
        )}
      </p>
      <p>
        <strong>Degree Name: </strong>
        {edu.degree}
      </p>
      <p>
        <strong>Description: </strong>
        {edu.description ? edu.description : <span>No description added</span>}
      </p>
    </div>
  );
};

export default ProfileEducation;
