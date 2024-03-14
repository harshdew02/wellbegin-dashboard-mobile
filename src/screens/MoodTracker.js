import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, Button, ScrollView } from 'react-native'
import React, { useState } from 'react';
import TopBarMain from '../components/TopBarMain'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";
import Back from '../components/Back';
import { Happy, Surprised, Sad, Disgust, Fear, Angry } from '../components/moods/';
import { Work, Health, Friendship, Finance, Love, Personal, Family, Leisure } from '../components/spheres/'
import { ArrowRightIcon } from 'react-native-heroicons/solid';
import BottomQuote from '../../assets/images/BottomQuote.svg';


const HappyFeeling = [
    {
        value: "Content"
    },
    {
        value: "Trusting"
    },
    {
        value: "Pleased"
    },
    {
        value: "Joyful"
    },
    {
        value: "Valued"
    },
    {
        value: "Thankful"
    },
    {
        value: "Inspired"
    },
    {
        value: "Proud"
    },
    {
        value: "Accepted"
    },
    {
        value: "Aroused"
    },
    {
        value: "Optimistic"
    },
    {
        value: "Powerful"
    },
    {
        value: "Free"
    },
    {
        value: "Curious"
    },
    {
        value: "Successful"
    },
    {
        value: "Respected"
    },
    {
        value: "Courageous"
    },
    {
        value: "Sensitive"
    },
    {
        value: "Energetic"
    },
    {
        value: "Creative"
    },
    {
        value: "Intimate"
    },
    {
        value: "Loving"
    },
    {
        value: "Hopeful"
    },
    {
        value: "Euphoric"
    },
    {
        value: "Relaxed"
    },
    {
        value: "Amused"
    },
    {
        value: "Intrigued"
    }
];
const SurprisedFeeling = [
    { value: "Startled" },
    { value: "Shocked" },
    { value: "Flabbergasted" },
    { value: "Awe" },
    { value: "Excited" },
    { value: "Dismayed" },
    { value: "Astonished" },
    { value: "Eager" }
];
const SadFeeling = [
    { value: "Hurt" },
    { value: "Vulnerable" },
    { value: "Depressed" },
    { value: "Lonely" },
    { value: "Guilty" },
    { value: "Isolated" },
    { value: "Fragile" },
    { value: "Victimized" },
    { value: "Abandoned" },
    { value: "Despair" },
    { value: "Grief" },
    { value: "Empty" },
    { value: "Powerless" },
    { value: "Ashamed" },
    { value: "Remorseful" }
];
const DisgustFeeling = [
    { value: "Disappointed" },
    { value: "Disapprove" },
    { value: "Awful" },
    { value: "Tense" },
    { value: "Repelled" },
    { value: "Judgmental" },
    { value: "Embarrassed" },
    { value: "Nauseated" },
    { value: "Offended" },
    { value: "Grossed Out" },
    { value: "Revolted" },
    { value: "Hesitant" },
    { value: "Horrified" },
    { value: "Dismissed" },
    { value: "Outraged" },
    { value: "Bothered" }
];
const FearFeeling = [
    { value: "Scared" },
    { value: "Rejected" },
    { value: "Worried" },
    { value: "Anxious" },
    { value: "Threatened" },
    { value: "Weak" },
    { value: "Insecure" },
    { value: "Afraid" },
    { value: "Helpless" },
    { value: "Inferior" },
    { value: "Worthless" },
    { value: "Insignificant" },
    { value: "Excluded" },
    { value: "Nervous" },
    { value: "Skeptical" }
];
const AngryFeeling = [
    { value: "Let Down" },
    { value: "Aggressive" },
    { value: "Resentful" },
    { value: "Critical" },
    { value: "Humiliated" },
    { value: "Frustrated" },
    { value: "Mad" },
    { value: "Distant" },
    { value: "Disrespected" },
    { value: "Violated" },
    { value: "Bitter" },
    { value: "Betrayed" },
    { value: "Furious" },
    { value: "Hostile" },
    { value: "Annoyed" },
    { value: "Withdrawn" },
    { value: "Numb" }
];

