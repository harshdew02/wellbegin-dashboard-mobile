import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
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

const DoneCard = (props) => {
  console.log(props.props);
  // const [date, setDate] = useState(DateTimeComponent(props.props.due));
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
        <Done />
      </View>
      <View
        style={[
          styles.cardStyle,
          { backgroundColor: "#f2f8f9", borderColor: theme.maincolor },
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
            {props.props.homework}
          </Text>
          <Text
            style={{
              color: theme.grey,
              fontSize: wp(4.3),
              fontFamily: "Roboto",
              fontWeight: "500",
            }}
          >
            During Session
          </Text>
        </View>
        <View className="items-center">
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
            {/* {date} */}
          </Text>
        </View>
      </View>
    </View>
  );
};

const PendingCard = (props) => {
  // console.log();
  const data = props.props.data;
  const [date, setDate] = useState(DateTimeComponent(props.props.item.due));
  const [status, setStatus] = useState("10");
  const homework = () => {
    // console.log(data);
    const url = "https://n8n.heartitout.in/webhook/api/update-homework-status";
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
        if(res.data.status === "1") 
        {
          setStatus("1")
          passDataToParent(true)
        }
        else if(res.data.status === "10") setStatus("10")
        // setData(res.data);
      })
      .catch((err) => {
        console.log("error is here:", err);
        // setLoading(false);
      });
  };

  const passDataToParent = (data) => {
    // Call the function passed from the parent component
    props.handleCard(data);
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
        <Pending />
      </View>
      <View
        style={[
          styles.cardStyle,
          { backgroundColor: "#fffbf1", borderColor: theme.grey },
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
            {props.props.item.homework}
          </Text>
          <Text
            style={{
              color: theme.grey,
              fontSize: wp(4.3),
              fontFamily: "Roboto",
              fontWeight: "normal",
            }}
          >
            Due by {date}
          </Text>
        </View>
        <TouchableOpacity onPress={()=>{homework()}}>
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
      </View>
    </View>
  );
};

const HomeWork = (route) => {
  const navigation = useNavigation();
  // console.log(route.route.params)
  const data = {
    token: "o1hTU9pb8xIwE3T/Ho6bxujmFtjKLJtxAlBcZYwCGPc=",
    phone: "9330396039",
    code: "91",
    otp: "2953",
    date: "2024-02-16",
  };
  const [isHomework, setIsHomework] = useState(false);
  const [datas, setData] = useState({});
  React.useEffect(() => {
    // console.log(data);
    const url = "https://n8n.heartitout.in/webhook/api/fetch-user-homework";
    axios
      .post(url, data)
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("error is here:", err);
        setLoading(false);
      });
  }, []);
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
          My Wellbeing Tests
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          display: "flex-1",
          flexDirection: "col",
          alignItems: "center",
        }}
        style={{ width: wp(100), height: hp(92) }}
      >
        {datas.has_hw === "yes" ? (
          <>
            {/* {datas.hw_data.map((item, index) =>
              !item.homework_done_or_not === "Yes" ? (
                <DoneCard key={index} props={item} />
              ) : (
                <PendingCard key={index} props={{ item, data }} />
              )
            )} */}
            <DoneCard />
            
          </>
        ) : (
          <></>
        )}
      </ScrollView>
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
