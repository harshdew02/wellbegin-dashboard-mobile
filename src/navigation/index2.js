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
import ProfileNavigator from "./ProfileNavigator";
import MoodTracker from "../screens/MoodTracker";
import Task from "../screens/Task";
import HomeWork from "../screens/HomeWork";
import MoodInsights from "../screens/MoodInsights";

const Stack = createNativeStackNavigator();

export default function AppNavigation2() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {
            backgroundColor: '#FFF'
          },
          headerShown: false
        }}
        initialRouteName={'LoginPage'}
        // initialRouteName={'LoginPage'}
        // initialRouteName={'main'}
        // initialRouteName={'about'}
        // initialRouteName={'verifyPage'}
      >
        <Stack.Screen name="loader" component={LoaderEffect} />
        <Stack.Screen name="moodInsights" component={MoodInsights} />
        {/* <Stack.Screen name="about" component={ProfileNavigator} /> */}
        <Stack.Screen name="main" component={RightDrawer} />
        <Stack.Screen name="mood" component={MoodTracker} />
        <Stack.Screen name="LoginPage" component={Login} />
        <Stack.Screen name="verifyPage" component={Verify} />
        <Stack.Screen name="task" component={Task}/>
        <Stack.Screen name="aboutMe" component={AboutMe}/>
        <Stack.Screen name="homework" component={HomeWork}/>
        <Stack.Screen name="reminder" component={ReminderScreen}

          options={{
            headerShown: false,
            presentation: 'modal',
            animationTypeForReplace:'push',
            // animation: 'slide_from_right'
            // animation: 'flip'
            // animation: 'none'
            animation: 'slide_from_right'
          }}

        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
