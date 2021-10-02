import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../store/actions/auth";
const Login = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(value));
  };
  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  return isAuth ? (
    <Redirect to="/" />
  ) : (
    <form className="login-page" onSubmit={onSubmit}>
      <div className="login-inputs">
        <input
          name="email"
          value={value.email}
          onChange={onChange}
          className="login-input"
          type="email"
          placeholder="Email"
        />
        <input
          name="password"
          value={value.password}
          onChange={onChange}
          className="login-input"
          type="password"
          placeholder="Password"
        />
        <Link to="/register"> Don't have an account? Register now </Link>

        <button type="submit" className="login-btn">
          Login
        </button>
      </div>
      <div className="login-screen"></div>
    </form>
  );
};

export default Login;
