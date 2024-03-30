import React, { createContext, useContext, useState } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [path, setPath] = useState("App");
  const pathing = (paths) => {
    setPath(paths);
  };

  const [home, setHome] = useState("App");
  const setHomes = (paths) => {
    setHome(paths)
  }

  return (
    <AuthContext.Provider value={{pathing, path, setHomes, home}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};