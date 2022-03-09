import { useContext } from "react";
import AuthContext from "../../state/auth-context";

const SignOutUser = ({ user }) => {
  const ctx = useContext(AuthContext);

  return (
    <div className="dropdown">
      <button
        className="btn dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        היי {ctx.user.name}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <a className="dropdown-item" href="/#" onClick={ctx.onLogout}>
            יציאה
          </a>
        </li>
      </ul>
    </div>
  );
};
export default SignOutUser;
