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
import React, { useState } from "react";
import SInfo from "react-native-encrypted-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import Logo4 from "../../assets/images/verifyDisplay.svg";
import Back from "../../assets/images/arrow.svg";
import { useAuth } from "../utils/auth";
import { LogLevel, OneSignal } from "react-native-onesignal";

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

  // requestPermission will show the native iOS or Android notification permission prompt.
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
  OneSignal.Notifications.requestPermission(true);

  OneSignal.login(mobile)
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
        console.log(res.data);

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
          AppInitializer(res.data.code+res.data.phone);
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
        // console.log(dataString);
        await SInfo.setItem("token", dataString)
          .then(() => {
            console.log("Data stored securely");
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
  const {connect} = useAuth();

  // console.log(diversion)
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

      <ScrollView keyboardShouldPersistTaps='always'>
        <View style={styles.box}>
          <TouchableOpacity
            style={{ position: "absolute", left: wp(8) }}
            onPress={() => {
              navigation.navigate("LoginPage");
            }}
          >
            <Back width={wp(8.5)} height={wp(8.5)} />
          </TouchableOpacity>
          <Logo4 width={wp(46)} height={wp(37)} style={{ marginTop: hp(8) }} />
        </View>

        <View style={{ marginTop: hp(4) }} className="flex-col items-center">
          <Text style={styles.enterphone}>Verification Code</Text>

          <Text style={styles.getinstant}>
            We have sent the code verification to your Phone Number
          </Text>

          {/* <Text style={styles.mob}>+{route.params.mobile}</Text> */}
          <Text style={styles.mob}>
            +{route.params.code}
            {route.params.phone}
          </Text>

          <TextInput
            className="rounded-lg"
            style={[styles.input, { textAlign: 'center', fontSize: wp(5) }]}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Enter OTP"
            keyboardType="numeric"
            onSubmitEditing={() => {
              connect()
              setLoading(true);
              setShowErrorMessage(null);
              verifyOTP(
                route.params.code,
                route.params.phone,
                route.params.token,
                number,
                route.params.date,
                navigation,
                [loading, setLoading],
                [showErrorMessage, setShowErrorMessage]
                )
            }}
          />

          {showErrorMessage && (
            <Text style={styles.wrong}>{showErrorMessage}</Text>
          )}
          <ActivityIndicator animating={loading} size="large" />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              connect()
              setLoading(true);
              setShowErrorMessage(null);
              verifyOTP(
                number,
                navigation,
                [loading, setLoading],
                [showErrorMessage, setShowErrorMessage],
              );
            }}
          >
            <Text style={styles.textStyle}>Verify OTP</Text>
          </TouchableOpacity>

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
        </View>
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

  enterphone: {
    // Enter your Phone Number
    color: "#043953",
    fontSize: wp(5),
    fontFamily: "Roboto",
    fontWeight: "700",
  },

  getinstant: {
    width: wp(84),
    // hp(6)
    color: "#455A64",
    fontSize: wp(4),
    fontFamily: "Roboto",
    textAlign: "center",
    fontWeight: "400",
    lineHeight: wp(6),
    marginTop: hp(2),
  },

  mob: {
    color: "#043953",
    fontSize: wp(4),
    fontFamily: "Roboto",
    fontWeight: "700",
    marginTop: hp(2),
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
    borderWidth: 1,
    padding: 10,
    marginTop: hp(3),
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
    marginBottom: hp(10),
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
