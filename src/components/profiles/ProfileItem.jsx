import React from "react";
import { PropTypes } from "prop-types";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <div
      className="profile bg-light"
      style={{
        borderRadius: "0.3rem",
        border: "none",
        boxShadow: "0 0 1px",
        WebkitBoxShadow: "0 0 1px",
      }}
    >
      <img
        src={avatar}
        style={{ height: "100%", width: "50%" }}
        alt=""
        className="round-img"
      />
      <div className="">
        <h2>{name}</h2>
        <p className="m-0">
          {status} {company && <span>at {company}</span>}
        </p>
        <p className="mb-2">{location && <span>{location}</span>}</p>
        <NavLink
          to={`/profile/${_id}`}
          className="btn btn-info p-1 px-2"
          style={{ fontSize: "00.9rem" }}
        >
          View Profile
        </NavLink>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index}>
            <FontAwesomeIcon
              className="text-info"
              size="sm"
              icon={["fas", "check-circle"]}
            />
            {"   "} {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
