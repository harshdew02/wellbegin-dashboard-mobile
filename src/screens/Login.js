import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Dropdown } from "react-native-element-dropdown";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";

import {data,codes} from "../constants"

const requestOTP = async (code, number, navigation, [loading, setLoading]) => {
  const apiUrl = "https://heartitout.in/welcome/wp-json/otp_signup_process/v2";

  try {
    const requestData = {
      ch: "send_otp",
      mob: code + number,
    };
    if((code+number).length < 10)
      throw new Error('Mobile number is too short')

    axios
      .post(apiUrl, requestData)
      .then((res) => {
        if (res.data.Status == "Success")
          navigation.navigate("verifyPage", res.data);
        else console.log("Error:" + res.data.Status);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      });
  } catch (error) {
    console.log("Error requesting OTP:", error.message);
    setLoading(false)
  }
};


import Logo4 from '../../assets/images/myvec.svg';

const Login = () => {
  const [value, setValue] = useState("IN");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [number, onChangeNumber] = React.useState("");
  navigation.addListener("focus", (ref) => {
    setLoading(false);
  });
  

  // const [isFocus, setIsFocus] = useState(false);

  return (
    <SafeAreaView>
      <TopBar />
      <ScrollView>
        <StatusBar
          backgroundColor={"#fff"}
          barStyle={"dark-content"}
          hidden={false}
        />

        {/* <View style={styles.box}> */}
        {/* <View className="bg-[#EAF7FC]" style={styles.vect}>
          </View> */}

        <Logo4 width={wp(100)} height={wp(85)} style={styles.box} />
        {/* <View style={{ height: hp(10) }}></View> */}
        {/* </View> */}

        <View className="flex-col items-center" style={{ marginTop: hp(2.5) }}>
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
              style={[styles.dropdown ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              containerStyle={styles.containerStyle}
              iconStyle={styles.iconStyle}
              itemTextStyle={{fontSize: wp(4)}}
              data={data}
              search
              maxHeight={200}
              iconColor="#455A64"
              // onFocus={() => setIsFocus(true)}
              // onBlur={() => setIsFocus(false)}
              labelField="show"
              valueField="code"
              placeholder="IN(+91)"
              searchPlaceholder="Search..."
              value={value}
              onChange={(item) => {
                setValue(item.code);
                console.log(item)
              }}
            />

            <TextInput
              style={styles.input}
              onChangeText={onChangeNumber}
              value={number}
              // placeholder="6266019364"
              keyboardType="numeric"
            />
          </View>

          <ActivityIndicator animating={loading} size="large" />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setLoading(true);
              requestOTP(codes[value], number, navigation, [loading, setLoading]);
            }}
          >
            <Text style={styles.textStyle}>Get OTP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    paddingLeft: wp(23),
    fontSize: wp(4),
  },
  dropdown: {
    // marginTop: 7,
    height: hp(7),
    width: wp(22),
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
  containerStyle:{
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
    textAlign: 'center',
    color: 'white',
    fontSize: wp(5),
    fontFamily: 'Roboto',
    fontWeight: '500',
  },
});
