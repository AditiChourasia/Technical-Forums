import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { addExperience } from "./../../actions/profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormGroup, Input, Button, Label } from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";

const AddExperience = ({ addExperience: addExp }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    current: false,
    to: "",
    description: "",
  });

  const history = useNavigate();

  const { title, company, location, from, current, to, description } = formData;

  const onChangeOfField = (fieldName, fieldValue) => {
    setFormData({ ...formData, [fieldName]: fieldValue });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = formData;
    console.log(data);

    addExp(data, history);
  };

  return (
    <div className="container">
      <h1 className="large text-info">Add An Experience</h1>
      <p>
        <FontAwesomeIcon icon={["fas", "code-branch"]} /> Add any
        developer/programming positions that you have had in the past
      </p>
      <small className="text-danger">Fields marked with * are required</small>
      <form className="form mt-3" style={{ width: "70%" }}>
        <div className="form-group ">
          <Input
            type="text"
            placeholder="* Job Title"
            name="title"
            required
            value={title}
            style={{ fontSize: "1rem" }}
            onChange={(e) => onChangeOfField("title", e.target.value)}
          />
        </div>
        <div className="form-group ">
          <Input
            type="text"
            placeholder="* Company"
            value={company}
            name="company"
            required
            style={{ fontSize: "1rem" }}
            onChange={(e) => onChangeOfField("company", e.target.value)}
          />
        </div>
        <div className="form-group ">
          <Input
            type="text"
            placeholder="Location"
            name="location"
            style={{ fontSize: "1rem" }}
            value={location}
            onChange={(e) => onChangeOfField("location", e.target.value)}
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
            <Label style={{ marginLeft: "0.5rem" }}>Current Job</Label>
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
            placeholder="Job Description"
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({});

export default connect(null, { addExperience })(AddExperience);
