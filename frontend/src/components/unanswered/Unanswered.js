import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUnansweredQuestion,
  getAnsweredQuestion,
} from "../../store/actions/question";

import Question from "../question/Question";

const Unanswered = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.question.unanswered);
  const answers = useSelector((state) => state.question.answered);

  useEffect(() => {
    if (questions.length === 0 && answers.length === 0) {
      dispatch(getAnsweredQuestion());
      dispatch(getUnansweredQuestion());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    answers &&
    questions && (
      <>
        {questions &&
          questions.length >= 1 &&
          questions.map((question, i) => (
            <div key={i}>
              <Question question={question} />
            </div>
          ))}
      </>
    )
  );
};

export default Unanswered;
