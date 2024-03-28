import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
  ActivityIndicator,
  Linking,
  Image,
  BackHandler,
  ToastAndroid,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import ProfileBg from "../../assets/images/ProfileBg.svg";
import EditIcon from "../../assets/images/editIcon.svg";
import ProfileDisplay from "../../assets/images/ProfileDisplay.svg";
import BottomQuote from "../../assets/images/BottomQuote.svg";
import BookIcon from "../../assets/images/bookIcon.svg";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import axios from "axios";
import PTRView from "react-native-pull-to-refresh";
import theme from "../theme";

const gMeet = (link) => {
  if (link == "" || link == null || link == undefined)
    link = "https://meet.google.com";
  Linking.openURL(link)
    .then((responsive) => {
      console.log(responsive);
    })
    .catch((err) => console.log(err));
};

const NoSessions = () => {
  return (
    <Text
      style={{
        width: "100%",
        textAlign: "center",
        marginVertical: hp(3.6),
        color: "#455a64",
        fontSize: wp(4),
        fontFamily: "Roboto",
        fontWeight: "normal",
      }}
    >
      Sorry! You have no sessions.
    </Text>
  );
};

const DateTimeComponent = (rtime, rdate) => {
  const dateTimeString = rdate;
  const dateTime = new Date(dateTimeString);

  // Extracting date in DD/MM/YYYY format
  const formattedDate = `${dateTime.getDate().toString().padStart(2, "0")}/${(
    dateTime.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${dateTime.getFullYear()}`;

  // Extracting time in HH:MM:SS AM/PM format
  const timeString = rtime; // Example time string in the format HH:MM:SS
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  const date = new Date(); // Creates a new Date object with the current date
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);

  const timeOptions = {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedTime = date
    .toLocaleTimeString("en-US", timeOptions)
    .toLowerCase();
  // console.log(formattedDate,formattedTime)
  return { formattedDate, formattedTime };
};

