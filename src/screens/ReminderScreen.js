import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Back from "../../assets/images/arrow.svg";
import RingIcon from "../components/RingIcon";
import axios from "axios";

const Card = (props) => {
  return (
    <View
      className="flex-row justify-between items-center"
      style={styles.container}
    >
      <View
        style={{
          height: "100%",
          // backgroundColor: isTick ? '#455A64' : '#01818C',
          width: wp(1),
          position: "absolute",
          left: wp(2),
        }}
      ></View>
      <View
        className="flex-col justify-between"
        style={{ marginLeft: wp(6), marginRight: wp(1), width: wp(64) }}
      >
        <Text
          style={{
            // color: isTick ? '#455A64' : '#01818C',
            fontSize: wp(4.2),
            fontFamily: "Roboto",
            fontWeight: "800",
            marginBottom: hp(2),
          }}
        >
          You have a session at 10:30 am on 17/03/22
        </Text>
        <Text
          style={{
            color: "#455A64",
            fontSize: wp(3.5),
            fontFamily: "Roboto",
            fontWeight: "normal",
          }}
        >
          You have an upcoming session with your therapist Jyoti Das on
          17/03/2022
        </Text>
      </View>

      <View
        className="flex-col items-center justify-between"
        style={{ height: hp(6), width: wp(18) }}
      >
        <Text style={{ fontSize: wp(3.2) }}>18 mins ago</Text>
        {/* <RingIcon active={isTick} /> */}
      </View>
    </View>
  );
};

const Banners = (props) => {
  return (
    <Image
      resizeMode="stretch"
      style={{
        width: wp(100),
        height: wp(24.66),
        marginTop: hp(2.7)
      }}
      source={{ uri: 'https://heartitout.in/links/wp-content/uploads/2024/03/TryDoodling.png' }}
    />
  )
};

export default function ReminderScreen({ navigation, route }) {
  // console.log("It is from reminder screen: ", route.params)
  const [ifReminder, setIfReminder] = useState(false);
  const [datas, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [banner, setBanner] = useState(false);
  const [banLink, setBanLink] = useState("");
  const [cbanLink, setCBanLink] = useState("");

  useEffect(() => {
    const url = "https://n8n.heartitout.in/webhook/api/notifications";
    axios
      .post(url, route.params)
      .then((res) => {
        console.log(res.data);
        if (res.data.has_notif === "yes") setIfReminder(true);
        else setIfReminder(false);
        if (res.data.has_banner === "yes") {
          setBanner(true);
          setBanLink(res.data.banner_link);
          setCBanLink(res.data.on_click);
        } else setBanner(false);
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error is here:", err);
        setLoading(false);
      });
  }, []);

  console.log(datas);

  return (
    <SafeAreaView>
      {/* <TopBarMain /> */}
      <ScrollView>
        <View
          style={{
            backgroundColor: "#fff",
            height: hp(6),
            justifyContent: "center",
            alignItems: "center",
            top: hp(1),
            marginTop: hp(0),
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ position: "absolute", left: wp(8) }}
          >
            <Back width={wp(8)} height={wp(8)} />
          </TouchableOpacity>
          <Text
            style={{
              color: "#043953",
              fontSize: wp(5.5),
              fontFamily: "Roboto",
              fontWeight: "600",
            }}
          >
            Your Reminders
          </Text>
        </View>
        {/* loading */}
        {/* <ActivityIndicator animating={loading} size="large" style={{}} /> */}
        {loading ? (
          <View style={{ height:hp(80) , width:'100%', justifyContent: 'center', alignItems: 'center' }} >
            <ActivityIndicator color="#01818C" animating={loading} size={wp(14)} />
          </View>
        ) : (
          <>
            <View
              className="flex-col items-center"
              style={{ marginTop: hp(2) }}
            >
              {ifReminder ? (
                <>
                  {datas.map((item, index) => (
                    <Card props={{ item }} key={index} />
                  ))}
                </>
              ) : (
                <View className="flex-col items-center">
                  <Image
                    className="mr-8"
                    source={require("../../assets/images/noReminders.gif")}
                    style={{
                      height: hp(28),
                      width: wp(100),
                      marginTop: hp(24),
                    }}
                  />
                  <Text
                    style={{
                      color: "#043953",
                      fontSize: wp(5.5),
                      fontFamily: "Roboto",
                      fontWeight: "600",
                    }}
                  >
                    You have no reminders.
                  </Text>
                </View>
              )}
              {banner ? (
                <>
                  <View
                    style={{
                      width: wp(100),
                      height: hp(10),
                      backgroundColor: "red",
                      marginTop: hp(3),
                    }}
                  >
                    <Banners props={{ banLink, cbanLink }} />
                  </View>
                </>
              ) : (
                <></>
              )}
            </View>
          </>

        )}
        {/* this is for example for correct style --Anuj */}
        {/* <Banners /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(94),
    paddingVertical: hp(1.5),
    backgroundColor: "white",
    boxShadow: "0px 1.5px 10px 1px rgba(1, 129, 140, 0.25)",
    borderRadius: 5,
    // NOTE: boxShadow is not directly supported in React Native.
    // You might need to use elevation for shadow effects on Android.
    elevation: 5,
    // marginTop: hp(2),
    // padding: wp(1),
    // paddingVertical: wp(1),
    paddingRight: wp(3.2),
  },

  line: {},
});

//  bottom->stack->right
//  stack->right->bottom
