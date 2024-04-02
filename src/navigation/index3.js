import * as React from "react";

// Screens
import Login from "../screens/Login";

// Navigators
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Type
import RightDrawer from "./RightDrawer";
import Verify from "../screens/Verify";
import LoaderEffect from "../components/InitLoaderEffect";
import AboutMe from "../screens/AboutMe";
import ReminderScreen from "../screens/ReminderScreen";
import MoodTracker from "../screens/MoodTracker";
import Test from "../screens/Test";
import HomeWork from "../screens/HomeWork";
import MoodInsights from "../screens/MoodInsights";
import MoodLog from "../screens/MoodLog";
import Progress from "../screens/Progress";
import Heartitout from "../screens/Heartitout";

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
