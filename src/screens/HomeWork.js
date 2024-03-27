import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
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
import Pending from "../components/HomeComp/Pending";
import Done from "../components/HomeComp/Done";
import axios from "axios";
import PTRView from "react-native-pull-to-refresh";


const DateTimeComponent = (rdate) => {
  const dateTimeString = rdate;
  const dateTime = new Date(dateTimeString);

  // Extracting date in DD/MM/YYYY format
  const formattedDate = `${dateTime.getDate().toString().padStart(2, "0")}/${(
    dateTime.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${dateTime.getFullYear().toString().slice(-2)}`;
  return formattedDate;
};

const Card = (props) => {
  // console.log(props.props.item);
  const data = props.props.data;
  data.id = props.props.item.id;
  const item = props.props.item;
  const [value, setValue] = useState(item.homework_done_or_not);
  const [date, setDate] = useState(DateTimeComponent(item.due));
  const [updated, setUpdated] = useState(false);
  const navigation = useNavigation()

  React.useEffect(() => {
    if (item.homework_done_or_not === "Yes" || updated == true) setValue(true);
    else setValue(false);
  }, [updated]);

  const homework = () => {
    const url = "https://n8n.heartitout.in/webhook/api/update-homework-status";
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "1") setUpdated(true);
        else if (res.data.status === "10") setUpdated(false);
      })
      .catch((err) => {
        console.log("error is here:", err);
      });
  };
  return (
    <View
      style={{
        width: wp(87),
        height: hp(11),
        marginTop: hp(2.4),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ position: "absolute", left: 0, zIndex: 10 }}>
        {value ? <Done /> : <Pending />}
      </View>
      <View
        style={[
          styles.cardStyle,
          {
            backgroundColor: value ? "#f2f8f9" : "#fffbf1",
            borderColor: value ? theme.maincolor : theme.grey,
          },
        ]}
      >
        <View style={{ height: "100%", justifyContent: "space-between" }}>
          <Text
            style={{
              color: theme.grey,
              fontSize: wp(4.3),
              fontFamily: "Roboto",
              fontWeight: "bold",
            }}
          >
            {item.homework}
          </Text>
          <Text
            style={{
              color: theme.grey,
              fontSize: wp(4.3),
              fontFamily: "Roboto",
              fontWeight: "500",
            }}
          >
            {value ? `${item.stage.charAt(0).toUpperCase() + item.stage.slice(1)}` : `Due by ${date}`}
          </Text>
        </View>
        <View className="items-center">
          {value ? (
            <>
              <Text
                style={{
                  color: theme.grey,
                  fontSize: wp(4.3),
                  fontFamily: "Roboto",
                  fontWeight: "900",
                }}
              >
                Finished
              </Text>
              <Text
                style={{
                  color: theme.grey,
                  fontSize: wp(3.7),
                  fontFamily: "Roboto",
                  fontWeight: "normal",
                }}
              >
                {date}
              </Text>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => {
                homework();
                navigation.navigate('webview',item.stage)
              }}
            >
              <Text
                style={{
                  color: theme.maincolor,
                  fontSize: wp(4.3),
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                }}
              >
                Start
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const HomeWork = (route) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const data = route.route.params;
  const [datas, setData] = useState({});

  navigation.addListener('focus',()=>{
    setLoading(true)
  })
  React.useEffect(() => {
    const url = "https://n8n.heartitout.in/webhook/api/fetch-user-homework";
    if(loading){
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("error is here:", err);
      }).finally(()=>{
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
      clearInterval(idleTimer);
    } else {
      clearInterval(idleTimer);
      setIdleTimer(
        setInterval(() => {
          setLoading(true);
        }, 90000)
      );
    }

    setTimer(false);
  }, [timer]);


  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
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
            color: theme.black,
            fontSize: wp(5.5),
            fontFamily: "Roboto",
            fontWeight: "bold",
          }}
        >
          My Tasks
        </Text>
      </View>

      <PTRView
        onTouchStart={()=>{setTimer(true);}}
        onRefresh={handleRefresh}
        contentContainerStyle={{
          display: "flex-1",
          flexDirection: "col",
          alignItems: "center",
        }}
        style={{ width: wp(100), height: hp(92) }}
      >
        {loading ? (
          <View style={{ height: hp(60), width: '100%', justifyContent: 'center', alignItems: 'center' }} >
            <ActivityIndicator color="#01818C" animating={loading} size={wp(10)} />
          </View>
        ) : (
          <>
            {datas.has_hw === "yes" ? (
              <>
                {datas.hw_data.map((item, index) => (
                  <Card props={{ item, data }} key={index} />
                ))}
              </>
            ) : (
              <><Text style={{ marginTop: hp(30), fontSize:wp(5), color:theme.black }}>Yay! You are all set!</Text></>
            )}
          </>
        )}
      </PTRView>
      <View
        style={{ position: "absolute", bottom: 0, backgroundColor: "#fff" }}
      >
        <BottomQuote />
      </View>
    </SafeAreaView>
  );
};

export default HomeWork;

const styles = StyleSheet.create({
  cardContainer: {
    width: wp(100),
    paddingHorizontal: wp(8),
  },

  cardStyle: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: wp(7.4),
    paddingLeft: wp(10.6),
    paddingVertical: hp(2.2),
    width: wp(84),
    height: hp(11),
    position: "absolute",
    left: wp(3),
    borderRadius: wp(4),
    borderWidth: wp(0.4),
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
