import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, ActivityIndicator, BackHandler, ToastAndroid, TouchableOpacity } from "react-native";
// import WebView from "react-native-webview";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import WebView from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import Back from "../components/Back";
let canGoBack = false;
const showToast = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

function containsOrder(sentence) {
  return sentence.includes('order-summary') || sentence.includes('order-received');
}

let current = 0;

export default function Heartitout(props) {
  console.log(props.route.params)
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  //   const [canGoBack, setCanGoBack] = useState(false);

  const onNavigationStateChange = (navState) => {
    console.log("It is from nav change:", canGoBack, navState.url);
    canGoBack = navState.canGoBack;
    if (containsOrder(navState.url) && (loading == false)) {
      showToast("Order, placed successfully");
      setTimeout(() => {
        navigation.navigate("Home_Tab");
      }, 30000);
    }
    else {
      console.log("Not hit yet")
    }
  };
  //   const [goBack, setGoBack] = useState(false);
  const webViewRef = useRef(null);
  const backHandler = () => {
    console.log("It is can go back", canGoBack);
    if (canGoBack) goBack();
    else navigation.goBack();
    return true;
  };

  navigation.addListener("focus", () => {
    BackHandler.addEventListener("hardwareBackPress", backHandler);
  });

  navigation.addListener("blur", () => {
    BackHandler.removeEventListener("hardwareBackPress", backHandler);
  });

  const goBack = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{
            height: hp(80),
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            position: 'absolute',
            zIndex: 2
          }}
        >
          <ActivityIndicator
            color="#01818C"
            animating={loading}
            size={wp(14)}
          />
        </View>
      ) : (
        <>
        </>
      )}
      <TouchableOpacity onPress={() => { navigation.goBack() }} activeOpacity={0.8} style={{
        width: wp(14), height: hp(6), backgroundColor: '#fff', position: 'absolute', zIndex: 2,
        left: 0, top: 12, justifyContent: 'center', alignItems: 'center',
        borderRadius:wp(10)
      }} >
        <Back color={"#455A64"} />
      </TouchableOpacity>
      <WebView
        onLoadStart={() => {
          setLoading(true);
        }}
        onLoad={() => {
          setLoading(false);
        }}
        onError={() => {
          setLoading(false);
        }}
        setSupportMultipleWindows={false}
        useWebView2={true}
        ref={webViewRef}
        source={{ uri: props.route.params }} // Change the URL to test
        style={styles.webview}
        onNavigationStateChange={onNavigationStateChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
