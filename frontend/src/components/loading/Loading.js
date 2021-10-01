import React from "react";
import spinner from "../../assets/spinner.gif";
import styles from "./loading.module.css";
const Loading = () => {
  return (
    <div className={styles.loader}>
      <img src={spinner} alt="loading" />
    </div>
  );
};

export default Loading;
