import React, { useEffect, useRef, useState } from 'react';
import {
    SafeAreaView,
    Image,
    StyleSheet,
    FlatList,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Animated
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import P1 from "../../assets/images/page1.svg"
import P2 from "../../assets/images/page2.svg"
import P3 from "../../assets/images/page3.svg"
import Next from "../../assets/images/nextIcon.svg"
import { theme } from '../theme';
import C1 from "../../assets/images/c1.svg"
import C2 from "../../assets/images/c2.svg"
import C3 from "../../assets/images/c3.svg"
import C4 from "../../assets/images/c4.svg"
import C5 from "../../assets/images/c5.svg"
import C6 from "../../assets/images/c6.svg"
import { useNavigation } from "@react-navigation/native";
const COLORS = { primary: '#282534', white: '#fff' };
const { width, height } = Dimensions.get('window');
import AutoScrollingList from '../components/AutoRotatedScrollview';



const com = [
    {
        id: '1',
        C: <C1 width={wp(79)} height={hp(40)} />
    },
    {
        id: '2',
        C: <C2 width={wp(79)} height={hp(40)} />
    },
    {
        id: '3',
        C: <C3 width={wp(79)} height={hp(40)} />
    },
    {
        id: '4',
        C: <C4 width={wp(79)} height={hp(40)} />
    },
    {
        id: '5',
        C: <C5 width={wp(79)} height={hp(40)} />
    },
    {
        id: '6',
        C: <C6 width={wp(79)} height={hp(40)} />
    },
];


const P4 = () => {
    // const data = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
    const [showComponents, setShowComponents] = useState(0);
    return (
        <>
            <View>
                <P3 width={wp(100)} height={hp(61)} />
                <View style={{ position: 'absolute' }} >
                        <C1 width={wp(79)} height={hp(40)} />
                        <C1 width={wp(79)} height={hp(40)} />
                        <C1 width={wp(79)} height={hp(40)} />
                        <C1 width={wp(79)} height={hp(40)} />
                        <C1 width={wp(79)} height={hp(40)} />
                        <C1 width={wp(79)} height={hp(40)} />
                    {/* <AutoScrollingList data={data} /> */}
                </View>

            </View>
        </>
    );
}


const slides = [
    {
        id: '1',
        P: <P1 width={wp(100)} height={hp(58)} />,
        title: 'Understanding Your Needs',
        subtitle: 'Get clarity with scientifically backed tests covering depression, anxiety, relationships, ADHD, and more!',
    },
    {
        id: '2',
        P: <P2 width={wp(100)} height={hp(56)} />,
        title: 'Meet Your Perfect Match',
        subtitle: 'Connect with skilled therapists who understand your needs, offering tailored care plans and regular check-ins to guide your progress',
    },
    {
        id: '3',
        P: <P4 />,
        title: 'Join Our Thriving Community',
        subtitle: 'Join 3L+ users that have benefitted and improved their mental health with our support from our team of experts',
    },
    // {
    //     id: '4',
    //     P: <C1 />,
    //     title: 'Join Our Thriving Community',
    //     subtitle: 'Join 3L+ users that have benefitted and improved their mental health with our support from our team of experts',
    // },
];

const Slide = ({ item }) => {
    return (
        <View style={{ alignItems: 'center', width: wp(100), justifyContent: 'space-between' }}>
            {item.P}
            <View style={{ alignItems: 'center' }} >
                <Text style={styles.title}>{item?.title}</Text>
                <Text style={styles.subtitle}>{item?.subtitle}</Text>
            </View>
        </View>
    );
};

const Onboarding = () => {
    const navigation = useNavigation();
    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
    const ref = React.useRef();
    const updateCurrentSlideIndex = e => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / wp(100));
        setCurrentSlideIndex(currentIndex);
    };

    const goToNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex != slides.length) {
            const offset = nextSlideIndex * width;
            ref?.current.scrollToOffset({ offset });
            setCurrentSlideIndex(currentSlideIndex + 1);
        }
    };

    // const skip = () => {
    //     const lastSlideIndex = slides.length - 1;
    //     const offset = lastSlideIndex * width;
    //     ref?.current.scrollToOffset({ offset });
    //     setCurrentSlideIndex(lastSlideIndex);
    // };

    const Footer = () => {
        return (
            <View
                style={{
                    height: hp(20),
                    // backgroundColor:'green',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    alignItems: 'center'
                }}>
                {/* Indicator container */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 20,
                    }}>
                    {/* Render indicator */}
                    {slides.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.indicator,
                                currentSlideIndex == index && {
                                    backgroundColor: theme.maincolor,
                                    width: 25,
                                },
                            ]}
                        />
                    ))}
                </View>

                {/* Render buttons */}
                <View style={{ marginBottom: 20 }}>
                    {currentSlideIndex == slides.length - 1 ? (
                        <View style={{ height: 50, marginBottom: hp(3.5), display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', width: wp(85) }}>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() =>{navigation.navigate('LoginPage')}}>
                                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff' }}>
                                    You’re All Set!
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={{ height: 50, marginBottom: hp(3.5), display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', width: wp(85) }}>
                            <View style={{ width: 15 }} />
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={goToNextSlide}
                                style={styles.btn}>
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: 15,
                                        color: '#fff',
                                        marginRight: wp(1)
                                    }}>
                                    NEXT
                                </Text>
                                <Next height={wp(5.6)} width={wp(5.6)} />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar barStyle={"dark-content"} translucent backgroundColor="transparent" />
            <FlatList
                nestedScrollEnabled={true}
                ref={ref}
                onMomentumScrollEnd={updateCurrentSlideIndex}
                contentContainerStyle={{ height: hp(80) }}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={slides}
                pagingEnabled
                renderItem={({ item }) => <Slide item={item} />}
            />
            <Footer />
        </SafeAreaView>
    )
}

export default Onboarding

const styles = StyleSheet.create({

    subtitle: {
        color: theme.black,
        fontSize: wp(4),
        marginTop: 10,
        maxWidth: '70%',
        textAlign: 'center',
        lineHeight: 23,
    },
    title: {
        color: theme.maincolor,
        fontSize: wp(6),
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },

    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    indicator: {
        height: wp(2.5),
        width: wp(2.5),
        backgroundColor: 'rgba(1, 129, 140, 0.2)',
        marginHorizontal: 3,
        borderRadius: wp(2),
    },
    btn: {
        height: hp(5.1),
        borderRadius: wp(5),
        width: wp(39),
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: theme.maincolor,
        justifyContent: 'center',
        alignItems: 'center',
    },

})