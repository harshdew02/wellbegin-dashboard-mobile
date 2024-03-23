import * as React from "react";
import Svg, { Path } from "react-native-svg";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Finance = ({ isClicked, w=9.3, h=10.4 }) => (
    <Svg
        width={wp(w)}
        height={wp(h)}
        viewBox="0 0 35 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    // {...props}
    >
        <Path
            d="M12.2803 10.9878C12.2803 11.1493 12.3612 11.3111 12.4418 11.4726C12.5227 11.5535 12.765 11.715 13.088 11.7959V10.2607C12.8457 10.2607 12.6033 10.3416 12.4418 10.5031C12.3612 10.6646 12.2803 10.8261 12.2803 10.9878Z"
            // fill="#455A64"
            fill={(isClicked) ? '#01818c' : '#455A64'}
            // fillOpacity={0.55}
            fillOpacity={(isClicked) ? 1 : 0.55}
        />
        <Path
            d="M13.7358 13.089V14.7048C14.0591 14.7048 14.2206 14.6239 14.3821 14.4624C14.5436 14.3009 14.6245 14.1391 14.6245 13.9776C14.6245 13.7353 14.5436 13.5738 14.463 13.4929C14.3015 13.2505 14.0591 13.1699 13.7358 13.089Z"
            // fill="#455A64"
            fill={(isClicked) ? '#01818c' : '#455A64'}
            // fillOpacity={0.55}
            fillOpacity={(isClicked) ? 1 : 0.55}
        />
        <Path
            d="M24.9647 7.10968C24.9647 7.35207 25.0456 7.51356 25.1262 7.59445C25.2877 7.75595 25.5301 7.83684 25.8534 7.99833V6.30164C25.5301 6.30164 25.3686 6.38252 25.2071 6.54402C25.0456 6.70552 24.9647 6.9479 24.9647 7.10968Z"
            // fill="#455A64"
            fill={(isClicked) ? '#01818c' : '#455A64'}
            // fillOpacity={0.55}
            fillOpacity={(isClicked) ? 1 : 0.55}
        />
        <Path
            d="M26.5024 9.37201V11.1496C26.8257 11.1496 27.0681 10.9881 27.2296 10.9072C27.3911 10.7457 27.472 10.5839 27.472 10.3416C27.472 10.0992 27.3911 9.93767 27.2296 9.77589C27.1487 9.61439 26.9063 9.45289 26.5024 9.37201Z"
            // fill="#455A64"
            fill={(isClicked) ? '#01818c' : '#455A64'}
            // fillOpacity={0.55}
            fillOpacity={(isClicked) ? 1 : 0.55}
        />
        <Path
            d="M25.2065 28.9249C25.2065 30.1369 26.257 31.1873 27.4689 31.1873L32.8014 31.187V26.6626H27.4689C26.257 26.6626 25.2065 27.6321 25.2065 28.9249ZM28.5191 28.9249C28.5191 29.5712 28.0343 30.056 27.388 30.056C26.7417 30.056 26.257 29.5712 26.257 28.9249C26.257 28.2787 26.7417 27.7939 27.388 27.7939C28.0343 27.713 28.5191 28.2784 28.5191 28.9249Z"
            // fill="#455A64"
            fill={(isClicked) ? '#01818c' : '#455A64'}
            // fillOpacity={0.55}
            fillOpacity={(isClicked) ? 1 : 0.55}
        />
        <Path
            d="M30.6213 16.4019C33.2067 14.8667 34.9034 12.0389 34.9034 8.8069C34.9034 3.95919 30.9443 0 26.0965 0C22.2992 0.000270516 19.0673 2.42413 17.775 5.81753C16.4822 5.00948 14.9473 4.4441 13.3312 4.4441C9.9378 4.4441 7.11006 6.46407 5.81725 9.45331H4.20144C1.93908 9.45331 0 11.3115 0 13.6548V34.5809C0 36.9239 1.8582 38.7824 4.20144 38.7824L29.5709 38.7821C31.3485 38.7821 32.8028 37.3278 32.8028 35.5502V32.8031H27.4703C25.3697 32.8031 23.5921 31.0255 23.5921 28.9249C23.5921 26.8243 25.3697 25.0467 27.4703 25.0467L32.8028 25.047V19.4721C32.8028 18.0178 31.9139 16.8059 30.6213 16.4017V16.4019ZM4.2013 16.2404C2.74699 16.2404 1.61595 15.1093 1.61595 13.655C1.61595 12.2007 2.74699 11.0697 4.2013 11.0697H5.41323C5.33234 11.5544 5.25173 12.0392 5.25173 12.6049C5.25173 13.8977 5.575 15.1902 6.14039 16.2407L4.2013 16.2404ZM15.189 15.1093C14.7851 15.4326 14.3003 15.5941 13.7347 15.675V16.2407H13.169V15.675C12.361 15.5941 11.6338 15.2711 10.9875 14.7055L11.6338 13.8974C12.1186 14.3013 12.6842 14.6246 13.169 14.7055L13.1693 12.9279C12.523 12.7664 12.0382 12.524 11.715 12.2816C11.3917 12.0392 11.2302 11.6353 11.2302 11.1506C11.2302 10.6658 11.3917 10.181 11.7959 9.85775C12.1191 9.53447 12.6039 9.37298 13.1693 9.29209V8.88793H13.7349V9.37271C14.3812 9.45359 15.0278 9.61509 15.5931 10.019L15.0275 10.827C14.6236 10.5846 14.2194 10.3422 13.7347 10.3422V12.0389C14.3809 12.2004 14.9466 12.4428 15.2699 12.6852C15.5931 12.9276 15.7546 13.3315 15.7546 13.8971C15.7546 14.3013 15.5931 14.7861 15.189 15.1093ZM17.2898 8.64554C16.3203 7.676 14.866 7.02973 13.4117 7.02973C10.3415 7.02973 7.83681 9.53447 7.83681 12.6046C7.83681 13.978 8.32158 15.2708 9.21023 16.2404H7.91742C7.19026 15.19 6.78638 13.978 6.78638 12.6046C6.78638 8.96882 9.77589 5.9793 13.4117 5.9793C14.9469 5.9793 16.3203 6.46407 17.4513 7.35273C17.3704 7.75688 17.2898 8.16077 17.2898 8.64554ZM18.8248 16.2405H17.5319C18.0976 15.5942 18.5824 14.7053 18.7439 13.8167C18.9863 14.1399 19.2286 14.4629 19.471 14.7862C19.3904 15.271 19.148 15.7557 18.8248 16.2405ZM20.6023 16.2405C20.6832 16.1596 20.6832 15.9981 20.7638 15.9172C20.9253 16.0787 21.0871 16.1596 21.2486 16.2405H20.6023ZM26.0963 15.9981C22.1373 15.9981 18.9058 12.7662 18.9058 8.8076C18.9058 4.84854 22.1377 1.61706 26.0963 1.61706C30.0554 1.61706 33.2869 4.84896 33.2869 8.8076C33.2871 12.7664 30.0552 15.9981 26.0963 15.9981Z"
            // fill="#455A64"
            fill={(isClicked) ? '#01818c' : '#455A64'}
            // fillOpacity={0.55}
            fillOpacity={(isClicked) ? 1 : 0.55}
        />
        <Path
            d="M26.0978 2.74713C22.7853 2.74713 20.0382 5.49426 20.0382 8.80677C20.0382 12.1193 22.7853 14.8664 26.0978 14.8664C29.4104 14.8664 32.1575 12.1193 32.1575 8.80677C32.1575 5.49398 29.4106 2.74713 26.0978 2.74713ZM28.1178 11.5533C27.7139 11.8766 27.1483 12.119 26.502 12.119V12.8462H25.8557L25.8555 12.119C24.9668 12.0381 24.1588 11.7151 23.4316 11.0686L24.1588 10.2605C24.7244 10.7453 25.2898 10.9877 25.8555 11.0686V9.21037C25.1283 9.04888 24.5627 8.80649 24.2397 8.48322C23.9164 8.24083 23.7549 7.83695 23.7549 7.27129C23.7549 6.70563 23.9164 6.22086 24.3205 5.89787C24.7244 5.57459 25.2092 5.33221 25.8557 5.33221L25.8555 4.76655H26.5017V5.25132C27.2289 5.33221 27.8752 5.57459 28.5217 5.97848L27.8754 6.86713C27.4716 6.54386 26.9868 6.38236 26.502 6.30147V8.15967C27.2292 8.32117 27.7948 8.56355 28.1178 8.88683C28.4411 9.2101 28.6026 9.61398 28.6026 10.1796C28.6835 10.7456 28.5217 11.2303 28.1178 11.5533Z"
            // fill="#455A64"
            fill={(isClicked) ? '#01818c' : '#455A64'}
            // fillOpacity={0.55}
            fillOpacity={(isClicked) ? 1 : 0.55}
        />
    </Svg>
);
export default Finance;
