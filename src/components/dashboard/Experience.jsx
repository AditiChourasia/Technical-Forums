import React, { Fragment } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Button } from "reactstrap";
import { deleteExperience } from "./../../actions/profile";

const Experience = ({ experience, deleteExperience: deleteExp }) => {
  const del = (id) => {
    deleteExp(id);
  };

  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td style={{ verticalAlign: "middle" }}>{exp.company}</td>
      <td style={{ verticalAlign: "middle" }} className="hide-sm">
        {exp.title}
      </td>
      <td style={{ verticalAlign: "middle" }} className="">
        <Moment format="DD/MM/YYYY">{exp.from}</Moment>-
        {exp.current === true ? (
          "Now"
        ) : (
          <Moment format="DD/MM/YYYY">{exp.to}</Moment>
        )}
      </td>
      <td style={{ verticalAlign: "middle" }}>
        <Button
          onClick={() => del(exp._id)}
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
      <h2 className="mt-2 mb-4">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr className="bg-light" style={{ border: "none" }}>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

//   const mapStateToProps = (state) => ({
//   });

export default connect(null, { deleteExperience })(Experience);
