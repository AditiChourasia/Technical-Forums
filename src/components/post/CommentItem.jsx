import React from "react";
import { deleteComment } from "../../actions/post";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { NavLink } from "react-router-dom";
import Moment from "react-moment";
import { Button } from "reactstrap";

const CommentItem = ({
  postId,
  deleteComment: deleteComm,
  comment: { _id, text, name, avatar, user, date },
  auth,
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <NavLink
          style={{ textDecoration: "none" }}
          className=""
          to={`/profile/${user}`}
        >
          <img
            className="round-img"
            src={avatar}
            alt=""
            style={{ width: "40%" }}
          />
          <h6>{name}</h6>
        </NavLink>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          <span className="mr-1">Posted on </span>
          <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>

        {!auth.loading && user === auth.user._id && (
          <div className="d-flex">
            <Button
              onClick={() => {
                deleteComm(postId, _id);
              }}
              type="button"
              className="btn btn-danger px-1 py-0"
              style={{ fontSize: "0.9rem", marginLeft: "auto" }}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
