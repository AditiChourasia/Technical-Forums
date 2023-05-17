import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Navigate, useNavigate, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, FormGroup, Input } from "reactstrap";
import Select from "react-select";
import { createProfile } from "../../actions/profile";
import { getCurrentProfile } from "./../../actions/profile";

const EditProfile = ({
  auth,
  createProfile: editProfileOfUser,
  getCurrentProfile: getCurrentUserProfile,
  profile,
}) => {
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

  const [displaySocialInputs, toggleSocialInputs] = useState(true);

  useEffect(() => {
    if (auth.isAuthenticated && !auth.loading) {
      getCurrentUserProfile();
    }
  }, [auth.isAuthenticated, auth.loading, getCurrentUserProfile]);

  useEffect(() => {
    if (profile) {
      console.log("Profile Loaded");
      setFormData({
        company: auth.loading || !profile.company ? "" : profile.company,
        website: auth.loading || !profile.website ? "" : profile.website,
        location: auth.loading || !profile.location ? "" : profile.location,
        status: auth.loading || !profile.status ? "" : profile.status,
        skills:
          auth.loading || !profile.skills || profile.skills.length === 0
            ? ""
            : profile.skills.join(", "),
        githubusername:
          auth.loading || !profile.githubusername ? "" : profile.githubusername,
        bio: auth.loading || !profile.bio ? "" : profile.bio,
        twitter:
          auth.loading || !profile.social || !profile.social.twittter
            ? ""
            : profile.social.twitter,
        facebook:
          auth.loading || !profile.social || !profile.social.facebook
            ? ""
            : profile.social.facebook,
        linkedin:
          auth.loading || !profile.social || !profile.social.linkedin
            ? ""
            : profile.social.linkedin,
        youtube:
          auth.loading || !profile.social || !profile.social.youtube
            ? ""
            : profile.social.youtube,
        instagram:
          auth.loading || !profile.social || !profile.social.instagram
            ? ""
            : profile.social.instagram,
      });
    }
  }, [profile, auth.loading]);

  const history = useNavigate();

  if (!auth.isAuthenticated && !auth.loading) return <Navigate to="/login" />;

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

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

    editProfileOfUser(data, history, true);
  };

  return (
    <div className="container">
      <h2 className="large text-info">Edit Your Profile</h2>

      <small className="text-danger">Fields marked with * are required</small>
      <form className="form mt-3" style={{ width: "70%" }}>
        <FormGroup>
          <Select
            options={professionalStatus}
            value={{ label: status, value: status }}
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
            value={company}
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
            value={website}
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
            value={location}
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
            value={skills}
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
            value={githubusername}
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
            value={bio}
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
                value={twitter}
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
                value={facebook}
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
                value={youtube}
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
                value={linkedin}
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
                value={instagram}
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

EditProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  EditProfile
);
