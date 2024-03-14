import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import SInfo from "react-native-encrypted-storage";
import TopBar from "../components/TopBar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import Logo4 from "../../assets/images/verifyDisplay.svg";
import Back from "../../assets/images/arrow.svg";

const showToast = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

const verifyOTP = async (
  code,
  mobile,
  Token,
  otp,
  date,
  navigation,
  [loading, setLoading],
  [error, setError]
) => {
  const apiUrl = "https://n8n.heartitout.in/webhook/api/auth";
  try {
    const session = await SInfo.getItem("token");
    const data = JSON.parse(session);
    // console.log("Parsed data",data);
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
          // await AsyncStorage.setItem("token", Token);
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

const requestOTP = async (code, number, [loading, setLoading]) => {
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
        console.log(dataString);
        await SInfo.setItem("token", dataString)
          .then(() => {
            console.log("Data stored securely");
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
        showToast("OTP resent successfully");
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

const resendOTPT = ([,setTimer],[el,setEL]) => {
  let time = 31;
  const timerId = setTimeout(() => {
    setTimer(true);
    clearInterval(timerId1)
  }, 30000);
  const timerId1 = setInterval(() => {
    time--;
    setEL(time);
    console.log(el);
  }, 1000);
};

export default function Verify({ navigation, route }) {
  const [timer, setTimer] = useState(false);
  const [el,setEL] = useState(30);
  const [otp, setOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(null);

  navigation.addListener("focus", (ref) => {
    resendOTPT([,setTimer], [el,setEL]);
    setLoading(false);
    setOtp(false);
  });

  const [number, onChangeNumber] = React.useState("");

  return (
    <SafeAreaView>
      <TopBar />
      <ScrollView>
        <View style={styles.box}>
          <TouchableOpacity
            style={{ position: "absolute", left: wp(8) }}
            onPress={() => {
              navigation.navigate("LoginPage");
            }}
          >
            <Back width={wp(8.5)} height={wp(8.5)} />
          </TouchableOpacity>
          <Logo4 width={wp(46)} height={wp(37)} style={{ marginTop: hp(2) }} />
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
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Enter OTP"
            keyboardType="numeric"
          />

          {showErrorMessage && (
            <Text style={styles.wrong}>{showErrorMessage}</Text>
          )}

          <ActivityIndicator animating={loading} size="large" />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
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
              );
            }}
          >
            <Text style={styles.textStyle}>Verify OTP</Text>
          </TouchableOpacity>

          <View className="flex-row" style={styles.resend}>
            <Text style={styles.check}>Haven’t received an OTP? </Text>
            <TouchableOpacity
              onPress={() => {
                if (timer == true) {
                  setLoading(true);
                  setShowErrorMessage(null);
                  requestOTP(route.params.code, route.params.phone, [
                    loading,
                    setLoading,
                  ]);
                  setTimer(false);
                  setEL(30);
                  resendOTPT([,setTimer],[el,setEL]);
                } else {
                  setShowErrorMessage(`Wait for ${el} seconds, to resend OTP.`)
                }
              }}
            >
              <Text style={styles.check1}>RESEND OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    marginTop: hp(13),
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
    marginTop: hp(4),
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
    color: "#043953",
    fontSize: wp(3.4),
    fontFamily: "Roboto",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
