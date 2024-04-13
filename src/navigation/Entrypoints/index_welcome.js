import * as React from "react";

// Screens
import Login from "../../screens/Utilities/Authentication/Login";

// Navigators
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Type
import RightDrawer from "../Home/RightDrawer";
import Verify from "../../screens/Utilities/Authentication/Verify";
import LoaderEffect from "../../components/Loader/InitLoaderEffect";
import AboutMe from "../../screens/Profile/Profile/AboutMe";
import ReminderScreen from "../../screens/Utilities/Notification/Reminder";
import MoodTracker from "../../screens/Home/Utilities/Mood/Update/MoodTracker";
import Test from "../../screens/Discover/Utilities/Test";
import HomeWork from "../../screens/Home/Utilities/HomeWork";
import MoodInsights from "../../screens/Home/Utilities/Mood/Details/MoodInsights";
import MoodLog from "../../screens/Home/Utilities/Mood/Details/MoodLog";
import Progress from "../../screens/Home/Utilities/Progress";
import Heartitout from "../../screens/Utilities/Web/Heartitout";
import Onboarding from "../../screens/Utilities/Welcome/Onboarding";

const Stack = createNativeStackNavigator();

export default function AppNavigation3() {
  return (
    <NavigationContainer
      linking={{
        prefixes: ["https://heartitout.in/"],
        config: {
          screens: { onboarding: ":navigation" },
        },
      }}
    >
      <Stack.Navigator
        screenOptions={{
          contentStyle: {
            backgroundColor: "#FFF",
          },
          headerShown: false,
        }}
        initialRouteName={"onboarding"}
      >
        <Stack.Screen name="onboarding" component={Onboarding} />
        <Stack.Screen name="loader" component={LoaderEffect} />
        <Stack.Screen name="moodInsights" component={MoodInsights} />
        <Stack.Screen name="moodLog" component={MoodLog} />
        <Stack.Screen name="progress" component={Progress} />
        <Stack.Screen name="main" component={RightDrawer} />
        <Stack.Screen name="mood" component={MoodTracker} />
        <Stack.Screen name="LoginPage" component={Login} />
        <Stack.Screen name="verifyPage" component={Verify} />
        <Stack.Screen name="test" component={Test} />
        <Stack.Screen name="aboutMe" component={AboutMe} />
        <Stack.Screen name="homework" component={HomeWork} />
        <Stack.Screen name="webview" component={Heartitout} />
        <Stack.Screen
          name="reminder"
          component={ReminderScreen}
          options={{
            headerShown: false,
            presentation: "modal",
            animationTypeForReplace: "push",
            animation: "slide_from_right",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
