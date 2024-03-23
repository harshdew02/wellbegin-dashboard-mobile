import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Back from "../components/Back";
import { theme } from "../theme";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { InAppBrowser } from "react-native-inappbrowser-reborn";
import {
  Angry,
  Happy,
  Sad,
  Fear,
  Surprised,
  Disgust,
} from "../components/moods";
import Signal from "../../assets/images/signal.svg";
import {
  Work,
  Health,
  Friendship,
  Finance,
  Love,
  Personal,
  Family,
  Leisure,
} from "../components/spheres";

const component = {
  Happy: <Happy />,
  Sad: <Sad />,
  Fear: <Fear />,
  Angry: <Angry />,
  Surprised: <Surprised />,
  Disgust: <Disgust />,
};

const SphereOfLife = {
  family: <Family w={3.7} h={3.1} isClicked={true} />,
  work: <Work w={3.7} h={3.1} isClicked={true} />,
  finance: <Finance w={3.7} h={3.1} isClicked={true} />,
  friendship: <Friendship w={3.7} h={3.1} isClicked={true} />,
  health: <Health w={3.7} h={3.1} isClicked={true} />,
  leisure: <Leisure w={3.7} h={3.1} isClicked={true} />,
  love: <Love w={3.7} h={3.1} isClicked={true} />,
  personal: <Personal w={3.7} h={3.1} isClicked={true} />,
};

