import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { getPost } from "./../../actions/post";
import { TailSpin } from "react-loader-spinner";
import { connect } from "react-redux";
import { Navigate, NavLink, useParams } from "react-router-dom";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = ({ getPost: getCurrentPost, post, auth }) => {
  const { id } = useParams();

  useEffect(() => {
    getCurrentPost(id);
  }, [getCurrentPost, id]);

  if (!auth.isAuthenticated && !auth.loading) return <Navigate to="/login" />;

  if (!post || post.loading)
    return (
      <div className="container">
        <div className="d-flex" style={{ height: "70vh" }}>
          <div className="mx-auto my-auto">
            <TailSpin color="#17a2b8" height={40} width={40} />
          </div>
        </div>
      </div>
    );
  return (
    <div className="container">
      <NavLink to="/posts" className="btn btn-light">
        Back To Questions
      </NavLink>
      <PostItem showActions={false} post={post} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((c) => (
          <CommentItem key={c._id} comment={c} postId={post._id} />
        ))}
      </div>
    </div>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPost })(Post);
