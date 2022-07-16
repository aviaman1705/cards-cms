import React, { useState } from "react";
import { useEffect } from "react";
import { logout, useAuth } from "../firebase/firebase";

const AuthContext = React.createContext({
  isLoggedIn: false,
  user: null,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextPrvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const currentUser = useAuth();

  useEffect(() => {
    setUser(currentUser);
    if (currentUser) {
      setIsLoggedIn(true);
    }
  }, [currentUser]);

  const logoutHandler = async () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    logout();
  };

  const loginHandler = (user) => {
    localStorage.setItem("token", user.accessToken);
    setUser({ email: user.email });
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        token: token,
        isLoggedIn: isLoggedIn,
        user: user,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