const MoodCard = (props) => {
  console.log("It is from mood card: ", props.props);
  return (
    <View style={styles.CardStyle}>
      <Text style={{ width: wp(75), color: theme.black, fontSize: wp(3.2) }}>
        {props.props.day_sub} {props.props.month_sub.replace(/\s+/g, '')} {props.props.year_sub}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
        }}
      >
        {component[props.props.mood]}
        <Text
          style={{
            color: theme.black,
            fontSize: wp(4),
            fontWeight: "500",
            marginLeft: wp(4.2),
          }}
        >
          {props.props.mood}
        </Text>
        <Text
          style={{
            position: "absolute",
            right: 0,
            color: theme.black,
            fontSize: wp(4),
            fontWeight: "500",
          }}
        >
          {props.props.sub_time.toUpperCase()}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          borderTopWidth: wp(0.2),
          borderColor: theme.black,
          paddingTop: hp(1),
          marginTop: hp(0),
        }}
      >
        <Text
          style={{
            color: "#6a7b83",
            fontSize: wp(3.7),
            fontWeight: "normal",
            textAlign: "left",
          }}
        >
          {props.props.notes}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: hp(1.4),
          width: "100%",
        }}
      >
        <View
          style={{
            marginRight: wp(1),
            height: hp(2.5),
            paddingHorizontal: wp(1.6),
            backgroundColor: "#dbf2f2",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: wp(2.6),
          }}
        >
          {/* <Work w={3.7} h={3.1} isClicked={true} /> */}
          {SphereOfLife[props.props.sphere_of_life]}
          <Text
            style={{
              marginLeft: wp(0.2),
              color: "#01818c",
              fontSize: wp(3.2),
              fontWeight: "normal",
              textAlign: "left",
            }}
          >
            {" "}
            {props.props.sphere_of_life.charAt(0).toUpperCase() +props.props.sphere_of_life.slice(1)}
          </Text>
        </View>
        {props.props.emotion_1 != (null || undefined) ? (
          <View
            style={{
              height: hp(2.5),
              paddingHorizontal: wp(1.6),
              backgroundColor: "#fceecb",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: wp(2.6),
            }}
          >
            <Text
              style={{
                marginLeft: wp(0.2),
                color: theme.black,
                fontSize: wp(3.2),
                fontWeight: "normal",
                textAlign: "left",
              }}
            >
              {props.props.emotion_1.charAt(0).toUpperCase() + props.props.emotion_1.slice(1)}
            </Text>
          </View>
        ) : (
          <></>
        )}

        {props.props.emotion_2 != (null || undefined) ? (
          <View
            style={{
              height: hp(2.5),
              paddingHorizontal: wp(1.6),
              backgroundColor: "#fceecb",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: wp(2.6),
            }}
          >
            <Text
              style={{
                marginLeft: wp(0.2),
                color: theme.black,
                fontSize: wp(3.2),
                fontWeight: "normal",
                textAlign: "left",
              }}
            >
              {props.props.emotion_2.charAt(0).toUpperCase() + props.props.emotion_2.slice(1)}
            </Text>
          </View>
        ) : (
          <></>
        )}
        {props.props.emotion_3 != (null || undefined) ? (
          <View
            style={{
              height: hp(2.5),
              paddingHorizontal: wp(1.6),
              backgroundColor: "#fceecb",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: wp(2.6),
            }}
          >
            <Text
              style={{
                marginLeft: wp(0.2),
                color: theme.black,
                fontSize: wp(3.2),
                fontWeight: "normal",
                textAlign: "left",
              }}
            >
              {props.props.emotion_3.charAt(0).toUpperCase() + props.props.emotion_3.slice(1)}
            </Text>
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

const MoodLog = (props) => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [datas, setData] = useState([]);
  console.log("It is from mood logs: ", props.route.params);
  let payload = props.route.params;
  useEffect(() => {
    payload.week = 0;
    const url = "https://n8n.heartitout.in/webhook/api/mt-weekly-mood";
    axios
      .post(url, payload)
      .then((res) => {
        console.log(res.data);
        if(res.data.has_res === "yes"){
          if(res.data.data != (undefined || null))
            setData(res.data.data);
        } 
        // setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // console.log(mood_data);
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#F5F5F5" }}>
      <View style={styles.HeadContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ position: "absolute", left: wp(8) }}
        >
          <Back color={"#455A64"} />
        </TouchableOpacity>

        <View className="flex-row items-center">
          <Text style={styles.HeadText}>Your Mood Log</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          display: "flex-1",
          flexDirection: "col",
          alignItems: "center",
        }}
        style={{ width: wp(100), marginTop: hp(1), height: hp(92) }}
      >
        {loading ? (
        <View style={{ height: hp(30), width: '100%', justifyContent: 'center', alignItems: 'center' }} >
          <ActivityIndicator color="#01818C" animating={loading} size={wp(10)} />
        </View>
      ) : (datas.map((item, index) => (
          <MoodCard key={index} props={item} />
        )))}
        <Text
          style={{
            color: theme.black,
            width: wp(76),
            fontSize: wp(3.7),
            fontWeight: "normal",
            textAlign: "center",
            marginTop: hp(3),
          }}
        >
          Gain perspective on your emotional journey by exploring your mood
          insights
        </Text>

        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            marginTop: hp(2),
            borderWidth: wp(0.5),
            borderColor: theme.maincolor,
            borderRadius: wp(8),
            width: wp(42.4),
            height: hp(6),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: theme.maincolor,
              fontSize: wp(4),
              fontWeight: "500",
              marginLeft: wp(4.2),
            }}
          >
            View Insights
          </Text>
          <Signal width={wp(4.2)} height={wp(3.7)} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MoodLog;

const styles = StyleSheet.create({
  HeadContainer: {
    height: hp(6),
    width: wp(100),
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(2),
    backgroundColor: "#F5F5F5",
  },
  HeadText: {
    width: wp(50),
    color: theme.black,
    fontSize: wp(5.5),
    fontFamily: "Roboto",
    fontWeight: "700",
    textAlign: "center",
  },
  CardStyle: {
    width: wp(84),
    height: hp(21),
    backgroundColor: "#fff",
    paddingBottom: wp(4.2),
    paddingHorizontal: wp(4.2),
    paddingTop: wp(2),
    marginTop: hp(2),
    borderRadius: wp(2.6),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: theme.maincolor,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.21,
    shadowRadius: 6.65,
    elevation: 9,
  },
});
