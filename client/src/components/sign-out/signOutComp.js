import { NavDropdown } from "react-bootstrap";

function SignOutUser() {
  return (
    <NavDropdown title="Hi User" id="basic-nav-dropdown">
      <NavDropdown.Item href="#" onClick={logout}>
        Logout
      </NavDropdown.Item>
    </NavDropdown>
  );

  function logout() {
    localStorage.clear();
    window.location.href = "/";
  }
}
export default SignOutUser;
