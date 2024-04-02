import React from "react";
import { useAuth } from "../utils/auth";
import HomeScreen from "../screens/HomeScreen";
import HomeScreen2 from "../screens/HomeScreen2";

export const HomescreenControl = (props) => {
    console.log(props.route.params.data.route.params)
    const data = props.route.params.data.route.params;
    const {getUser} = useAuth();
    console.log("Homescreen controller: ", getUser())
    return (
        getUser() ? <HomeScreen2 props = {data} /> : <HomeScreen props = {data} />
    )
}