import { Link } from "react-router-dom";
import { tabs } from "../../helpers/Tabs";
import SignOutUser from "../sign-out/signOutComp";
import { useLocation } from "react-router-dom";
import AuthContext from "../../state/auth-context";
import { useContext } from "react";

const NavigationBarComp = (props) => {
  const ctx = useContext(AuthContext);
  const location = useLocation();

  return (
    <header>
      <nav
        className="main-header navbar navbar-expand-lg navbar-light"
        expand="lg"
      >
        <div className="container">
          <button
            id="toggle-btn"
            aria-controls="responsive-navbar-nav"
            type="button"
            aria-label="Toggle navigation"
            className="mb-1 ml-3 navbar-toggler collapsed"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="justify-content-between navbar-collapse collapse"
            id="responsive-navbar-nav"
          >
            <div className="me-auto nav">
              {ctx.isLoggedIn
                ? tabs
                    .filter((x) => x.displayForLoggedin && !x.searchResults)
                    .map((tab, index) => (
                      <Link
                        className={`nav-item-link nav-link ${
                          location.pathname === tab.href ? "active" : ""
                        }`}
                        key={index}
                        to={tab.href}
                      >
                        {tab.name}
                      </Link>
                    ))
                : tabs
                    .filter((x) => !x.hideForLoggedout)
                    .map((tab, index) => (
                      <Link
                        className={`nav-item-link nav-link ${
                          location.pathname === tab.href ? "active" : ""
                        }`}
                        key={index}
                        to={tab.href}
                      >
                        {tab.name}
                      </Link>
                    ))}
            </div>
            {ctx.isLoggedIn && <SignOutUser user={props.user}></SignOutUser>}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavigationBarComp;
