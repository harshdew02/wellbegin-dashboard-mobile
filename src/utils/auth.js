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
  let divert = "main";

  const Diversion = (screen) => {
    if (
      screen === "moodinsights" ||
      screen === "todaymood" ||
      screen === "diagnostic" ||
      screen === "profile" ||
      screen === "aboutme" ||
      screen === "discover" ||
      screen === "homework" ||
      screen === "myprogress" ||
      screen === "reminder"
    )
      divert = screen;
  };

  const getDiversion = () => {
    return divert;
  }

  let new_user = {
    category: "regular",
    type:"new"
  };

  const setUser = (is_new)=>{
    console.log("New system: ",is_new)
    new_user.category = is_new.category;
    new_user.type = is_new.type;
  }

  const getUser = ()=>{
    return new_user;
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
    <AuthContext.Provider
      value={{ pathing, path, setHomes, home, connect, Diversion, getDiversion, getUser, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
