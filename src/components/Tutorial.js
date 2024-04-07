import { StyleSheet, Text, View, FlatList, PanResponder, Dimensions } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import T1 from "../../assets/images/t1.svg";
import T2 from "../../assets/images/t2.svg";
import T3 from "../../assets/images/t3.svg";
import T4 from "../../assets/images/t4.svg";
import T5 from "../../assets/images/t5.svg";
import T6 from "../../assets/images/t6.svg";
import T7 from "../../assets/images/t7.svg";
import T8 from "../../assets/images/t8.svg";
import T9 from "../../assets/images/t9.svg";
import { useNavigation } from "@react-navigation/native";
// const { width, height } = Dimensions.get("window");

const slides = [
    {
        id: "1",
        T: <T1 width={wp(100)} height={hp(102)} />,
    },
    {
        id: "2",
        T: <T2 width={wp(100)} height={hp(102)} />,
    },
    {
        id: "3",
        T: <T3 width={wp(100)} height={hp(102)} />,
    },
    {
        id: "4",
        T: <T4 width={wp(100)} height={hp(102)} />,
    },
    {
        id: "5",
        T: <T5 width={wp(100)} height={hp(102)} />,
    },
    {
        id: "6",
        T: <T6 width={wp(100)} height={hp(102)} />,
    },
    {
        id: "7",
        T: <T7 width={wp(100)} height={hp(102)} />,
    },
    {
        id: "8",
        T: <T8 width={wp(100)} height={hp(102)} />,
    },
    {
        id: "9",
        T: <T9 width={wp(100)} height={hp(102)} />,
    },
];


const Slide = ({ item }) => {

    return (
        <View>
            {item.T}

        </View>

    );
};

const ScreenWidth = Dimensions.get("screen").width / 2;
const Tutorial = () => {
    let [current, setCurrent] = useState(0);
    const [hide, setHide] = useState(false);
    useEffect(() => {
        if (current < 0) {
            setCurrent(0);
        } else if (current > 8) {
            setCurrent(8);
        }
    }, [current]);

    const increment = () => {
        if (current == 8) {
            setHide(true)
        }
        setCurrent(prevValue => prevValue < 8 ? prevValue + 1 : prevValue);
    };

    const decrement = () => {
        setCurrent(prevValue => prevValue > 0 ? prevValue - 1 : prevValue);
    };

    const a = useRef(0);
    return (

        <>
            {hide ? <></> :
                <SafeAreaView
                    style={{
                        width: wp(100),
                        height: hp(100),
                        position: "absolute",
                        zIndex: 150,
                        // backgroundColor: "red",
                        // backgroundColor: "rgba(256, 256, 256, 0.5)",
                    }}
                >
                    <View
                        onTouchStart={(event) => {
                            if (event.nativeEvent.locationX < ScreenWidth) {
                                decrement();
                            }
                            else {
                                increment();
                            }
                        }}
                    >

                        <Slide item={slides[current]} />
                    </View>
                </SafeAreaView>
            }
        </>

    )
}

export default Tutorial

const styles = StyleSheet.create({})