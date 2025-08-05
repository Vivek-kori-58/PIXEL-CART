import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState();

  // Check if session is active on mount
  useEffect(() => {
    axios
      .get("http://localhost:3001/check-auth", { withCredentials: true })
      .then((res) => {
        if (res.data.loggedIn) setIsLoggedIn(true);
        if (res.data.user) {
          setUserType(res.data.user.userType);
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userType, setUserType}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);