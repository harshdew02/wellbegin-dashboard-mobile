import {
    View,
    Text,
    SafeAreaView,
    Image,
    StatusBar,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Dropdown } from "react-native-element-dropdown";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";

const data = [
    {
        name: "Afghanistan",
        dial_code: "+93",
        code: "AF",
        ccode: "93",
    },
    {
        name: "Aland Islands",
        dial_code: "+358",
        code: "AX",
        ccode: "358",
    },
    {
        name: "Albania",
        dial_code: "+355",
        code: "AL",
        ccode: "355",
    },
    {
        name: "Algeria",
        dial_code: "+213",
        code: "DZ",
        ccode: "213",
    },
    {
        name: "AmericanSamoa",
        dial_code: "+1684",
        code: "AS",
        ccode: "1684",
    },
    {
        name: "Andorra",
        dial_code: "+376",
        code: "AD",
        ccode: "376",
    },
    {
        name: "Angola",
        dial_code: "+244",
        code: "AO",
        ccode: "244",
    },
    {
        name: "Anguilla",
        dial_code: "+1264",
        code: "AI",
        ccode: "1264",
    },
    {
        name: "Antarctica",
        dial_code: "+672",
        code: "AQ",
        ccode: "672",
    },
    {
        name: "Antigua and Barbuda",
        dial_code: "+1268",
        code: "AG",
        ccode: "1268",
    },
    {
        name: "Argentina",
        dial_code: "+54",
        code: "AR",
        ccode: "54",
    },
    {
        name: "Armenia",
        dial_code: "+374",
        code: "AM",
        ccode: "374",
    },
    {
        name: "Aruba",
        dial_code: "+297",
        code: "AW",
        ccode: "297",
    },
    {
        name: "Australia",
        dial_code: "+61",
        code: "AU",
        ccode: "61",
    },
    {
        name: "Austria",
        dial_code: "+43",
        code: "AT",
        ccode: "43",
    },
    {
        name: "Azerbaijan",
        dial_code: "+994",
        code: "AZ",
        ccode: "994",
    },
    {
        name: "Bahamas",
        dial_code: "+1242",
        code: "BS",
        ccode: "1242",
    },
    {
        name: "Bahrain",
        dial_code: "+973",
        code: "BH",
        ccode: "973",
    },
    {
        name: "Bangladesh",
        dial_code: "+880",
        code: "BD",
        ccode: "880",
    },
    {
        name: "Barbados",
        dial_code: "+1246",
        code: "BB",
        ccode: "1246",
    },
    {
        name: "Belarus",
        dial_code: "+375",
        code: "BY",
        ccode: "375",
    },
    {
        name: "Belgium",
        dial_code: "+32",
        code: "BE",
        ccode: "32",
    },
    {
        name: "Belize",
        dial_code: "+501",
        code: "BZ",
        ccode: "501",
    },
    {
        name: "Benin",
        dial_code: "+229",
        code: "BJ",
        ccode: "229",
    },
    {
        name: "Bermuda",
        dial_code: "+1441",
        code: "BM",
        ccode: "1441",
    },
    {
        name: "Bhutan",
        dial_code: "+975",
        code: "BT",
        ccode: "975",
    },
    {
        name: "Bolivia, Plurinational State of",
        dial_code: "+591",
        code: "BO",
        ccode: "591",
    },
    {
        name: "Bosnia and Herzegovina",
        dial_code: "+387",
        code: "BA",
        ccode: "387",
    },
    {
        name: "Botswana",
        dial_code: "+267",
        code: "BW",
        ccode: "267",
    },
    {
        name: "Brazil",
        dial_code: "+55",
        code: "BR",
        ccode: "55",
    },
    {
        name: "British Indian Ocean Territory",
        dial_code: "+246",
        code: "IO",
        ccode: "246",
    },
    {
        name: "Brunei Darussalam",
        dial_code: "+673",
        code: "BN",
        ccode: "673",
    },
    {
        name: "Bulgaria",
        dial_code: "+359",
        code: "BG",
        ccode: "359",
    },
    {
        name: "Burkina Faso",
        dial_code: "+226",
        code: "BF",
        ccode: "226",
    },
    {
        name: "Burundi",
        dial_code: "+257",
        code: "BI",
        ccode: "257",
    },
    {
        name: "Cambodia",
        dial_code: "+855",
        code: "KH",
        ccode: "855",
    },
    {
        name: "Cameroon",
        dial_code: "+237",
        code: "CM",
        ccode: "237",
    },
    {
        name: "Canada",
        dial_code: "+1",
        code: "CA",
        ccode: "1",
    },
    {
        name: "Cape Verde",
        dial_code: "+238",
        code: "CV",
        ccode: "238",
    },
    {
        name: "Cayman Islands",
        dial_code: "+ 345",
        code: "KY",
        ccode: "345",
    },
    {
        name: "Central African Republic",
        dial_code: "+236",
        code: "CF",
        ccode: "236",
    },
    {
        name: "Chad",
        dial_code: "+235",
        code: "TD",
        ccode: "235",
    },
    {
        name: "Chile",
        dial_code: "+56",
        code: "CL",
        ccode: "56",
    },
    {
        name: "China",
        dial_code: "+86",
        code: "CN",
        ccode: "86",
    },
    {
        name: "Christmas Island",
        dial_code: "+61",
        code: "CX",
        ccode: "61",
    },
    {
        name: "Cocos (Keeling) Islands",
        dial_code: "+61",
        code: "CC",
        ccode: "61",
    },
    {
        name: "Colombia",
        dial_code: "+57",
        code: "CO",
        ccode: "57",
    },
    {
        name: "Comoros",
        dial_code: "+269",
        code: "KM",
        ccode: "269",
    },
    {
        name: "Congo",
        dial_code: "+242",
        code: "CG",
        ccode: "242",
    },
    {
        name: "Congo, The Democratic Republic of the Congo",
        dial_code: "+243",
        code: "CD",
        ccode: "243",
    },
    {
        name: "Cook Islands",
        dial_code: "+682",
        code: "CK",
        ccode: "682",
    },
    {
        name: "Costa Rica",
        dial_code: "+506",
        code: "CR",
        ccode: "506",
    },
    {
        name: "Cote d'Ivoire",
        dial_code: "+225",
        code: "CI",
        ccode: "225",
    },
    {
        name: "Croatia",
        dial_code: "+385",
        code: "HR",
        ccode: "385",
    },
    {
        name: "Cuba",
        dial_code: "+53",
        code: "CU",
        ccode: "53",
    },
    {
        name: "Cyprus",
        dial_code: "+357",
        code: "CY",
        ccode: "357",
    },
    {
        name: "Czech Republic",
        dial_code: "+420",
        code: "CZ",
        ccode: "420",
    },
    {
        name: "Denmark",
        dial_code: "+45",
        code: "DK",
        ccode: "45",
    },
    {
        name: "Djibouti",
        dial_code: "+253",
        code: "DJ",
        ccode: "253",
    },
    {
        name: "Dominica",
        dial_code: "+1767",
        code: "DM",
        ccode: "1767",
    },
    {
        name: "Dominican Republic",
        dial_code: "+1849",
        code: "DO",
        ccode: "1849",
    },
    {
        name: "Ecuador",
        dial_code: "+593",
        code: "EC",
        ccode: "593",
    },
    {
        name: "Egypt",
        dial_code: "+20",
        code: "EG",
        ccode: "20",
    },
    {
        name: "El Salvador",
        dial_code: "+503",
        code: "SV",
        ccode: "503",
    },
    {
        name: "Equatorial Guinea",
        dial_code: "+240",
        code: "GQ",
        ccode: "240",
    },
    {
        name: "Eritrea",
        dial_code: "+291",
        code: "ER",
        ccode: "291",
    },
    {
        name: "Estonia",
        dial_code: "+372",
        code: "EE",
        ccode: "372",
    },
    {
        name: "Ethiopia",
        dial_code: "+251",
        code: "ET",
        ccode: "251",
    },
    {
        name: "Falkland Islands (Malvinas)",
        dial_code: "+500",
        code: "FK",
        ccode: "500",
    },
    {
        name: "Faroe Islands",
        dial_code: "+298",
        code: "FO",
        ccode: "298",
    },
    {
        name: "Fiji",
        dial_code: "+679",
        code: "FJ",
        ccode: "679",
    },
    {
        name: "Finland",
        dial_code: "+358",
        code: "FI",
        ccode: "358",
    },
    {
        name: "France",
        dial_code: "+33",
        code: "FR",
        ccode: "33",
    },
    {
        name: "French Guiana",
        dial_code: "+594",
        code: "GF",
        ccode: "594",
    },
    {
        name: "French Polynesia",
        dial_code: "+689",
        code: "PF",
        ccode: "689",
    },
    {
        name: "Gabon",
        dial_code: "+241",
        code: "GA",
        ccode: "241",
    },
    {
        name: "Gambia",
        dial_code: "+220",
        code: "GM",
        ccode: "220",
    },
    {
        name: "Georgia",
        dial_code: "+995",
        code: "GE",
        ccode: "995",
    },
    {
        name: "Germany",
        dial_code: "+49",
        code: "DE",
        ccode: "49",
    },
    {
        name: "Ghana",
        dial_code: "+233",
        code: "GH",
        ccode: "233",
    },
    {
        name: "Gibraltar",
        dial_code: "+350",
        code: "GI",
        ccode: "350",
    },
    {
        name: "Greece",
        dial_code: "+30",
        code: "GR",
        ccode: "30",
    },
    {
        name: "Greenland",
        dial_code: "+299",
        code: "GL",
        ccode: "299",
    },
    {
        name: "Grenada",
        dial_code: "+1473",
        code: "GD",
        ccode: "1473",
    },
    {
        name: "Guadeloupe",
        dial_code: "+590",
        code: "GP",
        ccode: "590",
    },
    {
        name: "Guam",
        dial_code: "+1671",
        code: "GU",
        ccode: "1671",
    },
    {
        name: "Guatemala",
        dial_code: "+502",
        code: "GT",
        ccode: "502",
    },
    {
        name: "Guernsey",
        dial_code: "+44",
        code: "GG",
        ccode: "44",
    },
    {
        name: "Guinea",
        dial_code: "+224",
        code: "GN",
        ccode: "224",
    },
    {
        name: "Guinea-Bissau",
        dial_code: "+245",
        code: "GW",
        ccode: "245",
    },
    {
        name: "Guyana",
        dial_code: "+595",
        code: "GY",
        ccode: "595",
    },
    {
        name: "Haiti",
        dial_code: "+509",
        code: "HT",
        ccode: "509",
    },
    {
        name: "Holy See (Vatican City State)",
        dial_code: "+379",
        code: "VA",
        ccode: "379",
    },
    {
        name: "Honduras",
        dial_code: "+504",
        code: "HN",
        ccode: "504",
    },
    {
        name: "Hong Kong",
        dial_code: "+852",
        code: "HK",
        ccode: "852",
    },
    {
        name: "Hungary",
        dial_code: "+36",
        code: "HU",
        ccode: "36",
    },
    {
        name: "Iceland",
        dial_code: "+354",
        code: "IS",
        ccode: "354",
    },
    {
        name: "India",
        dial_code: "+91",
        code: "IN",
        ccode: "91",
    },
    {
        name: "Indonesia",
        dial_code: "+62",
        code: "ID",
        ccode: "62",
    },
    {
        name: "Iran, Islamic Republic of Persian Gulf",
        dial_code: "+98",
        code: "IR",
        ccode: "98",
    },
    {
        name: "Iraq",
        dial_code: "+964",
        code: "IQ",
        ccode: "964",
    },
    {
        name: "Ireland",
        dial_code: "+353",
        code: "IE",
        ccode: "353",
    },
    {
        name: "Isle of Man",
        dial_code: "+44",
        code: "IM",
        ccode: "44",
    },
    {
        name: "Israel",
        dial_code: "+972",
        code: "IL",
        ccode: "972",
    },
    {
        name: "Italy",
        dial_code: "+39",
        code: "IT",
        ccode: "39",
    },
    {
        name: "Jamaica",
        dial_code: "+1876",
        code: "JM",
        ccode: "1876",
    },
    {
        name: "Japan",
        dial_code: "+81",
        code: "JP",
        ccode: "81",
    },
    {
        name: "Jersey",
        dial_code: "+44",
        code: "JE",
        ccode: "44",
    },
    {
        name: "Jordan",
        dial_code: "+962",
        code: "JO",
        ccode: "962",
    },
    {
        name: "Kazakhstan",
        dial_code: "+77",
        code: "KZ",
        ccode: "77",
    },
    {
        name: "Kenya",
        dial_code: "+254",
        code: "KE",
        ccode: "254",
    },
    {
        name: "Kiribati",
        dial_code: "+686",
        code: "KI",
        ccode: "686",
    },
    {
        name: "Korea, Democratic People's Republic of Korea",
        dial_code: "+850",
        code: "KP",
        ccode: "850",
    },
    {
        name: "Korea, Republic of South Korea",
        dial_code: "+82",
        code: "KR",
        ccode: "82",
    },
    {
        name: "Kuwait",
        dial_code: "+965",
        code: "KW",
        ccode: "965",
    },
    {
        name: "Kyrgyzstan",
        dial_code: "+996",
        code: "KG",
        ccode: "996",
    },
    {
        name: "Laos",
        dial_code: "+856",
        code: "LA",
        ccode: "856",
    },
    {
        name: "Latvia",
        dial_code: "+371",
        code: "LV",
        ccode: "371",
    },
    {
        name: "Lebanon",
        dial_code: "+961",
        code: "LB",
        ccode: "961",
    },
    {
        name: "Lesotho",
        dial_code: "+266",
        code: "LS",
        ccode: "266",
    },
    {
        name: "Liberia",
        dial_code: "+231",
        code: "LR",
        ccode: "231",
    },
    {
        name: "Libyan Arab Jamahiriya",
        dial_code: "+218",
        code: "LY",
        ccode: "218",
    },
    {
        name: "Liechtenstein",
        dial_code: "+423",
        code: "LI",
        ccode: "423",
    },
    {
        name: "Lithuania",
        dial_code: "+370",
        code: "LT",
        ccode: "370",
    },
    {
        name: "Luxembourg",
        dial_code: "+352",
        code: "LU",
        ccode: "352",
    },
    {
        name: "Macao",
        dial_code: "+853",
        code: "MO",
        ccode: "853",
    },
    {
        name: "Macedonia",
        dial_code: "+389",
        code: "MK",
        ccode: "389",
    },
    {
        name: "Madagascar",
        dial_code: "+261",
        code: "MG",
        ccode: "261",
    },
    {
        name: "Malawi",
        dial_code: "+265",
        code: "MW",
        ccode: "265",
    },
    {
        name: "Malaysia",
        dial_code: "+60",
        code: "MY",
        ccode: "60",
    },
    {
        name: "Maldives",
        dial_code: "+960",
        code: "MV",
        ccode: "960",
    },
    {
        name: "Mali",
        dial_code: "+223",
        code: "ML",
        ccode: "223",
    },
    {
        name: "Malta",
        dial_code: "+356",
        code: "MT",
        ccode: "356",
    },
    {
        name: "Marshall Islands",
        dial_code: "+692",
        code: "MH",
        ccode: "692",
    },
    {
        name: "Martinique",
        dial_code: "+596",
        code: "MQ",
        ccode: "596",
    },
    {
        name: "Mauritania",
        dial_code: "+222",
        code: "MR",
        ccode: "222",
    },
    {
        name: "Mauritius",
        dial_code: "+230",
        code: "MU",
        ccode: "230",
    },
    {
        name: "Mayotte",
        dial_code: "+262",
        code: "YT",
        ccode: "262",
    },
    {
        name: "Mexico",
        dial_code: "+52",
        code: "MX",
        ccode: "52",
    },
    {
        name: "Micronesia, Federated States of Micronesia",
        dial_code: "+691",
        code: "FM",
        ccode: "691",
    },
    {
        name: "Moldova",
        dial_code: "+373",
        code: "MD",
        ccode: "373",
    },
    {
        name: "Monaco",
        dial_code: "+377",
        code: "MC",
        ccode: "377",
    },
    {
        name: "Mongolia",
        dial_code: "+976",
        code: "MN",
        ccode: "976",
    },
    {
        name: "Montenegro",
        dial_code: "+382",
        code: "ME",
        ccode: "382",
    },
    {
        name: "Montserrat",
        dial_code: "+1664",
        code: "MS",
        ccode: "1664",
    },
    {
        name: "Morocco",
        dial_code: "+212",
        code: "MA",
        ccode: "212",
    },
    {
        name: "Mozambique",
        dial_code: "+258",
        code: "MZ",
        ccode: "258",
    },
    {
        name: "Myanmar",
        dial_code: "+95",
        code: "MM",
        ccode: "95",
    },
    {
        name: "Namibia",
        dial_code: "+264",
        code: "NA",
        ccode: "264",
    },
    {
        name: "Nauru",
        dial_code: "+674",
        code: "NR",
        ccode: "674",
    },
    {
        name: "Nepal",
        dial_code: "+977",
        code: "NP",
        ccode: "977",
    },
    {
        name: "Netherlands",
        dial_code: "+31",
        code: "NL",
        ccode: "31",
    },
    {
        name: "Netherlands Antilles",
        dial_code: "+599",
        code: "AN",
        ccode: "599",
    },
    {
        name: "New Caledonia",
        dial_code: "+687",
        code: "NC",
        ccode: "687",
    },
    {
        name: "New Zealand",
        dial_code: "+64",
        code: "NZ",
        ccode: "64",
    },
    {
        name: "Nicaragua",
        dial_code: "+505",
        code: "NI",
        ccode: "505",
    },
    {
        name: "Niger",
        dial_code: "+227",
        code: "NE",
        ccode: "227",
    },
    {
        name: "Nigeria",
        dial_code: "+234",
        code: "NG",
        ccode: "234",
    },
    {
        name: "Niue",
        dial_code: "+683",
        code: "NU",
        ccode: "683",
    },
    {
        name: "Norfolk Island",
        dial_code: "+672",
        code: "NF",
        ccode: "672",
    },
    {
        name: "Northern Mariana Islands",
        dial_code: "+1670",
        code: "MP",
        ccode: "1670",
    },
    {
        name: "Norway",
        dial_code: "+47",
        code: "NO",
        ccode: "47",
    },
    {
        name: "Oman",
        dial_code: "+968",
        code: "OM",
        ccode: "968",
    },
    {
        name: "Pakistan",
        dial_code: "+92",
        code: "PK",
        ccode: "92",
    },
    {
        name: "Palau",
        dial_code: "+680",
        code: "PW",
        ccode: "680",
    },
    {
        name: "Palestinian Territory, Occupied",
        dial_code: "+970",
        code: "PS",
        ccode: "970",
    },
    {
        name: "Panama",
        dial_code: "+507",
        code: "PA",
        ccode: "507",
    },
    {
        name: "Papua New Guinea",
        dial_code: "+675",
        code: "PG",
        ccode: "675",
    },
    {
        name: "Paraguay",
        dial_code: "+595",
        code: "PY",
        ccode: "595",
    },
    {
        name: "Peru",
        dial_code: "+51",
        code: "PE",
        ccode: "51",
    },
    {
        name: "Philippines",
        dial_code: "+63",
        code: "PH",
        ccode: "63",
    },
    {
        name: "Pitcairn",
        dial_code: "+872",
        code: "PN",
        ccode: "872",
    },
    {
        name: "Poland",
        dial_code: "+48",
        code: "PL",
        ccode: "48",
    },
    {
        name: "Portugal",
        dial_code: "+351",
        code: "PT",
        ccode: "351",
    },
    {
        name: "Puerto Rico",
        dial_code: "+1939",
        code: "PR",
        ccode: "1939",
    },
    {
        name: "Qatar",
        dial_code: "+974",
        code: "QA",
        ccode: "974",
    },
    {
        name: "Romania",
        dial_code: "+40",
        code: "RO",
        ccode: "40",
    },
    {
        name: "Russia",
        dial_code: "+7",
        code: "RU",
        ccode: "7",
    },
    {
        name: "Rwanda",
        dial_code: "+250",
        code: "RW",
        ccode: "250",
    },
    {
        name: "Reunion",
        dial_code: "+262",
        code: "RE",
        ccode: "262",
    },
    {
        name: "Saint Barthelemy",
        dial_code: "+590",
        code: "BL",
        ccode: "590",
    },
    {
        name: "Saint Helena, Ascension and Tristan Da Cunha",
        dial_code: "+290",
        code: "SH",
        ccode: "290",
    },
    {
        name: "Saint Kitts and Nevis",
        dial_code: "+1869",
        code: "KN",
        ccode: "1869",
    },
    {
        name: "Saint Lucia",
        dial_code: "+1758",
        code: "LC",
        ccode: "1758",
    },
    {
        name: "Saint Martin",
        dial_code: "+590",
        code: "MF",
        ccode: "590",
    },
    {
        name: "Saint Pierre and Miquelon",
        dial_code: "+508",
        code: "PM",
        ccode: "508",
    },
    {
        name: "Saint Vincent and the Grenadines",
        dial_code: "+1784",
        code: "VC",
        ccode: "1784",
    },
    {
        name: "Samoa",
        dial_code: "+685",
        code: "WS",
        ccode: "685",
    },
    {
        name: "San Marino",
        dial_code: "+378",
        code: "SM",
        ccode: "378",
    },
    {
        name: "Sao Tome and Principe",
        dial_code: "+239",
        code: "ST",
        ccode: "239",
    },
    {
        name: "Saudi Arabia",
        dial_code: "+966",
        code: "SA",
        ccode: "966",
    },
    {
        name: "Senegal",
        dial_code: "+221",
        code: "SN",
        ccode: "221",
    },
    {
        name: "Serbia",
        dial_code: "+381",
        code: "RS",
        ccode: "381",
    },
    {
        name: "Seychelles",
        dial_code: "+248",
        code: "SC",
        ccode: "248",
    },
    {
        name: "Sierra Leone",
        dial_code: "+232",
        code: "SL",
        ccode: "232",
    },
    {
        name: "Singapore",
        dial_code: "+65",
        code: "SG",
        ccode: "65",
    },
    {
        name: "Slovakia",
        dial_code: "+421",
        code: "SK",
        ccode: "421",
    },
    {
        name: "Slovenia",
        dial_code: "+386",
        code: "SI",
        ccode: "386",
    },
    {
        name: "Solomon Islands",
        dial_code: "+677",
        code: "SB",
        ccode: "677",
    },
    {
        name: "Somalia",
        dial_code: "+252",
        code: "SO",
        ccode: "252",
    },
    {
        name: "South Africa",
        dial_code: "+27",
        code: "ZA",
        ccode: "27",
    },
    {
        name: "South Sudan",
        dial_code: "+211",
        code: "SS",
        ccode: "211",
    },
    {
        name: "South Georgia and the South Sandwich Islands",
        dial_code: "+500",
        code: "GS",
        ccode: "500",
    },
    {
        name: "Spain",
        dial_code: "+34",
        code: "ES",
        ccode: "34",
    },
    {
        name: "Sri Lanka",
        dial_code: "+94",
        code: "LK",
        ccode: "94",
    },
    {
        name: "Sudan",
        dial_code: "+249",
        code: "SD",
        ccode: "249",
    },
    {
        name: "Suriname",
        dial_code: "+597",
        code: "SR",
        ccode: "597",
    },
    {
        name: "Svalbard and Jan Mayen",
        dial_code: "+47",
        code: "SJ",
        ccode: "47",
    },
    {
        name: "Swaziland",
        dial_code: "+268",
        code: "SZ",
        ccode: "268",
    },
    {
        name: "Sweden",
        dial_code: "+46",
        code: "SE",
        ccode: "46",
    },
    {
        name: "Switzerland",
        dial_code: "+41",
        code: "CH",
        ccode: "41",
    },
    {
        name: "Syrian Arab Republic",
        dial_code: "+963",
        code: "SY",
        ccode: "963",
    },
    {
        name: "Taiwan",
        dial_code: "+886",
        code: "TW",
        ccode: "886",
    },
    {
        name: "Tajikistan",
        dial_code: "+992",
        code: "TJ",
        ccode: "992",
    },
    {
        name: "Tanzania, United Republic of Tanzania",
        dial_code: "+255",
        code: "TZ",
        ccode: "255",
    },
    {
        name: "Thailand",
        dial_code: "+66",
        code: "TH",
        ccode: "66",
    },
    {
        name: "Timor-Leste",
        dial_code: "+670",
        code: "TL",
        ccode: "670",
    },
    {
        name: "Togo",
        dial_code: "+228",
        code: "TG",
        ccode: "228",
    },
    {
        name: "Tokelau",
        dial_code: "+690",
        code: "TK",
        ccode: "690",
    },
    {
        name: "Tonga",
        dial_code: "+676",
        code: "TO",
        ccode: "676",
    },
    {
        name: "Trinidad and Tobago",
        dial_code: "+1868",
        code: "TT",
        ccode: "1868",
    },
    {
        name: "Tunisia",
        dial_code: "+216",
        code: "TN",
        ccode: "216",
    },
    {
        name: "Turkey",
        dial_code: "+90",
        code: "TR",
        ccode: "90",
    },
    {
        name: "Turkmenistan",
        dial_code: "+993",
        code: "TM",
        ccode: "993",
    },
    {
        name: "Turks and Caicos Islands",
        dial_code: "+1649",
        code: "TC",
        ccode: "1649",
    },
    {
        name: "Tuvalu",
        dial_code: "+688",
        code: "TV",
        ccode: "688",
    },
    {
        name: "Uganda",
        dial_code: "+256",
        code: "UG",
        ccode: "256",
    },
    {
        name: "Ukraine",
        dial_code: "+380",
        code: "UA",
        ccode: "380",
    },
    {
        name: "United Arab Emirates",
        dial_code: "+971",
        code: "AE",
        ccode: "971",
    },
    {
        name: "United Kingdom",
        dial_code: "+44",
        code: "GB",
        ccode: "44",
    },
    {
        name: "United States",
        dial_code: "+1",
        code: "US",
        ccode: "1",
    },
    {
        name: "Uruguay",
        dial_code: "+598",
        code: "UY",
        ccode: "598",
    },
    {
        name: "Uzbekistan",
        dial_code: "+998",
        code: "UZ",
        ccode: "998",
    },
    {
        name: "Vanuatu",
        dial_code: "+678",
        code: "VU",
        ccode: "678",
    },
    {
        name: "Venezuela, Bolivarian Republic of Venezuela",
        dial_code: "+58",
        code: "VE",
        ccode: "58",
    },
    {
        name: "Vietnam",
        dial_code: "+84",
        code: "VN",
        ccode: "84",
    },
    {
        name: "Virgin Islands, British",
        dial_code: "+1284",
        code: "VG",
        ccode: "1284",
    },
    {
        name: "Virgin Islands, U.S.",
        dial_code: "+1340",
        code: "VI",
        ccode: "1340",
    },
    {
        name: "Wallis and Futuna",
        dial_code: "+681",
        code: "WF",
        ccode: "681",
    },
    {
        name: "Yemen",
        dial_code: "+967",
        code: "YE",
        ccode: "967",
    },
    {
        name: "Zambia",
        dial_code: "+260",
        code: "ZM",
        ccode: "260",
    },
    {
        name: "Zimbabwe",
        dial_code: "+263",
        code: "ZW",
        ccode: "263",
    },
];