const CardDetails = (props) => {
  const [datetime, setDateTime] = useState({});
  useEffect(() => {
    let rdate = props.props.session_date;
    let rtime = props.props.start_time;
    const jsonn = DateTimeComponent(rtime, rdate);
    setDateTime(jsonn);

    // console.log(datetime);
  }, []);

  return (
    <View
      style={{
        width: wp(76),
        height: hp(10),
        backgroundColor: "#ffffff",
        marginTop: hp(2),
        borderWidth: wp(0.5),
        borderColor: "#32959d",
        paddingHorizontal: wp(3.5),
        paddingVertical: hp(1.1),
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <View className="flex-row items-center justify-between">
        <Text
          style={{
            fontSize: wp(4),
            fontWeight: "bold",
            color: "#455a64",
          }}
        >
          {props.props.service_type}
        </Text>

        <Text
          style={{
            fontSize: wp(3.8),
            color: "#455a64",
            marginTop: hp(0.0),
          }}
        >
          ID :{" "}
          <Text style={{ fontWeight: "bold", color: "#455a64" }}>
            {props.props.appointment_id}
          </Text>
        </Text>
        {/* <TouchableOpacity
          className="flex-row justify-center items-center"
          style={{
            width: wp(17),
            height: hp(3.8),
            backgroundColor: "#32959d",
            borderRadius: wp(1.5),
          }}
          onPress={() => {
            gMeet(props.props.google_meeting_link);
          }}
        >
          <Text
            style={{
              fontSize: wp(4),
              fontWeight: "bold",
              color: "#ffffff",
            }}
          >
            Join
          </Text>
        </TouchableOpacity> */}
      </View>
      <View>
        <View className="flex-row justify-between items-center ">
          <Text style={{ fontSize: wp(3.8), color: "#455a64" }}>
            {datetime.formattedDate}
          </Text>
          <View
            style={{
              height: hp(2.2),
              width: wp(0.5),
              backgroundColor: "#32959d",
            }}
          />
          <Text style={{ fontSize: wp(3.8), color: "#455a64" }}>
            {datetime.formattedTime}
          </Text>
          <View
            style={{
              height: hp(2.2),
              width: wp(0.5),
              backgroundColor: "#32959d",
            }}
          />
          <Text style={{ fontSize: wp(3.8), color: "#455a64" }}>Online</Text>
        </View>
      </View>
    </View>
  );
};

// ddkdld
const FirstRoute = (props) => {
  // console.log("It is from first route: ", props)
  const [hasApp, sethasApp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const parentData = {
    has_ban: false,
    btn_data: {
      "btn1-text": "Book A session",
      "btn1-url": "https://heartitout.in/",
      "btn2-text": "Continue your journey",
      "btn2-url": "https://heartitout.in/therapist",
    },
    banner_link:
      "https://hiopublicstore.s3.us-east-2.amazonaws.com/TopBannerSVG.svg",
    on_click: "https://heartitout.in/",
  };

  const passDataToParent = (data) => {
    // Call the function passed from the parent component
    props.onDataReceived(data);
  };

  const renderSecondElement = () => {
    props.onRender(true);
  };

  useEffect(() => {
    const url = "https://n8n.heartitout.in/webhook/api/fetch-session-history";
    const payload = props.data;
    payload.data = "upcoming";
    if (loading) {
      axios
        .post(url, payload)
        .then((res) => {
          if (res.data.has_upc === "yes") {
            sethasApp(true);
            setData(res.data.upc_data);
            parentData.has_ban = true;
            parentData.banner_link = res.data.banner_link;
            parentData.on_click = res.data.on_click;
          } else {
            sethasApp(false);
            parentData.has_ban = false;
            parentData.btn_data["btn1-text"] =
              res.data.btn_dat["btn1-text"] != (null || undefined)
                ? res.data.btn_dat["btn1-text"]
                : "Book a Session";
            parentData.btn_data["btn2-text"] =
              res.data.btn_dat["btn2-text"] != (null || undefined)
                ? res.data.btn_dat["btn2-text"]
                : "Continue your journey";
            parentData.btn_data["btn1-url"] =
              res.data.btn_dat["btn1-url"] != (null || undefined)
                ? res.data.btn_dat["btn1-url"]
                : "https://heartitout.in";
            parentData.btn_data["btn2-url"] =
              res.data.btn_dat["btn2-url"] != (null || undefined)
                ? res.data.btn_dat["btn2-url"]
                : "https://heartitout.in";
          }
          passDataToParent(parentData);
          renderSecondElement();
        })
        .catch((err) => {
          console.log("error is here:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loading]);

  return (
    <View style={styles.scrollContainer}>
      <ScrollView        
        style={{ width: "100%", paddingLeft: wp(3.5) }}
      >
        {loading ? (
          <View
            style={{
              height: hp(15),
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator
              color="#01818C"
              animating={loading}
              size={wp(6)}
            />
          </View>
        ) : (
          <>
            {hasApp ? (
              <>
                {data.map((item, index) => (
                  <CardDetails key={index} props={item} />
                ))}
              </>
            ) : (
              <>
                <NoSessions />
              </>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const SecondRoute = (props) => {
  const [hasApp, sethasApp] = useState(false);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({});

  const parentData = {
    has_ban: false,
    btn_data: {
      "btn1-text": "Book A session",
      "btn1-url": "https://heartitout.in/",
      "btn2-text": "Continue your journey",
      "btn2-url": "https://heartitout.in/therapist",
    },
    banner_link:
      "https://hiopublicstore.s3.us-east-2.amazonaws.com/TopBannerSVG.svg",
    on_click: "https://heartitout.in/",
  };

  const passDataToParent = (data) => {
    // Call the function passed from the parent component
    props.onDataReceived(data);
  };

  const renderSecondElement = () => {
    props.onRender(true);
  };

  useEffect(() => {
    const url = "https://n8n.heartitout.in/webhook/api/fetch-session-history";
    const payload = props.data;
    payload.data = "history";
    axios
      .post(url, payload)
      .then((res) => {
        if (res.data.has_his === "yes") {
          sethasApp(true);
          setData(res.data.his_data);
          parentData.has_ban = true;
          parentData.banner_link = res.data.banner_link;
          parentData.on_click = res.data.on_click;
        } else {
          sethasApp(false);
          parentData.has_ban = false;
          parentData.btn_data["btn1-text"] =
            res.data.btn_dat["btn1-text"] != (null || undefined)
              ? res.data.btn_dat["btn1-text"]
              : "Book a Session";
          parentData.btn_data["btn2-text"] =
            res.data.btn_dat["btn2-text"] != (null || undefined)
              ? res.data.btn_dat["btn2-text"]
              : "Continue your journey";
          parentData.btn_data["btn1-url"] =
            res.data.btn_dat["btn1-url"] != (null || undefined)
              ? res.data.btn_dat["btn1-url"]
              : "https://heartitout.in";
          parentData.btn_data["btn2-url"] =
            res.data.btn_dat["btn2-url"] != (null || undefined)
              ? res.data.btn_dat["btn2-url"]
              : "https://heartitout.in";
        }
        passDataToParent(parentData);
        renderSecondElement();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <View className="flex-col items-center " style={styles.scrollContainer}>
      <ScrollView style={{ width: "100%", paddingLeft: wp(3.5) }}>
        {loading ? (
          <View
            style={{
              height: hp(15),
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator
              color="#01818C"
              animating={loading}
              size={wp(6)}
            />
          </View>
        ) : (
          <>
            {hasApp ? (
              <>
                {/* <CardDetails props={data} /> */}
                {data.map((item, index) => (
                  <CardDetails key={index} props={item} />
                ))}
              </>
            ) : (
              <>
                <NoSessions />
              </>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};
// ---------

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "#f8f7fc" }}
    style={{
      backgroundColor: "#f8f7fc",
      elevation: 0,
      padding: 0,
      width: "100%",
    }}
    renderLabel={({ route, focused, color }) => (
      <View
        className="flex-row items-center "
        style={{
          // backgroundColor: focused ? '#eaf7fc' : '#f8f7fc',
          backgroundColor: focused ? "rgba(1, 129, 140, 0.2)" : "#f8f7fc",
          width: wp(38),
          height: hp(4.5),
          borderRadius: wp(2),
          // borderWidth: focused ? wp(0.5) : 0,
          // borderEndColor: '#01818c'
          borderColor: "rgba(1, 129, 140, 0.3)",
        }}
      >
        <Text
          style={{
            color: focused ? "#01818c" : "#455a64",
            width: "100%",
            textAlign: "center",
            fontSize: wp(4),
          }}
        >
          {route.title}
        </Text>
      </View>
    )}
  />
);

const Buttons = (props) => {
  // console.log("It is from button in history: ", props);
  const navigation = useNavigation()
  return (
    <>
      <View
        className="flex-col items-center"
        style={[styles.cardContainer, { marginTop: hp(4) }]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.BookBtn2}
          onPress={() => {
            navigation.navigate('webview',props.props.but1URL)
          }}
        >
          <Text style={styles.btnText2}>{props.props.but1}</Text>
        </TouchableOpacity>
      </View>
      <View
        className="flex-col items-center"
        style={[styles.cardContainer, { marginTop: hp(3) }]}
      >
        <View className="flex-row items-center">
          <View style={styles.container3}></View>
          <Text
            style={{
              color: "#455A64",
              fontSize: wp(3.7),
              fontFamily: "Roboto",
              fontWeight: "300",
              paddingHorizontal: wp(3),
            }}
          >
            OR
          </Text>
          <View style={styles.container3}></View>
        </View>
      </View>
      <View
        className="flex-col items-center"
        style={[styles.cardContainer, { marginTop: hp(3) }]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.BookBtn3}
          onPress={() => {
            navigation.navigate('webview',props.props.but2URL)
          }}
        >
          <Text style={styles.btnText3}>{props.props.but2}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const Card = (props) => {
  // console.log("It is from card in history: ", props);
  const [imageError, setImageError] = useState(false);
  const navigation = useNavigation();
  const passDataToParent = (data) => {
    // Call the function passed from the parent component
    props.handleCard(data);
  };
  return (
    <View
      className="flex-col justify-center items-center"
      style={[styles.cardContainer, { marginTop: hp(4), height: hp(18) }]}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('webview',props.props.banClick)
        }}
      >
        {!imageError ? (
          <>
            <Image
              onError={() => {
                setImageError(true);
                passDataToParent({ state: false, type: props.props.type });
                console.log(true);
              }}
              resizeMode="stretch"
              style={{ width: wp(84), height: hp(18), borderRadius: wp(2) }}
              source={{
                uri: props.props.banLink,
              }}
              // alt={''}
            />
          </>
        ) : (
          //
          <Text> Ad by Heart it Out </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default function ProfileScreen(props) {
  const data = props.route.params.data;
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [det, setDet] = useState({});
  const [isSession, setSession] = React.useState(false);
  const [isSessionH, setSessionH] = React.useState(false);
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [but1, setBut1] = useState("");
  const [but2, setBut2] = useState("");
  const [but1URL, setBut1URL] = useState("");
  const [but2URL, setBut2URL] = useState("");
  const [banner, setBanner] = useState(false);
  const [banLink, setBanLink] = useState("");
  const [banClick, setBanClick] = useState("");
  const [isChild1Rendered, setIsChild1Rendered] = useState(false);
  const [isChild2Rendered, setIsChild2Rendered] = useState(false);
  const [but1H, setBut1H] = useState("");
  const [but2H, setBut2H] = useState("");
  const [but1URLH, setBut1URLH] = useState("");
  const [but2URLH, setBut2URLH] = useState("");
  const [bannerH, setBannerH] = useState(false);
  const [banLinkH, setBanLinkH] = useState("");
  const [banClickH, setBanClickH] = useState("");
  const [statusColor, setStatusColor] = useState("green");

  const [routes] = React.useState([
    { key: "first", title: "Upcoming" },
    { key: "second", title: "History" },
  ]);

  useEffect(() => {
    setDet(data);
    setName(data.usr_fullname);
    setMail(data.user_email);
    setCode(data.code);
    setPhone(data.phone);
  }, [name]);

  navigation.addListener("focus", () => {
    setStatusColor("green");
  });

  const backHandler = () => {
    navigation.navigate("Home_Tab");
    return true;
  };

  navigation.addListener("focus", () => {
    BackHandler.addEventListener("hardwareBackPress", backHandler);
  });

  navigation.addListener("blur", () => {
    setRefresh(true)
    BackHandler.removeEventListener("hardwareBackPress", backHandler);
  });

  const handleDataFromChild = (data) => {
    // Do something with the received data, such as updating state
    setSession(data.has_ban);
    setBut1(data.btn_data["btn1-text"]);
    setBut2(data.btn_data["btn2-text"]);
    setBut1URL(data.btn_data["btn1-url"]);
    setBut2URL(data.btn_data["btn2-url"]);
    setBanner(data.has_ban);
    setBanClick(data.on_click);
    setBanLink(data.banner_link);
  };

  const handleDataFromChild2 = (data) => {
    // Do something with the received data, such as updating state
    setSessionH(data.has_ban);
    setBut1H(data.btn_data["btn1-text"]);
    setBut2H(data.btn_data["btn2-text"]);
    setBut1URLH(data.btn_data["btn1-url"]);
    setBut2URLH(data.btn_data["btn2-url"]);
    setBannerH(data.has_ban);
    setBanClickH(data.on_click);
    setBanLinkH(data.banner_link);
  };

  const handleCard = (data) => {
    // Do something with the received data, such as updating state
    if (data.type == "H") setSessionH(false);
    if (data.type == "U") setSession(false);
  };

  const renderScene = ({ route }) => {
    setRefresh(false)
    switch (route.key) {
      case "first":
        return (
          !refresh && <FirstRoute
            data={data}
            onDataReceived={handleDataFromChild}
            onRender={handleChild1Render}
          />
        );
      case "second":
        return (
          !refresh && <SecondRoute
            data={data}
            onDataReceived={handleDataFromChild2}
            onRender={handleChild2Render}
          />
        );
      default:
        return null;
    }
  };

  // Function to update isChild1Rendered state
  const handleChild1Render = () => {
    setIsChild1Rendered(true);
  };
  const handleChild2Render = () => {
    setIsChild2Rendered(true);
  };
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const fetchData = () => {
    setTimeout(() => {
      setRefresh(false)
      setRefreshing(false);
    }, 50); // Simulating 2 seconds delay
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setRefresh(true)
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
          setRefresh(true);
        }, 120000)
      );
    }
    setTimer(false);
  }, [timer]);
  
  
  return (
    <SafeAreaView>
      {/* <StatusBar
        // backgroundColor={statusColor}
        translucent backgroundColor="transparent"
        barStyle={'light-content'}
        hidden={false}
      /> */}
      {/* <TopBarMain /> */}
      <View
      
        style={{
          backgroundColor: "#01818C",
          width: wp(100),
          height: hp(1),
          position: "absolute",
          top: 0,
          zIndex: 4,
        }}
      ></View>
      <PTRView  onRefresh={handleRefresh} style={{ backgroundColor: "#fff", height: hp(100) }}>
        <View style={{}} >
          <ProfileBg width={wp(100)} height={wp(58.4)} />
          <View style={styles.banner}>
            <Text
              style={{
                color: "white",
                fontSize: wp(5.5),
                fontFamily: "Roboto",
                fontWeight: "700",
                width: wp(84),
                textAlign: "center",
                marginBottom: hp(1.5),
              }}
            >
              About Me
            </Text>
            <View className="flex-row justify-between items-center">
              <View>
                <Text
                  style={{
                    color: "white",
                    fontSize: wp(4),
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                  }}
                >
                  {/* USER NAME */}
                  {name === "" ? "USER NAME" : name}
                </Text>
                <Text
                  style={{
                    marginTop: hp(0.05),
                    color: "white",
                    fontSize: wp(3.5),
                    fontFamily: "Roboto",
                    fontWeight: "normal",
                  }}
                >
                  {/* +91-9482955416 */}+{code}-{phone}
                </Text>
                <Text
                  style={{
                    marginTop: hp(0.05),
                    color: "white",
                    fontSize: wp(3.5),
                    fontFamily: "Roboto",
                    fontWeight: "normal",
                  }}
                >
                  {mail === "" ? "hii@heartitout.in" : mail}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("aboutMe", det);
                  }}
                  activeOpacity={0.8}
                  style={styles.BookBtn}
                >
                  <Text style={styles.btnText}>Edit</Text>
                  <EditIcon width={wp(5)} height={wp(5)} />
                </TouchableOpacity>
              </View>
              <ProfileDisplay width={wp(32)} height={hp(16)} />
            </View>
          </View>
        </View>
        <View style={[styles.cardContainer, { marginTop: hp(3) }]} >
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            animationEnabled={true}
            style={{
              width: "100%",
              backgroundColor: "#fff",
              borderRadius: wp(2.5),
              height:
                index == 0
                  ? isSession
                    ? hp(40)
                    : hp(22)
                  : isSessionH
                  ? hp(40)
                  : hp(22),
            }}
            renderTabBar={renderTabBar}
            initialParams={{ det }}
          ></TabView>
          
        </View>

        {index == 0 ? (
          <>
            {isChild1Rendered && (
              <>
                {isSession ? (
                  <Card
                    props={{ banner, banLink, banClick, type: "U" }}
                    handleCard={handleCard}
                  />
                ) : (
                  <Buttons props={{ but1, but1URL, but2, but2URL }} />
                )}
              </>
            )}
          </>
        ) : (
          <>
            {isChild2Rendered && (
              <>
                {isSessionH ? (
                  <Card
                    props={{
                      type: "H",
                      banner: bannerH,
                      banLink: banLinkH,
                      banClick: banClickH,
                    }}
                    handleCard={handleCard}
                  />
                ) : (
                  <Buttons
                    props={{
                      but1: but1H,
                      but1URL: but1URLH,
                      but2: but2H,
                      but2URL: but2URLH,
                    }}
                  />
                )}
              </>
            )}
          </>
        )}

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
  // ***
  BookBtn: {
    marginTop: hp(3),
    width: wp(31),
    height: hp(4.5),
    backgroundColor: "white",
    borderRadius: wp(8),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  // *****
  btnText: {
    textAlign: "center",
    color: "#01818C",
    fontSize: wp(4),
    fontFamily: "Roboto",
    fontWeight: "bold",
    marginRight: wp(1),
  },
  // 84
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
    width: wp(84),
    height: hp(6),
    borderRadius: wp(8),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#455a64",
  },

  btnText3: {
    textAlign: "center",
    color: "#455a64",
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
