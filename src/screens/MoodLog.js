import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
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
import { Angry } from "../components/moods";
import { Work } from "../components/spheres";
import Signal from "../../assets/images/signal.svg";
const MoodLog = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: '#F5F5F5' }} >
      <View style={styles.HeadContainer}>
        <TouchableOpacity
          onPress={() => { navigation.goBack() }}
          style={{ position: "absolute", left: wp(8) }}
        >
          <Back color={'#455A64'} />
        </TouchableOpacity>

        <View className="flex-row items-center" >
          <Text style={styles.HeadText}>
            Your Mood Log
          </Text>
        </View>
      </View>


      <ScrollView contentContainerStyle={{ display: 'flex-1', flexDirection: 'col', alignItems: 'center', height: hp(92) }} style={{ width: wp(100), marginTop: hp(1) }} >

        <View style={styles.CardStyle} >
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center' }} >
            <Angry />
            <Text style={{
              color: theme.black,
              fontSize: wp(4),
              fontWeight: '500',
              marginLeft: wp(4.2)
            }}>
              Angry
            </Text>
            <Text style={{
              position: 'absolute',
              right: 0,
              color: theme.black,
              fontSize: wp(4),
              fontWeight: '500',
            }} >
              10:15 AM
            </Text>
          </View>
          <View style={{ width: '100%', borderTopWidth: wp(0.2), borderColor: theme.black, paddingTop: hp(1), marginTop: hp(1.4) }} >
            <Text style={{
              color: '#6a7b83',
              fontSize: wp(3.7),
              fontWeight: 'normal',
              textAlign: 'left',
            }} >Felt something for some reason...
            </Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', marginTop: hp(1.4), width: '100%' }} >
            <View style={{ marginRight: wp(1), height: hp(2.5), paddingHorizontal: wp(1.6), backgroundColor: '#dbf2f2', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: wp(2.6) }}>
              <Work w={3.7} h={3.1} isClicked={true} />
              <Text style={{
                marginLeft: wp(0.2),
                color: '#01818c',
                fontSize: wp(3.2),
                fontWeight: 'normal',
                textAlign: 'left',
              }}>Friendship</Text>
            </View>
            <View style={{ height: hp(2.5), paddingHorizontal: wp(1.6), backgroundColor: '#fceecb', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: wp(2.6) }}>
              <Text style={{
                marginLeft: wp(0.2),
                color: theme.black,
                fontSize: wp(3.2),
                fontWeight: 'normal',
                textAlign: 'left',
              }}>Frustrated</Text>
            </View>
          </View>
        </View>

        <Text style={{
          color: theme.black,
          width: wp(76),
          fontSize: wp(3.7),
          fontWeight: 'normal',
          textAlign: 'center',
          marginTop: hp(3)
        }} >
          Gain perspective on your emotional journey by exploring your mood insights
        </Text>

        <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{marginTop:hp(2),borderWidth:wp(0.5), borderColor:theme.maincolor, borderRadius:wp(8) , width: wp(42.4), height: hp(6), display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} >
          <Text style={{
            color: theme.maincolor,
            fontSize: wp(4),
            fontWeight: '500',
            marginLeft: wp(4.2)
          }} >View Insights</Text><Signal width={wp(4.2)} height={wp(3.7)} />
        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  )
}

export default MoodLog

const styles = StyleSheet.create({
  HeadContainer: {
    height: hp(6),
    width: wp(100),
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(2),
    backgroundColor: '#F5F5F5',
  },
  HeadText: {
    width: wp(50),
    color: theme.black,
    fontSize: wp(5.5),
    fontFamily: "Roboto",
    fontWeight: '700',
    textAlign: 'center'
  },
  CardStyle: {
    width: wp(84), height: hp(18), backgroundColor: '#fff', padding: wp(4.2), marginTop: hp(2), borderRadius: wp(2.6), display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    shadowColor: theme.maincolor,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.21,
    shadowRadius: 6.65,
    elevation: 9,
  }
})