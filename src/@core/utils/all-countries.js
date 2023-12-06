const country_data = [
    {"country": "Afghanistan", "languages": ["Pashto", "Dari"], "timezone": "UTC+4:30", "flag": "af"},
    {"country": "Albania", "languages": ["Albanian"], "timezone": "UTC+1"},
    {"country": "Algeria", "languages": ["Arabic"], "timezone": "UTC+1"},
    {"country": "Andorra", "languages": ["Catalan"], "timezone": "UTC+1"},
    {"country": "Angola", "languages": ["Portuguese"], "timezone": "UTC+1"},
    {"country": "Argentina", "languages": ["Spanish"], "timezone": "UTC-3 to UTC-5"},
    {"country": "Armenia", "languages": ["Armenian"], "timezone": "UTC+4"},
    {"country": "Australia", "languages": ["English"], "timezone": "UTC+8 to UTC+11"},
    {"country": "Austria", "languages": ["German"], "timezone": "UTC+1"},
    {"country": "Azerbaijan", "languages": ["Azerbaijani"], "timezone": "UTC+4"},
    {"country": "Bahamas", "languages": ["English"], "timezone": "UTC-5"},
    {"country": "Bahrain", "languages": ["Arabic"], "timezone": "UTC+3"},
    {"country": "Bangladesh", "languages": ["Bengali"], "timezone": "UTC+6"},
    {"country": "Barbados", "languages": ["English"], "timezone": "UTC-4"},
    {"country": "Belarus", "languages": ["Belarusian", "Russian"], "timezone": "UTC+3"},
    {"country": "Belgium", "languages": ["Dutch", "French", "German"], "timezone": "UTC+1"},
    {"country": "Belize", "languages": ["English"], "timezone": "UTC-6"},
    {"country": "Benin", "languages": ["French"], "timezone": "UTC+1"},
    {"country": "Bhutan", "languages": ["Dzongkha"], "timezone": "UTC+6"},
    {"country": "Bolivia", "languages": ["Spanish", "Quechua", "Aymara"], "timezone": "UTC-4"},
    {"country": "Bosnia and Herzegovina", "languages": ["Bosnian", "Croatian", "Serbian"], "timezone": "UTC+1"},
    {"country": "Botswana", "languages": ["English", "Tswana"], "timezone": "UTC+2"},
    {"country": "Brazil", "languages": ["Portuguese"], "timezone": "UTC-2 to UTC-5"},
    {"country": "Brunei", "languages": ["Malay"], "timezone": "UTC+8"},
    {"country": "Bulgaria", "languages": ["Bulgarian"], "timezone": "UTC+2"},
    {"country": "Burkina Faso", "languages": ["French"], "timezone": "UTC"},
    {"country": "Burundi", "languages": ["Kirundi", "French"], "timezone": "UTC+2"},
    {"country": "Cambodia", "languages": ["Khmer"], "timezone": "UTC+7"},
    {"country": "Cameroon", "languages": ["English", "French"], "timezone": "UTC+1"},
    {"country": "Canada", "languages": ["English", "French"], "timezone": "UTC-3.5 to UTC-8"},
    {"country": "Cape Verde", "languages": ["Portuguese"], "timezone": "UTC-1"},
    {"country": "Central African Republic", "languages": ["French", "Sango"], "timezone": "UTC+1"},
    {"country": "Chad", "languages": ["Arabic", "French"], "timezone": "UTC+1"},
    {"country": "Chile", "languages": ["Spanish"], "timezone": "UTC-3 to UTC-6"},
    {"country": "China", "languages": ["Chinese"], "timezone": "UTC+8"},
    {"country": "Colombia", "languages": ["Spanish"], "timezone": "UTC-5"},
    {"country": "Comoros", "languages": ["Arabic", "French", "Comorian"], "timezone": "UTC+3"},
    {"country": "Costa Rica", "languages": ["Spanish"], "timezone": "UTC-6"},
    {"country": "Croatia", "languages": ["Croatian"], "timezone": "UTC+1"},
    {"country": "Cuba", "languages": ["Spanish"], "timezone": "UTC-5"},
    {"country": "Cyprus", "languages": ["Greek", "Turkish"], "timezone": "UTC+2"},
    {"country": "Czech Republic", "languages": ["Czech"], "timezone": "UTC+1"},
    {"country": "Democratic Republic of the Congo", "languages": ["French"], "timezone": "UTC+1 to UTC+2"},
    {"country": "Denmark", "languages": ["Danish"], "timezone": "UTC+1"},
    {"country": "Djibouti", "languages": ["Arabic", "French"], "timezone": "UTC+3"},
    {"country": "Dominica", "languages": ["English"], "timezone": "UTC-4"},
    {"country": "Dominican Republic", "languages": ["Spanish"], "timezone": "UTC-4"},
    {"country": "East Timor", "languages": ["Portuguese", "Tetum"], "timezone": "UTC+9"},
    {"country": "Ecuador", "languages": ["Spanish"], "timezone": "UTC-5"},
    {"country": "Egypt", "languages": ["Arabic"], "timezone": "UTC+2"},
    {"country": "El Salvador", "languages": ["Spanish"], "timezone": "UTC-6"},
    {"country": "Equatorial Guinea", "languages": ["Spanish", "French", "Portuguese"], "timezone": "UTC+1"},
    {"country": "Eritrea", "languages": ["Tigrinya", "Arabic", "English"], "timezone": "UTC+3"},
    {"country": "Estonia", "languages": ["Estonian"], "timezone": "UTC+2"},
    {"country": "Eswatini", "languages": ["Swazi", "English"], "timezone": "UTC+2"},
    {"country": "Ethiopia", "languages": ["Amharic"], "timezone": "UTC+3"},
    {"country": "Fiji", "languages": ["English", "Fijian", "Hindi"], "timezone": "UTC+12"},
    {"country": "Finland", "languages": ["Finnish", "Swedish"], "timezone": "UTC+2"},
    {"country": "France", "languages": ["French"], "timezone": "UTC+1"},
    {"country": "Gabon", "languages": ["French"], "timezone": "UTC+1"},
    {"country": "Gambia", "languages": ["English"], "timezone": "UTC"},
    {"country": "Georgia", "languages": ["Georgian"], "timezone": "UTC+4"},
    {"country": "Germany", "languages": ["German"], "timezone": "UTC+1"},
    {"country": "Ghana", "languages": ["English"], "timezone": "UTC"},
    {"country": "Greece", "languages": ["Greek"], "timezone": "UTC+2"},
    {"country": "Grenada", "languages": ["English"], "timezone": "UTC-4"},
    {"country": "Guatemala", "languages": ["Spanish"], "timezone": "UTC-6"},
    {"country": "Guinea", "languages": ["French"], "timezone": "UTC"},
    {"country": "Guinea-Bissau", "languages": ["Portuguese"], "timezone": "UTC"},
    {"country": "Guyana", "languages": ["English"], "timezone": "UTC-4"},
    {"country": "Haiti", "languages": ["French", "Haitian Creole"], "timezone": "UTC-5"},
    {"country": "Honduras", "languages": ["Spanish"], "timezone": "UTC-6"},
    {"country": "Hungary", "languages": ["Hungarian"], "timezone": "UTC+1"},
    {"country": "Iceland", "languages": ["Icelandic"], "timezone": "UTC"},
    {"country": "India", "languages": ["Hindi", "English"], "timezone": "UTC+5.5"},
    {"country": "Indonesia", "languages": ["Indonesian"], "timezone": "UTC+7 to UTC+9"},
    {"country": "Iran", "languages": ["Persian"], "timezone": "UTC+3:30"},
    {"country": "Iraq", "languages": ["Arabic", "Kurdish"], "timezone": "UTC+3"},
    {"country": "Ireland", "languages": ["Irish", "English"], "timezone": "UTC+0"},
    {"country": "Israel", "languages": ["Hebrew", "Arabic"], "timezone": "UTC+2"},
    {"country": "Italy", "languages": ["Italian"], "timezone": "UTC+1"},
    {"country": "Jamaica", "languages": ["English"], "timezone": "UTC-5"},
    {"country": "Japan", "languages": ["Japanese"], "timezone": "UTC+9"},
    {"country": "Jordan", "languages": ["Arabic"], "timezone": "UTC+2"},
    {"country": "Kazakhstan", "languages": ["Kazakh", "Russian"], "timezone": "UTC+5 to UTC+6"},
    {"country": "Kenya", "languages": ["Swahili", "English"], "timezone": "UTC+3"},
    {"country": "Kiribati", "languages": ["English", "Gilbertese"], "timezone": "UTC+12 to UTC+14"},
    {"country": "Kuwait", "languages": ["Arabic"], "timezone": "UTC+3"},
    {"country": "Kyrgyzstan", "languages": ["Kyrgyz", "Russian"], "timezone": "UTC+6"},
    {"country": "Laos", "languages": ["Lao"], "timezone": "UTC+7"},
    {"country": "Latvia", "languages": ["Latvian"], "timezone": "UTC+2"},
    {"country": "Lebanon", "languages": ["Arabic"], "timezone": "UTC+2"},
    {"country": "Lesotho", "languages": ["Sesotho", "English"], "timezone": "UTC+2"},
    {"country": "Liberia", "languages": ["English"], "timezone": "UTC"},
    {"country": "Libya", "languages": ["Arabic"], "timezone": "UTC+2"},
    {"country": "Liechtenstein", "languages": ["German"], "timezone": "UTC+1"},
    {"country": "Lithuania", "languages": ["Lithuanian"], "timezone": "UTC+2"},
    {"country": "Luxembourg", "languages": ["Luxembourgish", "French", "German"], "timezone": "UTC+1"},
    {"country": "Madagascar", "languages": ["Malagasy", "French"], "timezone": "UTC+3"},
    {"country": "Malawi", "languages": ["English", "Chichewa"], "timezone": "UTC+2"},
    {"country": "Malaysia", "languages": ["Malay"], "timezone": "UTC+8"},
    {"country": "Maldives", "languages": ["Dhivehi"], "timezone": "UTC+5"},
    {"country": "Mali", "languages": ["French"], "timezone": "UTC"},
    {"country": "Malta", "languages": ["Maltese", "English"], "timezone": "UTC+1"},
    {"country": "Marshall Islands", "languages": ["Marshallese", "English"], "timezone": "UTC+12"},
    {"country": "Mauritania", "languages": ["Arabic"], "timezone": "UTC"},
    {"country": "Mauritius", "languages": ["English", "French"], "timezone": "UTC+4"},
    {"country": "Mexico", "languages": ["Spanish"], "timezone": "UTC-6 to UTC-8"},
    {"country": "Micronesia", "languages": ["English"], "timezone": "UTC+10 to UTC+11"},
    {"country": "Moldova", "languages": ["Moldovan"], "timezone": "UTC+2"},
    {"country": "Monaco", "languages": ["French"], "timezone": "UTC+1"},
    {"country": "Mongolia", "languages": ["Mongolian"], "timezone": "UTC+7 to UTC+8"},
    {"country": "Montenegro", "languages": ["Montenegrin"], "timezone": "UTC+1"},
    {"country": "Morocco", "languages": ["Arabic"], "timezone": "UTC+0"},
    {"country": "Mozambique", "languages": ["Portuguese"], "timezone": "UTC+2"},
    {"country": "Myanmar", "languages": ["Burmese"], "timezone": "UTC+6:30"},
    {"country": "Namibia", "languages": ["English"], "timezone": "UTC+2"},
    {"country": "Nauru", "languages": ["Nauruan", "English"], "timezone": "UTC+12"},
    {"country": "Nepal", "languages": ["Nepali"], "timezone": "UTC+5:45"},
    {"country": "Netherlands", "languages": ["Dutch"], "timezone": "UTC+1"},
    {"country": "New Zealand", "languages": ["English", "Māori"], "timezone": "UTC+12 to UTC+13"},
    {"country": "Nicaragua", "languages": ["Spanish"], "timezone": "UTC-6"},
    {"country": "Niger", "languages": ["French"], "timezone": "UTC+1"},
    {"country": "Nigeria", "languages": ["English"], "timezone": "UTC+1"},
    {"country": "North Korea", "languages": ["Korean"], "timezone": "UTC+9"},
    {"country": "North Macedonia", "languages": ["Macedonian"], "timezone": "UTC+1"},
    {"country": "Norway", "languages": ["Norwegian"], "timezone": "UTC+1"},
    {"country": "Oman", "languages": ["Arabic"], "timezone": "UTC+4"},
    {"country": "Pakistan", "languages": ["Urdu", "English"], "timezone": "UTC+5"},
    {"country": "Palau", "languages": ["English"], "timezone": "UTC+9"},
    {"country": "Palestine", "languages": ["Arabic"], "timezone": "UTC+2"},
    {"country": "Panama", "languages": ["Spanish"], "timezone": "UTC-5"},
    {"country": "Papua New Guinea", "languages": ["Tok Pisin", "English"], "timezone": "UTC+10"},
    {"country": "Paraguay", "languages": ["Spanish", "Guaraní"], "timezone": "UTC-4"},
    {"country": "Peru", "languages": ["Spanish"], "timezone": "UTC-5"},
    {"country": "Philippines", "languages": ["Filipino", "English"], "timezone": "UTC+8"},
    {"country": "Poland", "languages": ["Polish"], "timezone": "UTC+1"},
    {"country": "Portugal", "languages": ["Portuguese"], "timezone": "UTC+0"},
    {"country": "Qatar", "languages": ["Arabic"], "timezone": "UTC+3"},
    {"country": "Republic of the Congo", "languages": ["French"], "timezone": "UTC+1"},
    {"country": "Romania", "languages": ["Romanian"], "timezone": "UTC+2"},
    {"country": "Russia", "languages": ["Russian"], "timezone": "UTC+2 to UTC+12"},
    {"country": "Rwanda", "languages": ["Kinyarwanda", "French", "English"], "timezone": "UTC+2"},
    {"country": "Saint Kitts and Nevis", "languages": ["English"], "timezone": "UTC-4"},
    {"country": "Saint Lucia", "languages": ["English"], "timezone": "UTC-4"},
    {"country": "Saint Vincent and the Grenadines", "languages": ["English"], "timezone": "UTC-4"},
    {"country": "Samoa", "languages": ["Samoan", "English"], "timezone": "UTC+13"},
    {"country": "San Marino", "languages": ["Italian"], "timezone": "UTC+1"},
    {"country": "Sao Tome and Principe", "languages": ["Portuguese"], "timezone": "UTC"},
    {"country": "Saudi Arabia", "languages": ["Arabic"], "timezone": "UTC+3"},
    {"country": "Senegal", "languages": ["French"], "timezone": "UTC"},
    {"country": "Serbia", "languages": ["Serbian"], "timezone": "UTC+1"},
    {"country": "Seychelles", "languages": ["Seselwa", "English", "French"], "timezone": "UTC+4"},
    {"country": "Sierra Leone", "languages": ["English"], "timezone": "UTC"},
    {"country": "Singapore", "languages": ["English", "Malay", "Mandarin", "Tamil"], "timezone": "UTC+8"},
    {"country": "Slovakia", "languages": ["Slovak"], "timezone": "UTC+1"},
    {"country": "Slovenia", "languages": ["Slovene"], "timezone": "UTC+1"},
    {"country": "Solomon Islands", "languages": ["English"], "timezone": "UTC+11"},
    {"country": "Somalia", "languages": ["Somali", "Arabic"], "timezone": "UTC+3"},
    {"country": "South Africa", "languages": ["Afrikaans", "English", "Zulu", "Xhosa"], "timezone": "UTC+2"},
    {"country": "South Korea", "languages": ["Korean"], "timezone": "UTC+9"},
    {"country": "South Sudan", "languages": ["English"], "timezone": "UTC+3"},
    {"country": "Spain", "languages": ["Spanish"], "timezone": "UTC+1"},
    {"country": "Sri Lanka", "languages": ["Sinhala", "Tamil"], "timezone": "UTC+5:30"},
    {"country": "Sudan", "languages": ["Arabic", "English"], "timezone": "UTC+2"},
    {"country": "Suriname", "languages": ["Dutch"], "timezone": "UTC-3"},
    {"country": "Sweden", "languages": ["Swedish"], "timezone": "UTC+1"},
    {"country": "Switzerland", "languages": ["German", "French", "Italian", "Romansh"], "timezone": "UTC+1"},
    {"country": "Syria", "languages": ["Arabic"], "timezone": "UTC+2"},
    {"country": "Taiwan", "languages": ["Chinese"], "timezone": "UTC+8"},
    {"country": "Tajikistan", "languages": ["Tajik", "Russian"], "timezone": "UTC+5"},
    {"country": "Tanzania", "languages": ["Swahili", "English"], "timezone": "UTC+3"},
    {"country": "Thailand", "languages": ["Thai"], "timezone": "UTC+7"},
    {"country": "Togo", "languages": ["French"], "timezone": "UTC"},
    {"country": "Tonga", "languages": ["Tongan", "English"], "timezone": "UTC+13"},
    {"country": "Trinidad and Tobago", "languages": ["English"], "timezone": "UTC-4"},
    {"country": "Tunisia", "languages": ["Arabic"], "timezone": "UTC+1"},
    {"country": "Turkey", "languages": ["Turkish"], "timezone": "UTC+3"},
    {"country": "Turkmenistan", "languages": ["Turkmen", "Russian"], "timezone": "UTC+5"},
    {"country": "Tuvalu", "languages": ["Tuvaluan", "English"], "timezone": "UTC+12"},
    {"country": "Uganda", "languages": ["English", "Swahili"], "timezone": "UTC+3"},
    {"country": "Ukraine", "languages": ["Ukrainian"], "timezone": "UTC+2"},
    {"country": "United Arab Emirates", "languages": ["Arabic"], "timezone": "UTC+4"},
    {"country": "United Kingdom", "languages": ["English"], "timezone": "UTC+0"},
    {"country": "United States", "languages": ["English"], "timezone": "UTC-12 to UTC+12"},
    {"country": "Uruguay", "languages": ["Spanish"], "timezone": "UTC-3"},
    {"country": "Uzbekistan", "languages": ["Uzbek", "Russian"], "timezone": "UTC+5"},
    {"country": "Vanuatu", "languages": ["Bislama", "English", "French"], "timezone": "UTC+11"},
    {"country": "Vatican City", "languages": ["Italian", "Latin"], "timezone": "UTC+1"},
    {"country": "Venezuela", "languages": ["Spanish"], "timezone": "UTC-4:30"},
    {"country": "Vietnam", "languages": ["Vietnamese"], "timezone": "UTC+7"},
    {"country": "Yemen", "languages": ["Arabic"], "timezone": "UTC+3"},
    {"country": "Zambia", "languages": ["English"], "timezone": "UTC+2"},
    {"country": "Zimbabwe", "languages": ["English", "Shona", "Ndebele"], "timezone": "UTC+2"}
]

export default country_data;