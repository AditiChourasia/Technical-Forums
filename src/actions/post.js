import axios from "axios";
import { setAlert } from "./alert";
import {
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./types";
import { BASE_URL } from "./../config/default";

// Get Posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(BASE_URL + "/api/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Add like
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`${BASE_URL}/api/posts/like/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Remove like
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`${BASE_URL}/api/posts/unlike/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Delete Post
export const deletePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/posts/${postId}`);

    dispatch({
      type: DELETE_POST,
      payload: postId,
    });
    dispatch(setAlert("Post Deleted", "success"));
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Add Post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    "Content-Type": "application/json",
  };

  try {
    const res = await axios.post(`${BASE_URL}/api/posts`, formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    const errors = err.response.data;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.msg,
        status: err.response.status,
      },
    });
  }
};

// Get Post
export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/posts/${postId}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Add Comment
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    "Content-Type": "application/json",
  };

  try {
    const res = await axios.post(
      `${BASE_URL}/api/posts/comment/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert("Comment Added!", "success"));
  } catch (err) {
    const errors = err.response.data;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.msg,
        status: err.response.status,
      },
    });
  }
};

// Delete Comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  const config = {
    "Content-Type": "application/json",
  };

  try {
    const res = await axios.delete(
      `${BASE_URL}/api/posts/uncomment/${postId}/${commentId}`
    );

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert("Comment deleted!", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.msg,
        status: err.response.status,
      },
    });
  }
};
