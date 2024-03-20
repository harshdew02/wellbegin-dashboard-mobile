import { StyleSheet, Text, View, ScrollView, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Back from '../components/Back';
import { theme } from '../theme';
import Check from '../components/Check';
import { Depression, Anxiety, Attachment, HelpFriend } from '../components/TestComp';
import BottomQuote from '../components/BottomQuote';
import { useNavigation } from '@react-navigation/native';
import Pending from '../components/HomeComp/Pending'
import Done from '../components/HomeComp/Done'


const DoneCard = () => {
  return (
    <View style={{ width: wp(87), height: hp(11), marginTop: hp(2.4), justifyContent: 'center', alignItems: 'center' }} >
      <View style={{ position: 'absolute', left: 0, zIndex: 10 }} >
        <Done />
      </View>
      <View style={[styles.cardStyle, { backgroundColor: '#f2f8f9', borderColor: theme.maincolor }]} >
        <View style={{ height: '100%', justifyContent: 'space-between' }} >
          <Text style={{ color: theme.grey, fontSize: wp(4.3), fontFamily: "Roboto", fontWeight: "bold" }} >
            Journaling
          </Text>
          <Text style={{ color: theme.grey, fontSize: wp(4.3), fontFamily: "Roboto", fontWeight: '500' }} >
            During Session
          </Text>
        </View>
        <View className="items-center" >
          <Text style={{ color: theme.grey, fontSize: wp(4.3), fontFamily: "Roboto", fontWeight: '900' }}  >
            Finished
          </Text>
          <Text style={{ color: theme.grey, fontSize: wp(3.7), fontFamily: "Roboto", fontWeight: "normal" }}  >
            19/03/22
          </Text>
        </View>
      </View>
    </View>
  )
}

const PendingCard = () => {
  return (
    <View style={{ width: wp(87), height: hp(11), marginTop: hp(2.4), justifyContent: 'center', alignItems: 'center' }} >
      <View style={{ position: 'absolute', left: 0, zIndex: 10 }} >
        <Pending />
      </View>
      <View style={[styles.cardStyle, { backgroundColor: '#fffbf1', borderColor: theme.grey }]} >
        <View style={{ height: '100%', justifyContent: 'space-between' }} >
          <Text style={{ color: theme.grey, fontSize: wp(4.3), fontFamily: "Roboto", fontWeight: "bold" }} >
            Journaling
          </Text>
          <Text style={{ color: theme.grey, fontSize: wp(4.3), fontFamily: "Roboto", fontWeight: "normal" }} >
            Due by 15/04/22
          </Text>
        </View>
        <TouchableOpacity>
          <Text style={{ color: theme.maincolor, fontSize: wp(4.3), fontFamily: "Roboto", fontWeight: "bold" }}  >
            Start
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


const HomeWork = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: '#fff', }} >
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
            color: theme.black,
            fontSize: wp(5.5),
            fontFamily: "Roboto",
            fontWeight: "bold",
          }}
        >
          My Tasks
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ display: 'flex-1', flexDirection: 'col', alignItems: 'center' }} style={{ width: wp(100), height: hp(92) }} >

        <DoneCard />
        <PendingCard />
        <DoneCard />
        <DoneCard />

      </ScrollView>
      <View style={{ position: 'absolute', bottom: 0, backgroundColor: '#fff' }} >
        <BottomQuote />
      </View>
    </SafeAreaView>
  )
}

export default HomeWork

const styles = StyleSheet.create({
  cardContainer: {
    width: wp(100),
    paddingHorizontal: wp(8),
  },

  cardStyle: {
    display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingRight: wp(7.4), paddingLeft: wp(10.6), paddingVertical: hp(2.2), width: wp(84), height: hp(11), position: 'absolute', left: wp(3), borderRadius: wp(4), borderWidth: wp(0.4),
    shadowColor: theme.maincolor,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.21,
    shadowRadius: 6.65,
    elevation: 9
  },
})