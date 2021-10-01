import React from "react";
import { useSelector } from "react-redux";
import styles from "./Minibar.module.css";
const Minibar = ({ setIsAnswered, isAnswered }) => {
  const question = useSelector((state) => state.question.unanswered);
  return (
    <div className={styles.wrapper}>
      <button
        style={
          !isAnswered ? { background: "#3178c6" } : { background: "#24578d" }
        }
        className={styles.btn}
        onClick={() => {
          setIsAnswered(false);
        }}
      >
        Unanswered questions ({<span>{question.length}</span>})
      </button>

      <button
        style={
          isAnswered ? { background: "#3178c6" } : { background: "#24578d" }
        }
        className={styles.btn}
        onClick={() => {
          setIsAnswered(true);
        }}
      >
        Answered questions
      </button>
    </div>
  );
};

export default Minibar;
