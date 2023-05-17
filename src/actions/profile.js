import axios from "axios";
import { setAlert } from "./alert";
import {
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
} from "./types";
import { BASE_URL } from "./../config/default";

//Get current user profile
export const getCurrentProfile = () => async (dispatch) => {
  console.log("Profile Requested!");
  try {
    const res = await axios.get(BASE_URL + "/api/profile/me");
    console.log(res);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.data.msg,
        status: err.response.status,
      },
    });
  }
};

//Get a specific user profile
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/profile/user/${userId}`);
    console.log("Short Profile Requested");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.data.msg,
        status: err.response.status,
      },
    });
  }
};

//Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/profile/github/${username}`);
    console.log(res);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.data.msg,
        status: err.response.status,
      },
    });
  }
};

//Get all profiles
export const getAllProfiles = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });

  try {
    const res = await axios.get(BASE_URL + "/api/profile");
    console.log(res);

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.data.msg,
        status: err.response.status,
      },
    });
  }
};

// create or update profile
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post(BASE_URL + "/api/profile", formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );

      if (!edit) {
        history("/dashboard");
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.msg,
          status: err.response.status,
        },
      });
    }
  };

// Add experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(
      BASE_URL + "/api/profile/experience",
      formData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Added", "success"));
    history("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.msg,
        status: err.response.status,
      },
    });
  }
};

// Add education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(
      BASE_URL + "/api/profile/education",
      formData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Added", "success"));
    history("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.msg,
        status: err.response.status,
      },
    });
  }
};

// Add Academics
export const addAcademics = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(
      BASE_URL + "/api/profile/academics",
      formData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Academics Added", "success"));
    history("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.msg,
        status: err.response.status,
      },
    });
  }
};

// Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(BASE_URL + `/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.msg,
        status: err.response.status,
      },
    });
  }
};

// Delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(BASE_URL + `/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.msg,
        status: err.response.status,
      },
    });
  }
};

// Delete Account and Profile
export const deleteAccount = (id) => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure you want to delete your account permanantly ? You cannot undo this action"
    )
  ) {
    try {
      await axios.delete(BASE_URL + `/api/profile`);

      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: ACCOUNT_DELETED,
      });

      dispatch(setAlert("Your account has been permanantly deleted"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.msg,
          status: err.response.status,
        },
      });
    }
  }
};
