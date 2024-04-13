import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
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
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { data, codes } from "../../../constants";
import { useAuth } from "../../../utils/auth";
import { useIsFocused } from "@react-navigation/native";

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
          .then(() => {})
          .catch((error) => {
            console.log("Error: ", error);
            // showToast("Mobile number is too short")
          });
        let datas = res.data;
        navigation.navigate("verifyPage", datas);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  } catch (error) {
    showToast("Error requesting OTP " + error.message);
    setLoading(false);
  }
};

import Loginbg from "../../../components/Loginbg";
import LoginNew from "../../../../assets/images/LoginNew.svg";

const Login = ({ route }) => {
  const { connect, Diversion, trackM } = useAuth();
  const [value, setValue] = useState("IN");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [number, onChangeNumber] = React.useState("");
  const [statusChange, setstatusChange] = React.useState(false);
  navigation.addListener("focus", () => {
    setLoading(false);
  });

  const welcome = async () => {
    const welcome = await SInfo.getItem("welcome");
    if (welcome == null || welcome == undefined) {
      await SInfo.setItem("welcome", "false");
    }
  };

  useEffect(() => {
    setstatusChange(true);
    welcome();
  }, []);
  const isFocused = useIsFocused();
  const [tmp, settmp] = useState(true);

  useEffect(() => {
    settmp(!tmp);
  }, [isFocused]);

  React.useEffect(() => {
    const isLogin = async () => {
      try {
        const storedToken = await SInfo.getItem("token");
        if (storedToken == null || storedToken === undefined) {
        } else {
          const data = JSON.parse(storedToken);
          if (data.status !== "true") {
          } else {
            navigation.navigate("loader");
          }
        }
      } catch (error) {
        console.error("Error while fetching token:", error);
        // Handle error, you might want to set token to false or do something else
      } finally {
      }
    };

    if (route.params != null && route.params != undefined)
      Diversion(route.params.navigation);
    isLogin();
  });

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={-220}
      style={{ flex: 1 }}
    >
      <StatusBar
        backgroundColor={"#fff"}
        barStyle={"dark-content"}
        translucent={false}
        hidden={false}
      />
      {/* <TopBar /> */}
      <ScrollView
        contentContainerStyle={{
          display: "flex-1",
          flexDirection: "col",
          alignItems: "center",
        }}
        style={{ width: wp(100), height: hp(92) }}
        keyboardShouldPersistTaps="always"
      >
        <LoginNew width={wp(100)} height={wp(81.6)} />

        {/* <View className="flex-col items-center" style={{ marginTop: hp(3) }}> */}
        <Text style={styles.well}>
          It's time to take a leap towards a healthier mind
        </Text>

        {/* <Text style={styles.getinstant}>Enter your number to get started</Text> */}

        {/* <ActivityIndicator
          style={{ marginTop: hp(2) }}
          animating={loading}
          size="large"
        /> */}

        <Text
          style={{
            color: "#01818C",
            fontSize: wp(4.2),
            fontFamily: "Roboto",
            fontWeight: "700",
            marginTop: hp(10),
          }}
        >
          Enter Your Mobile Number
        </Text>
        <View
          className="flex-row items-center"
          style={{ width: wp(82), marginTop: hp(2) }}
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
            }}
          />

          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            keyboardType="numeric"
            placeholder="Enter your Phone Number"
            onSubmitEditing={() => {
              if (!loading) {
                connect();
                setLoading(true);
                requestOTP(codes[value], number, navigation, [
                  loading,
                  setLoading,
                ]);
                trackM("OTP Request done by: ", {
                  "Phone ": codes[value] + number,
                });
              } else {
                console.log("Wait a minute");
              }
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (!loading) {
              connect();
              setLoading(true);
              requestOTP(codes[value], number, navigation, [
                loading,
                setLoading,
              ]);
              trackM("OTP Request done by: ", {
                "Phone ": codes[value] + number,
              });
            } else {
              console.log("Wait a minute");
            }
          }}
        >
          <ActivityIndicator
            animating={loading}
            size="large"
            style={{ position: "absolute", zIndex: 2 }}
            color={"#fff"}
          />
          <Text style={[styles.textStyle, { display: loading ? "none" : "flex" }]}>Get OTP</Text>
        </TouchableOpacity>
        {/* </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
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
    height: hp(7.2),
    width: wp(83),
    backgroundColor: "white",
    borderRadius: wp(3),
    borderWidth: wp(0.4),
    borderColor: "rgba(69, 90, 100, 0.30)",
    borderStyle: "solid",
    color: "#455A64",
    fontWeight: "500",
    paddingLeft: wp(25),
    fontSize: wp(4.2),
  },
  dropdown: {
    // marginTop: 7,
    height: hp(7.2),
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
    marginTop: hp(3),
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
