import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("User");
  const [mobileNumber, setMobileNumber] = useState("");
 
  return (
    <AuthContext.Provider value={{ loggedIn, userName, setLoggedIn, setUserName, mobileNumber, setMobileNumber }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
