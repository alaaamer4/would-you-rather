import React, { useState, useEffect } from "react";
import styles from "./User.module.css";
import { useSelector } from "react-redux";
const User = ({ user }) => {
  const [points, setPoints] = useState(null);
  const [answeredPoints, setAnsweredPoints] = useState(null);
  const [createdPoints, setCreatedPoints] = useState(null);
  const answered = useSelector((state) => state.question.answered);
  const created = useSelector((state) => state.question.questions);
  useEffect(() => {
    setPoints(answeredPoints + createdPoints);
    answered &&
      setAnsweredPoints(
        answered.filter((answer) => answer.user === user._id).length
      );
    created &&
      setCreatedPoints(
        created.filter((question) => question.user === user._id).length
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdPoints, answeredPoints]);
  return (
    <div className={styles.wrapper}>
      <img src={user.avatar} alt="avatar" />
      <div className={styles.points}>
        <h3 className={styles.name}>{user.name}</h3>
        <p>number of questions answered {answeredPoints} </p>
        <p>number of questions created {createdPoints} </p>
        <p>Total points {points || 0} </p>
      </div>
    </div>
  );
};

export default User;
