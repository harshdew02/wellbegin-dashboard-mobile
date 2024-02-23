import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
const ProfileStack = createStackNavigator();

import ProfileScreen from '../screens/ProfileScreen';
import AboutMe from '../screens/AboutMe';


export default function ProfileNavigator() {
    return (
        <ProfileStack.Navigator
            screenOptions={{
                contentStyle: {
                    backgroundColor: '#FFF'
                },
                headerShown: false
            }}
            initialRouteName={'profile'}
        >
            <ProfileStack.Screen name="profile" component={ProfileScreen} />
            <ProfileStack.Screen name="aboutMe" component={AboutMe} />
        </ProfileStack.Navigator>
    )
}

const styles = StyleSheet.create({})