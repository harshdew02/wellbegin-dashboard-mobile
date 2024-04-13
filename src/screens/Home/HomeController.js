import React from "react";
import { useAuth } from "../../utils/auth";
import HomeScreen from "../Home/Home/Home_Old";
import HomeScreen2 from "../Home/Home/Home_New";

export const HomescreenControl = (props) => {
    const data = props.route.params.data.route.params;
    const { getUser } = useAuth();
    data.category = getUser().category;
    return (
        <>
            {getUser().type === "new" ? <HomeScreen2 props={data} /> : <HomeScreen props={data} />}
        </>
    )
}