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
  BackHandler,
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
import { InAppBrowser } from 'react-native-inappbrowser-reborn'

import SeekIcon from "../../assets/images/SeekIcon.svg";
import HappeningIcon from "../../assets/images/HappeningIcon.svg";
import ExploreIcon from "../../assets/images/ExploreIcon.svg";
import ProductsSvg from "../../assets/images/ProductsSvg.svg";
import Gradient from "../../assets/images/Gradient.svg";
import ReferIcon from "../../assets/images/ReferIcon.svg";
import BottomQuote from "../../assets/images/BottomQuote.svg";
import { WebView } from 'react-native-webview';

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

export default function DiscoverScreen(props) {
  const data = props.route.params.data.route.params;
  const navigation = useNavigation();
  const backHandler = () => {
    navigation.navigate('Home_Tab')
    return true;
  };

  navigation.addListener("focus", () => {
    BackHandler.addEventListener("hardwareBackPress", backHandler);
  });

  navigation.addListener("blur", () => {
    BackHandler.removeEventListener("hardwareBackPress", backHandler);
  });

  return (
    <SafeAreaView>
      {/* <MyWebComponent /> */}
      
      {/* <TopBarMain /> */}
      <ScrollView style={{ backgroundColor: "#fff", height: hp(100) }}>
        <Text
          style={{
            marginTop: hp(4),
            marginLeft: wp(8),
            color: "#043953",
            fontSize: wp(5),
            fontFamily: "Roboto",
            fontWeight: "700",
          }}
        >
          Discover Our Offerings Here 😍
        </Text>

        <View style={[styles.cardContainer, { marginTop: hp(2) }]}>
          <View
            className="flex-row justify-between "
            style={{ height: hp(25) }}
          >
            <TouchableOpacity
             onPress={() => {
                // Checking if the link is supported for links with custom URL scheme.
                // outLink('https://heartitout.in/therapists/')
                navigation.navigate('webview')
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
                outLink('https://heartitout.in/events/')
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

              onPress={()=>{ navigation.navigate('test', data) }}

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
                outLink('https://heartitout.in/products/')
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

        {/* <TouchableOpacity style={[styles.cardContainer, { height: hp(16) }]}
        onPress={() => {
            // Checking if the link is supported for links with custom URL scheme.
            outLink('https://heartitout.in/nudge-a-friend/')
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
        </TouchableOpacity> */}

        <View
          className="flex-row items-center"
          style={[
            styles.cardContainer,
            { height: hp(20), marginTop: hp(8.75), backgroundColor: "#EBEFF2CC" },
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
