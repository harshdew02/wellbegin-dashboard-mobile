import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Back from "../../assets/images/arrow.svg";
import TopBarMain from '../components/TopBarMain';


// import {ringTick} from '../components/ringTick';
import RingIcon from '../components/RingIcon'


const Card = ({ isTick }) => {
    return (
        <View className="flex-row justify-between items-center" style={styles.container}>
            <View style={{
                height: "100%",
                backgroundColor: isTick ? '#455A64' : '#01818C',
                width: wp(1),
                position: 'absolute',
                left: wp(2),
            }}></View>
            <View className="flex-col justify-between" style={{ marginLeft: wp(6), marginRight: wp(1), width: wp(64) }}>
                <Text style={{
                    color: isTick ? '#455A64' : '#01818C',
                    fontSize: wp(4.2),
                    fontFamily: 'Roboto',
                    fontWeight: '800',
                    marginBottom: hp(2)
                }}>
                    You have a session at 10:30 am on 17/03/22
                </Text>
                <Text style={{
                    color: '#455A64',
                    fontSize: wp(3.5),
                    fontFamily: 'Roboto',
                    fontWeight: 'normal',
                }}>
                    You have an upcoming session with your therapist Jyoti Das on 17/03/2022
                </Text>
            </View>

            <View className="flex-col items-center justify-between" style={{ height: hp(6), width: wp(18) }} >
                <Text style={{ fontSize: wp(3.2) }}>18 mins ago</Text>
                <RingIcon active={isTick} />
            </View>
        </View>
    )
}


export default function ReminderScreen({ navigation }) {
    const [ifReminder, setIfReminder] = useState(true);
    return (
        <SafeAreaView>
            <TopBarMain />
            <View
                style={{
                    backgroundColor: "#fff",
                    height: hp(6),
                    justifyContent: "center",
                    alignItems: "center",
                    top: hp(1),
                    marginTop: hp(10)
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", left: wp(8) }} >
                    <Back width={wp(8)} height={wp(8)} />
                </TouchableOpacity>
                <Text style={{
                    color: "#043953",
                    fontSize: wp(5.5),
                    fontFamily: 'Roboto',
                    fontWeight: '600'
                }}>Your Reminders</Text>
            </View>

            <View className="flex-col items-center" style={{ marginTop: hp(2) }}>
                {ifReminder ?
                (<Card isTick={0}/>) :

                (<View className="flex-col items-center">
                    <Image
                        className="mr-8"
                        source={require("../../assets/images/noReminders.gif")}
                        style={{ height: hp(28), width: wp(100), marginTop: hp(24) }}
                    />
                    <Text style={{
                        color: "#043953",
                        fontSize: wp(5.5),
                        fontFamily: 'Roboto',
                        fontWeight: '600'
                    }}>You have no reminders.</Text>
                </View>
                )
            }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        width: wp(94),
        paddingVertical: hp(1.5),
        backgroundColor: 'white',
        boxShadow: '0px 1.5px 10px 1px rgba(1, 129, 140, 0.25)',
        borderRadius: 5,
        // NOTE: boxShadow is not directly supported in React Native.
        // You might need to use elevation for shadow effects on Android.
        elevation: 5,
        // marginTop: hp(2),
        // padding: wp(1),
        // paddingVertical: wp(1),
        paddingRight: wp(3.2)
    },

    line: {

    },

})


//  bottom->stack->right
//  stack->right->bottom