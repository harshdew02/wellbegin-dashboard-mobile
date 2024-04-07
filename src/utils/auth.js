import React, { createContext, useContext, useState } from "react";
import { ToastAndroid } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { Mixpanel } from "mixpanel-react-native";
import * as Sentry from "@sentry/react-native";
export const AuthContext = createContext();

const showToast = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

let allow = false;
let new_user = {
  category: "regular",
  type: "new",
};
let divert = "main";

let userDetail = {};

console.log("Mixpanel started...");
const trackAutomaticEvents = true;

const mixpanel = new Mixpanel(
  "95cfb96d46f0484f9fa7fc4768f39577",
  trackAutomaticEvents
);

mixpanel.init();

Sentry.init({
  dsn: "https://ec1b21c2b930c93a3877302c172b5d15@o4507044218732544.ingest.us.sentry.io/4507044491427840",
});

export const AuthProvider = ({ children }) => {
  const [path, setPath] = useState("App");
  const pathing = (paths) => {
    setPath(paths);
  };
  const [home, setHome] = useState("App");
  const setHomes = (paths) => {
    setHome(paths);
  };
  const [names, setName] = useState(false);
  const setNames = ()=>{
    setName(true);
  }
  const payloadInitials = (payload) => {
    userDetail = payload;
  };
  const userDetails = () => {
    return userDetail;
  };

  const exceptionReporting = (error) => {
    let report = JSON.stringify(error)
    Sentry.captureException(
      new Error(report)
    );
  };

  const trackM = (title, payload) => {
    mixpanel.track(title, payload);
  };

  const Diversion = (screen) => {
    divert = screen;
  };

  const getDiversion = () => {
    return divert;
  };

  const setUser = (is_new) => {
    new_user.category =
      is_new.category != (null || undefined) ? is_new.category : "regular";
    new_user.type = is_new.type != (null || undefined) ? is_new.type : "new";
  };

  const getUser = () => {
    return new_user;
  };

  const isAllowed = (allowed) => {
    allow = allowed;
  };

  const getAllowed = () => {
    return allow;
  };

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
      value={{
        pathing,
        path,
        setHomes,
        home,
        connect,
        Diversion,
        getDiversion,
        getUser,
        setUser,
        isAllowed,
        getAllowed,
        userDetails,
        payloadInitials,
        trackM,
        exceptionReporting,
        names,
        setNames
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
