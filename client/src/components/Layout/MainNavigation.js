import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <header className={classes.header}>
      <NavLink to="/">
        <div className={classes.logo}>Cards CMS</div>
      </NavLink>
      <nav>
        <ul>
          <li>
            <NavLink exact activeClassName={classes["active"]} to="/">
              Home
            </NavLink>
          </li>
          {!isLoggedIn && (
            <li>
              <NavLink activeClassName={classes["active"]} to="/auth">
                Login
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink activeClassName={classes["active"]} to="/profile">
                Profile
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink activeClassName={classes["active"]} to="/my-cards">
                My Cards
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink activeClassName={classes["active"]} to="/my-favorites">
                My Favorites
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
