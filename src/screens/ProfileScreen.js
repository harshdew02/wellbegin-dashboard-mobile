import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, Button, TextComponent, useWindowDimensions } from 'react-native'
import React from 'react'
import TopBarMain from '../components/TopBarMain'
import { ScrollView } from 'react-native-gesture-handler'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";


import ProfileBg from '../../assets/images/ProfileBg.svg';
import EditIcon from '../../assets/images/editIcon.svg';
import ProfileDisplay from '../../assets/images/ProfileDisplay.svg';
import BottomQuote from '../../assets/images/BottomQuote.svg';

import { TabView, SceneMap, TabBar, TabBarItem } from 'react-native-tab-view';


// ddkdld
const FirstRoute = () => (
  <View style={styles.scrollContainer} >
    <ScrollView style={{width: '100%', paddingLeft: wp(3.5) }} >
      <View style={{
        width: wp(76), height: hp(13), backgroundColor: '#ffffff', marginTop: hp(2),
        borderWidth: wp(0.5),
        borderColor: '#32959d',
        paddingHorizontal: wp(3.5),
        paddingVertical: hp(1.1),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <View className="flex-row items-center justify-between" >
          <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: '#455a64' }} >
            Individual Therapy
          </Text>
          <TouchableOpacity className="flex-row justify-center items-center" style={{ width: wp(17), height: hp(3.8), backgroundColor: '#32959d', borderRadius: wp(1.5) }} >
            <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: '#ffffff' }} >Join</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View className="flex-row justify-between items-center " >
            <Text style={{ fontSize: wp(3.8), color: '#455a64' }} >
              16/04/2022
            </Text>
            <View style={{ height: hp(2.2), width: wp(0.5), backgroundColor: '#32959d' }} />
            <Text style={{ fontSize: wp(3.8), color: '#455a64' }} >
              10:30 am
            </Text>
            <View style={{ height: hp(2.2), width: wp(0.5), backgroundColor: '#32959d' }} />
            <Text style={{ fontSize: wp(3.8), color: '#455a64' }}>
              Online
            </Text>
          </View>
          <Text style={{ fontSize: wp(3.8), color: '#455a64', marginTop: hp(0.4) }} >
            ID :  <Text style={{ fontWeight: 'bold', color: '#455a64' }} >654821</Text>
          </Text>
        </View>
      </View>
      <View style={{
        width: wp(76), height: hp(13), backgroundColor: '#ffffff', marginTop: hp(2),
        borderWidth: wp(0.5),
        borderColor: '#32959d',
        paddingHorizontal: wp(3.5),
        paddingVertical: hp(1.1),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <View className="flex-row items-center justify-between" >
          <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: '#455a64' }} >
            Individual Therapy
          </Text>
          <TouchableOpacity className="flex-row justify-center items-center" style={{ width: wp(17), height: hp(3.8), backgroundColor: '#32959d', borderRadius: wp(1.5) }} >
            <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: '#ffffff' }} >Join</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View className="flex-row justify-between items-center " >
            <Text style={{ fontSize: wp(3.8), color: '#455a64' }} >
              16/04/2022
            </Text>
            <View style={{ height: hp(2.2), width: wp(0.5), backgroundColor: '#32959d' }} />
            <Text style={{ fontSize: wp(3.8), color: '#455a64' }} >
              10:30 am
            </Text>
            <View style={{ height: hp(2.2), width: wp(0.5), backgroundColor: '#32959d' }} />
            <Text style={{ fontSize: wp(3.8), color: '#455a64' }}>
              Online
            </Text>
          </View>
          <Text style={{ fontSize: wp(3.8), color: '#455a64', marginTop: hp(0.4) }} >
            ID :  <Text style={{ fontWeight: 'bold', color: '#455a64' }} >654821</Text>
          </Text>
        </View>
      </View>

      <View style={{
        width: wp(76), height: hp(13), backgroundColor: '#ffffff', marginTop: hp(2),
        borderWidth: wp(0.5),
        borderColor: '#32959d',
        paddingHorizontal: wp(3.5),
        paddingVertical: hp(1.1),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <View className="flex-row items-center justify-between" >
          <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: '#455a64' }} >
            Individual Therapy
          </Text>
          <TouchableOpacity className="flex-row justify-center items-center" style={{ width: wp(17), height: hp(3.8), backgroundColor: '#32959d', borderRadius: wp(1.5) }} >
            <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: '#ffffff' }} >Join</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View className="flex-row justify-between items-center " >
            <Text style={{ fontSize: wp(3.8), color: '#455a64' }} >
              16/04/2022
            </Text>
            <View style={{ height: hp(2.2), width: wp(0.5), backgroundColor: '#32959d' }} />
            <Text style={{ fontSize: wp(3.8), color: '#455a64' }} >
              10:30 am
            </Text>
            <View style={{ height: hp(2.2), width: wp(0.5), backgroundColor: '#32959d' }} />
            <Text style={{ fontSize: wp(3.8), color: '#455a64' }}>
              Online
            </Text>
          </View>
          <Text style={{ fontSize: wp(3.8), color: '#455a64', marginTop: hp(0.4) }} >
            ID :  <Text style={{ fontWeight: 'bold', color: '#455a64' }} >654821</Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  </View>
);

