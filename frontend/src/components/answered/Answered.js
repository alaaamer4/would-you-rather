import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Answer from "../answer/Answer";
import {
  getUnansweredQuestion,
  getAnsweredQuestion,
} from "../../store/actions/question";
import { getUsers } from "../../store/actions/auth";
const Answered = () => {
  const [answeredQuestions, setAnsweredQuestion] = useState(null);

  const questions = useSelector((state) => state.question.questions);
  const users = useSelector((state) => state.question.users);
  const dispatch = useDispatch();
  const answered = useSelector((state) => state.question.answered);

  useEffect(() => {
    if (questions.length === 0 && answered.length === 0) {
      dispatch(getAnsweredQuestion());
      dispatch(getUnansweredQuestion());
    }
    !users && dispatch(getUsers());
    setAnsweredQuestion(
      questions.filter((q) => {
        return answered.some((a) => a.question === q._id);
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {answeredQuestions &&
        answeredQuestions.map((aq, i) => (
          <div key={i}>
            <Answer answer={aq} />
          </div>
        ))}
    </>
  );
};

export default Answered;
