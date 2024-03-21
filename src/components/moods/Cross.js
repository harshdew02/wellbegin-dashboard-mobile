import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Cross = (props) => (
    <Svg
        width={wp(8)}
        height={wp(8)}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={15} cy={15} r={15} fill="#FEFCF7" />
    <Circle cx={15} cy={15} r={14.5} stroke="#455A64" strokeOpacity={0.5} />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.46934 8.47015C8.60997 8.3297 8.80059 8.25081 8.99934 8.25081C9.19809 8.25081 9.38871 8.3297 9.52934 8.47015L14.9993 13.9402L20.4693 8.47015C20.538 8.39647 20.6208 8.33736 20.7128 8.29637C20.8048 8.25538 20.9041 8.23334 21.0048 8.23156C21.1055 8.22979 21.2055 8.24831 21.2989 8.28603C21.3923 8.32375 21.4772 8.3799 21.5484 8.45112C21.6196 8.52233 21.6757 8.60717 21.7135 8.70056C21.7512 8.79394 21.7697 8.89397 21.7679 8.99468C21.7662 9.09538 21.7441 9.19469 21.7031 9.28669C21.6621 9.37869 21.603 9.46149 21.5293 9.53015L16.0593 15.0002L21.5293 20.4702C21.603 20.5388 21.6621 20.6216 21.7031 20.7136C21.7441 20.8056 21.7662 20.9049 21.7679 21.0056C21.7697 21.1063 21.7512 21.2064 21.7135 21.2998C21.6757 21.3931 21.6196 21.478 21.5484 21.5492C21.4772 21.6204 21.3923 21.6766 21.2989 21.7143C21.2055 21.752 21.1055 21.7705 21.0048 21.7687C20.9041 21.767 20.8048 21.7449 20.7128 21.7039C20.6208 21.6629 20.538 21.6038 20.4693 21.5302L14.9993 16.0602L9.52934 21.5302C9.38717 21.6626 9.19912 21.7348 9.00482 21.7313C8.81052 21.7279 8.62513 21.6492 8.48772 21.5118C8.35031 21.3744 8.27159 21.189 8.26817 20.9947C8.26474 20.8004 8.33686 20.6123 8.46934 20.4702L13.9393 15.0002L8.46934 9.53015C8.32889 9.38953 8.25 9.1989 8.25 9.00015C8.25 8.8014 8.32889 8.61078 8.46934 8.47015Z"
      fill="#455A64"
      fillOpacity={0.45}
    />
    </Svg>
);
export default Cross;
