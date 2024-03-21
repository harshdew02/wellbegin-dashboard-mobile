import { StyleSheet, Text, View, ScrollView, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Back from '../components/Back';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import LeftGo from '../components/moods/LeftGo';
import RightGo from '../components/moods/RightGo';
import HeartBook from '../components/moods/HeartBook';
import RightNav from '../components/moods/RightNav';
import Cross from '../components/moods/Cross';
import Tick from '../components/moods/Tick';
import Cup from "../../assets/images/cup.svg";
import { Happy, Surprised, Sad, Disgust, Fear, Angry } from '../components/moods/';

const Space = () => {
    return (
        <View style={{ width: wp(8), height: wp(8) }} >
        </View>
    )
}

function setP(a, b, c, d, e, f) {
    setp1(a * 0.75);
    setp2(b * 0.75);
    setp3(c * 0.75);
    setp4(d * 0.75);
    serp5(e * 0.75);
    setp6(f * 0.75);
}



const MoodInsights = () => {
    const navigation = useNavigation();
    const [p1, setp1] = useState(0);
    const [p2, setp2] = useState(20 * 0.75);
    const [p3, setp3] = useState(30 * 0.75);
    const [p4, setp4] = useState(40 * 0.75);
    const [p5, setp5] = useState(0);
    const [p6, setp6] = useState(10 * 0.75);
    const [select, setSelect] = useState(1);
    return (
        <SafeAreaView style={{ backgroundColor: '#F5F5F5', }} >
            <View style={styles.HeadContainer}>
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                    style={{ position: "absolute", left: wp(8) }}
                >
                    <Back color={'#455A64'} />
                </TouchableOpacity>

                <View className="flex-row items-center" >
                    <TouchableOpacity><LeftGo /></TouchableOpacity>
                    <Text style={styles.HeadText}>
                        September 2023
                    </Text>
                    <TouchableOpacity><RightGo /></TouchableOpacity>
                </View>
            </View>


            <ScrollView contentContainerStyle={{ display: 'flex-1', flexDirection: 'col', alignItems: 'center' }} style={{ width: wp(100), height: hp(92) }} >

                <View style={styles.NavCard}>
                    <HeartBook />
                    <View className="flex-col justify-between" style={{ height: hp(5.6) }} >
                        <Text style={{
                            width: wp(61),
                            color: theme.black,
                            fontSize: wp(4),
                            fontWeight: '500',
                        }} >
                            View mood logs for the month
                        </Text>
                        <Text style={{
                            width: wp(61),
                            color: theme.black,
                            fontSize: wp(3.5),
                        }} >
                            Unlock self-awareness & well-being
                        </Text>
                    </View>
                    <RightNav />
                </View>

                <View style={{ width: wp(84), height: hp(20), backgroundColor: '#fefcf7', marginTop: hp(2.3), paddingVertical: hp(1.6), alignItems: 'center', borderRadius: wp(5.3) }} >

                    <Text style={{
                        width: wp(61),
                        color: theme.black,
                        fontSize: wp(4),
                        fontWeight: '500',
                    }}>
                        Consecutive Recording Days
                    </Text>

                    <View style={{ width: '100%', height: wp(8), alignItems: 'center', justifyContent: 'center', marginTop: hp(0.9) }} >
                        <View style={{ position: 'absolute', height: hp(0.2), width: '100%', backgroundColor: '#a1abad', zIndex: -1 }} />
                        <View style={{ display: 'flex', flexDirection: 'row', width: wp(75), justifyContent: 'space-around' }}>
                            <View><Tick /></View>
                            <View><Cross /></View>
                            <View><Tick /></View>
                            <View><Cross /></View>
                            <Space />
                            <View><Cross /></View>
                            <View><Cross /></View>
                        </View>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', width: wp(75), justifyContent: 'space-around', marginTop: hp(0.6) }}>
                        <Text style={{ width: wp(8), textAlign: 'center', color: theme.black, fontSize: wp(3.5) }}>Tue</Text>
                        <Text style={{ width: wp(8), textAlign: 'center', color: theme.black, fontSize: wp(3.5) }}>Mon</Text>
                        <Text style={{ width: wp(8), textAlign: 'center', color: theme.black, fontSize: wp(3.5) }}>Wed</Text>
                        <Text style={{ width: wp(8), textAlign: 'center', color: theme.black, fontSize: wp(3.5) }}>Thu</Text>
                        <Text style={{ width: wp(8), textAlign: 'center', color: theme.black, fontSize: wp(3.5) }}>Fri</Text>
                        <Text style={{ width: wp(8), textAlign: 'center', color: theme.black, fontSize: wp(3.5) }}>Sat</Text>
                        <Text style={{ width: wp(8), textAlign: 'center', color: theme.black, fontSize: wp(3.5) }}>Sun</Text>
                    </View>

                    <View style={{ height: hp(0.2), width: wp(75), backgroundColor: theme.black, marginTop: hp(2) }} />

                    <View style={{ display: 'flex', flexDirection: 'row', width: wp(75), justifyContent: 'flex-start', marginTop: hp(2) }}>
                        <View style={{ width: wp(36), display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} ><Cup Home2 width={wp(3.6)} height={wp(4.2)} />
                            <Text style={{
                                color: theme.black,
                                fontSize: wp(3.5),
                            }}>
                                Longest Chain : 3
                            </Text></View>
                    </View>
                </View>

                <View style={{ width: wp(84), height: hp(20), backgroundColor: '#f7fbfd', borderRadius: wp(4), marginTop: hp(2.5), alignItems: 'center', paddingVertical: hp(2.4) }} >
                    <Text style={{
                        color: theme.black,
                        fontSize: wp(4),
                        fontWeight: '500',
                    }}>Average Daily Mood</Text>

                    <View style={{ height: hp(3.8), display: 'flex', flexDirection: 'row', width: wp(75), justifyContent: 'space-around', marginTop: hp(0.6), borderRadius: wp(5), overflow: 'hidden' }}>
                        <View style={{ height: '100%', backgroundColor: '#fddf7a', width: wp(p1) }} />
                        <View style={{ height: '100%', backgroundColor: '#d2e7f2', width: wp(p2) }} />
                        <View style={{ height: '100%', backgroundColor: '#aed5e8', width: wp(p3) }} />
                        <View style={{ height: '100%', backgroundColor: '#dce3e6', width: wp(p4) }} />
                        <View style={{ height: '100%', backgroundColor: '#f0d3ca', width: wp(p5) }} />
                        <View style={{ height: '100%', backgroundColor: '#01818c', width: wp(p6) }} />
                    </View>

                    <View style={{ height: hp(3.8), display: 'flex', flexDirection: 'row', width: wp(75), justifyContent: 'space-around', marginTop: hp(2), borderRadius: wp(5), overflow: 'hidden' }} >
                        <View className="items-center" >

                            <Happy h={7.4} w={7.4} isSelect={select} />

                            <Text style={{ fontSize: wp(3), backgroundColor:'red', color: '#455a64', marginTop: hp(1) }} >
                                100%
                            </Text>
                        </View>
                        <View className="items-center" >

                            <Surprised h={7.4} w={7.4} isSelect={select} />

                            <Text style={{ fontSize: wp(3), color: '#455a64', marginTop: hp(1) }} >
                                100%
                            </Text>
                        </View>
                        <View className="items-center" >

                            <Sad h={7.4} w={7.4} isSelect={select} />

                            <Text style={{ fontSize: wp(3), color: '#455a64', marginTop: hp(1) }} >
                                100%
                            </Text>
                        </View>
                        <View className="items-center" >

                            <Disgust h={7.4} w={7.4} isSelect={select} />

                            <Text style={{ fontSize: wp(3), color: '#455a64', marginTop: hp(1) }} >
                                100%
                            </Text>
                        </View>
                        <View className="items-center" >

                            <Fear h={7.4} w={7.4} isSelect={select} />

                            <Text style={{ fontSize: wp(3), color: '#455a64', marginTop: hp(1) }} >
                                100%
                            </Text>
                        </View>
                        <View className="items-center" >

                            <Angry h={7.4} w={7.4} isSelect={select} />

                            <Text style={{ fontSize: wp(3), color: '#455a64', marginTop: hp(1) }} >
                                100%
                            </Text>
                        </View>
                    </View>
                </View>


            </ScrollView>
        </SafeAreaView>
    )
}

export default MoodInsights

const styles = StyleSheet.create({

    HeadContainer: {
        height: hp(6),
        width: wp(100),
        justifyContent: "center",
        alignItems: "center",
        marginTop: hp(2),
    },
    HeadText: {
        width: wp(40.5),
        color: theme.black,
        fontSize: wp(4, 2),
        fontFamily: "Roboto",
        fontWeight: '700',
        textAlign: 'center'
    },
    NavCard: { display: 'flex', flexDirection: 'row', width: wp(84), backgroundColor: 'red', height: hp(11), paddingHorizontal: wp(2), justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F7FBFD', borderRadius: wp(5.3), marginTop: hp(2) }


})