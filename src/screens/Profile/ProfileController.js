import React from "react";
import { useAuth } from "../../utils/auth";
import ProfileScreen from "./Profile/Profile";
import AboutMe from "./Profile/AboutMe";

export const Profilecontroller = (props) => {
    const data = props.route.params.data.route.params; 
    const { getAllowed } = useAuth();
    console.log("It is allowed: ",getAllowed());
    return (
        <>
            {getAllowed() ? <ProfileScreen props={data} /> : <AboutMe route={{params:data}} />}
        </>
    )
}