import {
  AUTH_ERROR,
  LOADING,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
  USER_LOADED,
} from "../types";

const initialState = {
  isLoading: true,
  token: localStorage.getItem("token"),
  isAuth: false,
  user: null,
};

export default function register(state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        isLoading: false,
        token: action.payload,
        isAuth: true,
      };
    case AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        isAuth: false,
        isLoading: false,
        token: null,
      };
    default:
      return state;
  }
}