const components = [Work, Health, Friendship, Finance, Love, Personal, Family, Leisure];
const MoodTracker = () => {

    const navigation = useNavigation();
    const [select, setSelect] = useState(1);
    const [clicked, setclick] = useState(true);
    const [data, setData] = useState(HappyFeeling);

    return (
        <SafeAreaView>

            <View style={[styles.cardContainer, {  height: hp(20), backgroundColor: '#F7FBFD' }]}>

                <View className=" justify-center items-center" style={{ marginTop: hp(1.8) }} >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", left: 0 }} >
                        <Back color={'#043953'} />
                    </TouchableOpacity>
                    <Text style={{ color: '#455a64', fontSize: wp(4.2), fontWeight: '700' }}>
                        Update Your Mood Tracker
                    </Text>
                </View>

                <View className="flex-row justify-between " style={{ width: "100%", marginTop: hp(3) }}>
                    <View className="items-center" >
                        <TouchableOpacity>
                            <Happy isSelect={select} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: wp(3), color: '#455a64', marginTop: hp(1) }} >
                            Happy
                        </Text>
                    </View>
                    <View className="items-center" >
                        <TouchableOpacity>
                            <Surprised isSelect={select} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: wp(3), color: '#455a64', marginTop: hp(1) }} >
                            Surprised
                        </Text>
                    </View>
                    <View className="items-center" >
                        <TouchableOpacity>
                            <Sad isSelect={select} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: wp(3), color: '#455a64', marginTop: hp(1) }} >
                            Sad
                        </Text>
                    </View>
                    <View className="items-center" >
                        <TouchableOpacity>
                            <Disgust isSelect={select} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: wp(3), color: '#455a64', marginTop: hp(1) }} >
                            Disgust
                        </Text>
                    </View>
                    <View className="items-center" >
                        <TouchableOpacity>
                            <Fear isSelect={select} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: wp(3), color: '#455a64', marginTop: hp(1) }} >
                            Fear
                        </Text>
                    </View>
                    <View className="items-center" >
                        <TouchableOpacity>
                            <Angry isSelect={select} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: wp(3), color: '#455a64', marginTop: hp(1) }} >
                            Angry
                        </Text>
                    </View>
                </View>
            </View>

            <ScrollView style={{ width: wp(100), height: hp(80) }} >

                <Text style={{ width: wp(100), textAlign: 'center', color: '#455a64', fontSize: wp(4), fontWeight: '500', marginTop: hp(1.5) }} >
                    Choose 3 Emotions You’re Feeling
                </Text>

                <View style={[{
                    width: wp(100),
                    paddingHorizontal: wp(8), marginTop: hp(1.5), display: 'flex', flexDirection: 'row',
                    flexWrap: 'wrap', justifyContent: 'space-between',
                }]} >
                    {data.map(feeling => (
                        <TouchableOpacity
                            // className="items-center"
                            key={feeling.value}
                            onPress={() => setclick(!clicked)}
                            style={{
                                backgroundColor: (clicked) ? '#01818c' : '#f2f3f4',
                                borderRadius: wp(8),
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingHorizontal: wp(2.5),
                                paddingVertical: wp(2),
                                marginVertical: hp(0.8)
                            }}
                        >
                            <Text style={{ fontSize: wp(3.5), fontWeight: '500', color: (clicked) ? '#fff' : '#455A64' }}>
                                {feeling.value}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={{ width: wp(100), textAlign: 'center', color: '#455a64', fontSize: wp(4), fontWeight: '500', marginTop: hp(2, 5) }} >
                    Spheres of Life
                </Text>

                <View style={[styles.cardContainer, { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: hp(1.5) }]} >
                    {components.map((Component, index) => (
                        <View className=" items-center " style={{ marginBottom: hp(4) }} >
                            <TouchableOpacity
                                key={index}
                                style={{
                                    width: wp(18),
                                    height: hp(7.3),
                                    backgroundColor: clicked ? '#A4DEDF66' : '#455A640A',
                                    borderRadius: wp(2.5),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Component isClicked={clicked} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: wp(3.5), fontWeight: 'normal', color: '#455A64', marginTop: hp(0.5) }} >
                                {Component.name}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={[{ marginTop: hp(1) }, styles.cardContainer]} >
                    <TouchableOpacity className="flex-row " activeOpacity={.4} style={styles.BookBtn}>
                        <Text style={styles.btnText}>
                            Next
                        </Text>
                        <ArrowRightIcon size={wp(6.5)} color="#fff" />
                    </TouchableOpacity>
                </View>


                <View className="flex-row items-center" style={[{
                    width: wp(100),
                    paddingHorizontal: wp(8), height: hp(20), marginTop: hp(3), backgroundColor: '#EBEFF2CC'
                }]}>
                    <BottomQuote width={wp(71)} height={hp(15)} />
                </View>

            </ScrollView>
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
        // height: hp(20),
    },
    BookBtn: {
        marginTop: hp(2),
        width: wp(84),
        height: hp(6),
        backgroundColor: '#01818C',
        borderRadius: wp(6),
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: wp(5),
        fontFamily: 'Roboto',
        marginRight: wp(2),
        fontWeight: '600',
    },
});