import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  ToastAndroid,
  KeyboardAvoidingView
} from "react-native";
import React, { useState } from "react";
import SInfo from "react-native-encrypted-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import { Mixpanel } from "mixpanel-react-native";
// import crashlytics from '@react-native-firebase/crashlytics';

import { useNavigation } from "@react-navigation/native";

import { data, codes } from "../constants";

import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://e5adfef643df1d558d810f49f20e22a9@o4506911526813696.ingest.us.sentry.io/4506911552569344",
});

const showToast = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

const requestOTP = async (code, number, navigation, [, setLoading]) => {
  const apiUrl = "https://n8n.heartitout.in/webhook/api/auth";

  let date = new Date();
  let formattedDate = date.toISOString().split("T")[0];
  if (date.getDate() > 15) {
    date.setMonth(date.getMonth() + 1);
    date.setDate(1);
    formattedDate = date.toISOString().split("T")[0];
  }
  try {
    const requestData = {
      phone: number,
      date: formattedDate,
      code: code,
      type: "send_otp",
    };
    if ((code + number).length < 10) throw new Error("invalid mobile number");

    axios
      .post(apiUrl, requestData)
      .then(async (res) => {
        const jsonData = {
          token: res.data.token,
          phone: res.data.phone,
          code: res.data.code,
          date: res.data.date,
        };
        const dataString = JSON.stringify(jsonData);
        await SInfo.setItem("token", dataString)
          .then(() => {
            console.log("Data stored securely");
          })
          .catch((error) => {
            console.log("Error: ", error);
            // showToast("Mobile number is too short")
          });
        navigation.navigate("verifyPage", res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  } catch (error) {
    console.log("Error requesting OTP:", error.message);
    showToast("Error requesting OTP " + error.message);
    setLoading(false);
  }
};

import Loginbg from "../components/Loginbg";

const Login = () => {
  const trackAutomaticEvents = true;
  const mixpanel = new Mixpanel(
    "f0f7cc32e3642946a8622275a4ec22c8",
    trackAutomaticEvents
  );
  mixpanel.init();
  // React.useEffect(() => {
  //   if (!firebase.apps.length) {
  //     firebase.initializeApp({
  //       // Paste your Firebase config object here
  //       apiKey: "AIzaSyDv7xfM3f5Xu4_r0FkbplzK5N20T3i0WlM",
  //       authDomain: "wellbeing-dashboard-mobile.firebaseapp.com",
  //       projectId: "wellbeing-dashboard-mobile",
  //       storageBucket: "wellbeing-dashboard-mobile.appspot.com",
  //       messagingSenderId: "87847447432",
  //       appId: "1:87847447432:android:34575c2cab1541ea8a283d",
  //       measurementId: "", // Leave this blank if you don't use Analytics
  //       databaseURL: "",
  //     });
  //   }
  // }, []);

  // const predefinedEvent = async () => {
  //   console.log("Predefined event");
  //   await analytics().logLogin({
  //     method: "facebook",
  //   });
  // };

  // const customEvent = async () => {
  //   console.log("Predefined custom event");
  //   await analytics().logEvent("bicket", {
  //     id: 3745092,
  //     item: "mens grey t-shirt",
  //     description: ["round neck", "long sleeved"],
  //     size: "L",
  //   });
  // };

  const [value, setValue] = useState("IN");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [number, onChangeNumber] = React.useState("");
  navigation.addListener("focus", () => {
    setLoading(false);
  });

  const handleKeyPress = (event) => {
    console.log(event.nativeEvent);
    if (event.nativeEvent.key === "Enter") {
      // Do something when Enter key is pressed
      console.log("Enter key pressed!");
    }
  };

  // const [isFocus, setIsFocus] = useState(false);
  

  return (
    <KeyboardAvoidingView
    behavior="padding"
    keyboardVerticalOffset={-210}
    style={{ flex: 1 }}
    >
      {/* <TopBar /> */}
      <ScrollView keyboardShouldPersistTaps='always'>
        <StatusBar
          backgroundColor={"#eaf7fc"}
          barStyle={"dark-content"}
          hidden={false}
        />

        <View
          style={{
            width: wp(100),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#eaf7fc",
              width: wp(100),
              height: hp(6),
            }}
          />
          <Loginbg />
        </View>

        <View className="flex-col items-center" style={{ marginTop: hp(3) }}>
          <Text style={styles.well}>Your Wellbeing Comes First!</Text>

          <Text style={styles.getinstant}>
            Get instant one-click appointments, track your wellbeing journey,
            access session notes, and more.
          </Text>
          <Text style={styles.allinone}>All in one place!</Text>

          <Text style={styles.enterphone}>Enter your Phone Number</Text>

          <View
            className="flex-row items-center"
            style={{ width: wp(82), marginTop: hp(3) }}
          >
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              containerStyle={styles.containerStyle}
              iconStyle={styles.iconStyle}
              itemTextStyle={{ fontSize: wp(4) }}
              data={data}
              search={false}
              dropdownPosition="top"
              inverted={false}
              showsVerticalScrollIndicator={true}
              iconColor="#455A64"
              mode="auto"
              maxHeight={400}
              autoScroll={false}
              // onFocus={() => setIsFocus(true)}
              // onBlur={() => setIsFocus(false)}
              labelField="show"
              // alwaysRenderSelectedItem = {false}
              valueField="code"
              placeholder="IN(+91)"
              searchPlaceholder="Search..."
              value={value}
              onChange={(item) => {
                setValue(item.code);
                console.log(item);
                customEvent();
              }}
            />

            <TextInput
              style={styles.input}
              onChangeText={onChangeNumber}
              value={number}
              // placeholder="6266019364"
              keyboardType="numeric"
              onSubmitEditing={() => {
                setLoading(true);
                requestOTP(codes[value], number, navigation, [
                  loading,
                  setLoading,
                ]);
                mixpanel.track("OTP Request done by", {
                  "Phone ": codes[value] + number,
                });
              }}
              onKeyPress={handleKeyPress}
            />
          </View>

          <ActivityIndicator animating={loading} size="large" />

          <TouchableOpacity
            onPressIn={() => {
              console.log("pressed");
            }}
            style={styles.button}
            onPress={() => {
              setLoading(true);
              requestOTP(codes[value], number, navigation, [
                loading,
                setLoading,
              ]);
              // predefinedEvent();
              mixpanel.track("OTP Request done by", {
                "Phone ": codes[value] + number,
              });
            }}
          >
            <Text style={styles.textStyle}>Get OTP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  well: {
    // Your Wellbeing Comes First!
    color: "#01818C",
    fontSize: wp(6),
    fontFamily: "Roboto",
    fontWeight: "700",
  },

  getinstant: {
    color: "#455A64",
    fontSize: wp(4.2),
    fontFamily: "Roboto",
    fontWeight: "400",
    lineHeight: wp(6),
    width: wp(75),
    textAlign: "center",
    marginTop: wp(0.5),
  },
  allinone: {
    color: "#455A64",
    fontSize: wp(4),
    fontFamily: "Roboto",
    fontWeight: "700",
    width: wp(75),
    textAlign: "center",
  },

  enterphone: {
    // Enter your Phone Number
    color: "#043953",
    fontSize: wp(5),
    fontFamily: "Roboto",
    fontWeight: "700",
    marginTop: hp(2),
  },

  vect: {
    width: wp(140),
    height: hp(38),
    background: "#EAF7FC",
    borderBottomRightRadius: wp(100),
    borderBottomLeftRadius: wp(100),
    position: "absolute",
  },
  box: {
    // overflow: 'hidden',
    alignItems: "center",
    height: hp(40),
    width: wp(100),
    // backgroundColor: 'red'
  },
  display: {
    width: wp(60),
    height: wp(61),
  },
  input: {
    height: hp(7),
    width: wp(83),
    backgroundColor: "white",
    borderRadius: wp(3),
    borderWidth: wp(0.4),
    borderColor: "rgba(69, 90, 100, 0.30)",
    borderStyle: "solid",
    color: "#455A64",
    fontWeight: "600",
    paddingLeft: wp(25),
    fontSize: wp(4),
  },
  dropdown: {
    // marginTop: 7,
    height: hp(7),
    width: wp(23),
    backgroundColor: "white",
    borderRadius: wp(3),
    borderWidth: wp(0.4),
    borderColor: "rgba(69, 90, 100, 0.30)",
    left: 0,
    zIndex: 1,
    paddingRight: wp(1.2),
    position: "absolute",
  },

  placeholderStyle: {
    height: wp(6),
    fontSize: wp(4),
    // fontWeight: "600",
    color: "#455A64",
    position: "absolute",
    zIndex: 1,
    fontFamily: "Roboto",
    fontWeight: "500",
    right: 0,
  },
  selectedTextStyle: {
    height: wp(6),
    fontSize: wp(4),
    // fontWeight: "600",
    color: "#455A64",
    position: "absolute",
    zIndex: 1,
    fontFamily: "Roboto",
    fontWeight: "500",
    right: 0,
  },
  iconStyle: {
    width: wp(5),
    position: "absolute",
    left: 0,
    height: wp(5),
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  containerStyle: {
    width: wp(40),
    // fontSize: wp(8)
    // marginBottom: 5,
  },

  icon: {
    marginRight: 5,
  },
  item: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },

  button: {
    height: hp(7.3),
    width: wp(82),
    marginTop: hp(1),
    backgroundColor: "#32959D",
    borderRadius: wp(10),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: hp(3),
  },

  textStyle: {
    textAlign: "center",
    color: "white",
    fontSize: wp(5),
    fontFamily: "Roboto",
    fontWeight: "500",
  },
});