const SecondRoute = () => (<View className="flex-col items-center " style={styles.scrollContainer} >
  <ScrollView style={{width: '100%', paddingLeft: wp(3.5) }} >
    <View style={{
      width: wp(76), height: hp(13), backgroundColor: '#ffffff', marginTop: hp(2),
      borderWidth: wp(0.5),
      borderColor: '#32959d',
      paddingHorizontal: wp(3.5),
      paddingVertical: hp(1.1),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <View className="flex-row items-center justify-between" >
        <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: '#455a64' }} >
          Individual Therapy
        </Text>
        <TouchableOpacity className="flex-row justify-center items-center" style={{ width: wp(17), height: hp(3.8), backgroundColor: '#32959d', borderRadius: wp(1.5) }} >
          <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: '#ffffff' }} >Join</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View className="flex-row justify-between items-center " >
          <Text style={{ fontSize: wp(3.8), color: '#455a64' }} >
            16/04/2022
          </Text>
          <View style={{ height: hp(2.2), width: wp(0.5), backgroundColor: '#32959d' }} />
          <Text style={{ fontSize: wp(3.8), color: '#455a64' }} >
            10:30 am
          </Text>
          <View style={{ height: hp(2.2), width: wp(0.5), backgroundColor: '#32959d' }} />
          <Text style={{ fontSize: wp(3.8), color: '#455a64' }}>
            Online
          </Text>
        </View>
        <Text style={{ fontSize: wp(3.8), color: '#455a64', marginTop: hp(0.4) }} >
          ID :  <Text style={{ fontWeight: 'bold', color: '#455a64' }} >654821</Text>
        </Text>
      </View>
    </View>
  </ScrollView>
</View>);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});
// ---------

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#f8f7fc' }}
    style={{ backgroundColor: '#f8f7fc', elevation: 0, padding: 0, width: '100%', }}
    renderLabel={({ route, focused, color }) => (
      <View className="flex-row items-center " style={{
        // backgroundColor: focused ? '#eaf7fc' : '#f8f7fc',
        backgroundColor: focused ? 'rgba(1, 129, 140, 0.2)' : '#f8f7fc',
        width: wp(38),
        height: hp(4.5),
        borderRadius: wp(2),
        borderWidth: focused ? wp(0.5) : 0,
        // borderEndColor: '#01818c'
        borderColor: "rgba(1, 129, 140, 0.3)"
      }}>
        <Text style={{ color: focused ? '#01818c' : '#455a64', width: '100%', textAlign: 'center', fontSize: wp(4) }}>
          {route.title}
        </Text>
      </View>
    )}
  />
);



export default function ProfileScreen() {

  const layout = useWindowDimensions();

  const [isSession, setSession] = React.useState(1)

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Upcoming' },
    { key: 'second', title: 'History' },
  ]);

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
        <View style={[styles.cardContainer, { marginTop: hp(3) }]}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width}}
            animationEnabled={false}
            style={{
              width: '100%',
              backgroundColor: '#f8f7fc',
              borderRadius: wp(2.5),
              height: isSession ? hp(40) : hp(20),
            }}
            renderTabBar={renderTabBar}
          ></TabView>
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
        <View className="flex-row items-center" style={[styles.cardContainer, { height: hp(20), marginTop: hp(5), backgroundColor: '#EBEFF2CC' }]}>
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
// 84
  // Cards*******
  cardContainer: {
    width: wp(100),
    paddingHorizontal: wp(8),
  },

  sessions: {
    width: '100%',
    backgroundColor: '#f8f7fc',
    borderRadius: wp(2.5),
    height: '100%'
  },

  scrollContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderBottomLeftRadius: wp(2.5),
    borderBottomRightRadius: wp(2.5),
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "rgba(69, 90, 100, 0.2)",
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