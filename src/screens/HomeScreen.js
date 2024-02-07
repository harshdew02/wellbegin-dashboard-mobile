import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import TopBarMain from '../components/TopBarMain'
import { ScrollView } from 'react-native-gesture-handler'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";


import Logo4 from '../../assets/images/homePageBanner.svg';
import TasksIcon from '../../assets/images/TasksIcon.svg';
import NewIcon from '../../assets/images/NewIcon.svg';
import FeelBanner from '../../assets/images/FeelBanner.svg';
import Emoji1 from '../../assets/images/emoji1.svg';
import Emoji2 from '../../assets/images/emoji2.svg';
import Emoji3 from '../../assets/images/emoji3.svg';
import Emoji4 from '../../assets/images/emoji4.svg';
import Emoji5 from '../../assets/images/emoji5.svg';
import Gift from '../../assets/images/Gift.svg';
import BottomQuote from '../../assets/images/BottomQuote.svg';

// F:\HIO\Progress\hio_UI\hio\assets\images\

export default function HomeScreen() {

  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <TopBarMain />
      <ScrollView style={{ backgroundColor: '#fff', height: hp(100) }}>
        {/* Banner */}
        <View style={{ marginTop: hp(9.5) }}>
          <Logo4 width={wp(100)} height={wp(59.5)} />
          <View style={styles.banner}>
            <View className="flex-row justify-between items-center">
              <View>
                <Text style={{ color: 'white', fontSize: wp(4), fontFamily: 'Roboto', fontWeight: '400', }}>
                  Welcome👋
                </Text>
                <Text style={{ color: 'white', fontSize: wp(4), fontFamily: 'Roboto', fontWeight: '400', marginTop: wp(4) }}>
                  Take care of yourself with
                </Text>
                <Text style={{ color: 'white', fontSize: wp(4), fontFamily: 'Roboto', fontWeight: '700' }}>
                  Psychological Counselling
                </Text>
              </View>
              <Image
                source={require("../../assets/images/homePageGIF.gif")}
                style={{ height: wp(30), width: wp(30) }}
              />
            </View>
            <TouchableOpacity activeOpacity={.8} style={styles.BookBtn}>
              <Text style={styles.btnText}>
                Book a Session
              </Text>
            </TouchableOpacity>
          </View>
        </View>


        {/* Content */}
        <View className="flex-row justify-between" style={[styles.cardContiner, { height: hp(15.8) }]}>
          <TouchableOpacity style={[styles.card, { backgroundColor: '#FEF8C8' }]}>
            <Text style={styles.cardText}>
              My {'\n'}Tasks
            </Text>
            <TasksIcon width={wp(11)} height={hp(6)} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.card, { backgroundColor: '#EBF2F5' }]}>
            <Text style={styles.cardText}>
              My {'\n'}Progress
            </Text>
            <Image
              source={require("../../assets/images/ProgressIcon.gif")}
              style={{ width: wp(20), height: hp(12), position: 'absolute', zIndex: -1, left: wp(2), right: wp(2), bottom: hp(1.6) }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.card, { backgroundColor: '#EAF7FC' }]}>
            <Text style={styles.cardText}>
              My {'\n'}Tasks
            </Text>
            <NewIcon width={wp(20)} height={hp(5)} />
          </TouchableOpacity>
        </View>

        <View className="flex-col justify-between items-center" style={[styles.cardContiner, { height: hp(12.5), marginTop: hp(3) }]}>
          <Text style={{ color: '#043953', fontSize: wp(4), fontFamily: 'Roboto', fontWeight: '700' }}>
            How are you feeling today?
          </Text>
          <FeelBanner width={wp(85)} height={hp(9)} style={styles.feelBanner} />
          <View className="flex-row justify-between items-center" style={[{ position: 'absolute', bottom: 8, zIndex: 1, width: wp(78) }]}>
            <TouchableOpacity><Emoji1 width={wp(8)} height={wp(8)} /></TouchableOpacity>
            <TouchableOpacity><Emoji2 width={wp(8)} height={wp(8)} /></TouchableOpacity>
            <TouchableOpacity><Emoji3 style={{ marginHorizontal: wp(1.5) }} width={wp(10)} height={wp(10)} /></TouchableOpacity>
            <TouchableOpacity><Emoji4 width={wp(8)} height={wp(8)} /></TouchableOpacity>
            <TouchableOpacity><Emoji5 width={wp(8)} height={wp(8)} /></TouchableOpacity>
          </View>
        </View>

        {/* Package */}
        <View className="flex-col items-center" style={[styles.cardContiner, { height: hp(15.8), marginTop: hp(3) }]}>
          <View style={[styles.packageCard, {}]}>
            <View className="flex-col justify-between items-start " style={{ height: hp(9) }}>
              <Text style={styles.cardText}>
                Session Packages
              </Text>
              <TouchableOpacity activeOpacity={.5} style={styles.Btn}>
                <Text style={styles.btnText2}>
                  Book a Session
                </Text>
              </TouchableOpacity>
            </View>
            <Gift width={wp(25)} height={hp(9)} />
          </View>
        </View>



        <View className="flex-col items-center" style={[styles.cardContiner, { height: hp(15.8), marginTop: hp(2) }]}>
          <View style={[styles.packageCard, { backgroundColor: '#EAF7FC' }]}>
            <View className="flex-col justify-between items-start " style={{ height: hp(9) }}>
              <Text style={styles.cardText}>
                Self-care Tools for you
              </Text>
              <TouchableOpacity activeOpacity={.5} style={styles.Btn}>
                <Text style={styles.btnText2}>
                  Discover Now
                </Text>
              </TouchableOpacity>
            </View>
            <Image
              source={require("../../assets/images/SelfCareIcon2.png")}
              style={{ width: wp(18), height: hp(14) }}
            />
          </View>
        </View>

        <View className="flex-row items-center" style={[styles.cardContiner, { height: hp(20), marginTop: hp(5), backgroundColor: '#EBEFF2CC' }]}>
          <BottomQuote width={wp(71)} height={hp(15)} />
        </View>


        <View style={{ width: wp(100), height: hp(6), marginTop: hp(3) }} />
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({

  banner: {
    // backgroundColor: 'black',
    width: wp(84),
    position: 'absolute',
    left: wp(8),
    right: wp(8),
    top: hp(2.6),
    zIndex: 2,
  },

  BookBtn: {
    marginTop: hp(2),
    width: wp(84),
    height: hp(6),
    backgroundColor: 'white',
    borderRadius: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  btnText: {
    textAlign: 'center',
    color: '#01818C',
    fontSize: wp(4),
    fontFamily: 'Roboto',
    fontWeight: '600',
  },

  // Cards
  cardContiner: {
    width: wp(100),
    paddingHorizontal: wp(8),
    // height: hp(15.8),
    marginTop: hp(4),
    // backgroundColor: 'red'
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
    width: wp(40),
    height: hp(40),
    backgroundColor: 'red'
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