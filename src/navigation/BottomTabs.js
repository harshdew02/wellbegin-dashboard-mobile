import * as React from "react";
import { View, StyleSheet, Text, Dimensions, BackHandler } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Icons

// Screens
import DiscoverScreen from "../screens/DiscoverScreen";
import HomeScreen from "../screens/HomeScreen";

// Navigator
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SVGComponent from "../components/SVGcom";
import HomeIcon from "../components/HomeIcon.js";
import ProfileIcon from "../components/Profile.js";
import TopBarMain from "../components/TopBarMain.js";
import ProfileNavigator from "./ProfileNavigator.js";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { request, PERMISSIONS, check, RESULTS } from "react-native-permissions";

const { width, height } = Dimensions.get("window");

const screenOptions = {
  contentStyle: {
    backgroundColor: "#FF0000",
  },
  headerShown: false,

  tabBarShowLabel: false,
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    // elevation: 4,
    height: hp(9),

    shadowOpacity: 1,
    shadowRadius: 16.0,
    elevation: 4,
    // borderTopLeftRadius: 21,
    // borderTopRightRadius: 21,
    shadowColor: "#52006A",

    shadowOffset: {
      width: 0,
      height: 12,
    },
  },
};

export default function BottomTabs(props) {
  const navigation = useNavigation();

  const data = props.route.params;

  const Tab = createBottomTabNavigator();

  React.useEffect(() => {
    try {
      const navigate = data.route.params.navigate;
      const payload = data.route.params;
      console.log(navigate, payload);
      switch (navigate) {
        case "reminder":
          navigation.navigate("reminder", payload);
          break;
        case "homework":
          navigation.navigate("homework", payload);
          break;
        case "todaymood":
          navigation.navigate("mood", payload);
          break;
        case "diagnostic":
          navigation.navigate("test", payload);
          break;
        case "myprogress":
          navigation.navigate("progress", payload);
          break;
        case "moodinsights":
          navigation.navigate("moodInsights", payload);
          break;
        case "aboutme":
          navigation.navigate("aboutMe", payload);
          break;
        case "profile":
          navigation.navigate("Profile_Tab", payload);
          break;
        case "discover":
          navigation.navigate("Discover_Tab", payload);
          break;
        default:
          navigation.navigate("Home_Tab", payload);
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const requestNotificationPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    return result;
  };

  const checkNotificationPermission = async () => {
    const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    return result;
  };

  const requestPermission = async () => {
    const checkPermission = await checkNotificationPermission();
    if (checkPermission !== RESULTS.GRANTED) {
      const request = await requestNotificationPermission();
      if (request !== RESULTS.GRANTED) {
        console.log("Permission denied");
      }
    }
  };

  React.useEffect(() => {
    requestPermission();
  }, []);

  return (
    <View
      style={{
        width,
        height,
      }}
    >
      {/* <TopBarMain/> */}
      <Tab.Navigator initialRouteName="Home_Tab" screenOptions={screenOptions}>
        <Tab.Screen
          name="Discover_Tab"
          component={DiscoverScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{
                    width: wp(16),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SVGComponent color={focused ? "#01818C" : "#455A64"} />
                  <Text
                    style={{
                      fontFamily: "Roboto",
                      fontWeight: "700",
                      fontSize: wp(3),
                      color: focused ? "#01818C" : "#455A64",
                    }}
                  >
                    Discover
                  </Text>

                  {/* <Text color={focused ? "#01818C" : "#455A64"} style={styles.discover} >Discover</Text> */}
                </View>
              );
            },
          }}
          initialParams={{ data }}
        />

        <Tab.Screen
          name="Home_Tab"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                // <TouchableOpacity>
                <View
                  style={{
                    width: wp(16),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <HomeIcon color={focused ? "#01818C" : "#455A64"} />
                  <Text
                    style={{
                      fontFamily: "Roboto",
                      fontWeight: "700",
                      fontSize: wp(3),
                      color: focused ? "#01818C" : "#455A64",
                    }}
                  >
                    Home
                  </Text>
                </View>
                //  </TouchableOpacity>
              );
            },

            headerShown: false,
            presentation: "modal",
            animationTypeForReplace: "push",
            animation: "slide_from_right",
            // animation: 'flip'
            // animation: 'none'
            // animation: 'slide_from_right'
          }}
          initialParams={{ data }}
        />
        <Tab.Screen
          name="Profile_Tab"
          component={ProfileNavigator}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                // <TouchableOpacity>
                <View
                  style={{
                    width: wp(16),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ProfileIcon color={focused ? "#01818C" : "#455A64"} />
                  <Text
                    style={{
                      fontFamily: "Roboto",
                      fontWeight: "700",
                      fontSize: wp(3),
                      color: focused ? "#01818C" : "#455A64",
                    }}
                  >
                    Profile
                  </Text>
                </View>
                //  </TouchableOpacity>
              );
            },
          }}
          initialParams={{ data }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({});
