import React, { useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { addAcademics } from "../../actions/profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Button } from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";

const AddAcademics = ({ addAcademics: addAcd }) => {
  const [formData, setFormData] = useState({
    currentsemester: "",
    semester1sgpa: "",
    semester2sgpa: "",
    semester3sgpa: "",
    semester4sgpa: "",
    semester5sgpa: "",
    semester6sgpa: "",
    semester7sgpa: "",
    semester8sgpa: "",
    scholarship: false,
    fee: 0,
  });

  const history = useNavigate();

  const { currentsemester, semester1sgpa,semester2sgpa,semester3sgpa,semester4sgpa,semester5sgpa,semester6sgpa,semester7sgpa, semester8sgpa, scholarship, fee } = formData;

  const onChangeOfField = (fieldName, fieldValue) => {
    setFormData({ ...formData, [fieldName]: fieldValue });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = formData;
    console.log(data);
    addAcd(data, history);
  };
  const tmp = true;
  return (
    <div className="container">
      <h1 className="large text-info">Add Academic Details</h1>

      <small className="text-danger">Fields marked with * are required</small>
      <form className="form mt-3" style={{ width: "70%" }}>
        <div className="w-100 d-flex">
          <Input
            type="text"
            placeholder="* Current Semester"
            name="currentsemester"
            required
            style={{ fontSize: "1rem" }}
            onChange={(e) => onChangeOfField("currentsemester", e.target.value)}
            value={currentsemester}
          />
        </div>
        <br />
        <p>
          <FontAwesomeIcon icon={["fas", "book"]} /> Add Marks
        </p>
        <Input
          type="text"
          placeholder="* Enter the semester 1 sgpa"
          name="semester1sgpa"
          required
          style={{ fontSize: "1rem" }}
          onChange={(e) => onChangeOfField("semester1sgpa", e.target.value)}
          value={semester1sgpa}
        />
        <Input
          type="text"
          placeholder="* Enter the semester 2 sgpa"
          name="semester2sgpa"
          required
          style={{ fontSize: "1rem" }}
          onChange={(e) => onChangeOfField("semester2sgpa", e.target.value)}
          value={semester2sgpa}
        />
        <Input
          type="text"
          placeholder="* Enter the semester 3 sgpa"
          name="semester3sgpa"
          required
          style={{ fontSize: "1rem" }}
          onChange={(e) => onChangeOfField("semester3sgpa", e.target.value)}
          value={semester3sgpa}
        />
        <Input
          type="text"
          placeholder="* Enter the semester 4 sgpa"
          name="semester4sgpa"
          required
          style={{ fontSize: "1rem" }}
          onChange={(e) => onChangeOfField("semester4sgpa", e.target.value)}
          value={semester4sgpa}
        />
        <Input
          type="text"
          placeholder="* Enter the semester 5 sgpa"
          name="semester5sgpa"
          required
          style={{ fontSize: "1rem" }}
          onChange={(e) => onChangeOfField("semester5sgpa", e.target.value)}
          value={semester5sgpa}
        />
        <Input
          type="text"
          placeholder="* Enter the semester 6 sgpa"
          name="semester6sgpa"
          required
          style={{ fontSize: "1rem" }}
          onChange={(e) => onChangeOfField("semester6sgpa", e.target.value)}
          value={semester6sgpa}
        />
        <Input
          type="text"
          placeholder="* Enter the semester 7 sgpa"
          name="semester7sgpa"
          required
          style={{ fontSize: "1rem" }}
          onChange={(e) => onChangeOfField("semester7sgpa", e.target.value)}
          value={semester7sgpa}
        />
        <Input
          type="text"
          placeholder="* Enter the semester 8 sgpa"
          name="semester8sgpa"
          required
          style={{ fontSize: "1rem" }}
          onChange={(e) => onChangeOfField("semester8sgpa", e.target.value)}
          value={semester8sgpa}
        />
        {/* <br /> */}
        {/* <label>Upload Marksheet &nbsp;</label>
        <input type="file" id="myFile" name="filename" /> */}
        <div>
          <br />
          <p>
            <FontAwesomeIcon icon={["fa", "rupee-sign"]} /> Add Fees
          </p>
          <div>
            <label style={{ fontSize: "1rem" }}>Scholarship &nbsp;</label>
            <input
              onChange={() => setFormData({ ...formData, scholarship: true })}
              checked={scholarship}
              type="radio"
              id="yes"
              name="yes"
              value="YES"
            />
            <label style={{ fontSize: "1rem" }}> YES</label>
            <input
              onChange={() => setFormData({ ...formData, scholarship: false })}
              checked={!scholarship}
              type="radio"
              id="no"
              name="yes"
              value="NO"
            />
            <label style={{ fontSize: "1rem" }}>NO</label>
            <br></br>
          </div>
        </div>

        <div>
          <div>
            {tmp ? (
              <div>
                {/* <br /> */}
                <Input
                  type="text"
                  placeholder="Fee Amount"
                  name="fee"
                  required
                  style={{ fontSize: "1rem" }}
                  onChange={(e) => onChangeOfField("fee", e.target.value)}
                  value={fee}
                />
                {/* <div>
                  <br />
                  <label>Upload Fee Receipt&nbsp;</label>
                  <input type="file" id="myFile" name="filename" />
                </div> */}
              </div>
            ) : (
              <br />
            )}
          </div>
        </div>
        <br />
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

AddAcademics.propTypes = {
  addAcademics: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({});

export default connect(null, { addAcademics })(AddAcademics);
