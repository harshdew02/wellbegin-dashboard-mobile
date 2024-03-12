import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react';
import TopBarMain from '../components/TopBarMain'
import { ScrollView } from 'react-native-gesture-handler'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";
import Back from '../components/Back';
import { Happy, Surprised, Sad, Disgust, Fear, Angry } from '../components/moods/';


const MoodTracker = () => {

    const navigation = useNavigation();
    const [ select , setSelect]  = useState(6);

    return (
        <SafeAreaView>

            <View style={styles.cardContainer}>

                <View className=" justify-center items-center" style={{ marginTop: hp(1.8) }} >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", left: 0 }} >
                        <Back color={'#043953'} />
                    </TouchableOpacity>
                    <Text style={{ color: '#455a64', fontSize: wp(4.2), fontFamily: 'Roboto', fontWeight: '700' }}>
                        Update Your Mood Tracker
                    </Text>
                </View>

                <View className="flex-row justify-between " style={{ width: "100%" , marginTop: hp(3) }}>
                    <View className="items-center" >
                        <TouchableOpacity>
                            <Happy isSelect = {select} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: wp(3), color: '#455a64', marginTop: hp(1) }} >
                            Happy
                        </Text>
                    </View>
                    <View className="items-center" >
                        <TouchableOpacity>
                            <Surprised isSelect = {select} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: wp(3), color: '#455a64', marginTop: hp(1) }} >
                            Surprised
                        </Text>
                    </View>
                    <View className="items-center" >
                        <TouchableOpacity>
                            <Sad isSelect = {select} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: wp(3), color: '#455a64', marginTop: hp(1) }} >
                            Sad
                        </Text>
                    </View>
                    <View className="items-center" >
                        <TouchableOpacity>
                            <Disgust isSelect = {select} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: wp(3), color: '#455a64', marginTop: hp(1) }} >
                            Disgust
                        </Text>
                    </View>
                    <View className="items-center" >
                        <TouchableOpacity>
                            <Fear isSelect = {select} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: wp(3), color: '#455a64', marginTop: hp(1) }} >
                            Fear
                        </Text>
                    </View>
                    <View className="items-center" >
                        <TouchableOpacity>
                            <Angry isSelect = {select} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: wp(3), color: '#455a64', marginTop: hp(1) }} >
                            Angry
                        </Text>
                    </View>
                </View>
            </View>

        </SafeAreaView >
    )
}

export default MoodTracker


const styles = StyleSheet.create({

    cardContainer: {
        width: wp(100),
        paddingHorizontal: wp(8),
        // height: hp(15.8),
        // marginTop: hp(4),
        height: hp(20),

        backgroundColor: '#F7FBFD'
    },

});