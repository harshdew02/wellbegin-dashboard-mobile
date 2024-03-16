import { StyleSheet, Text, View, ScrollView, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Back from '../components/Back';
import { theme } from '../theme';
import Check from '../components/Check';
import { Depression, Anxiety, Attachment, HelpFriend } from '../components/TestComp';
import BottomQuote from '../components/BottomQuote';
import { useNavigation } from '@react-navigation/native';

const NoSessions = () => {
    return (
      <Text
        style={{
          width: "100%",
          textAlign: "center",
          marginVertical: hp(3.6),
          color: "#455a64",
          fontSize: wp(4),
          fontFamily: "Roboto",
          fontWeight: "normal",
        }}
      >
        Sorry! You have no sessions.
      </Text>
    );
  };

const FirstRoute = () => {
    return (
        <View style={styles.scrollContainer}>
            <NoSessions/>
            <ScrollView style={{ width: "100%", height: '100%' }} contentContainerStyle={{ display: 'flex', flexDirection: 'column', paddingLeft: wp(6), paddingBottom: hp(1) }}>
                <View style={{ height: '100%', width: wp(1), backgroundColor: '#455A64', position: 'absolute', left: wp(10), zIndex: -2 }} />
                {/* <View style={{
                    width: wp(70),
                    height: hp(14),
                    // backgroundColor: '',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: hp(2)
                }}>
                    <View style={{ backgroundColor: '#455A64', width: wp(9), height: wp(9), borderRadius: wp(5), justifyContent: 'center', alignItems: 'center' }}>
                        <Check />
                    </View>
                    <View style={{ backgroundColor: '#fff', borderColor: theme.maincolor, borderWidth: wp(0.3), width: wp(55), height: hp(14), display: 'flex', justifyContent: 'space-between', paddingVertical: hp(1), paddingLeft: wp(5.3) }}>
                        <Text style={{ fontSize: wp(3.5), color: '#455A64', fontWeight: '700' }} >
                            Depression Test
                        </Text>
                        <View>
                            <Text style={{ fontSize: wp(3.5), color: '#455A64', fontWeight: '400' }} >
                                Test Date: 05/02/23
                            </Text>
                            <Text style={{ fontSize: wp(3.5), color: '#455A64', fontWeight: '400' }} >
                                Valid Till: 05/03/23
                            </Text>
                        </View>
                        <TouchableOpacity style={{ width: wp(26), height: hp(3.1), backgroundColor: theme.maincolor, borderRadius: wp(8), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#fff', fontSize: wp(3.4) }} >View Results</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
            </ScrollView>
        </View>
    );
};


const renderScene = ({ route }) => {
    switch (route.key) {
        case "first":
            return <FirstRoute />;
        // return <FirstRoute data={data} />;
        default:
            return null;
    }
};

const renderTabBar = (props) => (
    <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: "#E9E8EB" }}
        style={{
            backgroundColor: "#E9E8EB",
            elevation: 0,
            padding: 0,
            width: "100%",
        }}
        renderLabel={({ route, focused, color }) => (
            <View
                className="flex-row items-center "
                style={{
                    width: wp(40),
                    height: hp(4.5),
                    borderRadius: wp(2),
                    borderColor: "rgba(1, 129, 140, 0.3)",
                }}
            >
                <Text
                    style={{
                        color: theme.grey,
                        width: "100%",
                        textAlign: "center",
                        fontSize: wp(4),

                    }}
                >
                    {route.title}
                </Text>
            </View>
        )}
    />
);



const Task = () => {
    const [routes] = React.useState([
        { key: "first", title: "Your Recent Tests" },
    ]);
    const [isSession, setSession] = React.useState(false);
    const [index, setIndex] = React.useState(0);
    const [det, setDet] = useState({});
    const layout = useWindowDimensions();
    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{ display: 'flex-1', flexDirection: 'col', alignItems: 'center' }} style={{ width: wp(100), backgroundColor: '#f7fbfd', height: hp(100) }} >
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
                        onPress={() => { navigation.goBack() }}
                        style={{ position: "absolute", left: wp(8) }}
                    >
                        <Back color={'#455A64'} />
                    </TouchableOpacity>
                    <Text
                        style={{
                            color: theme.grey,
                            fontSize: wp(5.5),
                            fontFamily: "Roboto",
                            fontWeight: "bold",
                        }}
                    >
                        My Wellbeing Tests
                    </Text>
                </View>
                <Text style={{
                    width: wp(80),
                    marginTop: wp(2),
                    textAlign: 'center',
                }} >
                    Access your test results below to get a better understanding of your symptoms.
                </Text>

                <View style={[styles.cardContainer, { marginTop: hp(3) }]} >
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={{ width: layout.width }}
                        animationEnabled={false}
                        style={{
                            width: "100%",
                            backgroundColor: "#f8f7fc",
                            borderRadius: wp(2.5),
                            height: hp(40),
                            // borderWidth: wp(1),
                        }}
                        renderTabBar={renderTabBar}
                        initialParams={{ det }}
                    ></TabView>
                </View>

                <Text style={{ fontSize: wp(4), fontWeight: '700', color: theme.black, marginTop: hp(3.4) }} >
                    Recommended Diagnostics For You
                </Text>

                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={{ display: 'flex', flexDirection: 'row', borderRadius: wp(2) }} style={{ width: wp(86), height: hp(12.8), marginTop: hp(2) }} >
                    <View style={[{ backgroundColor: '#EAF7FC' }, styles.cardStyle]}>
                        <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
                            <Depression />
                        </View>
                        <View style={{ marginLeft: wp(4.5), marginTop: hp(2), height: hp(8.5), display: 'flex', justifyContent: 'space-between' }} >
                            <Text style={{ fontSize: wp(4.2), color: '#455A64', fontWeight: '700' }}  >
                                Depression Test
                            </Text>
                            <TouchableOpacity style={styles.btnStyle}>
                                <Text style={{ color: '#fff', fontSize: wp(3.4) }} >Take Test</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[{ backgroundColor: '#f4ecd8', justifyContent: 'center' }, styles.cardStyle]}>
                        <View style={{ position: 'absolute', right: wp(5.3) }}>
                            <Attachment />
                        </View>
                        <View style={{ marginLeft: wp(4.5), height: hp(8.5), display: 'flex', justifyContent: 'space-between' }} >
                            <Text style={{ fontSize: wp(4.2), color: '#455A64', fontWeight: '700' }}  >
                                Attachment Test
                            </Text>
                            <TouchableOpacity style={styles.btnStyle}>
                                <Text style={{ color: '#fff', fontSize: wp(3.4) }} >Take Test</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[{ backgroundColor: '#EAF7FC', justifyContent: 'center' }, styles.cardStyle]}>
                        <View style={{ position: 'absolute', right: wp(5) }} >
                            <Anxiety />
                        </View>
                        <View style={{ marginLeft: wp(4.5), height: hp(8.5), display: 'flex', justifyContent: 'space-between' }} >
                            <Text style={{ fontSize: wp(4.2), color: '#455A64', fontWeight: '700' }}  >
                                Anxiety Test
                            </Text>
                            <TouchableOpacity style={styles.btnStyle}>
                                <Text style={{ color: '#fff', fontSize: wp(3.4) }} >Take Test</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                <View style={{ marginTop: hp(4), justifyContent: 'center' }} >
                    <HelpFriend />
                    <View style={{ position: 'absolute', zIndex: 1, height: hp(12), width: wp(59), alignItems: 'center', right: wp(4.2), justifyContent: 'space-between' }} >
                        <Text style={{ textAlign: 'center', fontSize: wp(3.2), fontWeight: '700', color: '#fff' }} >
                            Help your loved one understand their symptoms better so they can get the help they deserve!
                        </Text>
                        <TouchableOpacity style={[styles.btnStyle2]}>
                            <Text style={{ color: theme.black, fontSize: wp(4), fontWeight: '500' }} >Share Quiz</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* <BottomQuote /> */}

            </ScrollView>
        </SafeAreaView>
    )
}

export default Task

const styles = StyleSheet.create({

    cardContainer: {
        width: wp(100),
        paddingHorizontal: wp(8),
    },

    scrollContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        borderBottomLeftRadius: wp(2.5),
        borderBottomRightRadius: wp(2.5),
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "rgba(69, 90, 100, 0.2)",
    },

    cardStyle: {
        width: wp(70), height: "100%", marginHorizontal: wp(2), borderRadius: wp(3)
    },

    btnStyle: {
        width: wp(32), height: hp(3.7), backgroundColor: theme.maincolor, borderRadius: wp(8), justifyContent: 'center', alignItems: 'center'
    },
    btnStyle2: {
        width: wp(32), height: hp(3.7), backgroundColor: '#fff', borderRadius: wp(8), justifyContent: 'center', alignItems: 'center'
    }



})