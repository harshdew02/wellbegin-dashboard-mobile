import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  BackHandler
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import Back from "../components/Back";
import {
  Happy,
  Surprised,
  Sad,
  Disgust,
  Fear,
  Angry,
} from "../components/moods/";
import {
  Work,
  Health,
  Friendship,
  Finance,
  Love,
  Personal,
  Family,
  Leisure,
} from "../components/spheres/";
import { ArrowRightIcon } from "react-native-heroicons/solid";
import BottomQuote from "../../assets/images/BottomQuote.svg";
import axios from "axios";
import { useAuth } from "../utils/auth";

const showToast = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

const HappyFeeling = [
  {
    value: "Content",
  },
  {
    value: "Trusting",
  },
  {
    value: "Pleased",
  },
  {
    value: "Joyful",
  },
  {
    value: "Valued",
  },
  {
    value: "Thankful",
  },
  {
    value: "Inspired",
  },
  {
    value: "Proud",
  },
  {
    value: "Accepted",
  },
  {
    value: "Aroused",
  },
  {
    value: "Optimistic",
  },
  {
    value: "Powerful",
  },
  {
    value: "Free",
  },
  {
    value: "Curious",
  },
  {
    value: "Successful",
  },
  {
    value: "Respected",
  },
  {
    value: "Courageous",
  },
  {
    value: "Sensitive",
  },
  {
    value: "Energetic",
  },
  {
    value: "Creative",
  },
  {
    value: "Intimate",
  },
  {
    value: "Loving",
  },
  {
    value: "Hopeful",
  },
  {
    value: "Euphoric",
  },
  {
    value: "Relaxed",
  },
  {
    value: "Amused",
  },
  {
    value: "Intrigued",
  },
];
const SurprisedFeeling = [
  { value: "Startled" },
  { value: "Shocked" },
  { value: "Flabbergasted" },
  { value: "Awe" },
  { value: "Excited" },
  { value: "Dismayed" },
  { value: "Astonished" },
  { value: "Eager" },
];
const SadFeeling = [
  { value: "Hurt" },
  { value: "Vulnerable" },
  { value: "Depressed" },
  { value: "Lonely" },
  { value: "Guilty" },
  { value: "Isolated" },
  { value: "Fragile" },
  { value: "Victimized" },
  { value: "Abandoned" },
  { value: "Despair" },
  { value: "Grief" },
  { value: "Empty" },
  { value: "Powerless" },
  { value: "Ashamed" },
  { value: "Remorseful" },
];
const DisgustFeeling = [
  { value: "Disappointed" },
  { value: "Disapprove" },
  { value: "Awful" },
  { value: "Tense" },
  { value: "Repelled" },
  { value: "Judgmental" },
  { value: "Embarrassed" },
  { value: "Nauseated" },
  { value: "Offended" },
  { value: "Grossed Out" },
  { value: "Revolted" },
  { value: "Hesitant" },
  { value: "Horrified" },
  { value: "Dismissed" },
  { value: "Outraged" },
  { value: "Bothered" },
];
const FearFeeling = [
  { value: "Scared" },
  { value: "Rejected" },
  { value: "Worried" },
  { value: "Anxious" },
  { value: "Threatened" },
  { value: "Weak" },
  { value: "Insecure" },
  { value: "Afraid" },
  { value: "Helpless" },
  { value: "Inferior" },
  { value: "Worthless" },
  { value: "Insignificant" },
  { value: "Excluded" },
  { value: "Nervous" },
  { value: "Skeptical" },
];
const AngryFeeling = [
  { value: "Let Down" },
  { value: "Aggressive" },
  { value: "Resentful" },
  { value: "Critical" },
  { value: "Humiliated" },
  { value: "Frustrated" },
  { value: "Mad" },
  { value: "Distant" },
  { value: "Disrespected" },
  { value: "Violated" },
  { value: "Bitter" },
  { value: "Betrayed" },
  { value: "Furious" },
  { value: "Hostile" },
  { value: "Annoyed" },
  { value: "Withdrawn" },
  { value: "Numb" },
];
const components = [
  Work,
  Health,
  Friendship,
  Finance,
  Love,
  Personal,
  Family,
  Leisure,
];
const component = [
  "Work",
  "Health",
  "Friendship",
  "Finance",
  "Love",
  "Personal",
  "Family",
  "Leisure",
];

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};


