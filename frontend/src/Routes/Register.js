import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import FileBase64 from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/actions/auth";
const Register = () => {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    avatar: "",
  });
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(value));
  };
  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  return isAuth ? (
    <Redirect to="/" />
  ) : (
    <form className="register-page" onSubmit={onSubmit}>
      <div className="register-screen"></div>
      <div className="register-inputs">
        <input
          onChange={onChange}
          value={value.email}
          name="email"
          className="register-input"
          type="email"
          placeholder="Email"
        />
        <input
          onChange={onChange}
          value={value.name}
          name="name"
          className="register-input"
          type="text"
          placeholder="Username"
        />
        <input
          onChange={onChange}
          value={value.password}
          name="password"
          className="register-input"
          type="password"
          placeholder="Password"
        />
        <input
          onChange={onChange}
          value={value.password2}
          name="password2"
          className="register-input"
          type="password"
          placeholder="Confirm Password"
        />
        <div>
          Avatar {"  "}
          <FileBase64
            key="avatar"
            type="file"
            multiple={false}
            onDone={({ base64 }) => setValue({ ...value, avatar: base64 })}
          />
        </div>
        <button type="submit" className="register-btn">
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;
