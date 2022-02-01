import { useContext } from "react";
import AuthContext from "../../state/auth-context";

const SignOutUser = ({ user }) => {
  const ctx = useContext(AuthContext);

  return (
    <div className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="/#"
        id="basic-nav-dropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Hi {ctx.user.name}
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <a className="dropdown-item" href="/#" onClick={ctx.onLogout}>
          Logout
        </a>
      </div>
    </div>
  );
};
export default SignOutUser;
