import React, { Fragment } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Button } from "reactstrap";
import { deleteEducation } from "./../../actions/profile";

const Education = ({ education, deleteEducation: deleteEdu }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td style={{ verticalAlign: "middle" }}>{edu.school}</td>
      <td style={{ verticalAlign: "middle" }} className="hide-sm">
        {edu.degree}
      </td>
      <td style={{ verticalAlign: "middle" }} className="">
        <Moment format="DD/MM/YYYY">{edu.from}</Moment>-
        {edu.current === true ? (
          "Now"
        ) : (
          <Moment format="DD/MM/YYYY">{edu.to}</Moment>
        )}
      </td>
      <td style={{ verticalAlign: "middle" }}>
        <Button
          onClick={() => deleteEdu(edu._id)}
          color="danger"
          className="btn btn-danger"
        >
          Delete
        </Button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="mt-2 mb-4">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="bg-light" style={{ border: "none" }}>
              School
            </th>
            <th className="bg-light hide-sm" style={{ border: "none" }}>
              Degree
            </th>
            <th className="bg-light hide-sm" style={{ border: "none" }}>
              Years
            </th>
            <th className="bg-light hide-sm" style={{ border: "none" }}></th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

//   const mapStateToProps = (state) => ({
//   });

export default connect(null, { deleteEducation })(Education);