const requestOTP = async (code, number, navigation) => {
    const apiUrl = "https://heartitout.in/welcome/wp-json/otp_signup_process/v2";

    try {
        const requestData = {
            ch: "send_otp",
            mob: code + number,
        };
        axios.post(apiUrl, requestData).then((res) => {
            if (res.data.Status == "Success")
                navigation.navigate("verifyPage", res.data);
            else console.log("Error:" + res.data.Status);
        }).catch((err) => {
            console.log(err);
        });
    } catch (error) {
        console.error("Error requesting OTP:", error.message);
    }
};


import Logo4 from '../../assets/images/registerDisplay.svg';
import Google from '../../assets/images/googleIcon.svg';
import Facebook from '../../assets/images/facebookIcon.svg';
import Mail from '../../assets/images/mailIcon.svg';

// 
// 


export default function Register() {
    const [value, setValue] = useState("91");

    const navigation = useNavigation();

    //   React.useEffect(() => {
    //     const byPass = async () => {
    //         let token = await AsyncStorage.getItem("token", (data) => {
    //             console.log("error from async: "+data);
    //           });
    //           if (token == null || token == undefined) {
    //             // setFront('main')
    //           } else navigation.navigate('main')
    //     }
    //     byPass();
    //     // console.log(token)
    // }, [])

    const [number, onChangeNumber] = React.useState("");
    return (
        <SafeAreaView>
            <TopBar />
            <ScrollView >
                <StatusBar
                    backgroundColor={"#fff"}
                    barStyle={"dark-content"}
                    hidden={false}
                />

                {/* <View style={styles.box}> */}
                {/* <View className="bg-[#EAF7FC]" style={styles.vect}>
            </View> */}

                <Logo4 width={wp(100)} height={wp(55)} style={styles.box} />
                {/* <View style={{ height: hp(10) }}></View> */}
                {/* </View> */}

                <View
                    className="flex-col items-center"
                    style={{ marginTop: hp(2.5) }}
                >

                    <View>
                        <Text style={styles.enterphone}>
                            Enter your Phone Number
                        </Text>


                        <View
                            className="flex-row items-center"
                            style={{ width: wp(82), marginTop: hp(3) }}
                        >
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={data}
                                maxHeight={150}
                                iconColor="#455A64"
                                labelField="dial_code"
                                valueField="ccode"
                                placeholder="+91"
                                searchPlaceholder="Search..."
                                value={value}
                                onChange={(item) => {
                                    setValue(item.value);
                                }}
                            />

                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeNumber}
                                value={number}
                                // placeholder="6266019364"
                                keyboardType="numeric"
                            />
                        </View>

                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            requestOTP(value, number, navigation);
                        }}
                    >
                        <Text style={styles.textStyle}>Request OTP</Text>
                    </TouchableOpacity>

                    <View className="flex-row items-center" style={{ marginTop: hp(5) }}>
                        <View style={styles.container}></View>
                        <Text style={{ color: '#455A64', fontSize: wp(3.7), fontFamily: 'Roboto', fontWeight: '300', paddingHorizontal: wp(1.5), }}>or sign up with</Text>
                        <View style={styles.container}></View>
                    </View>

                    <View className="flex-row justify-between" style={{width: wp(55), marginTop: hp(3)}}>
                        {/* <View style={styles.outerCircle}> */}
                        <Google width={wp(12)} height={wp(12)} style={styles.outerCircle} />
                        {/* </View> */}
                        <Facebook width={wp(12)} height={wp(12)} style={styles.outerCircle} />
                        <Mail width={wp(12)} height={wp(12)} style={styles.outerCircle} />
                    </View>


                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    outerCircle: {
        // left: 0,
        // top: 0,
        // position: 'absolute',
        backgroundColor: 'white',
        borderRadius: wp(40),
        shadowColor: '#01818C',
        shadowOpacity: 0.5,
        shadowRadius: 1.3544304370880127,
        elevation: 10,

        // elevation: 5, // Adjust the value as needed
        // shadowColor: '#01818C',
        // shadowOffset: { width: wp(0.2), height: wp(0.2) },
        // shadowOpacity: 0.32,
        // shadowRadius: wp(3),
    },

    enterphone: {
        // Enter your Phone Number
        color: '#043953',
        fontSize: wp(5),
        fontFamily: 'Roboto',
        fontWeight: '700',
        marginTop: hp(2)
    },
    box: {
        // overflow: 'hidden',
        alignItems: "center",
        height: hp(40),
        width: wp(100),
        marginTop: hp(10)
        // backgroundColor: 'red'
    },

    input: {
        height: hp(7),
        width: wp(83),
        backgroundColor: 'white',
        borderRadius: wp(3),
        borderWidth: wp(0.4),
        borderColor: 'rgba(69, 90, 100, 0.30)',
        borderStyle: 'solid',
        color: '#455A64',
        fontWeight: '600',
        paddingLeft: wp(21),
        fontSize: wp(4),
    },
    dropdown: {
        // marginTop: 7,
        height: hp(7),
        width: wp(20),
        backgroundColor: 'white',
        borderRadius: wp(3),
        borderWidth: wp(0.4),
        borderColor: 'rgba(69, 90, 100, 0.30)',
        left: 0,
        zIndex: 1,
        paddingLeft: wp(1),
        paddingRight: wp(3),
        position: "absolute",
    },

    placeholderStyle: {
        fontSize: 20,
    },
    selectedTextStyle: {
        height: wp(6),
        fontSize: wp(4),
        color: '#455A64',
        position: 'absolute',
        zIndex: 1,
        fontFamily: 'Roboto',
        fontWeight: '600',
        right: 0
    },
    iconStyle: {
        width: wp(7),
        position: 'absolute',
        left: 0,
        height: wp(7),
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },

    icon: {
        marginRight: 5,
    },
    item: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },

    button: {
        height: hp(7.3),
        width: wp(82),
        marginTop: hp(4),
        backgroundColor: '#32959D',
        borderRadius: wp(10),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // marginBottom: hp(10)
    },

    textStyle: {
        textAlign: 'center',
        color: 'white',
        fontSize: wp(5),

        fontFamily: 'Roboto',
        fontWeight: '500',
    },

    container: {
        width: wp(30),
        height: hp(0),
        borderBottomWidth: wp(0.4),
        borderColor: 'rgba(69, 90, 100, 0.30)',
    },


})