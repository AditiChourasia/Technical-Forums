import React, { Fragment, useState, useEffect } from "react";
import Moment from "react-moment";
import { TailSpin } from "react-loader-spinner";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import { removeLike, addLike, deletePost } from "./../../actions/post";

const PostItem = ({
  auth,
  post: { _id, name, text, avatar, user, likes, comments, date },
  addLike: like,
  removeLike: unlike,
  deletePost: deleteUserPost,
  showActions,
}) => {
  const likeDislikePost = () => {
    let isLiked = false;
    for (let i = 0; i < likes.length; i++) {
      if (auth.user && auth.user._id === likes[i].user) {
        isLiked = true;
        break;
      }
    }
    if (isLiked) unlike(_id);
    else like(_id);
  };

  return (
    <div className="post bg-white p-1 my-3">
      <div>
        <NavLink
          style={{ textDecoration: "none" }}
          className=""
          to={`/profile/${user}`}
        >
          <img className="round-img" src={avatar} alt="" />
          <h5 className="text-info">{name}</h5>
        </NavLink>
      </div>
      <div>
        <p className="my-1">{text}</p>

        <p className="post-date">
          Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>

        {showActions && (
          <Fragment>
            <Button
              onClick={likeDislikePost}
              type="button"
              className="btn btn-light"
            >
              <FontAwesomeIcon icon={["fas", "thumbs-up"]} />

              {"    "}
              {likes.length > 0 && <span>{likes.length}</span>}
            </Button>
            <NavLink className="btn btn-primary" to={`/posts/${_id}`}>
              Discussion{"    "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </NavLink>

            {!auth.loading && user === auth.user._id && (
              <Button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteUserPost(_id)}
              >
                {"      "}
                <FontAwesomeIcon icon={["fas", "times"]} />
              </Button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
