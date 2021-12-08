import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { tabs } from "../../helpers/tabs";
import SignOutUser from "../sign-out/signOutComp";
import { useLocation, useHistory } from "react-router-dom";

function NavigationBarComp({ user, set }) {
  const location = useLocation();
  const history = useHistory();

  return (
    <Navbar
      className="main-header"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-between"
        >
          <Nav className="me-auto">
            {user._id
              ? tabs
                  .filter((x) => x.displayForLoggedin && !x.searchResults)
                  .map((tab, index) => (
                    <Nav.Link
                      className={`nav-item-link ${
                        location.pathname == tab.href ? "active" : ""
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
                        location.pathname == tab.href ? "active" : ""
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
          {user._id && <SignOutUser user={user}></SignOutUser>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBarComp;
