import React, { Fragment, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { getGithubRepos } from "./../../actions/profile";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

const ProfileGithub = ({ getGithubRepos: getrepos, username, repos }) => {
  useEffect(() => {
    getrepos(username);
  }, [username]);

  if (!repos)
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
    <div className="profile-github ">
      <h2 className="text-info my-1 mb-3">Github Repos</h2>
      {repos.map((repo, index) => (
        <div key={index} className="repo bg-white p-1 my-1">
          <div className="p-1 mb-0">
            <h6>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer text-info"
              >
                {repo.name}
              </a>
              <p className="mt-2">{repo.description}</p>
            </h6>
          </div>
          <div className="mb-0">
            <ul className="mb-0">
              <li className="badge badge-primary d-block">
                Stars : {repo.stargazers_count}
              </li>
              <li className="badge badge-dark d-block">
                Watchers : {repo.watchers_count}
              </li>
              <li className="badge badge-light text-dark d-block">
                Forks : {repo.forks_count}
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});
export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
