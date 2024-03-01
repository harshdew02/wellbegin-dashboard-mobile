import * as React from "react";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import SInfo from 'react-native-encrypted-storage';
// Drawer
import BottomTabs from "./BottomTabs";
// import { Help, Profile, SelectLang, Settings } from "../drawer";
import CustomDrawer from "../components/CustomDrawer";

const Drawer = createDrawerNavigator();

export default function RightDrawer({ navigation, route }) {
  // const nav = useNavigation()
  navigation.addListener("focus", async (ref) => {
    let token = await SInfo.getItem("token");
    let data = JSON.parse(token);
    // console.log("Rightdrawr: ",route.params)
    const userDet = {
      usr_fullname: route.params.usr_fullname,
      user_email: route.params.user_email,
      phone: route.params.phone,
      code: route.params.code,
      token: route.params.token,
      otp: route.params.otp,
      date: route.params.date,
      insert_details: "true",
    };
    if (route.params.get_details === "true") {
      navigation.navigate("aboutMe", userDet);
    } else {
      data.usr_fullname =userDet.usr_fullname;
      data.user_email = userDet.user_email;
      SInfo.setItem('token',JSON.stringify(data));
    }
  });

  return (
    <>
      <Drawer.Navigator
        initialRouteName="BottomBar"
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: "#fff",
            width: wp(90),
          },
          drawerPosition: "right",
        }}
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen
          name={"BottomBar"}
          component={BottomTabs}
          options={{
            drawerItemStyle: { height: 0 },
          }}
          initialParams={{ route }}
        />
      </Drawer.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: hp(12),
    backgroundColor: "white",
    boxShadow: "0px 1.5px 10px 1px rgba(1, 129, 140, 0.25)",
    borderRadius: 5,
    // NOTE: boxShadow is not directly supported in React Native.
    // You might need to use elevation for shadow effects on Android.
    elevation: 5,
  },

  line: {
    height: hp(11),
    backgroundColor: "#01818C",
    width: wp(1),
    position: "absolute",
    left: wp(2),
    marginTop: wp(1),
  },
});
