import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Back from "../../assets/images/arrow.svg";
import RingIcon from "../components/RingIcon";
import axios from "axios";
import { InAppBrowser } from "react-native-inappbrowser-reborn";
import PTRView from "react-native-pull-to-refresh";

const outLink = async (link) => {
  try {
    const url = link;
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
        toolbarColor: "#01818C",
        secondaryToolbarColor: "red",
        navigationBarColor: "white",
        navigationBarDividerColor: "white",
        enableUrlBarHiding: true,
        enableDefaultShare: false,
        forceCloseOnRedirection: false,
        hasBackButton: true,

        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: "slide_in_right",
        },
        headers: {
          "my-custom-header": "my custom header value",
        },
      });
      console.log(result);
    } else Linking.openURL(url);
  } catch (error) {
    console.log(error);
  }
};

const Card = (props) => {
  // console.log(props)
  const data = props.props.item;
  // console.log("It is from card: ", data)
  // Anuj ise props ke according set kar dena to fir ho jayega shyad
  const [isTick, setTick] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => { setTick(true); outLink(data.on_click) }}
      className="flex-row justify-between items-center"
      style={styles.container}
    >
      <View
        style={{
          height: "100%",
          backgroundColor: isTick ? '#455A64' : '#01818C',
          width: wp(1),
          position: "absolute",
          left: wp(2),
        }}
      ></View>
      <View
        className="flex-col justify-between"
        style={{ marginLeft: wp(6), marginRight: wp(1), width: wp(64) }}
      >
        <Text
          style={{
            color: isTick ? '#455A64' : '#01818C',
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

      <View
        className="flex-col items-center justify-between"
        style={{ height: hp(6), width: wp(18) }}
      >
        <Text style={{ fontSize: wp(3.2) }}>18 mins ago</Text>
        <RingIcon active={isTick} />
      </View>
    </TouchableOpacity>
  );
};

const Banners = (props) => {
  return (
    <Image
      resizeMode="stretch"
      style={{
        width: wp(100),
        height: wp(24.66),
        marginTop: hp(8)
      }}
      source={{ uri: 'https://heartitout.in/links/wp-content/uploads/2024/03/TryDoodling.png' }}
    />
  )
};

export default function ReminderScreen({ navigation, route }) {
  // console.log("It is from reminder screen: ", route.params)
  const [ifReminder, setIfReminder] = useState(false);
  const [datas, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [banner, setBanner] = useState(false);
  const [banLink, setBanLink] = useState("");
  const [cbanLink, setCBanLink] = useState("");

  useEffect(() => {
    const url = "https://n8n.heartitout.in/webhook/api/notifications";
    if(loading)
    {
    axios
      .post(url, route.params)
      .then((res) => {
        // console.log(res.data);
        if (res.data.has_notif === "yes") setIfReminder(true);
        else setIfReminder(false);
        if (res.data.has_banner === "yes") {
          setBanner(true);
          setBanLink(res.data.banner_link);
          setCBanLink(res.data.on_click);
        } else setBanner(false);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log("error is here:", err);
      }).finally(() => {
        setLoading(false);
      });
    }
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

  console.log(datas);

  return (
    <SafeAreaView>
      {/* <TopBarMain /> */}
      <PTRView onRefresh={handleRefresh} onTouchStart={()=>{setTimer(true); console.log("reset")}}>
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
        {/* loading */}
        {/* <ActivityIndicator animating={loading} size="large" style={{}} /> */}
        {loading ? (
          <View style={{ height: hp(80), width: '100%', justifyContent: 'center', alignItems: 'center' }} >
            <ActivityIndicator color="#01818C" animating={loading} size={wp(14)} />
          </View>
        ) : (
          <>
            <View
              className="flex-col items-center"
              style={{ marginTop: hp(2) }}
            >
              {ifReminder ? (
                <>
                  {datas.map((item, index) => (
                    <Card props={{ item }} key={index} />
                  ))}
                </>
              ) : (
                <View className="flex-col items-center">
                  <Image
                    className="mr-8"
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
                </View>
              )}
              {1 ? (
                <>
                  <Banners props={{ banLink, cbanLink }} />
                </>
              ) : (
                <></>
              )}
            </View>
          </>

        )}
        {/* this is for example for correct style --Anuj */}
        {/* <Banners /> */}
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
    // marginTop: hp(2),
    // padding: wp(1),
    // paddingVertical: wp(1),
    paddingRight: wp(3.2),
  },

  line: {},
});

//  bottom->stack->right
//  stack->right->bottom
