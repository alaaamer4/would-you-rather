import React from "react";
import styles from "./navbar.module.css";
import { NavLink, Link } from "react-router-dom";
import { logout } from "../../store/actions/auth";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/logo.png";
const Navbar = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const unAuthLinks = [
    {
      name: "login",
      route: "/login",
    },
    {
      name: "register",
      route: "/register",
    },
  ];
  const authLinks = user && [
    {
      name: "Dashboard",
      route: "/",
    },
    {
      name: "New Question",
      route: "/add",
    },
    {
      name: "Leader Board",
      route: "/leaderboard",
    },
  ];
  const onClick = () => {
    dispatch(logout());
  };
  return isAuth && user ? (
    <nav className={styles.navbar}>
      <div className={styles.nav_left}>
        <NavLink activeStyle={{ color: "#fff" }} to="/">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      <div className="nav-right">
        <ul className={styles.nav_links}>
          {authLinks &&
            authLinks.map((link, index) => (
              <li key={index}>
                <NavLink exact activeStyle={{ color: "#fff" }} to={link.route}>
                  {link.name}
                </NavLink>
              </li>
            ))}
          <li className={styles.avatar}>
            <img src={user.avatar} alt="avatar" />
          </li>
          <li>{user.name}</li>
          <li>
            <Link to="/" onClick={onClick}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  ) : (
    <nav className={styles.navbar}>
      <div className={styles.nav_left}>
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      <div className="nav-right">
        <ul className={styles.nav_links}>
          {unAuthLinks.map((link, index) => (
            <li key={index}>
              <NavLink exact activeStyle={{ color: "#fff" }} to={link.route}>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
