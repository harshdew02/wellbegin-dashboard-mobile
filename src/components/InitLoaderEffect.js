import { View, Text, Image, StyleSheet, ToastAndroid, BackHandler } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "./TopBar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import SInfo from "react-native-encrypted-storage";
import axios from "axios";

const showToast = (message) => {
  ToastAndroid.show(message,ToastAndroid.SHORT);
}

export default function InitLoaderEffect({navigation}) {
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

  navigation.addListener("focus", async (ref) => {
    try {
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
            usr_fullname : data.usr_fullname,
            user_email : data.user_email,
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
            app_det:{},
            
            usr_fullname : data.usr_fullname,
            user_email : data.user_email,
            booking_link: "https://heartitout.in/therapists/",
            whats_new_onclick:"https://heartitout.in",
            product_onclick:"https://heartitout.in",
            //This is mood tracker
            has_mood:"no",
            //This is subscription status
            show_sub:"no",
            subs_det:"no",
            subs_no_of_days: "0",

            //This is banner section
            has_banner: "no",
            banner_link: "",
            on_click:""
          }


          //This the first call from the flowchart (and it is done)
          const apiUrl =
            "https://n8n.heartitout.in/webhook/api/fetch-user-details";
          await axios
            .post(apiUrl, userDetails)
            .then(async (res) => {
              // console.log("It is from first call",res.data)
              if (res.data.success == 10) {
                // await AsyncStorage.setItem("token", Token);
                // console.log("It is sucess:" ,res.data.success);
                finalDetails['get_details'] = "true";
              } else {
                finalDetails['usr_fullname'] = res.data.user_name;
                finalDetails['user_email'] = res.data.user_email;
                // navigation.navigate('main');
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
              //Needs to be enabled after
              
              if (res.data.status === "0") {
                // await AsyncStorage.setItem("token", Token);
                SInfo.removeItem('token');
                showToast('User credentials expired, please login again.');
                navigation.navigate('LoginPage')
                console.log("User invalid");
              } else if (res.data.status === "10") {
                // console.log("Show Book a Session");
                finalDetails.has_appointment= "no";
                finalDetails.booking_link=res.data.booking_link;
                // navigation.navigate('main');
              }
              else
              {
                // console.log(res.data);
                //If session is within 2 hours
                //1. Book another session and Join your session

                //If session is exists
                 //1. Book another session and Continue your well-being journey
                finalDetails.has_appointment = "yes"
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
                // await AsyncStorage.setItem("token", Token);
                finalDetails.has_banner = res.data.has_banner,
                finalDetails.banner_link = res.data.banner,
                finalDetails.on_click = res.data.ban_on_click,
                finalDetails.has_mood = res.data.mood_tacker;
                finalDetails.show_sub = res.data.show_sub;
                finalDetails.subs_det = res.data.subs_det;
                finalDetails.subs_no_of_days = res.data.subs_no_of_days;
                finalDetails.booking_link = res.data.booking_link;
                finalDetails.whats_new_onclick = res.data.whats_new_onclick;
                finalDetails.product_onclick = res.data.product_onclick;
              }
              else if (res.data.status === "10")
              {
                finalDetails.has_mood = res.data.mood_tacker;
                finalDetails.show_sub = res.data.show_sub;
                finalDetails.subs_det = res.data.subs_det;
                finalDetails.has_banner = res.data.has_banner;
                finalDetails.booking_link = res.data.booking_link;
                finalDetails.whats_new_onclick = res.data.whats_new_onclick;
                finalDetails.product_onclick = res.data.product_onclick;
              }
              else
              {
                throw new Error("User credentails expired");
              } 
            })
            .catch((err) => {
              console.log(err);
            });

            navigation.navigate("main",finalDetails);
        }
      }
    } catch (error) {
      navigation.navigate("LoginPage");
      console.log(error)
    }
  });

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