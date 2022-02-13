import React, { useState, useEffect, Fragment } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, FormGroup, Input, Label } from "reactstrap";
import Select from "react-select";
import { createProfile } from "../../actions/profile";

const CreateProfile = ({ auth, createProfile: createProfileForUser }) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const history = useNavigate();

  if (!auth.isAuthenticated && !auth.loading) return <Navigate to="/login" />;

  //   const {
  //     company,
  //     website,
  //     location,
  //     status,
  //     skills,
  //     githubusername,
  //     bio,
  //     twitter,
  //     facebook,
  //     linkedin,
  //     youtube,
  //     instagram,
  //   } = formData;

  const professionalStatus = [
    { label: "Developer", value: "Developer" },
    { label: "Junior developer", value: "Junior developer" },
    { label: "Senior Developer", value: "Senior Developer" },
    { label: "Manager", value: "Manager" },
    { label: "Student or Learning", value: "Student or Learning" },
    { label: "Instructor or Teacher", value: "Instructor or Teacher" },
    { label: "Intern", value: "Intern" },
    { label: "Other", value: "Other" },
  ];

  const onChangeOfField = (fieldName, fieldValue) => {
    setFormData({ ...formData, [fieldName]: fieldValue });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      skills: formData.skills
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0),
    };
    console.log(data);

    createProfileForUser(data, history);
  };

  return (
    <div className="container">
      <h2 className="large text-info">Create Your Profile</h2>
      <p className="lead">
        <FontAwesomeIcon icon={["fas", "user"]} />
        {"  "}
        <strong>
          Let's get some information to make your profile stand out
        </strong>
      </p>
      <small className="text-danger">Fields marked with * are required</small>
      <form className="form mt-3" style={{ width: "70%" }}>
        <FormGroup>
          <Select
            options={professionalStatus}
            onChange={(e) => onChangeOfField("status", e.value)}
          />

          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="company"
            placeholder="Company"
            onChange={(e) => onChangeOfField("company", e.target.value)}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="website"
            placeholder="Website"
            onChange={(e) => onChangeOfField("website", e.target.value)}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="location"
            placeholder="Location"
            onChange={(e) => onChangeOfField("location", e.target.value)}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="skills"
            placeholder="Skills"
            onChange={(e) => onChangeOfField("skills", e.target.value)}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="githubusername"
            placeholder="Github Username"
            onChange={(e) => onChangeOfField("githubusername", e.target.value)}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </FormGroup>
        <FormGroup>
          <Input
            type="textarea"
            name="bio"
            placeholder="Bio"
            onChange={(e) => onChangeOfField("bio", e.target.value)}
          />
          <small className="form-text">Tell us a little about yourself</small>
        </FormGroup>

        {displaySocialInputs ? (
          <div>
            <Button
              onClick={() => {
                setFormData({
                  ...formData,
                  instagram: "",
                  twitter: "",
                  facebook: "",
                  youtube: "",
                  linkedin: "",
                });
                toggleSocialInputs(!displaySocialInputs);
              }}
              className="btn btn-light"
            >
              Remove Social Network Links
            </Button>
            <div className="form-group social-input d-flex">
              <FontAwesomeIcon
                icon={["fab", "twitter"]}
                className="my-auto"
                size="lg"
              />

              <Input
                style={{ marginLeft: "1rem" }}
                type="text"
                name="twitter"
                onChange={(e) => onChangeOfField("twitter", e.target.value)}
                placeholder="Twitter URL"
              />
            </div>

            <div className="form-group social-input d-flex">
              <FontAwesomeIcon
                icon={["fab", "facebook"]}
                className="my-auto"
                size="lg"
              />
              <Input
                style={{ marginLeft: "1rem" }}
                type="text"
                name="facebook"
                placeholder="Facebook URL"
                onChange={(e) => onChangeOfField("facebook", e.target.value)}
              />
            </div>

            <div className="form-group social-input d-flex">
              <FontAwesomeIcon
                icon={["fab", "youtube"]}
                className="my-auto"
                size="lg"
              />
              <Input
                style={{ marginLeft: "0.8rem" }}
                type="text"
                name="youtube"
                placeholder="Youtube URL"
                onChange={(e) => onChangeOfField("youtube", e.target.value)}
              />
            </div>

            <div className="form-group social-input d-flex">
              <FontAwesomeIcon
                icon={["fab", "linkedin"]}
                className="my-auto"
                size="lg"
              />
              <Input
                style={{ marginLeft: "1.1rem" }}
                type="text"
                name="linkedin"
                placeholder="Linkedin URL"
                onChange={(e) => onChangeOfField("linkedin", e.target.value)}
              />
            </div>

            <div className="form-group social-input d-flex">
              <FontAwesomeIcon
                icon={["fab", "instagram"]}
                className="my-auto"
                size="lg"
              />
              <Input
                style={{ marginLeft: "1.1rem" }}
                type="text"
                name="instagram"
                placeholder="Instagram URL"
                onChange={(e) => onChangeOfField("instagram", e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="my-2">
            <Button
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
              className="btn btn-light"
            >
              Add Social Network Links
            </Button>
            <span>Optional</span>
          </div>
        )}

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

CreateProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { createProfile })(CreateProfile);
