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

const Stack = createNativeStackNavigator();

export default function AppNavigation() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {
            backgroundColor: '#FFF'
          },
          headerShown: false
        }}
        initialRouteName={'loader'}
        // initialRouteName={'main'}
        // initialRouteName={'about'}
        
      >
        <Stack.Screen name="loader" component={LoaderEffect} />
        {/* <Stack.Screen name="about" component={ProfileNavigator} /> */}
        <Stack.Screen name="main" component={RightDrawer} />
        <Stack.Screen name="LoginPage" component={Login} />
        <Stack.Screen name="verifyPage" component={Verify} />
        <Stack.Screen name="aboutMe" component={AboutMe}/>
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
