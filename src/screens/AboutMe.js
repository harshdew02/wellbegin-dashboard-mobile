import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
  BackHandler
} from "react-native";
import React, { useState } from "react";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

import Back from "../../assets/images/arrow2.svg";
import BottomQuote from "../../assets/images/BottomQuote.svg";
import axios from "axios";
import SInfo from "react-native-encrypted-storage";
import { theme } from "../theme";
import { useAuth } from "../utils/auth";
import { LogLevel, OneSignal } from "react-native-onesignal";

const showToast = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
}

const fillDetails = (details, [loading, setLoading], navigation) => {
  //This the first call from the flowchart
  const apiUrl = "https://n8n.heartitout.in/webhook/api/fetch-user-details";
  axios
    .post(apiUrl, details)
    .then(async (res) => {
      // console.log("It is from about me", res.data);
      if (res.data.success == 1) {
        let token = await SInfo.getItem("token");
        let data = JSON.parse(token);
        data.usr_fullname = res.data.user_name;
        data.user_email = res.data.user_email;
        data.get_details = res.data.get_details;
        await SInfo.setItem("token", JSON.stringify(data));
        // await AsyncStorage.setItem("token", Token);
        //A message to be displayed as toast
        showToast('User details updated, successfully')
        navigation.navigate('loader')
        // console.log("It is sucess from about me :", res.data, data);
      } else {
        //A message to be displayed as toast
        showToast("An error occurred and we can't update")
        // navigation.navigate('main');
        // console.log(res.data)
        console.log("Failed to save the details");
      }
    })
    .catch((err) => {
      showToast("An error occurred and we can't update")
      //A message to be displayed as toast
      console.log(err);
    }).finally(() => {
      setLoading(false);
    });
};

