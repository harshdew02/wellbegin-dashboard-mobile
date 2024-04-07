import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import SInfo from "react-native-encrypted-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import { useAuth } from "../utils/auth";
import { LogLevel, OneSignal } from "react-native-onesignal";
import { useIsFocused } from "@react-navigation/native";
import LoginNew from "../../assets/images/LoginNew.svg";
import TurnBack from "../../assets/images/turnBack.svg";
import { theme } from "../theme";
const showToast = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

// Add OneSignal within your App's root component
const AppInitializer = (mobile) => {
  console.log("App initializing");
  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize("3a865120-5f7d-41a2-b5b3-5bb205884c50");

  OneSignal.login(mobile);
  // Method for listening for notification clicks
  OneSignal.Notifications.addEventListener("click", (event) => {
    console.log("OneSignal: notification clicked:", event);
  });
};

const verifyOTP = async (
  otp,
  navigation,
  [loading, setLoading],
  [error, setError]
) => {
  const apiUrl = "https://n8n.heartitout.in/webhook/api/auth";
  try {
    const session = await SInfo.getItem("token");
    const data = JSON.parse(session);
    const requestData = {
      phone: data.phone,
      code: data.code,
      token: data.token,
      otp: otp,
      date: data.date,
      type: "verfiy_otp",
    };
    axios
      .post(apiUrl, requestData)
      .then(async (res) => {
        if (res.data.status == "true") {
          await SInfo.setItem(
            "token",
            JSON.stringify({
              token: data.token,
              new_token: res.data.token,
              phone: res.data.phone,
              code: res.data.code,
              otp: res.data.otp,
              date: res.data.date,
              status: res.data.status,
              usr_fullname: "",
              user_email: "",
            })
          );
          AppInitializer(res.data.code + res.data.phone);
          navigation.navigate("loader");
        } else {
          console.log("wrong otp received");
          setError("You entered the wrong code. Please try again.");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Something went wrong. Please try again later.");
        setLoading(false);
      });
  } catch (error) {
    console.log("Error requesting OTP:", error.message);
    setError("Something went wrong. Please try again later.");
    setLoading(false);
  }
};

const requestOTP = async (
  code,
  number,
  [loading, setLoading],
  [counter, setCounter],
  [timer, setTimer],
  [mul, setMul]
) => {
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
    if ((code + number).length < 10)
      throw new Error("Mobile number is too short");

    axios
      .post(apiUrl, requestData)
      .then(async (res) => {
        setLoading(false);
        const jsonData = {
          token: res.data.token,
          phone: res.data.phone,
          code: res.data.code,
          date: res.data.date,
        };
        const dataString = JSON.stringify(jsonData);
        await SInfo.setItem("token", dataString)
          .then(() => {
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
        showToast("OTP resent successfully");
        setMul(++mul);
        setCounter(mul * 30);
        setTimer(mul * 30);
        resendOTPT([timer, setTimer]);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  } catch (error) {
    console.log("Error requesting OTP:", error.message);
    setLoading(false);
  }
};

const resendOTPT = ([, setTimer]) => {
  setTimeout(() => {
    setTimer(true);
  }, 30000);
};

export default function Verify({ navigation, route }) {
  const [mul, setMul] = useState(1);
  const [counter, setCounter] = useState(30 * mul);
  const [timer, setTimer] = useState(false);
  const [otp, setOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(null);
  const { connect, trackM } = useAuth();

  navigation.addListener("focus", (ref) => {
    resendOTPT([, setTimer]);
    setLoading(false);
    setOtp(false);
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (counter == 0) clearInterval(interval);
      else setCounter(counter - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [counter]);

  const [number, onChangeNumber] = React.useState("");

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
    }
  }, [isFocused]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={-225}
      style={{ flex: 1 }}
    >
      {/* <TopBar /> */}
      <StatusBar
        backgroundColor={"#fff"}
        barStyle={"dark-content"}
        hidden={false}
      />

      <ScrollView
        contentContainerStyle={{
          display: "flex-1",
          flexDirection: "col",
          alignItems: "center",
        }}
        style={{ width: wp(100), height: hp(50) }}
        keyboardShouldPersistTaps="always"
      >
        <LoginNew width={wp(100)} height={wp(81.6)} />
        {/* <View style={{ marginTop: hp(4) }} className="flex-col items-center"> */}
        <Text style={styles.well}>
          It's time to take a leap towards a healthier mind
        </Text>
        <Text
          style={{
            color: "#01818C",
            fontSize: wp(4),
            fontFamily: "Roboto",
            fontWeight: "700",
            marginTop: hp(10),
          }}
        >
          Enter OTP Sent to +{route.params.code}
          {route.params.phone}
        </Text>
        <TextInput
          className="rounded-lg"
          style={[styles.input, { fontSize: wp(5) }, {textAlign:"center"}, {paddingHorizontal:wp(5)}]}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Enter OTP"
          keyboardType="numeric"
          onSubmitEditing={() => {
            connect();
            setLoading(true);
            setShowErrorMessage(null);
            verifyOTP(
              number,
              navigation,
              [loading, setLoading],
              [showErrorMessage, setShowErrorMessage]
            );
            trackM("Verification requested by: ", {
              phone: number
            })
          }}
        />

        {showErrorMessage && (
          <Text style={styles.wrong}>{showErrorMessage}</Text>
        )}

        <View
          style={{
            width: wp(84),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: hp(2.5),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: hp(7.3),
              justifyContent: "center",
            }}
          >
            <TurnBack />
            <Text
              style={{
                fontSize: wp(5.5),
                fontWeight: "500",
                color: "#455A64",
                marginLeft: wp(2),
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => {
              connect();
              setLoading(true);
              setShowErrorMessage(null);
              verifyOTP(
                number,
                navigation,
                [loading, setLoading],
                [showErrorMessage, setShowErrorMessage]
              );
              trackM("Verification requested by: ", {
                phone: number
              })
            }}
          >
            <ActivityIndicator
              animating={loading}
              size="large"
              style={{ position: "absolute", zIndex: 2 }}
              color={"#fff"}
            />
            <Text
              style={[styles.textStyle, { display: loading ? "none" : "flex" }]}
            >
              Verify OTP
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row" style={styles.resend}>
          {counter > 0 ? (
            <>
              <Text style={styles.check}>
                Haven’t received an OTP? Resend OTP in{" "}
                {Math.floor(counter / 60)
                  .toString()
                  .padStart(2, "0")}
                :{(counter % 60).toString().padStart(2, "0")} seconds.{" "}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.check}>Haven’t received an OTP? </Text>
              <TouchableOpacity
                disabled={counter > 0}
                onPress={() => {
                  if (timer == true) {
                    setLoading(true);
                    setShowErrorMessage(null);
                    requestOTP(
                      route.params.code,
                      route.params.phone,
                      [loading, setLoading],
                      [counter, setCounter],
                      [timer, setTimer],
                      [mul, setMul]
                    );
                    // setTimer(false);
                    // resendOTPT([, setTimer]);
                  }
                }}
              >
                <Text
                  style={[
                    {
                      color: counter > 0 ? "#455A64" : "#32959D",
                      fontWeight: counter > 0 ? "normal" : "700",
                    },
                    styles.check1,
                  ]}
                >
                  RESEND OTP
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <Text
          style={{
            fontSize: wp(3),
            width: wp(60),
            textAlign: "center",
            marginTop: hp(6),
            color: "rgba(69, 90, 100, 0.5)",
          }}
        >
          🔒 Your information is 100% confidential and never shared with anyone
        </Text>
        {/* </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrong: {
    marginTop: hp(2),
    color: "#D1421D",
    fontSize: wp(3),
    fontFamily: "Roboto",
    fontWeight: "400",
  },

  well: {
    // Your Wellbeing Comes First!
    textAlign: "center",
    color: "#01818C",
    width: wp(82),
    fontSize: wp(6.4),
    fontWeight: "700",
    marginTop: hp(3),
  },
  getinstant: {
    color: "#455A64",
    fontSize: wp(4.8),
    fontFamily: "Roboto",
    fontWeight: "400",
    lineHeight: wp(6),
    width: wp(75),
    textAlign: "center",
    marginTop: hp(0.9),
  },
  enterphone: {
    // Enter your Phone Number
    color: "#043953",
    fontSize: wp(5),
    fontFamily: "Roboto",
    fontWeight: "700",
  },

  box: {
    // overflow: 'hidden',
    alignItems: "center",
    marginTop: hp(4),
    // backgroundColor: 'red'
  },
  input: {
    height: hp(7),
    width: wp(70),
    borderWidth: wp(0.3),
    padding: wp(2.6),
    paddingLeft: wp(5),
    marginTop: hp(2),
    borderColor: "rgba(69, 90, 100, 0.6)",
  },

  button: {
    height: hp(7.3),
    width: wp(51),
    backgroundColor: "#32959D",
    borderRadius: wp(10),
    justifyContent: "center",
    alignItems: "center",
  },

  textStyle: {
    textAlign: "center",
    color: "white",
    fontSize: wp(5),
    fontFamily: "Roboto",
    fontWeight: "500",
  },

  resend: {
    marginTop: hp(3),
  },

  check: {
    color: "#455A64",
    fontSize: wp(3.4),
    fontFamily: "Roboto",
    fontWeight: "400",
  },

  check1: {
    // color: "#043953",
    fontSize: wp(3.4),
    fontFamily: "Roboto",
    // textDecorationLine: "underline",
  },
});
