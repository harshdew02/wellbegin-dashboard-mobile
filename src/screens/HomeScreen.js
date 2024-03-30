import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  Linking,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import TasksIcon from "../../assets/images/TasksIcon.svg";
import NewIcon from "../../assets/images/NewIcon.svg";
import BottomQuote from "../../assets/images/BottomQuote.svg";
import Home1 from "../../assets/images/home1.svg";
import FeelBanner from "../../assets/images/FeelBanner.svg";
import Emoji1 from "../../assets/images/emoji1.svg";
import Emoji2 from "../../assets/images/emoji2.svg";
import Emoji3 from "../../assets/images/emoji3.svg";
import Emoji4 from "../../assets/images/emoji4.svg";
import Emoji5 from "../../assets/images/emoji5.svg";
import Home2 from "../../assets/images/home2.svg";
import SInfo from "react-native-encrypted-storage";
import { theme } from "../theme";
import TopBell from "../components/TopBell";
import HomePageBanner from "../components/HomePageBanner";
import Gift from "../../assets/images/Gift.svg";
import axios from "axios";
import PTRView from "react-native-pull-to-refresh";
import { useAuth } from "../utils/auth";

const gMeet = (link) => {
  if (link == "" || link == null || link == undefined)
    link = "https://meet.google.com";
  Linking.openURL(link)
    .then((responsive) => {
      console.log(responsive);
    })
    .catch((err) => console.log(err));
};

const Btn = (props) => {
  // console.log("It is from btn: ",props)
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.BookBtn}
      onPress={() => {
        // Checking if the link is supported for links with custom URL scheme.
        navigation.navigate("webview", props.props);
      }}
    >
      <Text style={styles.btnText}>Book a Session</Text>
    </TouchableOpacity>
  );
};

