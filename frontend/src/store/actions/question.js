import axios from "axios";
import {
  GET_ANSWERED,
  GET_UNANSWERED,
  NEW_ANSWER,
  NEW_QUESTION,
} from "../types";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const createQuestion =
  ({ option1, option2 }) =>
  async (dispatch) => {
    const body = JSON.stringify({ option1, option2 });
    try {
      const options = await axios.post("/questions", body, config);
      dispatch({ type: NEW_QUESTION, payload: options.data.options });
    } catch (err) {
      console.log(err);
    }
  };

export const getUnansweredQuestion = () => async (dispatch) => {
  try {
    const res = await axios.get("/questions/unanswered");
    dispatch({ type: GET_UNANSWERED, payload: res.data.options });
  } catch (err) {
    console.log(err);
  }
};

export const getAnsweredQuestion = () => async (dispatch) => {
  try {
    const res = await axios.get("/questions/answered");
    dispatch({ type: GET_ANSWERED, payload: res.data.answers });
  } catch (err) {}
};

export const answerQuestion =
  ({ question, answer }) =>
  async (dispatch) => {
    try {
      const body = JSON.stringify({ question, answer });
      const res = await axios.post("/questions/answered", body, config);
      dispatch({ type: NEW_ANSWER, payload: res.data.data });
    } catch (err) {}
  };
