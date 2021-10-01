import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createQuestion } from "../store/actions/question";
import { useHistory } from "react-router-dom";
const CreateQuestion = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    option1: "",
    option2: "",
  });
  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createQuestion({
        option1: value.option1,
        option2: value.option2,
      })
    );
    setValue({ option1: "", option2: "" });
    history.push("/");
  };
  return (
    <div className="new-question-page">
      <div className="new-question">
        <h1>Create New Question</h1>
        <form className="question-form" onSubmit={onSubmit}>
          <h2>Would You Rather ... </h2>
          <input
            name="option1"
            type="text"
            className="input-field"
            placeholder="Option one answer"
            value={value.option1}
            onChange={onChange}
          />
          <div>OR</div>
          <input
            name="option2"
            type="text"
            className="input-field"
            placeholder="Option two answer"
            value={value.option2}
            onChange={onChange}
          />
          <button type="submit" className="block-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestion;