const Bookbtn = (props) => {
  // console.log("It is from bookbtn: ",props)
  const navigation = useNavigation();
  const ishour = props.props.is2hour;
  return (
    // <></>
    <View className="flex-row justify-between">
      {ishour ? (
        <>
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
            onPress={() => {
              // Checking if the link is supported for links with custom URL scheme.
              navigation.navigate("webview", props.props.booking);
            }}
          >
            <Text
              style={[styles.btnText, { fontSize: wp(3.5), color: "#ffffff" }]}
            >
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
            onPress={() => {
              // Checking if the link is supported for links with custom URL scheme.
              gMeet(props.props.link);
            }}
          >
            <Text style={styles.btnText}>Join Your Session</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.BookBtn]}
          onPress={() => {
            // Checking if the link is supported for links with custom URL scheme.
            navigation.navigate("webview", props.props.booking);
          }}
        >
          <Text style={[styles.btnText]}>Book another Session</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default function HomeScreen(props) {
  let data = props.route.params.data.route.params;
  const payload = props.route.params.data.route.params;
  const navigation = useNavigation();
  const [isBooked, setBooked] = useState(false);
  const [is2hour, setIs2hour] = useState(false);
  const [name, setName] = useState("User");
  const [link, setLink] = useState("");
  const [mood, setMood] = useState(false);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [banner, setBanner] = useState({ avail: false });
  const [whatsnew, setWhatsnew] = useState("");
  const [product, setProduct] = useState("");
  const [booking, setBooking] = useState("");
  const [sub, setSub] = useState("");
  const [packages, setPackage] = useState("");
  const [showsub, setShowsub] = useState(false);
  const [moodcheck, setMoodCheck] = useState(false);
  const [subsdet, setSubsdet] = useState(false);
  const [subdays, setSubdays] = useState(0);
  const [bell, setBell] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const { setHomes, home, connect } = useAuth();
  useEffect(() => {
    console.log(home);
    if (home === "webview" || home === "moodset") {
      setMoodCheck(true);
    }
    setHomes("App");
  }, [home]);

  const backHandler = () => {
    BackHandler.exitApp();
    return true;
  };

  navigation.addListener("focus", () => {
    BackHandler.addEventListener("hardwareBackPress", backHandler);
  });

  navigation.addListener("blur", () => {
    BackHandler.removeEventListener("hardwareBackPress", backHandler);
  });

  const appointment = {
    appointment: data.app_det,
    has_appointment: data.has_appointment,
    // has_appointment: "yes",
    // appointment: {
    //   app_id: "53904",
    //   app_cl_name: "Vaishnavi Kambadur",
    //   app_cl_email: "vaishnavi5913@gmail.com",
    //   app_staff: "2",
    //   app_session_date:
    //     "Fri Mar 21 2024 00:00:00 GMT+0000 (Coordinated Universal Time)",
    //   app_session_time: "03:00:00",
    //   app_session_link: "https://meet.google.com/pgx-mwxa-jdj",
    // },
  };

  useEffect(() => {
    const isConnected = connect();
    if(!isConnected) {setMoodCheck(false)}
    else{
    if (moodcheck) {
      const apiUrl2 =
        "https://n8n.heartitout.in/webhook/api/fetch-session-details";
      axios
        .post(apiUrl2, payload)
        .then(async (res) => {
          if (res.data.status === "0") {
            // userInvalid();
          } else {
            if (res.data.has_appointment === "no") setBooked(false);
            else {
              const apiDate = res.data.app_det.app_session_date;
              const apiTime = res.data.app_det.app_session_time;

              // Extracting date components from api
              let timestamp = new Date(apiDate);
              let year = timestamp.getFullYear();
              let month = String(timestamp.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1
              let date = String(timestamp.getDate()).padStart(2, "0");
              let [part1, part2, part3] = apiTime.split(":");
              let hours = part1;
              let minutes = part2;
              let seconds = part3;
              let period = "AM";
              if (hours >= 12) {
                hours -= 12;
                period = "PM";
              }
              if (hours === 0) {
                hours = 12;
              }
              let showTime = `${hours}:${minutes} ${period}`;
              let showDate = `${date}/${month}/${year}`;
              let finalAPITime = `${year}-${month}-${date}T${apiTime}Z`;

              // Extracting date components from system
              timestamp = new Date();
              year = timestamp.getFullYear();
              month = String(timestamp.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1
              date = String(timestamp.getDate()).padStart(2, "0");
              hours = String(timestamp.getHours()).padStart(2, "0");
              minutes = String(timestamp.getMinutes()).padStart(2, "0");
              seconds = String(timestamp.getSeconds()).padStart(2, "0");
              let finalSystemTime = `${year}-${month}-${date}T${hours}:${minutes}:${seconds}Z`;
              setLink(res.data.app_det.app_session_link);

              // Parse the API datetime string
              const apiDateTime = new Date(finalAPITime);

              // Parse the system datetime string
              const systemDateTime = new Date(finalSystemTime);

              // Calculate the time difference in milliseconds
              const timeDifference = apiDateTime - systemDateTime;

              // Convert milliseconds to hours
              const timeDifferenceHours = Math.abs(
                timeDifference / (1000 * 60 * 60)
              );

              // Define a threshold for 2 hours
              const twoHours = 2;

              // Compare the time difference with the threshold and whether it's negative
              if (timeDifference < 0) {
                setBooked(false);
              } else if (timeDifferenceHours >= twoHours) {
                setBooked(true);
                setIs2hour(false);
              } else if (timeDifferenceHours < twoHours) {
                setBooked(true);
                setIs2hour(true);
                setTime(showTime);
                setDate(showDate);
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setMoodCheck(false);
        });

      let realTimeData = null;
      const apiUrl3 = "https://n8n.heartitout.in/webhook/api/home-page-details";
      axios
        .post(apiUrl3, payload)
        .then(async (res) => {
          realTimeData = await res.data;
          if (realTimeData != null) {
            if (realTimeData.status !== "1" || realTimeData.status !== "10") {
              // userInvalid();
            }
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          if (realTimeData != null) {
            if (realTimeData.status === "1" || realTimeData.status === "10") {
              realTimeData.mood_tacker === "yes"
                ? setMood(true)
                : setMood(false);
              if (realTimeData.has_banner === "yes") {
                setBanner({
                  avail: true,
                  ban_link: realTimeData.banner,
                  cban_link: realTimeData.ban_on_click,
                });
              } else {
                setBanner({ avail: false });
              }
              setWhatsnew(realTimeData.whats_new_onclick);
              setProduct(realTimeData.product_onclick);
              setBooking(realTimeData.booking_link);
              setPackage(realTimeData.packages_onclick);
              if (realTimeData.subs_det === "yes") setSubsdet(true);
              else setSubsdet(false);
            }
          }
          setMoodCheck(false);
        });
      }
    }
  }, [moodcheck]);

  useEffect(() => {
    setName(data.usr_fullname);
    data.has_mood == "no" ? setMood(false) : setMood(true);
    if (
      data.has_banner == "yes" &&
      data.banner_link !== "" &&
      data.on_click !== ""
    ) {
      setBanner({
        avail: true,
        ban_link: data.banner_link,
        cban_link: data.on_click,
      });
    } else {
      setBanner({ avail: false });
    }
    setWhatsnew(data.whats_new_onclick);
    setProduct(data.product_onclick);
    setBooking(data.booking_link);
    if (data.show_sub === "yes") {
      setShowsub(true);
      setSub(data.sub_onclick);
    } else {
      setShowsub(false);
      setPackage(data.packages_onclick);
    }
    if (data.subs_det === "yes") setSubsdet(true);
    else setSubsdet(false);
    setSubdays(Number.parseInt(data.subs_no_of_days));
    if (appointment.has_appointment === "no") setBooked(false);
    else {
      const apiDate = appointment.appointment.app_session_date;
      const apiTime = appointment.appointment.app_session_time;

      // Extracting date components from api
      let timestamp = new Date(apiDate);
      let year = timestamp.getFullYear();
      let month = String(timestamp.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1
      let date = String(timestamp.getDate()).padStart(2, "0");
      let [part1, part2, part3] = apiTime.split(":");
      let hours = part1;
      let minutes = part2;
      let seconds = part3;
      let period = "AM";
      if (hours >= 12) {
        hours -= 12;
        period = "PM";
      }
      if (hours === 0) {
        hours = 12;
      }
      // let showTime = `${}/${}/${} at `
      let showTime = `${hours}:${minutes} ${period}`;
      let showDate = `${date}/${month}/${year}`;
      let finalAPITime = `${year}-${month}-${date}T${apiTime}Z`;

      // Extracting date components from system
      timestamp = new Date();
      year = timestamp.getFullYear();
      month = String(timestamp.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1
      date = String(timestamp.getDate()).padStart(2, "0");
      hours = String(timestamp.getHours()).padStart(2, "0");
      minutes = String(timestamp.getMinutes()).padStart(2, "0");
      seconds = String(timestamp.getSeconds()).padStart(2, "0");
      let finalSystemTime = `${year}-${month}-${date}T${hours}:${minutes}:${seconds}Z`;
      setLink(appointment.appointment.app_session_link);

      // Parse the API datetime string
      const apiDateTime = new Date(finalAPITime);

      // Parse the system datetime string
      const systemDateTime = new Date(finalSystemTime);

      // Calculate the time difference in milliseconds
      const timeDifference = apiDateTime - systemDateTime;

      // Convert milliseconds to hours
      const timeDifferenceHours = Math.abs(timeDifference / (1000 * 60 * 60));

      // Define a threshold for 2 hours
      const twoHours = 2;

      // Compare the time difference with the threshold and whether it's negative
      if (timeDifference < 0) {
        setBooked(false);
      } else if (timeDifferenceHours >= twoHours) {
        setBooked(true);
        setIs2hour(false);
      } else if (timeDifferenceHours < twoHours) {
        setBooked(true);
        setIs2hour(true);
        setTime(showTime);
        setDate(showDate);
      }
    }
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const fetchData = () => {
    setTimeout(() => {
      setMoodCheck(true);
      setRefreshing(false);
    }, 50); // Simulating 2 seconds delay
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor={theme.maincolor}
        barStyle={"light-content"}
        hidden={false}
      />
      {/* {banner.avail ? (
        
      ) : (
        <></>
      )} */}
      <View
          style={{
            backgroundColor: theme.maincolor,
            width: wp(100),
            height: hp(0.8),
            position: "absolute",
            top: 0,
            zIndex: 4,
          }}
        />

      <PTRView
        onRefresh={handleRefresh}
        scrollEventThrottle={1}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ backgroundColor: "#fff", height: hp(100) }}
      >
        {/* Banner */}
        {banner.avail ? (
          <TouchableOpacity
            activeOpacity={1}
            style={{
              position: "absolute",
              zIndex: 2,
              top: 0,
            }}
            onPress={() => {
              navigation.navigate("webview", banner.cban_link);
            }}
          >
            <Image
              onLoad={() => {
                setLoaded(true);
              }}
              onError={() => {
                setLoaded(false);
                console.log("failed");
              }}
              resizeMode="stretch"
              style={{
                width: wp(100),
                height: wp(24.66),
                position: "absolute",
                zIndex: 5,
              }}
              source={{
                uri: banner.ban_link,
              }}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}

        <View
          style={
            banner.avail
              ? { marginTop: loaded ? wp(22.66) : hp(-0.05) }
              : { marginTop: hp(0) }
          }
        >
          <HomePageBanner />

          <View style={styles.banner}>
            <View
              className="flex-row justify-center items-center "
              style={{
                backgroundColor: theme.maincolor,
                width: wp(84),
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: wp(4),
                  fontFamily: "Roboto",
                  fontWeight: "400",
                }}
              >
                Welcome👋 {name.split(/\s+/).filter((word) => word !== "")[0]}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setBell(false);
                  navigation.navigate("reminder", data);
                }}
                style={{ position: "absolute", right: wp(0) }}
              >
                <TopBell active={bell} />
              </TouchableOpacity>
            </View>

            <View
              className="flex-row justify-between items-center"
              style={{ marginTop: hp(1) }}
            >
              <View>
                {isBooked ? (
                  <>
                    {is2hour ? (
                      <>
                        <Text
                          style={{
                            color: "white",
                            fontSize: wp(4),
                            fontFamily: "Roboto",
                            fontWeight: "400",
                            marginTop: wp(4),
                            width: wp(53),
                          }}
                        >
                          Your next Online session is on{" "}
                          <Text
                            style={{
                              color: "white",
                              fontSize: wp(4),
                              fontFamily: "Roboto",
                              fontWeight: "700",
                            }}
                          >
                            {date}
                          </Text>{" "}
                          at{" "}
                          <Text
                            style={{
                              color: "white",
                              fontSize: wp(4),
                              fontFamily: "Roboto",
                              fontWeight: "700",
                            }}
                          >
                            {time}
                          </Text>
                        </Text>
                      </>
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          fontSize: wp(4),
                          fontFamily: "Roboto",
                          fontWeight: "700",
                          marginTop: wp(4),
                          width: wp(53),
                        }}
                      >
                        Continue your well-begin journey.
                      </Text>
                    )}
                  </>
                ) : (
                  <>
                    <Text
                      style={{
                        color: "white",
                        fontSize: wp(4),
                        fontFamily: "Roboto",
                        fontWeight: "400",
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
                  </>
                )}
              </View>
              <Image
                source={require("../../assets/images/homePageGIF.gif")}
                style={{ height: wp(30), width: wp(30) }}
              />
            </View>
            {isBooked ? (
              <Bookbtn props={{ is2hour, link, booking }} />
            ) : (
              <Btn props={booking} />
            )}
          </View>
        </View>

        {/* Content */}
        <View
          className="flex-row justify-between"
          style={[styles.cardContainer, { height: hp(15.8) }]}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("homework", data);
            }}
            style={[styles.card, { backgroundColor: "#FEF8C8" }]}
          >
            <Text style={styles.cardText}>My {"\n"}Tasks</Text>

            <TasksIcon width={wp(11)} height={hp(6)} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("progress", data);
            }}
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
            onPress={() => {
              navigation.navigate("webview", whatsnew);
            }}
          >
            <Text style={styles.cardText}>What's {"\n"}New?</Text>
            <NewIcon width={wp(20)} height={hp(5)} />
          </TouchableOpacity>
        </View>

        {mood ? (
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("mood", data);
              }}
            >
              <View
                className="flex-col justify-between items-center"
                style={[
                  styles.cardContainer,
                  { height: hp(12.5), marginTop: hp(3) },
                ]}
              >
                <Text
                  style={{
                    color: "#043953",
                    fontSize: wp(4),
                    fontFamily: "Roboto",
                    fontWeight: "700",
                  }}
                >
                  How are you feeling today?
                </Text>
                <FeelBanner
                  width={wp(85)}
                  height={hp(9)}
                  style={styles.feelBanner}
                />
                <View
                  className="flex-row justify-between items-center"
                  style={[
                    {
                      position: "absolute",
                      bottom: 8,
                      zIndex: 1,
                      width: wp(78),
                    },
                  ]}
                >
                  <Emoji1 width={wp(8)} height={wp(8)} />
                  <Emoji2 width={wp(8)} height={wp(8)} />
                  <Emoji3
                    style={{ marginHorizontal: wp(1.5) }}
                    width={wp(10)}
                    height={wp(10)}
                  />
                  <Emoji4 width={wp(8)} height={wp(8)} />
                  <Emoji5 width={wp(8)} height={wp(8)} />
                </View>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("moodInsights", data);
              }}
            >
              <View
                className="flex-col justify-between items-center"
                style={[styles.cardContainer, { marginTop: hp(3) }]}
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
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#ffffff",
                      fontSize: wp(4),
                      fontFamily: "Roboto",
                      fontWeight: "600",
                      marginTop: hp(1.2),
                      width: wp(43),
                      height: hp(3),
                      backgroundColor: "#01818c",
                      borderRadius: wp(8),
                      flexDirection: "row",
                    }}
                  >
                    View mood insights
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </>
        )}

        {showsub ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("webview", sub);
            }}
            className="flex-col items-center"
            style={[
              styles.cardContainer,
              { height: hp(15.8), marginTop: hp(3) },
            ]}
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
              <Text
                style={{
                  // textAlign: "center",
                  color: "#455A64",
                  fontSize: wp(3.8),
                  width: wp(60),
                  fontFamily: "Roboto",
                  lineHeight: wp(6),
                  fontWeight: "800",
                }}
              >
                Your Whole Hearted Subscription is Active
              </Text>
              <View
                activeOpacity={0.5}
                style={[styles.Btn, { marginTop: hp(0.8) }]}
              >
                <Text style={styles.btnText2}>See Details </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("webview", packages);
            }}
            className="flex-col items-center"
            style={[
              styles.cardContiner,
              { height: hp(15.8), marginTop: hp(3) },
            ]}
          >
            <View style={[styles.packageCard, {}]}>
              <View
                className="flex-col justify-between items-start "
                style={{ height: hp(9) }}
              >
                <Text style={styles.cardText}>Session Packages</Text>
                <View
                  // activeOpacity={0.5}
                  style={styles.Btn}
                >
                  <Text style={styles.btnText2}>Explore Packages</Text>
                </View>
              </View>
              <Gift width={wp(25)} height={hp(9)} />
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("webview", product);
          }}
          className="flex-col items-center"
          style={[styles.cardContainer, { height: hp(15.8), marginTop: hp(4) }]}
        >
          <View style={[styles.packageCard, { backgroundColor: "#EAF7FC" }]}>
            <View
              className="flex-col justify-between items-start "
              style={{ height: hp(9) }}
            >
              <Text style={styles.cardText}>Self-care Tools for you</Text>
              <View style={styles.Btn}>
                <Text style={styles.btnText2}>Discover Now</Text>
              </View>
            </View>
            <Image
              source={require("../../assets/images/SelfCareIcon2.png")}
              style={{ width: wp(18), height: hp(14) }}
            />
          </View>
        </TouchableOpacity>

        <View
          className="flex-row items-center"
          style={[
            styles.cardContainer,
            { height: hp(20), marginTop: hp(5), backgroundColor: "#EBEFF2CC" },
          ]}
        >
          <BottomQuote width={wp(71)} height={hp(15)} />
        </View>

        <View style={{ width: wp(100), height: hp(6), marginTop: hp(3) }} />
      </PTRView>
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
    top: hp(4),
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
  cardContainer: {
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

  feelBanner: {
    position: "absolute",
    bottom: 0,
    zIndex: -1,
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

  cardContainer2: {
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
