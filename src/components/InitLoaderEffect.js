import {
  View,
  Text,
  Image,
  StyleSheet,
  ToastAndroid,
  BackHandler,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import SInfo from "react-native-encrypted-storage";
import axios from "axios";
import { useAuth } from "../utils/auth";

const showToast = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

export default function InitLoaderEffect( {route}) {
  const navigation = useNavigation();
  const {connect, Diversion, setUser} = useAuth();
  const backHandler = () => {
    BackHandler.exitApp();
    return true;
  };

  navigation.addListener("focus", () => {
    BackHandler.addEventListener("hardwareBackPress", backHandler);
  });

  navigation.addListener("blur", () => {
    BackHandler.removeEventListener("hardwareBackPress", backHandler);
  });

  const initializer = async ()=> {
    try {
      connect();
      // const nav_data = route.params != (null || undefined) ? route.params.navigation : "main";
      if(route.params != null && route.params != undefined) Diversion(route.params.navigation);
      let token = await SInfo.getItem("token");
      if (token == null || token == undefined) navigation.navigate("LoginPage");
      else {
        const data = JSON.parse(token);
        if (data.status !== "true") navigation.navigate("LoginPage");
        else {
          const userDetails = {
            phone: data.phone,
            code: data.code,
            token: data.new_token,
            otp: data.otp,
            date: data.date,
            usr_fullname: data.usr_fullname,
            user_email: data.user_email,
            insert_details: "false",
          };

          let finalDetails = {
            phone: data.phone,
            code: data.code,
            token: data.new_token,
            otp: data.otp,
            date: data.date,
            insert_details: "false",
            get_details: "false",
            has_appointment: "no",
            app_det: {},

            usr_fullname: data.usr_fullname,
            user_email: data.user_email,
            booking_link: "https://heartitout.in/therapists/",
            whats_new_onclick: "https://heartitout.in",
            product_onclick: "https://heartitout.in",
            //This is mood tracker
            has_mood: "no",
            //This is subscription status
            show_sub: "no",
            subs_det: "no",
            subs_no_of_days: "0",
            sub_onclick: "https://heartitout.in/",
            packages_onclick: "https://heartitout.in/",

            //This is banner section
            has_banner: "no",
            banner_link: "",
            on_click: "",
          };

          //This the first call from the flowchart (and it is done)
          const apiUrl =
            "https://n8n.heartitout.in/webhook/api/fetch-user-details";
          await axios
            .post(apiUrl, userDetails)
            .then(async (res) => {
              if (res.data.success == 10) {
                finalDetails["get_details"] = "true";
              } else {
                finalDetails["usr_fullname"] = res.data.user_name;
                finalDetails["user_email"] = res.data.user_email;
              }
            })
            .catch((err) => {
              console.log(err);
            });

          //This is the second call from flowchart
          const apiUrl2 =
            "https://n8n.heartitout.in/webhook/api/fetch-session-details";
          await axios
            .post(apiUrl2, userDetails)
            .then(async (res) => {
              if (res.data.status === "0") {
                SInfo.removeItem("token");
                showToast("User credentials expired, please login again.");
                navigation.navigate("LoginPage");
                console.log("User invalid");
              } else if (res.data.status === "10") {
                finalDetails.has_appointment = "no";
                finalDetails.booking_link = res.data.booking_link != (null || undefined) ? res.data.booking_link : "https://heartitout.in/therapists/";
              } else {
                finalDetails.has_appointment = "yes";
                finalDetails.app_det = res.data.app_det;
              }
            })
            .catch((err) => {
              console.log(err);
            });

          //This is the third api call from flowchart
          const apiUrl3 =
            "https://n8n.heartitout.in/webhook/api/home-page-details";
          await axios
            .post(apiUrl3, userDetails)
            .then(async (res) => {
              if (res.data.status === "1") {
                (finalDetails.has_banner = res.data.has_banner),
                  (finalDetails.banner_link = res.data.banner),
                  (finalDetails.on_click = res.data.ban_on_click != (null || undefined) ? res.data.ban_on_click : "https://heartitout.in/"),
                  (finalDetails.has_mood = res.data.mood_tacker != (null || undefined) ? res.data.mood_tacker : "no");
                finalDetails.show_sub = res.data.show_sub;
                finalDetails.subs_det = res.data.subs_det;
                finalDetails.subs_no_of_days = res.data.subs_no_of_days;
                finalDetails.booking_link = res.data.booking_link != (null || undefined) ? res.data.booking_link : "https://heartitout.in/therapists/";
                finalDetails.whats_new_onclick = res.data.whats_new_onclick != (null || undefined) ? res.data.whats_new_onclick : "https://heartitout.in/";
                finalDetails.product_onclick = res.data.product_onclick != (null || undefined) ? res.data.product_onclick : "https://heartitout.in/";
                finalDetails.sub_onclick = res.data.sub_onclick != (null || undefined) ? res.data.sub_onclick : "https://heartitout.in/";
                finalDetails.packages_onclick = res.data.packages_onclick != (null || undefined) ? res.data.packages_onclick : "https://heartitout.in/";
                setUser({category:res.data.user_category, type: res.data.user_type})
              } else if (res.data.status === "10") {
                (finalDetails.has_mood = res.data.mood_tacker != (null || undefined) ? res.data.mood_tacker : "no");
                finalDetails.show_sub = res.data.show_sub;
                finalDetails.subs_det = res.data.subs_det;
                finalDetails.has_banner = res.data.has_banner;
                finalDetails.booking_link = res.data.booking_link != (null || undefined) ? res.data.booking_link : "https://heartitout.in/therapists/";
                finalDetails.whats_new_onclick = res.data.whats_new_onclick != (null || undefined) ? res.data.whats_new_onclick : "https://heartitout.in/";
                finalDetails.product_onclick = res.data.product_onclick != (null || undefined) ? res.data.product_onclick : "https://heartitout.in/";
                finalDetails.sub_onclick = res.data.sub_onclick != (null || undefined) ? res.data.sub_onclick : "https://heartitout.in/";
                finalDetails.packages_onclick = res.data.packages_onclick != (null || undefined) ? res.data.packages_onclick : "https://heartitout.in/";
                setUser({category:res.data.user_category, type: res.data.user_type})
              } else {
                throw new Error("User credentails expired");
              }
              // console.log(res.data.show_sub)
            })
            .catch((err) => {
              console.log(err);
            });
            navigation.navigate("main", finalDetails);
        }
      }
    } catch (error) {
      // SInfo.removeItem("token");
      // showToast("User credentials expired, please login again.");
      // navigation.navigate("LoginPage");
      console.log(error);
    }
  }

  React.useEffect(() => {
    initializer();
  })

  return (
    <SafeAreaView className="bg-white" style={{ height: hp(100) }}>
      {/* <TopBar /> */}
      {/* <LottieView
        source={require()}
        style={styles.animation}
        // autoPlay
      /> */}
      <Image
        className="mr-8"
        source={require("../../assets/images/loader.gif")}
        style={{ height: hp(28), width: wp(100), marginTop: hp(24) }}
      />

      <View className="flex-row justify-around">
        <Text style={styles.text1}>
          Relax while we setup your Personalised Wellbeing Dashboard
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text1: {
    color: "#043953",
    fontSize: hp(2),
    textAlign: "center",
    fontFamily: "Roboto",
    fontWeight: "700",
    lineHeight: hp(3),
    width: wp(80),
    paddingVertical: hp(2),
    marginTop: hp(2),
  },
  animation: {
    width: 100,
    height: 100,
  },
});
