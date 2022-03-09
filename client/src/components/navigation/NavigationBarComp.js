import { Link } from "react-router-dom";
import { tabs } from "../../helpers/tabs";
import SignOutUser from "../sign-out/signOutComp";
import { useLocation } from "react-router-dom";
import AuthContext from "../../state/auth-context";
import { useContext } from "react";

const NavigationBarComp = (props) => {
  const ctx = useContext(AuthContext);
  const location = useLocation();

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        {" "}
        <div className="container">
          <a id="site-name-title" className="navbar-brand ps-2" href="#">
            Cards CMS
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"> &#9776;</span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            {ctx.isLoggedIn && <SignOutUser user={props.user}></SignOutUser>}
            <ul className="navbar-nav ms-auto">
              {ctx.isLoggedIn
                ? tabs
                    .filter((x) => x.displayForLoggedin && !x.searchResults)
                    .map((tab, index) => (
                      <li className="nav-item" key={index}>
                        <Link
                          className={`nav-link ${
                            location.pathname === tab.href ? "active" : ""
                          }`}
                          to={tab.href}
                        >
                          {tab.name}
                        </Link>
                      </li>
                    ))
                : tabs
                    .filter((x) => !x.hideForLoggedout)
                    .map((tab, index) => (
                      <li className="nav-item" key={index}>
                        <Link
                          className={`nav-link ${
                            location.pathname === tab.href ? "active" : ""
                          }`}
                          to={tab.href}
                        >
                          {tab.name}
                        </Link>
                      </li>
                    ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavigationBarComp;
