import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Button,
  TextComponent,
} from "react-native";
import React from "react";
import TopBarMain from "../components/TopBarMain";
import { ScrollView } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
// import LinearGradient from 'react-native-linear-gradient';
// import { LinearGradient } from "expo-linear-gradient";

import SeekIcon from "../../assets/images/SeekIcon.svg";
import HappeningIcon from "../../assets/images/HappeningIcon.svg";
import ExploreIcon from "../../assets/images/ExploreIcon.svg";
import ProductsSvg from "../../assets/images/ProductsSvg.svg";
import Gradient from "../../assets/images/Gradient.svg";
import ReferIcon from "../../assets/images/ReferIcon.svg";
import BottomQuote from "../../assets/images/BottomQuote.svg";


export default function DiscoverScreen() {
  return (
    <SafeAreaView>
      <TopBarMain />
      <ScrollView style={{ backgroundColor: "#fff", height: hp(100) }}>
        <Text
          style={{
            marginTop: hp(11.5),
            marginLeft: wp(8),
            color: "#043953",
            fontSize: wp(5),
            fontFamily: "Roboto",
            fontWeight: "700",
          }}
        >
          Discover Our Offerings Here 😍
        </Text>

        <View style={[styles.cardContiner, { marginTop: hp(2) }]}>
          <View
            className="flex-row justify-between "
            style={{ height: hp(25) }}
          >
            <TouchableOpacity
             onPress={() => {
                // Checking if the link is supported for links with custom URL scheme.
                Linking.canOpenURL('https://heartitout.in/therapists/').then((supported)=>{
                    if(supported) Linking.openURL('https://heartitout.in/therapists/'); else console.log('error')
                });
              }}
              style={[
                styles.packageCard,
                { width: wp(39), backgroundColor: "rgba(210, 184, 157, 0.15)" },
              ]}
            >
              <SeekIcon width={wp(25)} height={hp(10)} />
              <Text style={[styles.cardText, { color: "#4D4C4C" }]}>
                Seek Advanced Care
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.packageCard,
                { width: wp(39), backgroundColor: "#EAF7FC" },
              ]}
              onPress={() => {
                // Checking if the link is supported for links with custom URL scheme.
                Linking.canOpenURL('https://heartitout.in/events/').then((supported)=>{
                    if(supported) Linking.openURL('https://heartitout.in/events/'); else console.log('error')
                });
              }}
            >
              <HappeningIcon width={wp(20)} height={hp(12)} />
              <Text style={[styles.cardText, { color: "#036696" }]}>
                Happening Events
              </Text>
            </TouchableOpacity>
          </View>

          <View
            className="flex-row justify-between "
            style={{ height: hp(25), marginTop: hp(3) }}
          >
            <TouchableOpacity
              style={[
                styles.packageCard,
                { width: wp(39), backgroundColor: "rgba(4, 84, 123, 0.08)" },
              ]}
            >
              <ExploreIcon width={wp(20)} height={hp(11)} />
              <Text style={[styles.cardText, { color: "#455A64" }]}>
                Explore Diagnostics
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.packageCard,
                { width: wp(39), backgroundColor: "rgba(247, 207, 106, 0.20)" },
              ]}
              onPress={() => {
                // Checking if the link is supported for links with custom URL scheme.
                Linking.canOpenURL('https://heartitout.in/products/').then((supported)=>{
                    if(supported) Linking.openURL('https://heartitout.in/products/'); else console.log('error')
                });
              }}
            >
              <ProductsSvg width={wp(33)} height={hp(9)} />
              <Text
                style={[
                  styles.cardText,
                  { marginBottom: hp(2), color: "#765A5A" },
                ]}
              >
                New Products
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={[styles.cardContiner, { height: hp(16) }]}
        onPress={() => {
            // Checking if the link is supported for links with custom URL scheme.
            Linking.canOpenURL('https://heartitout.in/nudge-a-friend/').then((supported)=>{
                if(supported) Linking.openURL('https://heartitout.in/nudge-a-friend/'); else console.log('error')
            });
          }}
        >
          <Gradient width={"100%"} height={"100%"} />
          <View
            className="flex-row items-center justify-between"
            style={{
              position: "absolute",
              zIndex: 1,
              width: "100%",
              height: "100%",
              left: wp(8),
              right: wp(8),
              paddingHorizontal: wp(12),
            }}
          >
            <Text style={[styles.cardText, { color: "white" }]}>
              Refer & Earn Rewards
            </Text>
            <ReferIcon width={wp(11)} height={hp(7)} />
          </View>
        </TouchableOpacity>

        <View
          className="flex-row items-center"
          style={[
            styles.cardContiner,
            { height: hp(20), marginTop: hp(3), backgroundColor: "#EBEFF2CC" },
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
  cardContiner: {
    width: wp(100),
    paddingHorizontal: wp(8),
  },

  cardText: {
    textAlign: "center",
    fontSize: wp(4),
    fontFamily: "Roboto",
    fontWeight: "800",
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
