// import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppNavigation from "./src/navigation";
import AppNavigation2 from "./src/navigation/index2";
import SInfo from "react-native-encrypted-storage";

export default function App() {
  const [token, setToken] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const isLogin = async () => {
      try {
        const storedToken = await SInfo.getItem("token");
        if (storedToken == null || storedToken === undefined) {
          setToken(false);
        } else {
          const data = JSON.parse(storedToken);
          console.log(data)
          if (data.status !== "true") setToken(false);
          else setToken(true);
        }
      } catch (error) {
        console.error("Error while fetching token:", error);
        // Handle error, you might want to set token to false or do something else
        setToken(false);
      } finally {
        setLoading(false); // Whether token is found or not, loading state should be updated
      }
    };

    isLogin();
  }, []);
  if (loading) {
  } else {
    return <>{token ? <AppNavigation /> : <AppNavigation2 />}</>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
