import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const SignOutUser = () => {
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
        היי {ctx.user?.email}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <a className="dropdown-item" href="/#" onClick={ctx.logout}>
            יציאה
          </a>
        </li>
      </ul>
    </div>
  );
};
export default SignOutUser;
