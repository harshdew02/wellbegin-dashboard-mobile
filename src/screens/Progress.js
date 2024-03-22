import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    useWindowDimensions,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Back from "../components/Back";
import { theme } from "../theme";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { InAppBrowser } from "react-native-inappbrowser-reborn";
import { Angry, Happy, Sad, Fear, Surprised, Disgust } from "../components/moods";
import Share from "../../assets/images/share.svg";
import ProgressMen from "../../assets/images/progressMen.svg";
import BottomQuote from "../components/BottomQuote";

const Progress = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ backgroundColor: "#fff" }} >
            <View style={styles.HeadContainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={{ position: "absolute", left: wp(8) }}
                >
                    <Back color={"#455A64"} />
                </TouchableOpacity>

                <View className="flex-row items-center">
                    <Text style={styles.HeadText}>My Progress</Text>
                </View>
                <Share height={wp(10)} width={wp(10)} style={{ position: 'absolute', right: wp(8) }} />
            </View>

            <ScrollView contentContainerStyle={{
                display: "flex-1",
                flexDirection: "col",
                alignItems: "center",

            }}
                style={{ width: wp(100), marginTop: hp(1), height: hp(92), }} >

                <View style={{ width: wp(93), height: hp(12), backgroundColor: '#EAF7FC', marginTop: hp(2.4), borderRadius: wp(2.6), padding: wp(3.2), display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }} >
                    <ProgressMen width={wp(19.3)} height={wp(18.2)} />
                    <Text style={{
                        width: wp(65),
                        color: theme.black,
                        fontSize: wp(4),
                        fontWeight: "normal",
                    }} >
                        Your therapy progress is not linear. Going back and forth is part of the process of self-discovery.
                    </Text>
                </View>

                <Text style={{
                    width: wp(79),
                    color: theme.black,
                    fontSize: wp(3.8),
                    textAlign: 'center',
                    fontWeight: "500",
                    marginTop: hp(2)
                }} >
                    Tap on image to understand the current stage of your therapy
                </Text>

                <Image
                    style={{ width: wp(73.6), height: hp(68.7), marginTop: hp(0.5) }}
                    source={{ uri: 'https://heartitout.in/services/wp-content/uploads/2024/03/2-1-1.png' }}
                />

                <BottomQuote />
                <View style={{height:hp(2)}} />
            </ScrollView>
        </SafeAreaView >
    )
}

export default Progress

const styles = StyleSheet.create({
    HeadContainer: {
        height: hp(6),
        width: wp(100),
        justifyContent: "center",
        alignItems: "center",
        marginTop: hp(2),
        // backgroundColor: "#F5F5F5",
    },
    HeadText: {
        width: wp(50),
        color: theme.black,
        fontSize: wp(5.5),
        fontFamily: "Roboto",
        fontWeight: "700",
        textAlign: "center",
    },
})