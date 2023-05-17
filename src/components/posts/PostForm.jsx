import React, { useState } from "react";
import { Form, Input } from "reactstrap";
import { addPost } from "./../../actions/post";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

const PostForm = ({ addPost: addpost }) => {
  const [text, setText] = useState("");
  return (
    <div className="post-form">
      <div className="bg-info p">
        <h4 className="text-light">Post Your questions</h4>
      </div>
      <Form className="Form my-1">
        <Input
          name="text"
          cols="30"
          rows="5"
          type="textarea"
          placeholder="Ask questions. Resolve your problems !"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Input
          type="submit"
          className="btn btn-dark my-1"
          value="Post"
          placeholder="Post"
          onClick={(e) => {
            e.preventDefault();
            console.log(text);
            addpost({ text });
            setText("");
          }}
        />
      </Form>
    </div>
  );
};

PostForm.prototype = {
  addPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addPost })(PostForm);
