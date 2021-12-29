import { NavDropdown } from "react-bootstrap";

function SignOutUser({ user }) {
  return (
    <NavDropdown title={`Hi ${user.name}`} id="basic-nav-dropdown">
      <NavDropdown.Item href="#" onClick={logout}>
        Logout
      </NavDropdown.Item>
    </NavDropdown>
  );

  function logout() {
    localStorage.clear();
    window.location.href = "/sign-in";
  }
}
export default SignOutUser;
