import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import User from "../user/User";
import {
  getAnsweredQuestion,
  getUnansweredQuestion,
} from "../../store/actions/question";
import { getUsers } from "../../store/actions/auth";
import styles from "./Leaderboard.module.css";
const Leaderboard = () => {
  const users = useSelector((state) => state.question.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnsweredQuestion());
    dispatch(getUnansweredQuestion());
    dispatch(getUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return users ? (
    <div>
      {users &&
        users.map((user, index) => (
          <div key={index} className={styles.wrapper}>
            <User user={user} />
          </div>
        ))}
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default Leaderboard;
