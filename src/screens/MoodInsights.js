import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Back from "../components/Back";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme";
import LeftGo from "../components/moods/LeftGo";
import RightGo from "../components/moods/RightGo";
import HeartBook from "../components/moods/HeartBook";
import RightNav from "../components/moods/RightNav";
import Cross from "../components/moods/Cross";
import Tick from "../components/moods/Tick";
import Cup from "../../assets/images/cup.svg";
import {
  Happy,
  Surprised,
  Sad,
  Disgust,
  Fear,
  Angry,
} from "../components/moods/";
import H1 from "../../assets/images/h1.svg";
import H2 from "../../assets/images/h2.svg";
import H3 from "../../assets/images/h3.svg";
import H4 from "../../assets/images/h4.svg";
import H5 from "../../assets/images/h5.svg";
import H6 from "../../assets/images/h6.svg";
import H7 from "../../assets/images/h7.svg";
import H8 from "../../assets/images/h8.svg";
import H9 from "../../assets/images/h9.svg";
import BottomQuote from "../components/BottomQuote";
import axios from "axios";

const Space = () => {
  return <View style={{ width: wp(8), height: wp(8) }}></View>;
};

const habbitLogo = [H1, H2, H3, H4, H5, H6, H7, H8, H9];

const habbit = [
  {
    logo: H1,
    head: "Limit Screen Time",
    cont: "Excessive time on screens can make you feel inadequate and stressed",
  },
  {
    logo: H2,
    head: "Exercise",
    cont: "Physical activity releases endorphins, which are natural mood lifters.",
  },
  {
    logo: H3,
    head: "Sunlight Exposure",
    cont: "Natural sunlight boosts serotonin levels, which can improve mood.",
  },
  {
    logo: H4,
    head: "Practice Self-Compassion",
    cont: "Avoid negative self-talk and practice self-compassion when facing problems",
  },
  {
    logo: H5,
    head: "Practice Gratitude",
    cont: "Take a moment each day to reflect on things you're grateful for.",
  },
  {
    logo: H6,
    head: "Meditate",
    cont: "It can help you stay present, reduce stress, and improve overall well-being.",
  },
  {
    logo: H7,
    head: "Get Adequate Sleep",
    cont: "Lack of sleep can contribute to mood swings and irritability.",
  },
  {
    logo: H8,
    head: "Listen to Music",
    cont: "Listen to your favorite tunes or explore new genres to find what uplifts you",
  },
  {
    logo: H9,
    head: "Laugh",
    cont: "Watch a funny movie, TV show, or spend time with friends",
  },
];

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DateTimeComponent = (rdate) => {
  const dateTimeString = rdate;
  const dateTime = new Date(dateTimeString);
  return {
    monthIndex: dateTime.getMonth(),
    year: dateTime.getFullYear(),
    dates: dateTime.getDate(),
  };
};

const getCurrentDate = () => {
  const date = new Date();
  return {
    monthIndex: date.getMonth(),
    year: date.getFullYear(),
    dates: date.getDate(),
  };
};

let maxii = 0;
let temp_data = [];
let mood_percent = [];
let mood_value = [0, 0, 0, 0, 0, 0];
let show_mood = {
  happy: 0,
  surprised: 0,
  sad: 0,
  disgust: 0,
  fear: 0,
  angry: 0,
};
let upcomingdate = 0;
let index = 0;

