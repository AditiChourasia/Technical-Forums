import React, { Fragment, useEffect } from "react";
import "./App.css";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// redux
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import AddAcademics from "./components/profile-forms/AddAcademics";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

library.add(fab, fas);

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Fragment>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-profile" element={<CreateProfile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/add-experience" element={<AddExperience />} />
              <Route path="/add-education" element={<AddEducation />} />
              <Route path="/add-academics" element={<AddAcademics />} />
              <Route path="/profiles" exact element={<Profiles />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/posts" exact element={<Posts />} />
              <Route path="/posts/:id" element={<Post />} />
            </Fragment>
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