let mood_array = [];

const Moods = (props) => {
  const [clicked, setclick] = useState(false);
  const [select, setSelect] = useState(props.props.select);

  if (props.props.select != select && clicked == true) {
    setclick(false);
  }

  const passDataToParent = (data) => {
    // Call the function passed from the parent component
    props.onDataReceived(data);
  };
  return (
    <TouchableOpacity
      // className="items-center"
      onPress={() => {
        setSelect(props.props.select);
        if (mood_array.length < 3) {
          passDataToParent({ feeling: props.props.item.value, push: !clicked });
          setclick(!clicked);
          //   setPair({index : })
        }
        if (clicked) {
          passDataToParent({ feeling: props.props.item.value, push: !clicked });
          setclick(!clicked);
        }
      }}
      style={{
        backgroundColor: clicked ? "#01818c" : "#f2f3f4",
        borderRadius: wp(8),
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: wp(2.5),
        paddingVertical: wp(2),
        marginVertical: hp(0.8),
        marginHorizontal: wp(0.4)
      }}
    >
      <Text
        style={{
          fontSize: wp(3.5),
          fontWeight: "500",
          color: clicked ? "#fff" : "#455A64",
        }}
      >
        {props.props.item.value}
      </Text>
    </TouchableOpacity>
  );
};

