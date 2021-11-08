import { NavDropdown } from "react-bootstrap";

function SignOutUser({ user, set }) {
  return (
    <NavDropdown title={`Hi ${user.name}`} id="basic-nav-dropdown">
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
