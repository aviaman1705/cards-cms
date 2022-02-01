import React, { useEffect, useState } from "react";
import { getMeData } from "../helpers/FetchHelper";

const AuthContext = React.createContext({
  isLoggedIn: false,
  user: null,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextPrvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("token");

    if (storedUserLoggedInInformation) {
      getMeData(localStorage.getItem("token"), (data) => {
        setUser(data);
        setIsLoggedIn(true);
      });
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const loginHandler = (token) => {
    localStorage.setItem("token", token);
    debugger;
    getMeData(token, (data) => {
      setUser(data);
      setIsLoggedIn(true);
    });
  };

  return (
    <AuthContext.Provider
      value={{
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
