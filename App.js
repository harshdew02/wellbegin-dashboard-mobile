// import { StatusBar } from "expo-status-bar";
import * as React from "react";
import AppNavigation from "./src/navigation/Entrypoints/index";
import AppNavigation2 from "./src/navigation/Entrypoints/index_login";
import AppNavigation3 from "./src/navigation/Entrypoints/index_welcome";
import SInfo from "react-native-encrypted-storage";
import * as Sentry from "@sentry/react-native";
import { AuthProvider } from "./src/utils/auth";

Sentry.init({
  dsn: "https://ec1b21c2b930c93a3877302c172b5d15@o4507044218732544.ingest.us.sentry.io/4507044491427840",
});

export default function App() {
  const [token, setToken] = React.useState(false);
  const [welcome, setWelcome] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const isLogin = async () => {
      try {
        const storedToken = await SInfo.getItem("token");
        if (storedToken == null || storedToken == undefined) {
          setToken(false);
          const wel = await SInfo.getItem("welcome");
          console.log(wel);
          if (wel == undefined || wel == null) {
            setWelcome(true);
          }
        } else {
          const data = JSON.parse(storedToken);
          if (data.status !== "true") {
            setToken(false);
          } else setToken(true);
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
    return (
      <AuthProvider>
        {token ? (
          <AppNavigation />
        ) : welcome ? (
          <AppNavigation3 />
        ) : (
          <AppNavigation2 />
        )}
      </AuthProvider>
    );
  }
}
