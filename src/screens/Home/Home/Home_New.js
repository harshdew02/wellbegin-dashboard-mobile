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
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import TasksIcon2 from "../../../../assets/images/TasksIcon2.svg";
import ProgressIcon2 from "../../../../assets/images/ProgressIcon2.svg";
import NewIcon from "../../../../assets/images/NewIcon.svg";
import BottomQuote from "../../../../assets/images/BottomQuote.svg";
import Home1 from "../../../../assets/images/home1.svg";
import FeelBanner from "../../../../assets/images/FeelBanner.svg";
import Emoji1 from "../../../../assets/images/emoji1.svg";
import Emoji2 from "../../../../assets/images/emoji2.svg";
import Emoji3 from "../../../../assets/images/emoji3.svg";
import Emoji4 from "../../../../assets/images/emoji4.svg";
import Emoji5 from "../../../../assets/images/emoji5.svg";
import HomePing from "../../../../assets/images/homePing.svg";
import NewHome from "../../../../assets/images/newHome.svg";
import Help from "../../../../assets/images/Help.svg";
import Home2 from "../../../../assets/images/home2.svg";
import { theme } from "../../../theme";
import TopBell from "../../../components/TopBell";
import HomePageBanner2 from "../../../../assets/images/newHomebg.svg";
import Gift from "../../../../assets/images/Gift.svg";
import axios from "axios";
import PTRView from "react-native-pull-to-refresh";
import { useAuth } from "../../../utils/auth";
import SInfo from "react-native-encrypted-storage";

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
  const navigation = useNavigation();
  const { trackM, userDetails } = useAuth();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.BookBtn}
      onPress={() => {
        trackM("Navigated - Home(New)", {
          phone: userDetails().phone,
          event: "Navigated to Diagnostic",
        });
        navigation.navigate("test", props.props);
      }}
    >
      <Text style={styles.btnText}>Explore Wellbeing Tests</Text>
    </TouchableOpacity>
  );
};

