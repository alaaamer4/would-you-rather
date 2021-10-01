import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getUnansweredQuestion,
  getAnsweredQuestion,
} from "../store/actions/question";
import { getUsers } from "../store/actions/auth";
import Unanswered from "../components/unanswered/Unanswered";
import Minibar from "../components/minibar/Minibar";
import Answered from "../components/answered/Answered";
const Home = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  const dispatch = useDispatch();
  const [isAnswered, setIsAnswered] = useState(false);
  useEffect(() => {
    dispatch(getAnsweredQuestion());
    dispatch(getUnansweredQuestion());
    dispatch(getUsers());
  }, [dispatch]);
  return isAuth ? (
    <div className="home-page">
      <Minibar setIsAnswered={setIsAnswered} isAnswered={isAnswered} />
      {isAnswered ? <Answered /> : <Unanswered />}
    </div>
  ) : (
    <div className="home-page">
      <h1>
        <Link to="/login">Login</Link> to start answering questions
      </h1>
      <p>
        if you are not a member please join us now
        {"  "}
        <small>
          <Link to="/register">register</Link>{" "}
        </small>
      </p>
    </div>
  );
};

export default Home;
