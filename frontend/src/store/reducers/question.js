import {
  GET_UNANSWERED,
  GET_USERS,
  NEW_ANSWER,
  NEW_QUESTION,
  GET_ANSWERED,
  USER_LOADED,
  LOGOUT,
} from "../types";

const initialState = {
  questions: null,
  answeredQuestions: null,
  users: null,
  answered: [],
  unanswered: [],
  user: null,
};

export default function selected(state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
      };
    case NEW_QUESTION:
      return { ...state, questions: [action.payload, ...state.questions] };
    case GET_UNANSWERED:
      return {
        ...state,
        questions: action.payload.reverse(),
      };
    case GET_ANSWERED:
      return {
        ...state,
        answered: action.payload.reverse(),
        unanswered:
          state.questions.length !== 0 &&
          state.questions.filter((unansweredQuestion) => {
            return !action.payload.some((a) => {
              return (
                unansweredQuestion._id === a.question &&
                a.user === state.user._id
              );
            });
          }),
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload.reverse(),
      };
    case NEW_ANSWER:
      return {
        ...state,
        unanswered: state.unanswered.filter(
          (ua) => ua._id !== action.payload.question
        ),
        answered: [action.payload, ...state.answered],
      };
    case LOGOUT:
      return {
        questions: null,
        answeredQuestions: null,
        users: null,
        answered: [],
        unanswered: [],
        user: null,
      };
    default:
      return state;
  }
}
