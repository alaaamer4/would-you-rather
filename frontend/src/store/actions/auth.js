import axios from "axios";
import setToken from "../../functions/setToken";
import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOADING,
  LOGOUT,
  GET_USERS,
} from "../types";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//load user
export const loadUser = () => async (dispatch) => {
  dispatch({ type: LOADING });

  localStorage.token && setToken(localStorage.token);
  try {
    const res = await axios.get("/login");
    localStorage.token &&
      dispatch({ type: USER_LOADED, payload: res.data.user });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

//register
export const register =
  ({ name, email, password, password2, avatar }) =>
  async (dispatch) => {
    const body = JSON.stringify({ name, password, password2, email, avatar });
    try {
      const res = await axios.post("/register", body, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data.token });
      dispatch(loadUser());
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

// login
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const body = JSON.stringify({ password, email });
      const res = await axios.post("/login", body, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
      dispatch(loadUser());
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
// login
export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`/users`);
    dispatch({ type: GET_USERS, payload: res.data.user });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};
