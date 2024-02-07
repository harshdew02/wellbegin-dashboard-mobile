import * as React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


// Drawer
import BottomTabs from "./BottomTabs";
// import { Help, Profile, SelectLang, Settings } from "../drawer";
import {
    HomeIcon,
} from "react-native-heroicons/outline";
import CustomDrawer from "../components/CustomDrawer";
import HomeScreen from "../screens/HomeScreen";

const Drawer = createDrawerNavigator();

export default function RightDrawer() {



    // const DrawerHeaderContent = (props) => {
    //     return (
    //         <DrawerContentScrollView contentContainerStyle={{ flex: 1 }}>
    //             <View
    //                 style={{
    //                     backgroundColor: "red",
    //                     height: hp(8),
    //                     justifyContent: "center",
    //                     alignItems: "center",
    //                     top: -5,
    //                 }}
    //             >
    //                 <Text style={{ color: "#fff" }}>Home</Text>
    //             </View>
    //             <DrawerItemList {...props} />
    //         </DrawerContentScrollView>
    //     );
    // };

    return (
        <>
            <Drawer.Navigator
                initialRouteName="BottomBar"
                screenOptions={{
                    headerShown: false,
                    drawerStyle: {
                        backgroundColor: "#fff",
                        width: wp(90)
                    },
                    drawerPosition: 'right'
                }}
                drawerContent={props => <CustomDrawer {...props} />}
            >
                <Drawer.Screen
                    name={"BottomBar"}
                    component={BottomTabs}
                    options={{
                        drawerItemStyle: { height: 0 }
                    }}
                />

                <Drawer.Screen
                    name={"BottomBar2"}
                    component={BottomTabs}
                    options={{
                        drawerLabel: "Home Screen",
                        drawerIcon: ({ focused, size, color }) => (
                            <View style={styles.container}>
                                {/* <Text>Hajkdsjljfjsj loremdjklsjlfjlskd</Text> */}
                                <View className="flex-row justify-around align-baseline">
                                    <View style={styles.line}></View>
                                    <View><Text>Hajkdsjljfjsj loremdjklsjlfjlskd</Text></View>
                                </View>
                            </View>
                        ),
                    }}
                />

                <Drawer.Screen
                    name={"BottomBar3"}
                    component={BottomTabs}
                    options={{
                        drawerLabel: "Home Screen",
                        drawerIcon: ({ focused, size, color }) => (
                            <View style={styles.container}>
                                <Text>Hajkdsjljfjsj loremdjklsjlfjlskd</Text>
                            </View>
                        ),
                    }}
                />

                <Drawer.Screen
                    name={"BottomBar4"}
                    component={BottomTabs}
                    options={{
                        drawerLabel: "Home Screen",
                        drawerIcon: ({ focused, size, color }) => (
                            <View style={styles.container}>
                                <Text>Hajkdsjljfjsj loremdjklsjlfjlskd</Text>
                            </View>
                        ),
                    }}
                />

                <Drawer.Screen
                    name={"BottomBar5"}
                    component={BottomTabs}
                    options={{
                        drawerLabel: "Home Screen",
                        drawerIcon: ({ focused, size, color }) => (
                            <View style={styles.container}>
                                <Text>Hajkdsjljfjsj loremdjklsjlfjlskd</Text>
                            </View>
                        ),
                    }}
                />

                <Drawer.Screen
                    name={"BottomBar6"}
                    component={BottomTabs}
                    options={{
                        drawerLabel: "Home Screen",
                        drawerIcon: ({ focused, size, color }) => (
                            <View style={styles.container}>
                                <Text>Hajkdsjljfjsj loremdjklsjlfjlskd</Text>
                            </View>
                        ),
                    }}
                />
            </Drawer.Navigator>
        </>
    )
}


const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: hp(12),
        backgroundColor: 'white',
        boxShadow: '0px 1.5px 10px 1px rgba(1, 129, 140, 0.25)',
        borderRadius: 5,
        // NOTE: boxShadow is not directly supported in React Native.
        // You might need to use elevation for shadow effects on Android.
        elevation: 5,
    },

    line: {
        height: hp(11),
        backgroundColor: '#01818C',
        width: wp(1),
        position: 'absolute',
        left: wp(2),
        marginTop: wp(1),
    },
})