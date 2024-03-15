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
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import axios from "axios";
import theme from '../theme'

const gMeet = (link) => {
  if(link == "" || link==null || link==undefined) link = "https://meet.google.com"
  Linking.openURL(link)
    .then((responsive) => {
      console.log(responsive);
    })
    .catch((err) => console.log(err));
};

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
  console.log(rtime, rdate);
  const dateTimeString = rdate;
  const dateTime = new Date(dateTimeString);

  // Extracting date in DD/MM/YYYY format
  const formattedDate = `${dateTime.getDate()}/${dateTime.getMonth() + 1
    }/${dateTime.getFullYear()}`;

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
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions).toLowerCase();
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
        height: hp(13),
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
        <Text
          style={{
            fontSize: wp(3.8),
            color: "#455a64",
            marginTop: hp(0.4),
          }}
        >
          ID :{" "}
          <Text style={{ fontWeight: "bold", color: "#455a64" }}>
            {props.props.appointment_id}
          </Text>
        </Text>
      </View>
    </View>
  );
};

// ddkdld
const FirstRoute = (props) => {
  const [hasApp, sethasApp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  useEffect(() => {
    const url = "https://n8n.heartitout.in/webhook/api/fetch-session-history";
    const payload = props.data;
    payload.data = "upcoming";
    axios
      .post(url, payload)
      .then((res) => {
        if (res.data.has_upc === "yes") {
          sethasApp(true);
          setData(res.data.upc_data);
        } else sethasApp(false);

        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={styles.scrollContainer}>
      <ScrollView style={{ width: "100%", paddingLeft: wp(3.5) }}>
        {loading ? (
          <ActivityIndicator animating={loading} size="large" />
        ) : (
          <>
            {hasApp ? (
              <>
                {data.map((item, index) => (
                  <CardDetails key={index} props={item} />
                ))}
                {/* <CardDetails props={data} /> */}
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
        } else sethasApp(false);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <View className="flex-col items-center " style={styles.scrollContainer}>
      <ScrollView style={{ width: "100%", paddingLeft: wp(3.5) }}>
        {loading ? (
          <ActivityIndicator animating={loading} size="large" />
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

const Buttons = () => {
  return (
    <>
      <View
        className="flex-col items-center"
        style={[styles.cardContainer, { marginTop: hp(4) }]}
      >
        <TouchableOpacity activeOpacity={0.8} style={styles.BookBtn2}>
          <Text style={styles.btnText2}>Book a Session</Text>
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
        <TouchableOpacity activeOpacity={0.8} style={styles.BookBtn3}>
          <Text style={styles.btnText3}>
            Take a Free Mental Health Check up
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const Card = () => {
  return (
    <View
      className="flex-col items-center"
      style={[styles.cardContainer, { marginTop: hp(4) }]}
    >
      <View
        style={{
          width: "100%",
          height: hp(18),
          backgroundColor: "rgba(247, 207, 106, 0.5)",
          borderRadius: wp(2.6),
          paddingHorizontal: wp(2),
          paddingVertical: hp(3.3),
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <BookIcon width={wp(30)} height={hp(13)} />
        <View className="flex-col justify-between items-left ">
          <Text style={{ width: wp(46), fontSize: wp(3.4), color: "#455a64" }}>
            Treat yourself with a little self-care while you await your next
            therapy session.💛
          </Text>
          <TouchableOpacity
            className="flex-row items-center justify-center "
            style={{
              width: wp(38),
              height: hp(4),
              backgroundColor: "#01818c",
              borderRadius: wp(1),
            }}
            onPress={() => { outLink('https://heartitout.in/products/doodle-notebooks/') }}
          >
            <Text style={{ color: "white", fontSize: wp(3.8) }}>
              Try doodling!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function ProfileScreen(props) {
  const data = props.route.params.data;
  const navigation = useNavigation();
  // const [firstTime, setFirstTime] = useState(true);
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [det, setDet] = useState({});
  const [isSession, setSession] = React.useState(1);
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const [statusColor , setStatusColor] = useState('green')

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

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <FirstRoute data={data} />;
      case "second":
        return <SecondRoute data={data} />;
      default:
        return null;
    }
  };

  navigation.addListener("focus",()=>{
    setStatusColor('green');
  })

  return (
    <SafeAreaView>
      {/* <StatusBar
        backgroundColor={statusColor}
        barStyle={'light-content'}
        hidden={false}
      /> */}
      {/* <TopBarMain /> */}
      <ScrollView style={{ backgroundColor: "#fff", height: hp(100) }}>
        <View style={{ marginTop: hp(9.5) }}>
          <ProfileBg width={wp(100)} height={hp(29)} />
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
        <View style={[styles.cardContainer, { marginTop: hp(3) }]}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            animationEnabled={false}
            style={{
              width: "100%",
              backgroundColor: "#f8f7fc",
              borderRadius: wp(2.5),
              height: isSession ? hp(40) : hp(20),
            }}
            renderTabBar={renderTabBar}
            initialParams={{ det }}
          ></TabView>
        </View>

        {isSession ? <Card /> : <Buttons />}

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
