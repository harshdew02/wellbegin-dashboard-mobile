import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Back from "../../assets/images/arrow.svg";
import axios from "axios";
import PTRView from "react-native-pull-to-refresh";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../utils/auth";

const Card = (props) => {
  const data = props.props.item;
  // Anuj ise props ke according set kar dena to fir ho jayega shyad
  const [isTick, setTick] = useState(false);
  const { userDetails, trackM } = useAuth();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        trackM("Navigated - Reminder", {
          phone: userDetails().phone,
          event: data.notification,
        });
        navigation.navigate("webview", data.on_click);
      }}
      className="flex-row justify-between items-center"
      style={styles.container}
    >
      <View
        style={{
          height: "100%",
          backgroundColor: isTick ? "#455A64" : "#01818C",
          width: wp(1),
          position: "absolute",
          left: wp(2),
        }}
      />
      <View
        className="flex-col justify-between"
        style={{ marginLeft: wp(6), marginRight: wp(1), width: wp(84) }}
      >
        <Text
          style={{
            color: isTick ? "#455A64" : "#01818C",
            fontSize: wp(4.2),
            fontFamily: "Roboto",
            fontWeight: "800",
            marginBottom: hp(2),
          }}
        >
          {data.notification}
        </Text>
        <Text
          style={{
            color: "#455A64",
            fontSize: wp(3.5),
            fontFamily: "Roboto",
            fontWeight: "normal",
          }}
        >
          {data.notif_body}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function ReminderScreen({ navigation, route }) {
  const [ifReminder, setIfReminder] = useState(false);
  const [datas, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { connect, userDetails, trackM, exceptionReporting } = useAuth();
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

  navigation.addListener("focus", () => {
    setLoading(true);
  });

  useEffect(() => {
    const url = "https://n8n.heartitout.in/webhook/api/notifications";
    const connection = connect();
    if (!connection) {
      setLoading(false);
    } else {
      if (loading) {
        axios
          .post(url, userDetails())
          .then((res) => {
            if (res.data.has_notif === "yes") setIfReminder(true);
            else setIfReminder(false);
            setData(res.data.data);
          })
          .catch((err) => {
            exceptionReporting({ err });
            console.log("error is here:", err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
    trackM("Navigated - Reminder", { phone: userDetails().phone });
  }, [loading]);

  const [refreshing, setRefreshing] = useState(false);

  const fetchData = () => {
    setTimeout(() => {
      setLoading(true);
      setRefreshing(false);
    }, 50); // Simulating 2 seconds delay
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const [idleTimer, setIdleTimer] = useState(null);
  const [timer, setTimer] = useState(true);

  React.useEffect(() => {
    if (timer) {
      clearInterval(idleTimer);
    } else {
      clearInterval(idleTimer);
      setIdleTimer(
        setInterval(() => {
          setLoading(true);
        }, 90000)
      );
    }

    setTimer(false);
  }, [timer]);

  return (
    <SafeAreaView>
      {/* <TopBarMain /> */}
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

      <PTRView
        contentContainerStyle={{
          display: "flex-1",
          flexDirection: "col",
          alignItems: "center",
        }}
        style={{
          height: hp(94),
          marginTop: hp(1),
        }}
        onRefresh={handleRefresh}
        onTouchStart={() => {
          setTimer(true);
        }}
      >
        {/* loading */}
        {/* <ActivityIndicator animating={loading} size="large" style={{}} /> */}
        {loading ? (
          <View
            style={{
              height: hp(80),
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator
              color="#01818C"
              animating={loading}
              size={wp(14)}
            />
          </View>
        ) : (
          <>
            {/* <View
              className="flex-col items-center"
              style={{ marginTop: hp(2) }}
            > */}
            {ifReminder ? (
              <>
                {datas != null && datas != undefined ? (
                  <>
                    {datas.map((item, index) => (
                      <Card props={{ item }} key={index} />
                    ))}
                  </>
                ) : (
                  <>
                    <Image
                      // className="mr-8"
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
                  </>
                )}
              </>
            ) : (
              // <View className="flex-col items-center">
              <>
                <Image
                  // className="mr-8"
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
              </>
              // </View>
            )}
            {/* </View> */}
          </>
        )}
        {/* this is for example for correct style --Anuj */}
      </PTRView>
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
    marginVertical: hp(1),
    paddingRight: wp(3.2),
  },

  line: {},
});

//  bottom->stack->right
//  stack->right->bottom
