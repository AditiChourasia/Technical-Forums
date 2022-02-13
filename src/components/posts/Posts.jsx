import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { getPosts } from "./../../actions/post";
import { TailSpin } from "react-loader-spinner";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = ({ getPosts: getAllPosts, auth, post }) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

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
      <h1 className="large text-info">Questions</h1>
      <p className="lead">
        <FontAwesomeIcon icon={["fas", "user"]} />
        Welcome to the community
      </p>
      <PostForm />
      <div className="posts">
        {post.posts && post.posts.map((p) => <PostItem key={p._id} post={p} />)}
      </div>
    </div>
  );
};

Posts.prototype = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPosts })(Posts);
