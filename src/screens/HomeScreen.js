import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import TopBarMain from "../components/TopBarMain";
import { ScrollView } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

import Logo4 from "../../assets/images/homePageBanner.svg";
import TasksIcon from "../../assets/images/TasksIcon.svg";
import NewIcon from "../../assets/images/NewIcon.svg";
import FeelBanner from "../../assets/images/FeelBanner.svg";
import Emoji1 from "../../assets/images/emoji1.svg";
import Emoji2 from "../../assets/images/emoji2.svg";
import Emoji3 from "../../assets/images/emoji3.svg";
import Emoji4 from "../../assets/images/emoji4.svg";
import Emoji5 from "../../assets/images/emoji5.svg";
import Gift from "../../assets/images/Gift.svg";
import BottomQuote from "../../assets/images/BottomQuote.svg";
import Home1 from "../../assets/images/home1.svg";
import Home2 from "../../assets/images/home2.svg";

// F:\HIO\Progress\hio_UI\hio\assets\images\

const Btn = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.BookBtn}>
      <Text style={styles.btnText}>Book a Session</Text>
    </TouchableOpacity>
  );
};
const Bookbtn = (props) => {
  console.log(props)
  return (
    <View className="flex-row justify-between">
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          marginTop: hp(2),
          width: wp(33),
          height: hp(6),
          borderRadius: wp(8),
          justifyContent: "center",
          borderWidth: 1,
          borderColor: "#ffffff",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={[styles.btnText, { fontSize: wp(3.5), color: "#ffffff" }]}>
          Book another Session
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          marginTop: hp(2),
          width: wp(45),
          height: hp(6),
          backgroundColor: "white",
          borderRadius: wp(8),
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={styles.btnText}>{props.props ? `Join Your Session` : 'Continue your well-being journey'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function HomeScreen(props) {
  const navigation = useNavigation();
  const [isBooked, setBooked] = useState(false);
  const [is2hour, setIs2hour] = useState(false);
  const data = props.route.params.data.route.params;
  React.useEffect(() => {
    console.log("It is coming from home screen: ", data);
    if (data.has_appointment === "no") setBooked(false);
    else {
      // Parse the provided JSON datetime string
      const sessionDateTime = new Date(
        data.app_det.app_session_date + " " + data.app_det.app_session_time
      );

      // Get the current time
      const currentTime = new Date();

      // Calculate the time difference in milliseconds
      const timeDifference = sessionDateTime - currentTime;

      // Convert milliseconds to hours
      const timeDifferenceHours = Math.abs(timeDifference / (1000 * 60 * 60));

      // Define a threshold for 2 hours
      const twoHours = 2;

      // Compare the time difference with the threshold and whether it's negative
      if (timeDifference < 0) {
        setBooked(false)
      } else if (timeDifferenceHours >= twoHours) {
        setBooked(true);
        setIs2hour(false)
        console.log("Above JSON time is more than 2 hours ahead of the current time.");
      } else if (timeDifferenceHours < twoHours) {
        setBooked(true);
        setIs2hour(true)
        console.log(
          "Above JSON time is less than 2 hours ahead of the current time."
        );
      }
    }
  }, []);

  return (
    <SafeAreaView>
      {/* <TopBarMain /> */}
      <ScrollView style={{ backgroundColor: "#fff", height: hp(100) }}>
        {/* Banner */}
        <View style={{ marginTop: hp(9.5) }}>
          <Logo4 width={wp(100)} height={wp(59.5)} />
          <View style={styles.banner}>
            <View className="flex-row justify-between items-center">
              <View>
                <Text
                  style={{
                    color: "white",
                    fontSize: wp(4),
                    fontFamily: "Roboto",
                    fontWeight: "400",
                  }}
                >
                  Welcome👋
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: wp(4),
                    fontFamily: "Roboto",
                    fontWeight: "400",
                    marginTop: wp(4),
                  }}
                >
                  Take care of yourself with
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: wp(4),
                    fontFamily: "Roboto",
                    fontWeight: "700",
                  }}
                >
                  Psychological Counselling
                </Text>
              </View>
              <Image
                source={require("../../assets/images/homePageGIF.gif")}
                style={{ height: wp(30), width: wp(30) }}
              />
            </View>
            {isBooked ? <Bookbtn props={is2hour} /> : <Btn />}
          </View>
        </View>

        {/* Content */}
        <View
          className="flex-row justify-between"
          style={[styles.cardContiner, { height: hp(15.8) }]}
        >
          <TouchableOpacity
            style={[styles.card, { backgroundColor: "#FEF8C8" }]}
          >
            <Text style={styles.cardText}>My {"\n"}Tasks</Text>
            <TasksIcon width={wp(11)} height={hp(6)} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.card, { backgroundColor: "#EBF2F5" }]}
          >
            <Text style={styles.cardText}>My {"\n"}Progress</Text>
            <Image
              source={require("../../assets/images/ProgressIcon.gif")}
              style={{
                width: wp(20),
                height: hp(12),
                position: "absolute",
                zIndex: -1,
                left: wp(2),
                right: wp(2),
                bottom: hp(1.6),
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.card, { backgroundColor: "#EAF7FC" }]}
          >
            <Text style={styles.cardText}>What's {"\n"}New?</Text>
            <NewIcon width={wp(20)} height={hp(5)} />
          </TouchableOpacity>
        </View>

        <View
          className="flex-col justify-between items-center"
          style={[styles.cardContiner, { marginTop: hp(3) }]}
        >
          <Home2 width={"100%"} height={hp(13)} />
          <View
            style={{
              position: "absolute",
              // left: wp(43),
              right: wp(11),
              top: hp(2.4),
              zIndex: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#455a64",
                fontSize: wp(4),
                fontFamily: "Roboto",
                fontWeight: "800",
              }}
            >
              Understanding You
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                marginTop: hp(1.2),
                width: wp(43),
                height: hp(3.5),
                backgroundColor: "#01818c",
                borderRadius: wp(8),
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#ffffff",
                  fontSize: wp(4),
                  fontFamily: "Roboto",
                  fontWeight: "600",
                }}
              >
                View Mood Insights
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Package */}
        <View
          className="flex-col items-center"
          style={[styles.cardContiner, { height: hp(15.8), marginTop: hp(3) }]}
        >
          <Home1 width={"100%"} height={hp(17)} />
          <View
            style={{
              position: "absolute",
              left: wp(13),
              top: hp(4),
              zIndex: 2,
            }}
          >
            <Text style={styles.cardText}>Session Packages</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[styles.Btn, { marginTop: hp(2) }]}
            >
              <Text style={styles.btnText2}>Book a Session</Text>
            </TouchableOpacity>
          </View>
          {/* <Gift width={wp(25)} height={hp(9)} /> */}
        </View>

        <View
          className="flex-col items-center"
          style={[styles.cardContiner, { height: hp(15.8), marginTop: hp(4) }]}
        >
          <View style={[styles.packageCard, { backgroundColor: "#EAF7FC" }]}>
            <View
              className="flex-col justify-between items-start "
              style={{ height: hp(9) }}
            >
              <Text style={styles.cardText}>Self-care Tools for you</Text>
              <TouchableOpacity activeOpacity={0.5} style={styles.Btn}>
                <Text style={styles.btnText2}>Discover Now</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={require("../../assets/images/SelfCareIcon2.png")}
              style={{ width: wp(18), height: hp(14) }}
            />
          </View>
        </View>

        <View
          className="flex-row items-center"
          style={[
            styles.cardContiner,
            { height: hp(20), marginTop: hp(5), backgroundColor: "#EBEFF2CC" },
          ]}
        >
          <BottomQuote width={wp(71)} height={hp(15)} />
        </View>

        <View style={{ width: wp(100), height: hp(6), marginTop: hp(3) }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  banner: {
    // backgroundColor: 'black',
    width: wp(84),
    position: "absolute",
    left: wp(8),
    right: wp(8),
    top: hp(2.6),
    zIndex: 2,
  },

  BookBtn: {
    marginTop: hp(2),
    width: wp(84),
    height: hp(6),
    backgroundColor: "white",
    borderRadius: wp(8),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  btnText: {
    textAlign: "center",
    color: "#01818C",
    fontSize: wp(4),
    fontFamily: "Roboto",
    fontWeight: "600",
  },

  // Cards
  cardContiner: {
    width: wp(100),
    paddingHorizontal: wp(8),
    // height: hp(15.8),
    marginTop: hp(4),
    // backgroundColor: 'red'
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
    width: wp(40),
    height: hp(40),
    backgroundColor: "red",
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