const MoodInsights = (props) => {
  const navigation = useNavigation();
  const [p1, setp1] = useState(0 * 0.75);
  const [p2, setp2] = useState(0 * 0.75);
  const [p3, setp3] = useState(0 * 0.75);
  const [p4, setp4] = useState(0 * 0.75);
  const [p5, setp5] = useState(0 * 0.75);
  const [p6, setp6] = useState(0 * 0.75);
  const [day1, setDay1] = useState(-1);
  const [day2, setDay2] = useState(-1);
  const [day3, setDay3] = useState(-1);
  const [day4, setDay4] = useState(-1);
  const [day5, setDay5] = useState(-1);
  const [day6, setDay6] = useState(-1);
  const [day7, setDay7] = useState(-1);
  const [select, setSelect] = useState(0);
  const [ind, setInd] = useState(3);
  const Logo = habbit[ind].logo;
  const data = props.route.params;
  const [date, setDate] = useState(getCurrentDate());
  const [curDate, setCurDate] = useState(date.dates);
  const [longest, setLongest] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showMood, setShowMood] = useState({
    happy: 0,
    surprised: 0,
    sad: 0,
    disgust: 0,
    fear: 0,
    angry: 0,
  });

  let payload = props.route.params;
  useEffect(() => {
    payload.week = 0;
    const url = "https://n8n.heartitout.in/webhook/api/mt-weekly-streak";
    axios
      .post(url, payload)
      .then((res) => {
        // console.log(res.data);
        temp_data = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // console.log(mood_data);
        // console.log(temp_data);
        upcomingdate = DateTimeComponent(temp_data[0].calendar_date).dates;
        upcomingdate <= curDate
          ? temp_data[0].is_filled === "Filled"
            ? setDay1(1)
            : setDay1(0)
          : setDay1(-1);
        upcomingdate = DateTimeComponent(temp_data[1].calendar_date).dates;
        upcomingdate <= curDate
          ? temp_data[1].is_filled === "Filled"
            ? setDay2(1)
            : setDay2(0)
          : setDay2(-1);
        upcomingdate = DateTimeComponent(temp_data[2].calendar_date).dates;
        upcomingdate <= curDate
          ? temp_data[2].is_filled === "Filled"
            ? setDay3(1)
            : setDay3(0)
          : setDay3(-1);
        upcomingdate = DateTimeComponent(temp_data[3].calendar_date).dates;
        upcomingdate <= curDate
          ? temp_data[3].is_filled === "Filled"
            ? setDay4(1)
            : setDay4(0)
          : setDay4(-1);
        upcomingdate = DateTimeComponent(temp_data[4].calendar_date).dates;
        upcomingdate <= curDate
          ? temp_data[4].is_filled === "Filled"
            ? setDay5(1)
            : setDay5(0)
          : setDay5(-1);
        upcomingdate = DateTimeComponent(temp_data[5].calendar_date).dates;
        upcomingdate <= curDate
          ? temp_data[5].is_filled === "Filled"
            ? setDay6(1)
            : setDay6(0)
          : setDay6(-1);
        upcomingdate = DateTimeComponent(temp_data[6].calendar_date).dates;
        upcomingdate <= curDate
          ? temp_data[6].is_filled === "Filled"
            ? setDay7(1)
            : setDay7(0)
          : setDay7(-1);
        setDate(DateTimeComponent(temp_data[0].calendar_date));

        //DSA is here
        let curr = 0;
        let max = 0;
        for (let i = 0; i < 7; i++) {
          if (temp_data[i].is_filled === "Filled") curr++;
          else {
            curr = 0;
          }
          max = Math.max(max, curr);
        }
        setLongest(max);
      });
  }, []);

  useEffect(() => {
    payload.week = 0;
    const url = "https://n8n.heartitout.in/webhook/api/mt-percentage";
    axios
      .post(url, payload)
      .then((res) => {
        mood_percent = res.data.data;
        for (let i = 0; i < mood_percent.length; i++) {
          if (mood_percent[i].mood === "Happy") {
            setp1(0.75 * mood_percent[i].percentage);
            show_mood.happy = mood_percent[i].percentage;
            mood_value[0] = mood_percent[i].percentage;
          } else if (mood_percent[i].mood === "Surprised") {
            setp2(0.75 * mood_percent[i].percentage);
            show_mood.surprised = mood_percent[i].percentage;
            mood_value[1] = mood_percent[i].percentage;
          } else if (mood_percent[i].mood === "Sad") {
            setp3(0.75 * mood_percent[i].percentage);
            show_mood.sad = mood_percent[i].percentage;
            mood_value[2] = mood_percent[i].percentage;
          } else if (mood_percent[i].mood === "Disgust") {
            setp4(0.75 * mood_percent[i].percentage);
            show_mood.disgust = mood_percent[i].percentage;
            mood_value[3] = mood_percent[i].percentage;
          } else if (mood_percent[i].mood === "Fear") {
            setp5(0.75 * mood_percent[i].percentage);
            show_mood.fear = mood_percent[i].percentage;
            mood_value[4] = mood_percent[i].percentage;
          } else {
            setp6(0.75 * mood_percent[i].percentage);
            show_mood.angry = mood_percent[i].percentage;
            mood_value[5] = mood_percent[i].percentage;
          }

          maxii = Math.max(maxii, mood_percent[i].percentage);
        }

        for (let i = 0; i < mood_value.length; i++) {
          if (mood_value[i] == maxii && mood_value[i] != 0) {
            index = i + 1;
            break;
          }
        }
        setShowMood(show_mood);
        setSelect(index);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
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
          <TouchableOpacity>
            <LeftGo />
          </TouchableOpacity>
          <Text style={styles.HeadText}>{`${month[date.monthIndex]} ${
            date.year
          }`}</Text>
          <TouchableOpacity>
            <RightGo />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          display: "flex-1",
          flexDirection: "col",
          alignItems: "center",
        }}
        style={{ width: wp(100), height: hp(92) }}
      >
        <TouchableOpacity
          style={styles.NavCard}
          onPress={() => {
            navigation.navigate("moodLog", payload);
          }}
        >
          <HeartBook />
          <View
            className="flex-col justify-between"
            style={{ height: hp(5.6) }}
          >
            <Text
              style={{
                width: wp(61),
                color: theme.black,
                fontSize: wp(4),
                fontWeight: "500",
              }}
            >
              View mood logs for the month
            </Text>
            <Text
              style={{
                width: wp(61),
                color: theme.black,
                fontSize: wp(3.5),
              }}
            >
              Unlock self-awareness & well-being
            </Text>
          </View>
          <RightNav />
        </TouchableOpacity>
        {loading ? (
          <View
            style={{
              height: hp(30),
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator
              color="#01818C"
              animating={loading}
              size={wp(10)}
            />
          </View>
        ) : (
          <>
            <View
              style={{
                width: wp(84),
                height: hp(20),
                backgroundColor: "#fefcf7",
                marginTop: hp(2.3),
                paddingVertical: hp(1.6),
                alignItems: "center",
                borderRadius: wp(5.3),
              }}
            >
              <Text
                style={{
                  width: wp(61),
                  color: theme.black,
                  fontSize: wp(4),
                  fontWeight: "500",
                }}
              >
                Consecutive Recording Days
              </Text>

              <View
                style={{
                  width: "100%",
                  height: wp(8),
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: hp(0.9),
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    height: hp(0.2),
                    width: "100%",
                    backgroundColor: "#a1abad",
                    zIndex: -1,
                  }}
                />
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: wp(75),
                    justifyContent: "space-around",
                  }}
                >
                  <View>
                    {day1 != -1 ? day1 == 1 ? <Tick /> : <Cross /> : <Space />}
                    {/* <Tick /> */}
                  </View>
                  <View>
                    {day2 != -1 ? day2 == 1 ? <Tick /> : <Cross /> : <Space />}
                    {/* <Cross /> */}
                  </View>
                  <View>
                    {day3 != -1 ? day3 == 1 ? <Tick /> : <Cross /> : <Space />}
                    {/* <Tick /> */}
                  </View>
                  <View>
                    {day4 != -1 ? day4 == 1 ? <Tick /> : <Cross /> : <Space />}
                    {/* <Cross /> */}
                  </View>
                  <View>
                    {day5 != -1 ? day5 == 1 ? <Tick /> : <Cross /> : <Space />}
                    {/* <Space /> */}
                  </View>
                  <View>
                    {day6 != -1 ? day6 == 1 ? <Tick /> : <Cross /> : <Space />}
                    {/* <Cross /> */}
                  </View>
                  <View>
                    {day7 != -1 ? day7 == 1 ? <Tick /> : <Cross /> : <Space />}
                    {/* <Cross /> */}
                  </View>
                </View>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: wp(75),
                  justifyContent: "space-around",
                  marginTop: hp(0.6),
                }}
              >
                <Text
                  style={{
                    width: wp(8),
                    textAlign: "center",
                    color: theme.black,
                    fontSize: wp(3.5),
                  }}
                >
                  Mon
                </Text>
                <Text
                  style={{
                    width: wp(8),
                    textAlign: "center",
                    color: theme.black,
                    fontSize: wp(3.5),
                  }}
                >
                  Tue
                </Text>
                <Text
                  style={{
                    width: wp(8),
                    textAlign: "center",
                    color: theme.black,
                    fontSize: wp(3.5),
                  }}
                >
                  Wed
                </Text>
                <Text
                  style={{
                    width: wp(8),
                    textAlign: "center",
                    color: theme.black,
                    fontSize: wp(3.5),
                  }}
                >
                  Thu
                </Text>
                <Text
                  style={{
                    width: wp(8),
                    textAlign: "center",
                    color: theme.black,
                    fontSize: wp(3.5),
                  }}
                >
                  Fri
                </Text>
                <Text
                  style={{
                    width: wp(8),
                    textAlign: "center",
                    color: theme.black,
                    fontSize: wp(3.5),
                  }}
                >
                  Sat
                </Text>
                <Text
                  style={{
                    width: wp(8),
                    textAlign: "center",
                    color: theme.black,
                    fontSize: wp(3.5),
                  }}
                >
                  Sun
                </Text>
              </View>

              <View
                style={{
                  height: hp(0.2),
                  width: wp(75),
                  backgroundColor: theme.black,
                  marginTop: hp(2),
                }}
              />

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: wp(75),
                  justifyContent: "flex-start",
                  marginTop: hp(2),
                }}
              >
                <View
                  style={{
                    width: wp(36),
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Cup Home2 width={wp(3.6)} height={wp(4.2)} />
                  <Text
                    style={{
                      color: theme.black,
                      fontSize: wp(3.5),
                    }}
                  >
                    Longest Chain : {longest}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                width: wp(84),
                height: hp(20),
                backgroundColor: "#f7fbfd",
                borderRadius: wp(4),
                marginTop: hp(2.5),
                alignItems: "center",
                paddingVertical: hp(2.4),
              }}
            >
              <Text
                style={{
                  color: theme.black,
                  fontSize: wp(4),
                  fontWeight: "500",
                }}
              >
                Average Daily Mood
              </Text>

              <View
                style={{
                  height: hp(3.8),
                  display: "flex",
                  flexDirection: "row",
                  width: wp(75),
                  justifyContent: "space-around",
                  marginTop: hp(0.6),
                  borderRadius: wp(5),
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    backgroundColor: select == 1 ? "#D2A100" : "#fddf7a",
                    width: wp(p1),
                  }}
                />
                <View
                  style={{
                    height: "100%",
                    backgroundColor: select == 2 ? "#007BB7" : "#d2e7f2",
                    width: wp(p2),
                  }}
                />
                <View
                  style={{
                    height: "100%",
                    backgroundColor: select == 3 ? "#0F435C" : "#aed5e8",
                    width: wp(p3),
                  }}
                />
                <View
                  style={{
                    height: "100%",
                    backgroundColor: select == 4 ? "#723F2D" : "#f0d3ca",
                    width: wp(p4),
                  }}
                />
                <View
                  style={{
                    height: "100%",
                    backgroundColor: select == 5 ? "#01818C" : "#7bbdc4",
                    width: wp(p5),
                  }}
                />
                <View
                  style={{
                    height: "100%",
                    backgroundColor: select == 6 ? "#BB6345" : "#e8b19e",
                    width: wp(p6),
                  }}
                />
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: wp(75),
                  justifyContent: "space-around",
                  marginTop: hp(2),
                }}
              >
                <View className="items-center">
                  <Happy h={7.4} w={7.4} isSelect={select == 1 ? -1 : 1} />
                  <Text
                    style={{
                      fontSize: wp(3),
                      color: "#455a64",
                      marginTop: hp(1),
                    }}
                  >
                    {showMood.happy}%{/* {select} */}
                  </Text>
                </View>
                <View className="items-center">
                  <Surprised h={7.4} w={7.4} isSelect={select == 2 ? -1 : 2} />
                  <Text
                    style={{
                      fontSize: wp(3),
                      color: "#455a64",
                      marginTop: hp(1),
                    }}
                  >
                    {showMood.surprised}%
                  </Text>
                </View>
                <View className="items-center">
                  <Sad h={7.4} w={7.4} isSelect={select == 3 ? -1 : 3} />
                  <Text
                    style={{
                      fontSize: wp(3),
                      color: "#455a64",
                      marginTop: hp(1),
                    }}
                  >
                    {showMood.sad}%
                  </Text>
                </View>
                <View className="items-center">
                  <Disgust h={7.4} w={7.4} isSelect={select == 4 ? -1 : 4} />

                  <Text
                    style={{
                      fontSize: wp(3),
                      color: "#455a64",
                      marginTop: hp(1),
                    }}
                  >
                    {showMood.disgust}%
                  </Text>
                </View>
                <View className="items-center">
                  <Fear h={7.4} w={7.4} isSelect={select == 5 ? -1 : 5} />

                  <Text
                    style={{
                      fontSize: wp(3),
                      color: "#455a64",
                      marginTop: hp(1),
                    }}
                  >
                    {showMood.fear}%
                  </Text>
                </View>
                <View className="items-center">
                  <Angry h={7.4} w={7.4} isSelect={select == 6 ? -1 : 6} />
                  <Text
                    style={{
                      fontSize: wp(3),
                      color: "#455a64",
                      marginTop: hp(1),
                    }}
                  >
                    {showMood.angry}%
                  </Text>
                </View>
              </View>
            </View>

            <Text
              style={{
                color: theme.black,
                fontSize: wp(4),
                fontWeight: "500",
                width: wp(84),
                textAlign: "left",
                marginTop: hp(2.4),
              }}
            >
              Recommended Habit
            </Text>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: hp(0.9),
                width: wp(84),
                height: hp(11.2),
                backgroundColor: "#ECFFFF",
                borderRadius: wp(4),
                paddingVertical: hp(1.9),
                paddingHorizontal: wp(3.2),
              }}
            >
              <Logo height={wp(11)} width={wp(11)} />
              <View style={{ height: "100%", justifyContent: "space-between" }}>
                <Text
                  style={{
                    color: theme.black,
                    fontSize: wp(4),
                    fontWeight: "500",
                    width: wp(64),
                    textAlign: "left",
                  }}
                >
                  {habbit[ind].head}
                </Text>
                <Text
                  style={{
                    width: wp(64),
                    color: theme.black,
                    fontSize: wp(3.5),
                    textAlign: "left",
                  }}
                >
                  {habbit[ind].cont}
                </Text>
              </View>
            </View>
            <BottomQuote />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MoodInsights;

const styles = StyleSheet.create({
  HeadContainer: {
    height: hp(6),
    width: wp(100),
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(2),
  },
  HeadText: {
    width: wp(40.5),
    color: theme.black,
    fontSize: wp(4.2),
    fontFamily: "Roboto",
    fontWeight: "700",
    textAlign: "center",
  },
  NavCard: {
    display: "flex",
    flexDirection: "row",
    width: wp(84),
    backgroundColor: "red",
    height: hp(11),
    paddingHorizontal: wp(2),
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F7FBFD",
    borderRadius: wp(5.3),
    marginTop: hp(2),
  },
});