const MoodTracker = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { setHomes, connect, userDetails, trackM, exceptionReporting} = useAuth();

  const payload = userDetails();
  const extraPayloadandLaunch = (
    mood,
    emotion1,
    emotion2,
    emotion3,
    notes = "",
    sphere
  ) => {
    (payload.submit_ts = getCurrentDate()),
      (payload.client_name = props.route.params.usr_fullname);
    (payload.mood = mood),
      (payload.emotion1 = emotion1 == (undefined || null) ? "" : emotion1);
    payload.emotion2 = emotion2 == (undefined || null) ? "" : emotion2;
    payload.emotion3 = emotion3 == (undefined || null) ? "" : emotion3;
    payload.notes = notes;
    payload.sphere = sphere;

    if (mood_array.length == 0) showToast("Please select atleast one feeling.");
    else if (sphere == undefined || sphere == null) showToast("Please select your sphere of life.")
    else if (mood == undefined || mood == null) showToast("Please select mood.")
    else if(!connect()) {}
    else {
      setLoading(true)
      saveMood(payload)
      // payload.successful = true;
    }
  };

  const saveMood = (payload) => {
    const url = "https://n8n.heartitout.in/webhook/api/moodtracker-submit";
    axios
      .post(url, payload)
      .then((res) => {
        if (res.data.status === "1") {
          if (res.data.success === "true") showToast("Mood Recorded");
          else showToast("Mood already recorded");
          setHomes('moodset')
          trackM("Navigated - Moodtracker",{phone: userDetails().phone, event: "Mood record"})
          navigation.navigate("main", { mood_set: true })
        } else {
          showToast("Some error occurred.");
        }
      })
      .catch((err) => {
        exceptionReporting({err})
        showToast("Some error occurred.");
        console.log(err);
      }).finally(()=>{
        setLoading(false);
      });
  };

  const [select, setSelect] = useState(0);
  const [data, setData] = useState(HappyFeeling);
  const [mood, setMood] = useState("Happy");
  const [value, setvalue] = useState(-1);
  const handleDataFromChild = (data) => {
    // Do something with the received data, such as updating state
    if (data.push) mood_array.push(data.feeling);
    else {
      const indexToRemove = mood_array.indexOf(data.feeling);
      if (indexToRemove !== -1) {
        mood_array = mood_array
          .slice(0, indexToRemove)
          .concat(mood_array.slice(indexToRemove + 1));
      }
    }
    console.log("It is from tracker: ", mood_array, mood_array.length);
  };

  const backHandler = () => {
    navigation.goBack();
    return true;
  };

  navigation.addListener("focus", () => {
    BackHandler.addEventListener("hardwareBackPress", backHandler);
  });

  navigation.addListener("blur", () => {
    BackHandler.removeEventListener("hardwareBackPress", backHandler);
  });

  useEffect(() => {
    trackM("Navigated - Mood tracker",{phone: userDetails().phone})
    mood_array = [];
  }, [select]);

  const [text, onChangeText] = React.useState('');

  return (
    <KeyboardAvoidingView
    behavior="padding"
    keyboardVerticalOffset={-260}
    style={{ flex: 1 }}
    >
      {loading ? (<View style={{ height: hp(80), width: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex:5}} >
        <ActivityIndicator color="#01818C" animating={loading} size={wp(14)} />
      </View>) : (<></>)}
      <View
        style={[
          styles.cardContainer,
          { height: hp(20), backgroundColor: "#F7FBFD" },
        ]}
      >
        <View
          className=" justify-center items-center"
          style={{ marginTop: hp(1.8) }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ position: "absolute", left: 0 }}
          >
            <Back color={"#043953"} />
          </TouchableOpacity>
          <Text
            style={{ color: "#455a64", fontSize: wp(4.2), fontWeight: "700" }}
          >
            Update Your Mood Tracker
          </Text>
        </View>

        <View
          className="flex-row justify-between "
          style={{ width: "100%", marginTop: hp(3) }}
        >
          <View className="items-center">
            <TouchableOpacity
              onPress={() => {
                setSelect(1);
                setData(HappyFeeling);
                setMood("Happy");
              }}
            >
              <Happy isSelect={select} />
            </TouchableOpacity>
            <Text
              style={{ fontSize: wp(3), color: "#455a64", marginTop: hp(1) }}
            >
              Happy
            </Text>
          </View>
          <View className="items-center">
            <TouchableOpacity
              onPress={() => {
                setSelect(2);
                setData(SurprisedFeeling);
                setMood("Surprised");
              }}
            >
              <Surprised isSelect={select} />
            </TouchableOpacity>
            <Text
              style={{ fontSize: wp(3), color: "#455a64", marginTop: hp(1) }}
            >
              Surprised
            </Text>
          </View>
          <View className="items-center">
            <TouchableOpacity
              onPress={() => {
                setSelect(3);
                setData(SadFeeling);
                setMood("Sad");
              }}
            >
              <Sad isSelect={select} />
            </TouchableOpacity>
            <Text
              style={{ fontSize: wp(3), color: "#455a64", marginTop: hp(1) }}
            >
              Sad
            </Text>
          </View>
          <View className="items-center">
            <TouchableOpacity
              onPress={() => {
                setSelect(4);
                setData(DisgustFeeling);
                setMood("Disgust");
              }}
            >
              <Disgust isSelect={select} />
            </TouchableOpacity>
            <Text
              style={{ fontSize: wp(3), color: "#455a64", marginTop: hp(1) }}
            >
              Disgust
            </Text>
          </View>
          <View className="items-center">
            <TouchableOpacity
              onPress={() => {
                setSelect(5);
                setData(FearFeeling);
                setMood("Fear");
              }}
            >
              <Fear isSelect={select} />
            </TouchableOpacity>
            <Text
              style={{ fontSize: wp(3), color: "#455a64", marginTop: hp(1) }}
            >
              Fear
            </Text>
          </View>
          <View className="items-center">
            <TouchableOpacity
              onPress={() => {
                setSelect(6);
                setData(AngryFeeling);
                setMood("Anger");
              }}
            >
              <Angry isSelect={select} />
            </TouchableOpacity>
            <Text
              style={{ fontSize: wp(3), color: "#455a64", marginTop: hp(1) }}
            >
              Angry
            </Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{
        display: "flex-1",
        flexDirection: "col",
        alignItems: "center",
      }} keyboardShouldPersistTaps='always' style={{ width: wp(100) }}>

        {(select == 0) ?
          <>
            <Text style={{ width: wp(85), textAlign: 'center', marginTop: hp(3.4), fontSize: wp(3.7), color: '#455A64' }} >
              📊 Understanding your moods helps you manage them and feel better faster. 😊🌟
            </Text>
            <View
              className="flex-row items-center"
              style={[
                {
                  width: wp(100),
                  paddingHorizontal: wp(8),
                  height: hp(20),
                  marginTop: hp(52),
                  backgroundColor: "#EBEFF2CC",
                },
              ]}
            >
              <BottomQuote width={wp(71)} height={hp(15)} />
            </View>
          </>
          :
          <>
            <Text
              style={{
                width: wp(100),
                textAlign: "center",
                color: "#455a64",
                fontSize: wp(4),
                fontWeight: "500",
                marginTop: hp(1.5),
              }}
            >
              Choose Upto 3 Emotions You’re feeling
            </Text>

            <View
              style={[
                {
                  width: wp(100),
                  paddingHorizontal: wp(8),
                  marginTop: hp(1.5),
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-evenly",
                },
              ]}
            >
              {data.map((item, index) => (
                <Moods
                  key={index}
                  props={{ item, mood_array, index, select }}
                  onDataReceived={handleDataFromChild}
                />
              ))}
            </View>

            <Text
              style={{
                width: wp(100),
                textAlign: "center",
                color: "#455a64",
                fontSize: wp(4),
                fontWeight: "500",
                marginTop: hp(2),
              }}
            >
              Sphere of Life
            </Text>

            <View
              style={[
                styles.cardContainer,
                {
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  marginTop: hp(1.5),
                },
              ]}
            >
              {components.map((Component, index) => (
                <View className=" items-center " style={{ marginBottom: hp(4) }} key={index}>
                  <TouchableOpacity

                    onPress={() => {
                      index == value ? setvalue(-1) : setvalue(index);
                    }}
                    style={{
                      width: wp(18),
                      height: hp(7.3),
                      backgroundColor: value == index ? "#A4DEDF66" : "#455A640A",
                      borderRadius: wp(2.5),
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Component isClicked={value == index} />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: wp(3.5),
                      fontWeight: "normal",
                      color: "#455A64",
                      marginTop: hp(0.5),
                    }}
                  >
                    {Component.name}
                  </Text>
                </View>
              ))}
            </View>


            <Text
              style={{
                width: wp(100),
                textAlign: "center",
                color: "#455a64",
                fontSize: wp(4),
                fontWeight: "500",
              }}
            >
              What’s going on?
            </Text>

            {/* here need to add backend */}
            <TextInput
              editable
              multiline={true}
              maxLength={1000}
              textAlignVertical='top'
              value={text}
              onChangeText={text => onChangeText(text)}
              style={{
                marginTop: hp(2), borderWidth: wp(0.4), width: wp(84), height: hp(10), alignItems: 'flex-start', padding: wp(3), borderColor: '#96a1a7', borderRadius: wp(2), fontSize: wp(3.7), color: '#455A64',
              }}
              onSubmitEditing={() => {
                extraPayloadandLaunch(
                  mood,
                  mood_array[0],
                  mood_array[1],
                  mood_array[2],
                  text,
                  component[value]
                );
              }}
            />

            <View style={[{ marginTop: hp(1) }, styles.cardContainer]}>
              <TouchableOpacity
                className="flex-row "
                activeOpacity={0.4}
                style={styles.BookBtn}
                onPress={() => {
                  extraPayloadandLaunch(
                    mood,
                    mood_array[0],
                    mood_array[1],
                    mood_array[2],
                    text,
                    component[value]
                  );
                }}
              >
                <Text style={styles.btnText}>Next</Text>
                <ArrowRightIcon size={wp(6.5)} color="#fff" />
              </TouchableOpacity>
            </View>

            <View
              className="flex-row items-center"
              style={[
                {
                  width: wp(100),
                  paddingHorizontal: wp(8),
                  height: hp(20),
                  marginTop: hp(3),
                  backgroundColor: "#EBEFF2CC",
                },
              ]}
            >
              <BottomQuote width={wp(71)} height={hp(15)} />
            </View>
          </>
        }
        <View style={{ height: hp(20) }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MoodTracker;

const styles = StyleSheet.create({
  cardContainer: {
    width: wp(100),
    paddingHorizontal: wp(8),
    // height: hp(15.8),
    // marginTop: hp(4),
    // height: hp(20),
  },
  BookBtn: {
    marginTop: hp(2),
    width: wp(84),
    height: hp(6),
    backgroundColor: "#01818C",
    borderRadius: wp(6),
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: wp(5),
    fontFamily: "Roboto",
    marginRight: wp(2),
    fontWeight: "600",
  },
});
