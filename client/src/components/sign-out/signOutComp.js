function SignOutUser({ user }) {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/sign-in";
  };

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
        Hi {user.name}
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <a className="dropdown-item" href="/#" onClick={logout}>
          Logout
        </a>
      </div>
    </div>
  );
}
export default SignOutUser;
