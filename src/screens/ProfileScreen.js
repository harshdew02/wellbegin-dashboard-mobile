import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, Button, TextComponent } from 'react-native'
import React from 'react'
import TopBarMain from '../components/TopBarMain'
import { ScrollView } from 'react-native-gesture-handler'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";

import ProfileBg from '../../assets/images/ProfileBg.svg';
import EditIcon from '../../assets/images/editIcon.svg';
import ProfileDisplay from '../../assets/images/ProfileDisplay.svg';
import BottomQuote from '../../assets/images/BottomQuote.svg';

export default function ProfileScreen() {
  return (
    <SafeAreaView>
      <TopBarMain />

      <ScrollView style={{ backgroundColor: '#fff', height: hp(100) }}>

        <View style={{ marginTop: hp(9.5) }}>
          <ProfileBg width={wp(100)} height={hp(29)} />

          <View style={styles.banner}>
            <Text style={{ color: 'white', fontSize: wp(5.5), fontFamily: 'Roboto', fontWeight: '700', width: wp(84), textAlign: 'center', marginBottom: hp(1.5) }}>About Me</Text>

            <View className="flex-row justify-between items-center">
              <View>
                <Text style={{ color: 'white', fontSize: wp(4), fontFamily: 'Roboto', fontWeight: 'bold', }}>
                  USER NAME
                </Text>
                <Text style={{ marginTop: hp(0.05), color: 'white', fontSize: wp(3.5), fontFamily: 'Roboto', fontWeight: 'normal' }}>
                  +91-9482955416
                </Text>
                <Text style={{ marginTop: hp(0.05), color: 'white', fontSize: wp(3.5), fontFamily: 'Roboto', fontWeight: 'normal' }}>
                  hello@heartitout.in
                </Text>
                <TouchableOpacity activeOpacity={.8} style={styles.BookBtn}>
                  <Text style={styles.btnText}>
                    Edit
                  </Text>
                  <EditIcon width={wp(5)} height={wp(5)} />
                </TouchableOpacity>
              </View>
              <ProfileDisplay width={wp(32)} height={hp(16)} />
            </View>
          </View>
        </View>


        <View className="flex-col items-center" style={[styles.cardContainer, { maxHeight: hp(46), marginTop: hp(3.5) }]}>
          <View style={styles.sessions}>
            <View style={{ width: '100%', height: hp(5) }}></View>
            <ScrollView style={styles.scrollContainer}>
              <Text style={{ width: '100%', textAlign: 'center', marginVertical: hp(3.6), color: '#455a64', fontSize: wp(4), fontFamily: 'Roboto', fontWeight: 'normal' }}>
                Sorry! You have no sessions.
              </Text>
            </ScrollView>
          </View>
        </View>

        <View className="flex-col items-center" style={[styles.cardContainer, { marginTop: hp(4) }]}>
          <TouchableOpacity activeOpacity={.8} style={styles.BookBtn2}>
            <Text style={styles.btnText2}>
              Book a Session
            </Text>
          </TouchableOpacity>
        </View>


        <View className="flex-col items-center" style={[styles.cardContainer, { marginTop: hp(3) }]}>
          <View className="flex-row items-center">
            <View style={styles.container3}></View>
            <Text style={{ color: '#455A64', fontSize: wp(3.7), fontFamily: 'Roboto', fontWeight: '300', paddingHorizontal: wp(3), }}>OR</Text>
            <View style={styles.container3}></View>
          </View>
        </View>

        <View className="flex-col items-center" style={[styles.cardContainer, { marginTop: hp(3) }]}>
          <TouchableOpacity activeOpacity={.8} style={styles.BookBtn3}>
            <Text style={styles.btnText3}>
              Take a Free Mental Health Check up
            </Text>
          </TouchableOpacity>
        </View>


        <View className="flex-row items-center" style={[styles.cardContainer, { height: hp(20), marginTop: hp(5), backgroundColor: '#EBEFF2CC'}]}>
          <BottomQuote width={wp(71)} height={hp(15)} />
          {/* <View style={{width: wp(20) , height: hp(20) , backgroundColor: 'red'}} ></View> */}
        </View>


        <View style={{ width: wp(100), height: hp(6), marginTop: hp(3) }} />
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  // ***
  banner: {
    // backgroundColor: 'black',
    width: wp(92),
    position: 'absolute',
    left: wp(8),
    right: 0,
    top: hp(2.6),
    zIndex: 2,
  },
  // ***
  BookBtn: {
    marginTop: hp(3),
    width: wp(31),
    height: hp(4.5),
    backgroundColor: 'white',
    borderRadius: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  // *****
  btnText: {
    textAlign: 'center',
    color: '#01818C',
    fontSize: wp(4),
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    marginRight: wp(1)
  },

  // Cards*******
  cardContainer: {
    width: wp(100),
    paddingHorizontal: wp(8),
    // height: hp(15.8),
    // marginTop: hp(4),
    // backgroundColor: 'red'
  },

  sessions: {
    width: '100%',
    backgroundColor: '#f8f7fc',
    borderRadius: wp(2.5),
  },

  scrollContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderBottomLeftRadius: wp(2.5),
    borderBottomRightRadius: wp(2.5),
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(69, 90, 100, 0.2)"
  },

  BookBtn2: {
    width: wp(84),
    height: hp(6),
    backgroundColor: '#01818c',
    borderRadius: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  btnText2: {
    textAlign: 'center',
    color: '#01818C',
    fontSize: wp(4),
    fontFamily: 'Roboto',
    fontWeight: '600',
  },

  container3: {
    width: wp(30),
    height: hp(0),
    borderBottomWidth: wp(0.4),
    borderColor: 'rgba(69, 90, 100, 0.30)',
  },

  BookBtn3: {
    width: wp(84),
    height: hp(6),
    borderRadius: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: "#ffffff",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#455a64"
  },

  btnText3: {
    textAlign: 'center',
    color: '#455a64',
    fontSize: wp(4),
    fontFamily: 'Roboto',
    fontWeight: '700',
  },














  card: {
    width: wp(24), height: '100%', borderRadius: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(1.5),
    display: 'flex',
    flexDirection: 'col',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cardText: {
    textAlign: 'center', color: '#455A64', fontSize: wp(4), fontFamily: 'Roboto', fontWeight: '800'
  },

  test: {
    width: '100%',
    // height: '100%',
    backgroundColor: 'red',
    // maxHeight: hp(46), // Set your specific maximum height here
    borderWidth: 1, // Just for visualization purposes
    borderColor: 'black', // Just for visualization purposes
    // padding: 10,
  },

  // Feel Banner

  feelBanner: {
    position: 'absolute',
    bottom: 0,
    zIndex: -1,
  },

  // Package

  packageCard: {
    width: wp(84), height: '100%', borderRadius: wp(4), backgroundColor: '#FEF8C8',
    paddingHorizontal: wp(4),
    paddingLeft: wp(6),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  Btn: {
    // marginTop: hp(2),
    width: wp(38),
    height: hp(4),
    backgroundColor: '#01818C',
    borderRadius: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  btnText2: {
    textAlign: 'center',
    color: 'white',
    fontSize: wp(4),
    fontFamily: 'Roboto',
    fontWeight: '600',
  },

  cardContiner2: {
    width: wp(100),
    paddingHorizontal: wp(8),
    // height: hp(15.8),
    // marginTop: hp(4),
    // backgroundColor: 'red'
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
});