export default function AboutMe(props) {
  const navigation = useNavigation();
  const {connect} = useAuth();
  let data = props.route.params;
  const [name, setName] = useState(data.usr_fullname);
  const [mail, setMail] = useState(data.user_email);
  const [code, setCode] = useState(data.code);
  const [phone, setPhone] = useState(data.phone);
  const [loading, setLoading] = useState(false);
  
  const backHandler = () => {
    navigation.goBack();
    return true;
  };

  navigation.addListener("focus", () => {
    BackHandler.addEventListener("hardwareBackPress", backHandler);
  });

  navigation.addListener("blur", () => {
    BackHandler.removeEventListener("hardwareBackPress", backHandler);
  });
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <ScrollView keyboardShouldPersistTaps='always' style={{ backgroundColor: "#fff", height: hp(100) }}>
          <View
            style={[
              styles.cardContainer,
              { height: hp(66), backgroundColor: "#32959d" },
            ]}
          >
            <View
              style={{
                // backgroundColor: "#fff",
                height: hp(6),
                justifyContent: "center",
                alignItems: "center",
                top: hp(1),
                marginTop: hp(2),
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ position: "absolute", left: 0 }}
              >
                <Back width={wp(8)} height={wp(8)} />
              </TouchableOpacity>

              <Text
                style={{
                  color: "#fff",
                  fontSize: wp(5.5),
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                }}
              >
                About Me
              </Text>
            </View>

            <Text
                style={{
                  color: "#fff",
                  fontSize: wp(3.7),
                  width:wp(84),
                  textAlign:'center',
                  fontWeight: "500",
                  marginTop:hp(3)
                }}
              >Please add a few more details to continue😊
              </Text>

            <View
              className="flex-col justify-between items-center "
              style={{height: hp(45), marginTop: hp(0.5)}}
            >
              <TextInput
                style={[{ marginTop: hp(2) }, styles.input]}
                // onChangeText={onChangeNumber}
                value={name}
                onChangeText={setName}
                placeholder="Enter your Name"
                inputMode="text"
              />

              <TextInput
                style={[styles.input, { backgroundColor: '#cde3e9' }]}
                // editable={false}
                // onChangeText={onChangeNumber}
                value={`+${code}-${phone}`}
                // placeholder="+91-9480052103"
                inputMode="tel"
                editable={false}
              />

              <TextInput
                style={styles.input}
                // onChangeText={onChangeNumber}
                // value={number}
                value={mail}
                onChangeText={setMail}
                placeholder="Enter your email"
                inputMode="email"
              />

              <ActivityIndicator animating={loading} size='small' />

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  connect();
                  data.usr_fullname = name;
                  data.user_email = mail;
                  data.insert_details = "true";
                  setLoading(true)
                  // console.log(data)
                  fillDetails(data, [loading, setLoading], navigation);
                }}
                style={[styles.BookBtn3, { marginBottom: hp(4) }]}
              >
                <Text style={styles.btnText3}>Save My Details</Text>
              </TouchableOpacity>


            </View>
            <View style={{ width: wp(100), alignItems: 'center', position: 'absolute', bottom: hp(3) }} >
              <TouchableOpacity onPress={() => {
                SInfo.removeItem('token').then(() => {
                  navigation.navigate('LoginPage');
                  OneSignal.logout();
                  showToast('User logout successfully.')
                }).catch((err) => {
                  showToast('Something went wrong.')
                  console.log('Error from logout system: ', err)
                });
              }} style={{ width: wp(20), backgroundColor: theme.grey, height: hp(4), justifyContent: 'center', alignItems: 'center', borderRadius: wp(40) }} >
                <Text style={{ color: '#fff' }} >Logout</Text>
              </TouchableOpacity>
            </View>

          </View>

          <View
            className="flex-row items-center"
            style={[
              styles.cardContainer,
              {
                height: hp(20),
                marginTop: hp(5),
                backgroundColor: "#EBEFF2CC",
              },
            ]}
          >
            <BottomQuote width={wp(71)} height={hp(15)} />
          </View>
          <View style={{ width: wp(100), height: hp(6), marginTop: hp(3) }} />
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: hp(5.7),
    width: "100%",
    backgroundColor: "white",
    borderRadius: wp(6),
    borderWidth: wp(0.5),
    borderColor: "#455a64",
    borderStyle: "solid",
    color: "#455A64",
    fontWeight: "600",
    paddingHorizontal: wp(4),
    fontSize: wp(4),
  },

  // ***
  banner: {
    // backgroundColor: 'black',
    width: wp(92),
    position: "absolute",
    left: wp(8),
    right: 0,
    top: hp(2.6),
    zIndex: 2,
  },

  // *****
  // Cards*******
  cardContainer: {
    width: wp(100),
    paddingHorizontal: wp(8),
  },

  sessions: {
    width: "100%",
    backgroundColor: "#f8f7fc",
    borderRadius: wp(2.5),
    height: "100%",
  },

  scrollContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderBottomLeftRadius: wp(2.5),
    borderBottomRightRadius: wp(2.5),
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "rgba(69, 90, 100, 0.2)",
  },

  BookBtn2: {
    width: wp(84),
    height: hp(6),
    backgroundColor: "#01818c",
    borderRadius: wp(8),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  btnText2: {
    textAlign: "center",
    color: "#01818C",
    fontSize: wp(4),
    fontFamily: "Roboto",
    fontWeight: "600",
  },

  container3: {
    width: wp(30),
    height: hp(0),
    borderBottomWidth: wp(0.4),
    borderColor: "rgba(69, 90, 100, 0.30)",
  },

  BookBtn3: {
    width: wp(48),
    height: hp(6),
    borderRadius: wp(8),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#455a64",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#455a64",
  },

  btnText3: {
    textAlign: "center",
    color: "#fff",
    fontSize: wp(4),
    fontFamily: "Roboto",
    fontWeight: "700",
  },

  card: {
    width: wp(24),
    height: "100%",
    borderRadius: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(1.5),
    display: "flex",
    flexDirection: "col",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardText: {
    textAlign: "center",
    color: "#455A64",
    fontSize: wp(4),
    fontFamily: "Roboto",
    fontWeight: "800",
  },

  test: {
    width: "100%",
    // height: '100%',
    backgroundColor: "red",
    // maxHeight: hp(46), // Set your specific maximum height here
    borderWidth: 1, // Just for visualization purposes
    borderColor: "black", // Just for visualization purposes
    // padding: 10,
  },

  // Feel Banner

  feelBanner: {
    position: "absolute",
    bottom: 0,
    zIndex: -1,
  },

  // Package

  packageCard: {
    width: wp(84),
    height: "100%",
    borderRadius: wp(4),
    backgroundColor: "#FEF8C8",
    paddingHorizontal: wp(4),
    paddingLeft: wp(6),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  Btn: {
    // marginTop: hp(2),
    width: wp(38),
    height: hp(4),
    backgroundColor: "#01818C",
    borderRadius: wp(8),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  btnText2: {
    textAlign: "center",
    color: "white",
    fontSize: wp(4),
    fontFamily: "Roboto",
    fontWeight: "600",
  },

  cardContiner2: {
    width: wp(100),
    paddingHorizontal: wp(8),
    // height: hp(15.8),
    // marginTop: hp(4),
    // backgroundColor: 'red'
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
