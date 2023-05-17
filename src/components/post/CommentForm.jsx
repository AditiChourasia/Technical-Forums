import React, { useState } from "react";
import { addComment } from "./../../actions/post";
import { connect } from "react-redux";
import { Form } from "reactstrap";
import { Input } from "reactstrap";
import { PropTypes } from "prop-types";

const CommentForm = ({ addComment: addComm, postId }) => {
  const [text, setText] = useState("");
  return (
    <div className="post-form">
      <div className="bg-info p">
        <h4 className="text-light">Answer this question</h4>
      </div>
      <Form className="Form my-1">
        <Input
          name="text"
          cols="30"
          rows="5"
          type="textarea"
          placeholder="Answer this question or ask a follow-up question !"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Input
          type="submit"
          className="btn btn-dark my-1"
          value="Comment"
          placeholder="Answer"
          onClick={(e) => {
            e.preventDefault();
            addComm(postId, { text });
            setText("");
          }}
        />
      </Form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addComment })(CommentForm);
