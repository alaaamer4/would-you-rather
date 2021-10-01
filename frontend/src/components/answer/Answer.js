import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./answer.module.css";
const Answer = ({ answer }) => {
  const [user, setUser] = useState(null);
  const [current, setCurrent] = useState(null);
  const [option1Arr, setOption1Arr] = useState(null);
  const [userVote, setUserVote] = useState(null);
  const users = useSelector((state) => state.question.users);
  const authUser = useSelector((state) => state.auth.user);
  const questions = useSelector((state) => state.question.questions);
  const answered = useSelector((state) => state.question.answered);
  useEffect(() => {
    users && !user && setUser(users.find((user) => user._id === answer.user));

    questions &&
      answered &&
      questions.forEach(
        (q) =>
          q._id === answer._id &&
          setCurrent(answered.filter((a) => a.question === q._id))
      );
    current &&
      setOption1Arr(current.filter((c) => c.selected === answer.option1));

    answered &&
      answered.forEach((a) => {
        if (a.question === answer._id && authUser._id === a.user)
          setUserVote(a.selected);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, answer.user, user]);
  return (
    current &&
    option1Arr && (
      <div className={styles.wrapper}>
        <h5>total answers for this question are {current.length} answers</h5>
        <div className={styles.flex}>
          {user && (
            <div className={styles.avatar}>
              <img src={user.avatar} alt="avatar" />
            </div>
          )}
          <div>
            <h2>Would you rather</h2>
          </div>
        </div>
        <div className={styles.progress}>
          <label>{answer.option1}</label>
          <progress
            id="file"
            value={option1Arr.length}
            max={current.length}
          ></progress>
          <label>
            {Math.round((option1Arr.length * 100) / current.length)} %{" "}
          </label>
        </div>
        <div className={styles.progress}>
          <label>{answer.option2}</label>
          <progress
            id="file"
            value={current.length - option1Arr.length}
            max={current.length}
          ></progress>
          <label>
            {Math.round(
              ((current.length - option1Arr.length) * 100) / current.length
            )}{" "}
            %
          </label>
        </div>
        {userVote ? (
          <h4>Your answer is "{userVote}"</h4>
        ) : (
          <h4>You didn't answer yet</h4>
        )}
      </div>
    )
  );
};

export default Answer;
