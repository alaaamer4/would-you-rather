import React, { useEffect, useState } from "react";
import styles from "./Question.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Question = ({ question }) => {
  const [user, setUser] = useState(null);
  const users = useSelector((state) => state.question.users);
  const onClick = () => {};
  useEffect(() => {
    users && setUser(users.find((user) => user._id === question.user));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, users]);
  return user ? (
    <>
      <div className={styles.wrapper}>
        <div className={styles.flex}>
          <img src={user.avatar} alt="avatar" />
          <h2>{user.name}</h2>
          <p>Would like to ask you a question</p>
        </div>
        <h4>Would You rather...?</h4>
        <ul>
          <li>{question.option1}</li>
          <li>{question.option2}</li>
        </ul>
        <Link
          to={`/questions/${question._id}`}
          className={styles.btn}
          onClick={onClick}
        >
          View Question
        </Link>
      </div>
    </>
  ) : (
    <div className={styles.wait}>
      <h2>Please Wait </h2>
      <p>this could take few seconds ...</p>
    </div>
  );
};

export default Question;