const Bookbtn = (props) => {
  // console.log("It is from bookbtn: ",props)
  const navigation = useNavigation();
  const ishour = props.props.is2hour;
  const { trackM, userDetails } = useAuth();
  return (
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
              trackM("Navigated - Home(New)", {
                phone: userDetails().phone,
                event: "Book Your Next Session",
              });
              navigation.navigate("webview", props.props.booking);
            }}
          >
            <Text
              style={[styles.btnText, { fontSize: wp(3.5), color: "#ffffff" }]}
            >
              Book Your Next Session
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
              trackM("Navigated - Home(New)", {
                phone: userDetails().phone,
                event: "Joined the session",
              });
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
            trackM("Navigated - Home(New)", {
              phone: userDetails().phone,
              event: "Book Your Next Session",
            });
            navigation.navigate("webview", props.props.booking);
          }}
        >
          <Text style={[styles.btnText]}>Book Your Next Session</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default function HomeScreen2(props) {
  let data = props.props;
  const payload = props.props;
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
  const [whatsapp, setWhatsapp] = useState("");
  const [showsub, setShowsub] = useState(false);
  const [moodcheck, setMoodCheck] = useState(false);
  const [subsdet, setSubsdet] = useState(false);
  const [subdays, setSubdays] = useState(0);
  const [wellbeing, setWellbeing] = useState("");
  const [bell, setBell] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [category, setCategory] = useState("regular");

  const {
    setHomes,
    home,
    connect,
    userDetails,
    trackM,
    exceptionReporting,
    names,
    showToast,
  } = useAuth();
  useEffect(() => {
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
    trackM("Navigated - Home(New)", { phone: userDetails().phone });
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
    if (data.usr_fullname === "") {
      SInfo.getItem("nick_name")
        .then((res) => {
          if (res != null && res != undefined) setName(res);
        })
        .catch((error) => console.log(error));
    } else setName(data.usr_fullname);
  }, [names]);

  useEffect(() => {
    const isConnected = connect();
    if (!isConnected) {
      setMoodCheck(false);
    } else {
      if (moodcheck) {
        const apiUrl2 =
          "https://n8n.heartitout.in/webhook/api/fetch-session-details";
        axios
          .post(apiUrl2, userDetails())
          .then(async (res) => {
            if (res.data.status === "0") {
              // userInvalid();
            } else {
              if (res.data.has_appointment === "no") setBooked(false);
              else {
                if (
                  res.data.app_det.app_session_date != null &&
                  res.data.app_det.app_session_date != undefined &&
                  res.data.app_det.app_session_time != null &&
                  res.data.app_det.app_session_time != undefined
                ) {
                  const apiDate = res.data.app_det.app_session_date;
                  const apiTime = res.data.app_det.app_session_time;
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
                } else {
                  showToast("Network Error!...");
                }
                // Extracting date components from api
              }
            }
          })
          .catch((err) => {
            exceptionReporting({ err });
            console.log(err);
          })
          .finally(() => {
            setMoodCheck(false);
          });

        let realTimeData = null;
        const apiUrl3 =
          "https://n8n.heartitout.in/webhook/api/home-page-details";
        axios
          .post(apiUrl3, userDetails())
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
            exceptionReporting({ err });
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
                setWhatsapp(realTimeData.whatsapp_onclick);
                setProduct(realTimeData.product_onclick);
                setBooking(realTimeData.booking_link);
                setPackage(realTimeData.packages_onclick);
                setWellbeing(realTimeData.welbeing_onclick);
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
    setCategory(data.category);
    setWhatsnew(data.whats_new_onclick);
    setWhatsapp(data.whatsapp_onclick);
    setProduct(data.product_onclick);
    setBooking(data.booking_link);
    setWellbeing(data.welbeing_onclick);
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
      if (
        appointment.appointment.app_session_date != null &&
        appointment.appointment.app_session_date != undefined &&
        appointment.appointment.app_session_time != null &&
        appointment.appointment.app_session_time != undefined
      ) {
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
      } else {
        showToast("Network Error!...");
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
  const [Nickname, onChangeNickname] = React.useState("");

  const [nameDone, setNameDone] = React.useState(false);

  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor={theme.maincolor}
        barStyle={"light-content"}
        hidden={false}
        translucent={false}
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
        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
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
              // backgroundColor:'red'
            }}
            onPress={() => {
              trackM("Navigated - Home(New)", {
                phone: userDetails().phone,
                event: "Banner",
              });
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
                // position: "absolute",
                // zIndex: 5,
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
          <HomePageBanner2 width={wp(100)} height={wp(78.9)} />

          <View style={styles.banner}>
            <View
              className="flex-row items-center "
              style={{
                width: wp(84),
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: wp(4.2),
                  fontFamily: "Roboto",
                  fontWeight: "700",
                }}
              >
                {name != null && name != undefined
                  ? `Welcome ${
                      name.split(/\s+/).filter((word) => word !== "")[0]
                    } 👋`
                  : `Welcome 👋`}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  trackM("Navigated - Home(New)", {
                    phone: userDetails().phone,
                    event: "Reminder",
                  });
                  // setBell(false);
                  navigation.navigate("reminder", data);
                }}
                style={{ position: "absolute", right: wp(0) }}
              >
                <TopBell active={bell} />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                marginTop: hp(2.7),
                color: "white",
                fontSize: wp(4),
                fontWeight: "500",
              }}
            >
              Curious about your mental health?
            </Text>
            <View
              className="flex-row justify-between items-center"
              style={{ width: wp(90.6) }}
            >
              <Text
                style={{
                  color: "white",
                  width: wp(61),
                  fontSize: wp(3.8),
                  fontFamily: "Roboto",
                  fontWeight: "400",
                  lineHeight: hp(3),
                  marginTop: hp(1),
                }}
              >
                Start your journey by exploring our range of quick diagnostic
                tests to gain insight into your symptoms
              </Text>
              <NewHome width={wp(29.6)} height={wp(25.6)} />
            </View>
            {isBooked ? (
              <Bookbtn props={{ is2hour, link, booking }} />
            ) : (
              <Btn props={payload} />
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
              trackM("Navigated - Home(New)", {
                phone: userDetails().phone,
                event: "Start Therapy",
              });
              navigation.navigate("webview", booking);
            }}
            style={[styles.card, { backgroundColor: "#FEF8C8" }]}
          >
            <Text style={styles.cardText}>Start {"\n"}Therapy</Text>

            <TasksIcon2 width={wp(12.6)} height={wp(17.6)} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              trackM("Navigated - Home(New)", {
                phone: userDetails().phone,
                event: "Wellness Blogs",
              });
              navigation.navigate("webview", wellbeing);
            }}
            style={[styles.card, { backgroundColor: "#EBF2F5" }]}
          >
            <Text style={styles.cardText}>Wellness {"\n"}Blogs</Text>
            <ProgressIcon2 width={wp(16.5)} height={wp(18.9)} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, { backgroundColor: "#EAF7FC" }]}
            onPress={() => {
              trackM("Navigated - Home(New)", {
                phone: userDetails().phone,
                event: "What's New",
              });
              navigation.navigate("webview", whatsnew);
            }}
          >
            <Text style={styles.cardText}>What's {"\n"}New?</Text>
            <NewIcon width={wp(20)} height={hp(5)} />
          </TouchableOpacity>
        </View>

        {!mood ? (
          <>
            <TouchableOpacity
              onPress={() => {
                trackM("Navigated - Home(New)", {
                  phone: userDetails().phone,
                  event: "Mood tracker",
                });
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
                trackM("Navigated - Home(New)", {
                  phone: userDetails().phone,
                  event: "Mood Insights",
                });
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

        {category === "cwp" ? null : (
          <>
            {showsub ? (
              <>
                {subsdet && subdays > 0 ? (
                  <TouchableOpacity
                    onPress={() => {
                      trackM("Navigated - Home(New)", {
                        phone: userDetails().phone,
                        event: "See details",
                      });
                      navigation.navigate("webview", sub);
                    }}
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
                      <TouchableOpacity
                        activeOpacity={0.5}
                        style={[styles.Btn, { marginTop: hp(0.8) }]}
                        disabled={true}
                      >
                        <Text style={styles.btnText2}> See Details </Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      trackM("Navigated - Home(New)", {
                        phone: userDetails().phone,
                        event: "See plans",
                      });
                      navigation.navigate("webview", sub);
                    }}
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
                          color: "#455A64",
                          fontSize: wp(3.8),
                          width: wp(60),
                          fontFamily: "Roboto",
                          lineHeight: wp(6),
                          fontWeight: "800",
                        }}
                      >
                        Whole Hearted Subscription
                      </Text>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        style={[styles.Btn, { marginTop: hp(2.5) }]}
                        disabled={true}
                      >
                        <Text style={styles.btnText2}> See Plans </Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  trackM("Navigated - Home(New)", {
                    phone: userDetails().phone,
                    event: "Explore Packages",
                  });
                  navigation.navigate("webview", packages);
                }}
                style={[
                  styles.cardContainer,
                  { height: hp(15.8), marginTop: hp(3) },
                ]}
              >
                <View style={styles.packageCard}>
                  <View style={{ height: hp(9) }}>
                    <Text style={styles.cardText}>Session Packages</Text>
                    <TouchableOpacity
                      style={[styles.Btn, { marginTop: hp(2) }]}
                      disabled={true}
                    >
                      <Text style={styles.btnText2}>Explore Packages</Text>
                    </TouchableOpacity>
                  </View>
                  <Gift width={wp(25)} height={hp(9)} />
                </View>
              </TouchableOpacity>
            )}
          </>
        )}

        <TouchableOpacity
          onPress={() => {
            trackM("Navigated - Home(New)", {
              phone: userDetails().phone,
              event: "Message Us",
            });
            Linking.openURL(whatsapp)
              .then((responsive) => {
                console.log(responsive);
              })
              .catch((err) => console.log(err));
          }}
          className="flex-col items-center"
          style={[{ height: hp(15.8), marginTop: hp(4) }]}
        >
          <Help width={wp(84)} height={wp(34.4)} />
        </TouchableOpacity>

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
    fontSize: wp(4.2),
    fontWeight: "500",
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
    paddingBottom: hp(1),
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
