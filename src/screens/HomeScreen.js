import {
  View,
  Text,
  SafeAreaView,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Link, useNavigation } from "@react-navigation/native";

import Logo4 from "../../assets/images/homePageBanner.svg";
import TasksIcon from "../../assets/images/TasksIcon.svg";
import NewIcon from "../../assets/images/NewIcon.svg";
import BottomQuote from "../../assets/images/BottomQuote.svg";
import Home1 from "../../assets/images/home1.svg";
import Home2 from "../../assets/images/home2.svg";
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import SInfo from "react-native-encrypted-storage";

// F:\HIO\Progress\hio_UI\hio\assets\images\

// const outLink = (link) => {
//   Linking.openURL(link)
//     .then((responsive) => {
//       console.log(responsive);
//     })
//     .catch((err) => console.log(err));
// };

const outLink = async (link) => {
  try {
    const url = link
    if (await InAppBrowser.isAvailable()) {
      const result = await InAppBrowser.open(url, {
        // // iOS Properties
        // dismissButtonStyle: 'cancel',
        // preferredBarTintColor: '#453AA4',
        // preferredControlTintColor: 'white',
        // readerMode: false,
        // animated: true,
        // modalPresentationStyle: 'fullScreen',
        // modalTransitionStyle: 'coverVertical',
        // modalEnabled: true,
        // enableBarCollapsing: false,
        // Android Properties
        showTitle: true,
        toolbarColor: '#01818C',
        secondaryToolbarColor: 'red',
        navigationBarColor: 'white',
        navigationBarDividerColor: 'white',
        enableUrlBarHiding: true,
        enableDefaultShare: false,
        forceCloseOnRedirection: false,
        hasBackButton: true,
        
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: 'slide_in_right',
        },
        headers: {
          'my-custom-header': 'my custom header value'
        }
      })
      console.log(result)
    }
    else Linking.openURL(url)
  } catch (error) {
    console.log(error)
  }
// Linking.canOpenURL(link).then((supported)=>{
//   if(supported) Linking.openURL(link); else console.log('error')
// });
}

const Btn = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.BookBtn}
      onPress={() => {
        // Checking if the link is supported for links with custom URL scheme.
        outLink("https://heartitout.in/therapists/");
      }}
    >
      <Text style={styles.btnText}>Book a Session</Text>
    </TouchableOpacity>
  );
};
const Bookbtn = (props) => {
  // console.log(props.props.is2hour)
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
              outLink("https://heartitout.in/therapists/");
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
              outLink(props.props.link);
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
            outLink("https://heartitout.in/therapists/");
          }}
        >
          <Text style={[styles.btnText]}>Book another Session</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default function HomeScreen(props) {
  const navigation = useNavigation();
  const [isBooked, setBooked] = useState(false);
  const [is2hour, setIs2hour] = useState(false);
  const [name, setName] = useState("User");
  const [link, setLink] = useState("");
  const [mood, setMood] = useState("Track Your Mood");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const data = props.route.params.data.route.params;

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
    //     "Fri Mar 14 2024 00:00:00 GMT+0000 (Coordinated Universal Time)",
    //   app_session_time: "01:00:00",
    //   app_session_link: "https://meet.google.com/pgx-mwxa-jdj",
    // },
  };
  React.useEffect(() => {
    setName(data.usr_fullname);
    data.has_mood == "no"
      ? setMood("Track Your Mood")
      : setMood("View Mood Insights");
    // console.log("It is coming from home screen: ", appointment);
    if (appointment.has_appointment === "no") setBooked(false);
    else {
      const apiDate = appointment.appointment.app_session_date;
      const apiTime = appointment.appointment.app_session_time;

      // Extracting date components from api
      let timestamp = new Date(apiDate);
      let year = timestamp.getFullYear();
      let month = String(timestamp.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1
      let date = String(timestamp.getDate()).padStart(2, "0");
      let [part1, part2, part3] = apiTime.split(':');
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
      let showDate = `${date}/${month}/${year}`
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
  }, [name]);

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
                  Welcome👋 {name}
                </Text>
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
                            width: wp(53)
                          }}
                        >
                          Your next Online
                          session is on{" "}
                          <Text
                            style={{
                              color: "white",
                              fontSize: wp(4),
                              fontFamily: "Roboto",
                              fontWeight: "700",
                            }}
                          >
                            {date}
                          </Text> at{" "}
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
                          fontWeight: '700',
                          marginTop: wp(4),
                          width: wp(53)
                          
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
                  </>
                )}
              </View>
              <Image
                source={require("../../assets/images/homePageGIF.gif")}
                style={{ height: wp(30), width: wp(30) }}
              />
            </View>
            {isBooked ? <Bookbtn props={{ is2hour, link }} /> : <Btn />}
          </View>
        </View>

        {/* Content */}
        <View
          className="flex-row justify-between"
          style={[styles.cardContainer, { height: hp(15.8) }]}
        >
          <TouchableOpacity
            onPress={()=>{console.log("working")}}
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
              onPress={() => {
                navigation.navigate('mood')
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
                {mood}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Package */}

        <View
          className="flex-col items-center"
          style={[styles.cardContainer, { height: hp(15.8), marginTop: hp(3) }]}
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
          style={[styles.cardContainer, { height: hp(15.8), marginTop: hp(4) }]}
        >
          <View style={[styles.packageCard, { backgroundColor: "#EAF7FC" }]}>
            <View
              className="flex-col justify-between items-start "
              style={{ height: hp(9) }}
            >
              <Text style={styles.cardText}>Self-care Tools for you</Text>
              <TouchableOpacity onPress={() => { outLink('https://heartitout.in/products/') }} activeOpacity={0.5} style={styles.Btn}>
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
            styles.cardContainer,
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
