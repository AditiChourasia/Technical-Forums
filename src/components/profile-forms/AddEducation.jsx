import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { addEducation } from "./../../actions/profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormGroup, Input, Button, Label } from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";

const AddEducation = ({ addEducation: addEdu }) => {
  const [formData, setFormData] = useState({
    school: "",
    fieldofstudy: "",
    from: "",
    current: false,
    to: "",
    description: "",
    degree: "",
  });

  const history = useNavigate();

  const { school, fieldOfStudy, from, current, to, description, degree } =
    formData;

  const onChangeOfField = (fieldName, fieldValue) => {
    setFormData({ ...formData, [fieldName]: fieldValue });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = formData;
    console.log(data);

    addEdu(data, history);
  };

  return (
    <div className="container">
      <h1 className="large text-info">Add Your Education</h1>
      <p>
        <FontAwesomeIcon icon={["fas", "graduation-cap"]} /> Add any school,
        bootcamp, etc that you have attended
      </p>
      <small className="text-danger">Fields marked with * are required</small>
      <form className="form mt-3" style={{ width: "70%" }}>
        <div className="form-group ">
          <Input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
            style={{ fontSize: "1rem" }}
            onChange={(e) => onChangeOfField("school", e.target.value)}
            value={school}
          />
        </div>
        <div className="form-group ">
          <Input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
            style={{ fontSize: "1rem" }}
            onChange={(e) => onChangeOfField("degree", e.target.value)}
            value={degree}
          />
        </div>
        <div className="form-group ">
          <Input
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
            style={{ fontSize: "1rem" }}
            onChange={(e) => onChangeOfField("fieldofstudy", e.target.value)}
            value={fieldOfStudy}
          />
        </div>
        <div className="form-group ">
          <Label>From Date</Label>
          <Input
            type="date"
            name="from"
            style={{ fontSize: "1rem" }}
            value={from}
            onChange={(e) => onChangeOfField("from", e.target.value)}
          />
        </div>
        <div className="form-group">
          <p>
            {" "}
            <Input
              type="checkbox"
              name="current"
              value=""
              style={{ fontSize: "1rem" }}
              value={current}
              onChange={() => {
                setFormData({ ...formData, to: "", current: !current });
              }}
            />
            <Label style={{ marginLeft: "0.5rem" }}>
              Current School or Bootcamp
            </Label>
          </p>
        </div>
        <div className="form-group">
          <Label>To Date</Label>
          <Input
            type="date"
            name="to"
            disabled={formData.current}
            style={{ fontSize: "1rem" }}
            value={to}
            onChange={(e) => onChangeOfField("to", e.target.value)}
          />
        </div>
        <div className="form-group ">
          <Input
            type="textarea"
            name="description"
            cols="30"
            rows="5"
            style={{ fontSize: "1rem" }}
            placeholder="Program Description"
            value={description}
            onChange={(e) => onChangeOfField("description", e.target.value)}
          />
        </div>

        <div className="w-100 d-flex">
          <Input
            type="submit"
            name="submit"
            className="btn-info w-auto h-auto my-auto"
            onClick={onSubmit}
          />

          <NavLink to="/dashboard">
            <Button className="btn-light my-2">Go back</Button>
          </NavLink>
        </div>
      </form>
    </div>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({});

export default connect(null, { addEducation })(AddEducation);
