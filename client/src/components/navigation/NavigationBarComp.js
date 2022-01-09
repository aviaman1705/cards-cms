import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { tabs } from "../../helpers/tabs";
import SignOutUser from "../sign-out/signOutComp";
import { useLocation } from "react-router-dom";

function NavigationBarComp(props) {
  const location = useLocation();

  return (
    <header>
      <Navbar className="main-header" collapseOnSelect expand="lg">
        <Container className="px-2">
          <Navbar.Toggle
            className="mb-1"
            id="toggle-btn"
            aria-controls="responsive-navbar-nav"
          />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-between"
          >
            <Nav className="me-auto">
              {props.user._id
                ? tabs
                    .filter((x) => x.displayForLoggedin && !x.searchResults)
                    .map((tab, index) => (
                      <Nav.Link
                        className={`nav-item-link ${
                          location.pathname === tab.href ? "active" : ""
                        } `}
                        key={index}
                        to={tab.href}
                        as={Link}
                      >
                        {" "}
                        {tab.icon} {tab.name}{" "}
                      </Nav.Link>
                    ))
                : tabs
                    .filter((x) => !x.hideForLoggedout)
                    .map((tab, index) => (
                      <Nav.Link
                        className={`nav-item-link ${
                          location.pathname === tab.href ? "active" : ""
                        } `}
                        key={index}
                        to={tab.href}
                        as={Link}
                      >
                        {" "}
                        {tab.icon} {tab.name}{" "}
                      </Nav.Link>
                    ))}
            </Nav>
            {props.user._id && <SignOutUser user={props.user}></SignOutUser>}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default NavigationBarComp;
