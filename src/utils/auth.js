import React, { createContext, useContext, useState } from "react";
import { ToastAndroid } from "react-native";
import NetInfo from "@react-native-community/netinfo";
export const AuthContext = createContext();

const showToast = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

export const AuthProvider = ({ children }) => {
  const [path, setPath] = useState("App");
  const pathing = (paths) => {
    setPath(paths);
  };
  const [home, setHome] = useState("App");
  const setHomes = (paths) => {
    setHome(paths);
  };
  const [divert, setDiversion] = useState("main");

  const Diversion = (screen) => {
    setDiversion(screen);
  }

  const connect = () => {
    let connect = true;
    NetInfo.addEventListener((state) => {
      connect = state.isConnected;
    });
    if (!connect) {
      showToast("It seems like you are not connected to HIO");
    }
    return connect;
  };

  return (
    <AuthContext.Provider value={{ pathing, path, setHomes, home, connect, Diversion, divert }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
