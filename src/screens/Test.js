import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Back from "../components/Back";
import { theme } from "../theme";
import Check from "../components/Check";
import {
  Depression,
  Anxiety,
  Attachment,
  HelpFriend,
} from "../components/TestComp";
import BottomQuote from "../components/BottomQuote";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { InAppBrowser } from "react-native-inappbrowser-reborn";
import Share from "react-native-share";
import RNFetchBlob from "rn-fetch-blob";
import FileViewer from "react-native-file-viewer";
import PTRView from "react-native-pull-to-refresh";

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
      Sorry! You have not taken any diagnostic test yet.
    </Text>
  );
};

const DateTimeComponent = (rdate) => {
  const dateTimeString = rdate;
  const dateTime = new Date(dateTimeString);

  // Extracting date in DD/MM/YYYY format
  const formattedDate = `${dateTime.getDate().toString().padStart(2, "0")}/${(
    dateTime.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${dateTime.getFullYear()}`;
  return formattedDate;
};

const CardDetails = (props) => {
  const [sdate, setSDate] = useState(DateTimeComponent(props.props.ts_));
  const [edate, setEDate] = useState(DateTimeComponent(props.props.ts__));
  return (
    <View
      style={{
        width: wp(70),
        height: hp(14),
        // backgroundColor: '',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: hp(2),
      }}
    >
      <View
        style={{
          backgroundColor: "#455A64",
          width: wp(9),
          height: wp(9),
          borderRadius: wp(5),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Check />
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          borderColor: theme.maincolor,
          borderWidth: wp(0.3),
          width: wp(55),
          height: hp(14),
          display: "flex",
          justifyContent: "space-between",
          paddingVertical: hp(1),
          paddingLeft: wp(5.3),
        }}
      >
        <Text
          style={{
            fontSize: wp(3.5),
            color: "#455A64",
            fontWeight: "700",
          }}
        >
          {props.props.test}
        </Text>
        <View>
          <Text
            style={{
              fontSize: wp(3.5),
              color: "#455A64",
              fontWeight: "400",
            }}
          >
            Test Date: {sdate}
          </Text>
          <Text
            style={{
              fontSize: wp(3.5),
              color: "#455A64",
              fontWeight: "400",
            }}
          >
            Valid Till: {edate}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: wp(26),
            height: hp(3.1),
            backgroundColor: theme.maincolor,
            borderRadius: wp(8),
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            downloadFile(
              props.props.report_url,
              props.props.phone_no,
              sdate,
              props.props.test
            );
          }}
        >
          <Text style={{ color: "#fff", fontSize: wp(3.4) }}>View Results</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FirstRoute = (props) => {
  //   console.log(props.props);
  const [hasApp, sethasApp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const passDataToParent = (data) => {
    // Call the function passed from the parent component
    props.onDataReceived(data);
  };

  React.useEffect(() => {
    if (loading) {
      const url = "https://n8n.heartitout.in/webhook/api/fetch-diag-res";
      axios
        .post(url, props.props)
        .then((res) => {
          console.log("It is from first route in discover: ", res.data);
          if (res.data.has_res === "yes") {
            sethasApp(true);
            setData(res.data.res_data);
          } else {
            sethasApp(false);
          }
          passDataToParent(res.data.rec_test);
        })
        .catch((err) => {
          console.log("error is here:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loading]);

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
      console.log("Reset the timer");
      clearInterval(idleTimer);
    } else {
      clearInterval(idleTimer);
      console.log("Performing logic every 1 minute...");
      setIdleTimer(
        setInterval(() => {
          setLoading(true);
        }, 90000)
      );
    }

    setTimer(false);
  }, [timer]);

  return (
    <View
      style={styles.scrollContainer}
      onTouchStart={() => {
        setTimer(true);
        console.log("reset");
      }}
    >
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
          {hasApp ? (
            <>
              {
                <>
                  <PTRView
                    onRefresh={handleRefresh}
                    style={{ width: "100%", height: "100%" }}
                    contentContainerStyle={{
                      display: "flex",
                      flexDirection: "column",
                      paddingLeft: wp(6),
                      paddingBottom: hp(1),
                    }}
                  >
                    <View
                      style={{
                        height: "100%",
                        width: wp(1),
                        backgroundColor: "#455A64",
                        position: "absolute",
                        left: wp(10),
                        zIndex: -2,
                      }}
                    />
                    {data.map((item, index) => (
                      <CardDetails key={index} props={item} />
                    ))}
                  </PTRView>
                </>
              }
            </>
          ) : (
            <>
              <NoSessions />
            </>
          )}
        </>
      )}
    </View>
  );
};

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "#E9E8EB" }}
    style={{
      backgroundColor: "#E9E8EB",
      elevation: 0,
      padding: 0,
      width: "100%",
    }}
    renderLabel={({ route, focused, color }) => (
      <View
        className="flex-row items-center "
        style={{
          width: wp(40),
          height: hp(4.5),
          borderRadius: wp(2),
          borderColor: "rgba(1, 129, 140, 0.3)",
        }}
      >
        <Text
          style={{
            color: theme.grey,
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

const GeneralCard = (props) => {
  const [colors, setColor] = useState(props.colors);
  const navigation = useNavigation();
  // console.log("Is this refreshing")

  const containsWord = (sentence, word) => {
    return sentence.toLowerCase().includes(word.toLowerCase());
  };
  return (
    <View
      style={[
        {
          backgroundColor: colors == 0 ? "#EAF7FC" : "#f4ecd8",
          justifyContent: "center",
        },
        styles.cardStyle,
      ]}
    >
      <View style={{ position: "absolute", right: wp(5) }}>
        {containsWord(props.props.test_name, "Depression") ? (
          <Depression />
        ) : containsWord(props.props.test_name, "Attachment") ? (
          <Attachment />
        ) : (
          <Anxiety />
        )}
      </View>
      <View
        style={{
          marginLeft: wp(4.5),
          height: hp(8.5),
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: wp(4.2),
            color: "#455A64",
            fontWeight: "700",
          }}
        >
          {props.props.test_name}
        </Text>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => {
            navigation.navigate('webview',props.props.url)
          }}
        >
          <Text style={{ color: "#fff", fontSize: wp(3.4) }}>Take Test</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const showToast = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

const downloadFile = (url, user, date, type) => {
  showToast("Report download starts.");

  function previewFile(filePath) {
    FileViewer.open(filePath)
      .then(() => {
        console.log("Success");
      })
      .catch((_err) => {
        console.log(_err);
      });
  }

  const { config, fs } = RNFetchBlob;
  let DownloadDir =
    Platform.OS === "ios" ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
  const replacedDate = date.replace(/\//g, "-");
  const filename = `Report on ${replacedDate}.pdf`;
  const path = `${DownloadDir}/Heart it Out/${user}/${type}/${filename}`;
  config({
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path: path,
    },
  })
    .fetch("GET", url)
    .then((res) => {
      showToast("Report downloaded.");
      previewFile(path);
    })
    .catch((error) => {
      console.error(error);
      Alert.alert("Error", "Failed to download file.");
    });
};

const ShareMessage = (text) => {
  const shareMessage = async (text) => {
    try {
      const options = {
        message: text,
      };
      await Share.open(options);
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };
  shareMessage(text);
};

const Test = (props) => {
  const data = props.route.params;
  const [routes] = React.useState([
    { key: "first", title: "Your Recent Tests" },
  ]);
  const [isSession, setSession] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [det, setDet] = useState({});
  const layout = useWindowDimensions();
  const navigation = useNavigation();
  const [test, setTest] = React.useState([]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <FirstRoute props={data} onDataReceived={handleDataFromChild} />;
      default:
        return null;
    }
  };

  const handleDataFromChild = (data) => {
    // Do something with the received data, such as updating state
    setTest(data);
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          display: "flex-1",
          flexDirection: "col",
          alignItems: "center",
        }}
        style={{ width: wp(100), backgroundColor: "#f7fbfd", height: hp(100) }}
      >
        <View
          style={{
            height: hp(6),
            width: wp(100),
            justifyContent: "center",
            alignItems: "center",
            marginTop: hp(2),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ position: "absolute", left: wp(8) }}
          >
            <Back color={"#455A64"} />
          </TouchableOpacity>
          <Text
            style={{
              color: theme.grey,
              fontSize: wp(5.5),
              fontFamily: "Roboto",
              fontWeight: "bold",
            }}
          >
            My Wellbeing Tests
          </Text>
        </View>
        <Text
          style={{
            width: wp(80),
            marginTop: wp(2),
            textAlign: "center",
          }}
        >
          Access your test results below to get a better understanding of your
          symptoms.
        </Text>

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
              height: hp(40),
              // borderWidth: wp(1),
            }}
            renderTabBar={renderTabBar}
            initialParams={{ det }}
          ></TabView>
        </View>

        <Text
          style={{
            fontSize: wp(4),
            fontWeight: "700",
            color: theme.black,
            marginTop: hp(3.4),
          }}
        >
          Recommended Diagnostics For You
        </Text>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={{
            display: "flex",
            flexDirection: "row",
            borderRadius: wp(2),
          }}
          style={{ width: wp(86), height: hp(12.8), marginTop: hp(2) }}
        >
          {test.map((item, index) => (
            <GeneralCard key={index} props={item} colors={index % 2} />
          ))}
          {/* <DepressionTest />
          <AttachmentTest /> */}
          {/* <GeneralCard /> */}
        </ScrollView>

        <View style={{ marginTop: hp(4), justifyContent: "center" }}>
          <HelpFriend />
          <View
            style={{
              position: "absolute",
              zIndex: 1,
              height: hp(12),
              width: wp(59),
              alignItems: "center",
              right: wp(4.2),
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: wp(3.2),
                fontWeight: "700",
                color: "#fff",
              }}
            >
              Help your loved one understand their symptoms better so they can
              get the help they deserve!
            </Text>
            <TouchableOpacity
              style={[styles.btnStyle2]}
              onPress={() => {
                ShareMessage(
                  "Hey, Check out this cool app that helped me understand my symptoms better. It might give you some clarity and get you the support you need. Give it a shot! Here's the link: https://heartitout.in/diagnostic"
                );
              }}
            >
              <Text
                style={{
                  color: theme.black,
                  fontSize: wp(4),
                  fontWeight: "500",
                }}
              >
                Share Quiz
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <BottomQuote /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Test;

const styles = StyleSheet.create({
  cardContainer: {
    width: wp(100),
    paddingHorizontal: wp(8),
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

  cardStyle: {
    width: wp(70),
    height: "100%",
    marginHorizontal: wp(2),
    borderRadius: wp(3),
  },

  btnStyle: {
    width: wp(32),
    height: hp(3.7),
    backgroundColor: theme.maincolor,
    borderRadius: wp(8),
    justifyContent: "center",
    alignItems: "center",
  },
  btnStyle2: {
    width: wp(32),
    height: hp(3.7),
    backgroundColor: "#fff",
    borderRadius: wp(8),
    justifyContent: "center",
    alignItems: "center",
  },
});
