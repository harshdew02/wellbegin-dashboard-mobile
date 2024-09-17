import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Image
} from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import SeekIcon from "../../../assets/images/SeekIcon.svg";
import HappeningIcon from "../../../assets/images/HappeningIcon.svg";
import ExploreIcon from "../../../assets/images/ExploreIcon.svg";
import ProductsSvg from "../../../assets/images/ProductsSvg.svg";
import BottomQuote from "../../../assets/images/BottomQuote.svg";
import D1 from "../../../assets/images/Dis1.svg"
import D2 from "../../../assets/images/Dis2.svg"
import D3 from "../../../assets/images/Dis3.svg"
import D4 from "../../../assets/images/Dis4.svg"
import { useAuth } from "../../utils/auth";
import ReferIcon from "../../../assets/images/ReferIcon.svg"

export default function DiscoverScreen(props) {
  const data = props.route.params.data.route.params;
  const navigation = useNavigation();
  const {userDetails, trackM} = useAuth();
  const backHandler = () => {
    navigation.navigate('Home_Tab')
    return true;
  };

  navigation.addListener("focus", () => {
    trackM("Navigated - Discover",{phone: userDetails().phone})
    BackHandler.addEventListener("hardwareBackPress", backHandler);
  });

  navigation.addListener("blur", () => {
    BackHandler.removeEventListener("hardwareBackPress", backHandler);
  });

  return (
    <SafeAreaView>
      {/* <MyWebComponent /> */}

      {/* <TopBarMain /> */}
      <ScrollView
        contentContainerStyle={{
          display: "flex-1",
          flexDirection: "col",
          alignItems: "center",
        }}
        style={{ backgroundColor: "#fff", height: hp(100) }}>
        <Text
          style={{
            marginTop: hp(4),
            color: "#043953",
            fontSize: wp(5),
            fontFamily: "Roboto",
            fontWeight: "700",
          }}
        >Wellbeing Offerings For You 💛
        </Text>

        <View style={[styles.cardContainer, { marginTop: hp(2) }]}>
          <View
            className="flex-row justify-between "
            style={{ height: hp(25) }}
          >
            <TouchableOpacity
              onPress={() => { navigation.navigate('test', data) }}
              style={[
                { width: wp(39), overflow: 'hidden', borderRadius: wp(4) },
              ]}
            >
              <D1 width={wp(39.4)} height={wp(53.3)} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                { width: wp(39), overflow: 'hidden', borderRadius: wp(4) },
              ]}
              onPress={() => {
                trackM("Navigated - Discover",{phone: userDetails().phone, event: "Mindful event"})
                // Checking if the link is supported for links with custom URL scheme.
                navigation.navigate('webview', data.mindfull)
              }}
            >
              <D2 width={wp(39.4)} height={wp(53.3)} />
            </TouchableOpacity>
          </View>

          <View
            className="flex-row justify-between "
            style={{ height: hp(25), marginTop: hp(3) }}
          >
            <TouchableOpacity
              onPress={()=>{navigation.navigate('webview', data.holistic);
              trackM("Navigated - Discover",{phone: userDetails().phone, event:"Holistic Services"})}}
              style={[
                { width: wp(39), overflow: 'hidden', borderRadius: wp(4) },
              ]}
            >
              <D3 width={wp(39.4)} height={wp(53.3)} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                // styles.packageCard,
                { alignItems:'center' },
              ]}
              onPress={() => {
                // Checking if the link is supported for links with custom URL scheme.
                trackM("Navigated - Discover",{phone: userDetails().phone, event: "Selfcare tools"})
                navigation.navigate('webview', data.selfcare)
              }}
            >
              {/* <ProductsSvg width={wp(33)} height={hp(9)} /> */}
              <Image style={{position:'absolute', width:wp(33), height:wp(19.41), marginTop:hp(5)}} source={require("../../../assets/images/disimg.png")} />
              <D4 width={wp(39.4)} height={wp(53.3)} />
              {/* <Text
                style={[
                  styles.cardText,
                  { color: "#765A5A" },
                  {fontWeight:800},
                  {fontSize:wp(4)}
                ]}
              >
                Self-care Tools For Effective Healing
              </Text> */}
            </TouchableOpacity>
          </View>
        </View>

        {/* <TouchableOpacity style={[styles.cardContainer, { height: hp(16), marginTop: hp(3.5) }]}
          onPress={() => {
            navigation.navigate('webview', 'https://heartitout.in/nudge-a-friend/')
          }}
        >
          <ReferIcon width={wp(84)} height={wp(30.13)} />
        </TouchableOpacity> */}

        <View
          className="flex-row items-center"
          style={[
            styles.cardContainer,
            { height: hp(20), marginTop: hp(8.8), backgroundColor: "#EBEFF2CC" },
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
  gradient: {
    height: "100%",
    flex: 1,
    width: "100%",
  },

  linearGradient: {
    height: 150,
    width: 200,
    borderRadius: 20, // <-- Outer Border Radius
  },

  // Cards
  cardContainer: {
    width: wp(100),
    paddingHorizontal: wp(8),
  },

  cardText: {
    width: wp(35),
    textAlign: "center",
    fontSize: wp(3.5),
    fontFamily: "Roboto",
    fontWeight: "800",
    marginTop: hp(5)
  },

  // Feel Banne
  // Package

  packageCard: {
    width: wp(40),
    height: "100%",
    borderRadius: wp(4),
    paddingVertical: hp(4),
    paddingHorizontal: wp(2),
    // paddingTop: hp(4),
    // paddingLeft: wp(6),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
