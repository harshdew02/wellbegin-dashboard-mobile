import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, ActivityIndicator, BackHandler } from "react-native";
// import WebView from "react-native-webview";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import WebView from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
let canGoBack = false;
const showToast = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};
export default function Heartitout() {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  //   const [canGoBack, setCanGoBack] = useState(false);

  const onNavigationStateChange = (navState) => {
    console.log("It is from nav change:", canGoBack, navState.url);
    canGoBack = navState.canGoBack;
    if (
      navState.url === "https://heartitout.in/services/order-summary" ||
      navState.url === "https://heartitout.in/services/order-summary/"
    ) {
        showToast("Order, placed successfully")
        navigation.navigate('Home_Tab')
    }
  };
  //   const [goBack, setGoBack] = useState(false);
  const webViewRef = useRef(null);
  const backHandler = () => {
    console.log("It is can go back", canGoBack);
    if (canGoBack) goBack();
    else navigation.navigate("Home_Tab");
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
            position:'absolute',
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
        useWebView2={true}
        ref={webViewRef}
        source={{ uri: "https://heartitout.in/therapists" }} // Change the URL to test
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
