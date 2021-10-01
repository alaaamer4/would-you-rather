import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { answerQuestion } from "../../store/actions/question";

import styles from "./Select.module.css";
const Select = () => {
  const { id } = useParams();
  const [selected, setSelected] = useState("");
  const [question, setQuestion] = useState("");
  const [user, setUser] = useState(null);
  const [primary, setPrimary] = useState(null);
  const [secondary, setSecondary] = useState(null);
  const history = useHistory();
  const unanswered = useSelector((state) => state.question.unanswered);
  const users = useSelector((state) => state.question.users);
  const dispatch = useDispatch();

  const option1 = useRef(null);
  const option2 = useRef(null);
  const onClick = () => {
    dispatch(answerQuestion({ question: question, answer: selected }));

    setPrimary("#24578d");
    setSecondary("#24578d");

    setTimeout(() => {
      history.push("/");
    }, 500);
  };
  useEffect(() => {
    unanswered && setQuestion(unanswered.find((ua) => ua._id === id));
    question &&
      users &&
      setUser(users.find((user) => user._id === question.user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);
  return (
    <div className={styles.wrapper}>
      {user && question && (
        <div className={styles.container}>
          <div className={styles.user}>
            <div className={styles.avatar}>
              <img src={user.avatar} alt="avatar" />
            </div>
            <h1>{user.name}</h1>
          </div>
          <h2>is asking</h2>
          <h1>Would You Rather ...?</h1>

          <div className={styles.options_wrapper}>
            <div
              className={styles.box}
              ref={option1}
              onClick={(e) => {
                setPrimary("#24578d");
                setSecondary("#13A365");
                setSelected(e.target.innerHTML);
                option2.current.style.background = primary
                  ? primary
                  : "#24578d";
                option1.current.style.background = secondary
                  ? secondary
                  : "#13A365";
              }}
            >
              {question.option1}
            </div>
            <div className={styles.round}>OR</div>
            <div
              className={styles.box}
              ref={option2}
              onClick={(e) => {
                setPrimary("#24578d");
                setSecondary("#13A365");
                setSelected(e.target.innerHTML);
                option1.current.style.background = primary
                  ? primary
                  : "#24578d";
                option2.current.style.background = secondary
                  ? secondary
                  : "#13A365";
              }}
            >
              {question.option2}
            </div>
          </div>
          <button className={styles.select_btn} onClick={onClick}>
            Submit Answer
          </button>
        </div>
      )}
    </div>
  );
};

export default Select;
