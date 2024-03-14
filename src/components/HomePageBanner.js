import * as React from "react";
import Svg, { Path } from "react-native-svg";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const HomePageBanner = (props) => (
<Svg
    width={wp(100)}
    height={wp(66.66)}
    viewBox="0 0 375 250"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M375 0H0V214V234.411V249.166L20.8333 246.24C41.6667 243.259 83.3333 237.49 125 237.449C148.9 237.472 172.799 239.381 196.699 241.289C214.466 242.707 232.233 244.126 250 244.77C290.032 246.222 330.065 243.489 351.62 242.018C352.5 241.958 353.35 241.9 354.167 241.844L375 240.375V234.411V214V0Z"
      fill="#01818C"
    />
  </Svg>
);
export default HomePageBanner;
