// owl carousel slider
import OwlCarousel from 'react-owl-carousel2';

// ** React Imports
import { useState, useEffect, SyntheticEvent, Fragment, ReactNode } from 'react'
import { useRouter } from 'next/router'
import { database } from '../../../firebaseConfig'
import { collection, getDocs, getDoc, doc, where, query,addDoc,updateDoc } from "firebase/firestore";
import { sendMail } from "../../services/sendMail";    
// ** MUI Imports
import Box from '@mui/material/Box'
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu, { MenuProps } from '@mui/material/Menu'
import MuiAvatar, { AvatarProps } from '@mui/material/Avatar'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Typography, { TypographyProps } from '@mui/material/Typography'
import Calendar from "react-calendar";
import { Alert } from '@mui/material'

// ** Icons Imports


// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import { devNull } from 'os'

import { Modal } from "antd";


// ** Styled Menu component
const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`
}))

const styles = {
  maxHeight: 349,
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  }
}

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles
})

// ** Styled Avatar component
const Avatar = styled(MuiAvatar)<AvatarProps>({
  width: '2.375rem',
  height: '2.375rem',
  fontSize: '1.125rem'
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}))

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)<TypographyProps>({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

// ** owl carousel slider

const options = {
  items: 4,
  loop: true,
  nav: true,
  rewind: true,

  // navText: [
  //   "<i class='fa fa-angle-left'></i>",
  //   "<i class='fa fa-angle-right'></i>"
  // ]
};


const options22 = {
  items: 1,
  loop: true,
  nav: true,
  rewind: true,

  // navText: [
  //   "<i class='fa fa-angle-left'></i>",
  //   "<i class='fa fa-angle-right'></i>"
  // ]
};



const getCurrentWeek = () => {
  const today = new Date();
  const currentDay = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - currentDay);

  const daysOfWeek = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    daysOfWeek.push(day);
  }

  return daysOfWeek;
};

const formatDay = (date) => {
  const dayNames = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
  const dayIndex = date.getDay();
  return dayNames[dayIndex];
};


const Calender = () => {

    // ** States
    const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)

    // ** Hook
    const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

    const handleDropdownOpen = (event: SyntheticEvent) => {
      setAnchorEl(event.currentTarget)
    }

    const handleDropdownClose = () => {
      setAnchorEl(null)
    }

    const ScrollWrapper = ({ children }: { children: ReactNode }) => {
      if (hidden) {
        return <Box sx={{ ...styles, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
      } else {
        return (
          <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
        )
      }
    }

    const [nextSevenDay, setnextSevenDay] = useState([{'date':'','day':'','month':''}]);
    const [allWeekDay, setallWeekDay] = useState([{'date':'','day':'','month':''}]);

    const [startLoop, setstartLoop] = useState(0);

    const [forloops, setforloops] = useState([0,1,2,3]);

    const [date, setDate] = useState(new Date());
    const router = useRouter()
    const [coach, setCoach] = useState(null);
    const today = new Date();
    const [coachId,setCoachId]=useState();
    const [coachesCalUsername, setcoachesCalUsername] = useState("");
    const [myData, setMydata] = useState(null);
    const [mySchedule, setmySchedule] = useState([]);
    const [isFormShow, setisFormShow] = useState(false);
    const [scheduleSuccess, setscheduleSuccess] = useState(false);
    const [isSesShow, setisSesShow] = useState(false);
    const [isStandShow, setisStandShow] = useState(false);
    const [isAvblShow, setisAvblShow] = useState(false);
    const [isSyncFormShow, setisSyncFormShow] = useState(false);

    const [selectDateMob, setSelectDateMob] = useState(new Date().toISOString().split('T')[0]);

    const [selectDayMob, setSelectDayMob] = useState( new Date().toLocaleDateString('en-US', { weekday: 'short' }));

    const [checkedDateMob, setCheckedDateMob] = useState();
    const [meetingSuccessMsg, setmeetingSuccessMsg] = useState('');
    let m = 0;

     /// For Testing
  //const [apiUrl, setapiUrl] = useState("https://api.cal.dev/");

  ///For Production

  const [apiUrl, setapiUrl]=useState('https://api.cal.com/');

  const [coachesCalApiKey, setcoachesCalApiKey] = useState("");
  const [array1, setarray1]: any[] = useState([]);
  const [array2, setarray2]: any[] = useState([]);
  const [clientData, setclientData] = useState([]);

  const [myAvailability, setmyAvailability] = useState(null);

  const [active, setactive] = useState(0);
  const meetingRef = collection(database, "meeting");
  const clientRef = collection(database, "client_user");

  const [bookedTimeslot, setbookedTimeslot] = useState([{meetingDate:"",isCoachAccept:"",isCoachCancel:"",meet_idd:"",starttime:"",endtime:"",title:"",date:"",clientName:"",clientEmail:""}]);
  const [meeting, setMeeting] = useState([]);
  const [myClient, setMyClient] = useState([]);

  const [isEdit, setisEdit] = useState(false);

  const [meetingClientJoinedData, setmeetingClientJoinedData] =useState([]);


  const [availability, setAvailability] = useState({
    mon: { startHour: '09', startMinute: '00', endHour: '17', endMinute: '00',startHour2: '00', startMinute2: '00', endHour2: '00', endMinute2: '00',startHour3: '00', startMinute3: '00', endHour3: '00', endMinute3: '00', isMore:false, isUnAvbl :false },
    tue: { startHour: '09', startMinute: '00', endHour: '17', endMinute: '00',startHour2: '00', startMinute2: '00', endHour2: '00', endMinute2: '00', startHour3: '00', startMinute3: '00', endHour3: '00', endMinute3: '00',isMore:false,isUnAvbl :false },
    wed: { startHour: '09', startMinute: '00', endHour: '17', endMinute: '00',startHour2: '00', startMinute2: '00', endHour2: '00', endMinute2: '00',startHour3: '00', startMinute3: '00', endHour3: '00', endMinute3: '00', isMore:false, isUnAvbl :false },
    thu: { startHour: '09', startMinute: '00', endHour: '17', endMinute: '00',startHour2: '00', startMinute2: '00', endHour2: '00', endMinute2: '00',startHour3: '00', startMinute3: '00', endHour3: '00', endMinute3: '00',isMore:false,isUnAvbl :false },
    fri: { startHour: '09', startMinute: '00', endHour: '17', endMinute: '00',startHour2: '00', startMinute2: '00', endHour2: '00', endMinute2: '00',startHour3: '00', startMinute3: '00', endHour3: '00', endMinute3: '00', isMore:false,isUnAvbl :false },
    sat: { startHour: '09', startMinute: '00', endHour: '17', endMinute: '00',startHour2: '00', startMinute2: '00', endHour2: '00', endMinute2: '00', startHour3: '00', startMinute3: '00', endHour3: '00', endMinute3: '00', isMore:false,isUnAvbl :false },
    sun: { startHour: '09', startMinute: '00', endHour: '17', endMinute: '00',startHour2: '00', startMinute2: '00', endHour2: '00', endMinute2: '00',startHour3: '00', startMinute3: '00', endHour3: '00', endMinute3: '00', isMore:false,isUnAvbl :false }
  });


  

  const dayMappings = {
    "mon": "monday",
    "tue": "tuesday",
    "wed": "wednesday",
    "thu": "thursday",
    "fri": "friday",
    "sat": "saturday",
    "sun": "sunday"
  };

  // const handleHourChange = (event,day) => {
  //   const value = parseInt(event.target.value, 10);
  //   //const end_value = parseInt(end_time_hour, 10);
  //   const endvalue = value + 1
   
  //       setAvailability({ 'mon':{startHour:value}});
  //     }



 
  function formatNumber(num) {
    // Ensure num is a number
    num = parseInt(num);
  
    if(num > 23){
    // Check if num is a valid number
    if (isNaN(num)) {
      return 0;
    }
  
    // Convert num to a string and remove leading zeros
    num = num.toString().replace(/^0+/, '');
  
    // If the number is greater than 23, keep only the last digit
    if (num.length > 1) {
      num = num.charAt(num.length - 1);
    }
  console.log('num',num);
    return num;
  }
  else{
    return num;
  }
  }



  function formatNumber2(num) {
    // Ensure num is a number
    num = parseInt(num);
  
    if(num > 59){
    // Check if num is a valid number
    if (isNaN(num)) {
      return 0;
    }
  
    // Convert num to a string and remove leading zeros
    num = num.toString().replace(/^0+/, '');
  
    // If the number is greater than 23, keep only the last digit
    if (num.length > 1) {
      num = num.charAt(num.length - 1);
    }
  console.log('num',num);
    return num;
  }
  else{
    return num;
  }
  }


  function customFormatNumber(num) {
    // Ensure num is a number
    num = parseInt(num);
  
    // Check if num is a valid number
    if (isNaN(num)) {
      return "Invalid number";
    }
  
    // Convert num to a string
    num = num.toString();
  
    // Get the last two digits
    const lastTwoDigits = parseInt(num.slice(-2));
  
    // Check conditions
    if (lastTwoDigits < 24) {
      return lastTwoDigits.toString();
    } else if (num.slice(-1) === '1') {
      return "10";
    } else if (num.slice(-1) === '2') {
      return "20";
    } else if (num.length === 3) {
      // Remove middle digit for three-digit numbers
      return num.charAt(0) + num.charAt(2);
    }
  
    // Return the original number if none of the conditions are met
    return num;
  }
  

  const handleHourChange = (e, day) => {
    console.log('working');
    const { name, value } = e.target;

  
    console.log(name,value);
var format_num='';
  
    format_num=formatNumber(value);
   
    const numericValue = parseInt(format_num, 10);
    console.log(name,numericValue);
  
    


    // Ensure the input value is within the valid range (00 to 23 for hours)
    const sanitizedValue = Math.max(0, Math.min(numericValue, 23));
  
    if (name === 'startHour') {
      // If changing startHour, update it directly
      setAvailability(prevState => ({
        ...prevState,
        [day]: {
          ...prevState[day],
          [name]: sanitizedValue.toString().padStart(2, '0')
        }
      }));
    } else {
      // If changing endHour, ensure it is greater than startHour

      console.log('sanitizedValue',sanitizedValue);

      const startHour = parseInt(availability[day].startHour, 10);

      console.log('start hour',startHour);
     // const updatedEndHour = sanitizedValue < startHour ? startHour : sanitizedValue;

     const updatedEndHour = sanitizedValue;
  
      setAvailability(prevState => ({
        ...prevState,
        [day]: {
          ...prevState[day],
          endHour: updatedEndHour.toString().padStart(2, '0')
        }
      }));
    }
  };




  const handleHourChange2 = (e, day) => {
    console.log('working');
    const { name, value } = e.target;

    console.log(name,value);

    var format_num='';
  
    format_num=formatNumber(value);
   
    const numericValue = parseInt(format_num, 10);
   // const numericValue = parseInt(value, 10);
  
    // Ensure the input value is within the valid range (00 to 23 for hours)
    const sanitizedValue = Math.max(0, Math.min(numericValue, 23));
  
    if (name === 'startHour2') {
      // If changing startHour, update it directly
      setAvailability(prevState => ({
        ...prevState,
        [day]: {
          ...prevState[day],
          [name]: sanitizedValue.toString().padStart(2, '0')
        }
      }));
    } else {
      // If changing endHour, ensure it is greater than startHour
      const startHour2 = parseInt(availability[day].startHour2, 10);
     // const updatedEndHour = sanitizedValue < startHour2 ? startHour2 : sanitizedValue;
  

      const updatedEndHour = sanitizedValue;
      setAvailability(prevState => ({
        ...prevState,
        [day]: {
          ...prevState[day],
          endHour2: updatedEndHour.toString().padStart(2, '0')
        }
      }));
    }
  };




  const handleHourChange3 = (e, day) => {
    console.log('working');
    const { name, value } = e.target;

    console.log(name,value);
   // const numericValue = parseInt(value, 10);
   var format_num='';
  
    format_num=formatNumber(value);
   
    const numericValue = parseInt(format_num, 10);
  
    // Ensure the input value is within the valid range (00 to 23 for hours)
    const sanitizedValue = Math.max(0, Math.min(numericValue, 23));
    const updatedEndHour = sanitizedValue;
    if (name === 'startHour3') {
      // If changing startHour, update it directly
      setAvailability(prevState => ({
        ...prevState,
        [day]: {
          ...prevState[day],
          [name]: sanitizedValue.toString().padStart(2, '0')
        }
      }));
    } else {
      // If changing endHour, ensure it is greater than startHour
      const startHour3 = parseInt(availability[day].startHour3, 10);
    //  const updatedEndHour = sanitizedValue < startHour3 ? startHour3 : sanitizedValue;
      const updatedEndHour = sanitizedValue;
      setAvailability(prevState => ({
        ...prevState,
        [day]: {
          ...prevState[day],
          endHour3: updatedEndHour.toString().padStart(2, '0')
        }
      }));
    }
  };
  
  

  const handleMinuteChange = (e, day) => {
    e.preventDefault();
    console.log("handleMinuteChange called");
   
    const { name, value } = e.target;
    console.log(e.target);

    var format_num='';
  
    format_num=formatNumber2(value);
    const numericValue = parseInt(format_num, 10);

    
    const sanitizedValue = Math.max(0, Math.min(59, numericValue));
    console.log(name,value);
    const updatedAvailability = {
      ...availability,
      [day]: {
        ...availability[day],
        [name]: sanitizedValue.toString().padStart(2, '0')
      }
    };
    console.log(sanitizedValue);
    if (name === 'endMinute' && updatedAvailability[day].startHour === updatedAvailability[day].endHour) {
      const startMinute = parseInt(updatedAvailability[day].startMinute, 10);
      //const endMinute = sanitizedValue >= startMinute ? sanitizedValue + 1 : startMinute;
      const endMinute = sanitizedValue;
      updatedAvailability[day].endMinute = endMinute.toString().padStart(2, '0');
    }
  
    if (name === 'startMinute' ) {
      
      console.log(sanitizedValue);
      const startMinute = parseInt(updatedAvailability[day].startMinute, 10);
      const endMinute = sanitizedValue >= startMinute ? sanitizedValue  : startMinute;
      updatedAvailability[day].startMinute = endMinute.toString().padStart(2, '0');
    }
    setAvailability(updatedAvailability);
  };
  






  const handleMinuteChange2 = (e, day) => {
    e.preventDefault();
    console.log("handleMinuteChange called");
   
    const { name, value } = e.target;
    console.log(e.target);
    var format_num='';
  
    format_num=formatNumber2(value);
    const numericValue = parseInt(format_num, 10);
   // const numericValue = parseInt(e.target.value, 10);
    const sanitizedValue = Math.max(0, Math.min(59, numericValue));
    console.log(name,value);
    const updatedAvailability = {
      ...availability,
      [day]: {
        ...availability[day],
        [name]: sanitizedValue.toString().padStart(2, '0')
      }
    };
    console.log(sanitizedValue);
    if (name === 'endMinute2' && updatedAvailability[day].startHour2 === updatedAvailability[day].endHour2) {
      const startMinute2= parseInt(updatedAvailability[day].startMinute2, 10);
     // const endMinute2 = sanitizedValue >= startMinute2 ? sanitizedValue  : startMinute2;
      const endMinute2 = sanitizedValue;
      updatedAvailability[day].endMinute2 = endMinute2.toString().padStart(2, '0');
    }
  
    if (name === 'startMinute2' ) {
      
      console.log(sanitizedValue);
      const startMinute2 = parseInt(updatedAvailability[day].startMinute2, 10);
      const endMinute2 = sanitizedValue >= startMinute2 ? sanitizedValue  : startMinute2;
      updatedAvailability[day].startMinute2 = endMinute2.toString().padStart(2, '0');
    }
    setAvailability(updatedAvailability);
  };
  
  
  const handleMinuteChange3 = (e, day) => {
    e.preventDefault();
    console.log("handleMinuteChange called");
   
    const { name, value } = e.target;
    console.log(e.target);
    var format_num='';
  
    format_num=formatNumber2(value);
    const numericValue = parseInt(format_num, 10);
   // const numericValue = parseInt(e.target.value, 10);
    const sanitizedValue = Math.max(0, Math.min(59, numericValue));
    console.log(name,value);
    const updatedAvailability = {
      ...availability,
      [day]: {
        ...availability[day],
        [name]: sanitizedValue.toString().padStart(2, '0')
      }
    };
    console.log(sanitizedValue);
    if (name === 'endMinute3' && updatedAvailability[day].startHour2 === updatedAvailability[day].endHour3) {
      const startMinute3= parseInt(updatedAvailability[day].startMinute3, 10);
      // const endMinute3 = sanitizedValue >= startMinute3 ? sanitizedValue + 1 : startMinute3;
      const endMinute3 = sanitizedValue;
      updatedAvailability[day].endMinute3 = endMinute3.toString().padStart(2, '0');
    }
  
    if (name === 'startMinute3' ) {
      
      console.log(sanitizedValue);
      const startMinute3 = parseInt(updatedAvailability[day].startMinute3, 10);
      const endMinute3 = sanitizedValue >= startMinute3 ? sanitizedValue : startMinute3;
      updatedAvailability[day].startMinute3 = endMinute3.toString().padStart(2, '0');
    }
    setAvailability(updatedAvailability);
  };
  





  // Assuming bookedTimeslots is a filtered array containing only relevant items
const filteredBookedTimeslots = bookedTimeslot.filter(item => item.meetingDate === selectDateMob);


  const isBetweenAvailabilityTimeslot = (timeslot, day) => {
    const validDays = ['tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'mon'];
  
    //console.log('my day', day);
    // Convert the provided day to lowercase
    const lowercaseDay = day.toLowerCase();
  
    // Check if the converted day is valid
    if (!validDays.includes(lowercaseDay)) {
      console.error(`Invalid day: ${day}`);
      return false;
    }
  

    const isNotAvbl = availability[lowercaseDay].isUnAvbl;

if(isNotAvbl){
  return true;
}



    const startAvailability = availability[lowercaseDay].startHour3 + ':' + availability[lowercaseDay].startMinute3;
    const endAvailability = availability[lowercaseDay].endHour3 + ':' + availability[lowercaseDay].endMinute3;
  

    if(timeslot >= startAvailability && timeslot < endAvailability){
    return timeslot >= startAvailability && timeslot < endAvailability;
    }


    const startAvailability2 = availability[lowercaseDay].startHour2 + ':' + availability[lowercaseDay].startMinute2;
    const endAvailability2 = availability[lowercaseDay].endHour2 + ':' + availability[lowercaseDay].endMinute2;
  

    
    return timeslot >= startAvailability2 && timeslot < endAvailability2;
    


  };
  
  
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const dayname = ['sun','mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  // Get the current day index
const currentDayIndex = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

// Create a dynamic array starting from the current day
const days = [
  ...dayname.slice(currentDayIndex),
  ...dayname.slice(0, currentDayIndex)
];
  const handleEditClick = () => {
    // Toggle the value of isEdit
    setisEdit(!isEdit);
  };


  const handleIsMoreToggle = (day) => {
    console.log(day);
    setAvailability((prevAvailability) => {
      const updatedAvailability = { ...prevAvailability };
      updatedAvailability[day] = {
        ...prevAvailability[day],
        isMore: !prevAvailability[day].isMore,
      };
      return updatedAvailability;
    });
  };


  // const handleIsUnavblToggle = (e,day) => {
  //   e.preventDefault();
  //   console.log(day);
  //   setAvailability((prevAvailability) => {
  //     const updatedAvailability = { ...prevAvailability };
  //     updatedAvailability[day] = {
  //       ...prevAvailability[day],
  //       isUnAvbl: !prevAvailability[day].isUnAvbl
  //     };
  //     return updatedAvailability;
  //   });
  // };
  
  const handleIsUnavblToggle = (e, day) => {
    e.preventDefault();
    console.log(day);
    console.log('Before update:', availability[day].isUnAvbl);
    setAvailability((prevAvailability) => {
      const updatedAvailability = { ...prevAvailability };
      updatedAvailability[day] = {
        ...prevAvailability[day],
        isUnAvbl: !prevAvailability[day].isUnAvbl,
      };
      console.log('After update:', updatedAvailability[day].isUnAvbl);
      return updatedAvailability;
    });

    
  };

  
  
  
  useEffect(() => {

    console.log('test');
    const coachId = sessionStorage.getItem('coachId');
    if(!coachId){
      router.push('/coach/login')
  }




}, [])

const getMyAvailability = async () => {
  console.log('testtt');
  console.log(nextSevenDay[0].date, nextSevenDay[1].date,nextSevenDay[2].date,nextSevenDay[3].date,nextSevenDay[4].date,nextSevenDay[5].date,nextSevenDay[6].date);
  const coachId = sessionStorage.getItem('coachId');
  const schedulesCollection = collection(database, 'schedules');
  const queryDoc = query(schedulesCollection, where("coach_id", "==", coachId), where(
    "date",
    "in",
    [nextSevenDay[0].date, nextSevenDay[1].date,nextSevenDay[2].date,nextSevenDay[3].date,nextSevenDay[4].date,nextSevenDay[5].date,nextSevenDay[6].date] // Additional OR condition
  ));

  try {
    const response = await getDocs(queryDoc);
    const fetchedAvailability = response.docs.map((data) => {
      console.log(data.data());
      return { ...data.data(), availability_id: data.id };
    });
    setmyAvailability(fetchedAvailability);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};







const getMyMeeting = async () => {

  console.log('testtt');
  const coachId = sessionStorage.getItem('coachId');
  const meetingSessionCollection = collection(database, 'meeting');
  const queryDoc = query(meetingSessionCollection, where("coachId", "==", coachId));

    await getDocs(queryDoc).then((response) => {
      setMeeting(
        response.docs.map((data) => {
          console.log(data.data());
          return { ...data.data(), meet_id: data.id };
        })
      );
    });
   
 
 
 }


 const getMyClient = async () => {

  console.log('testtt');
  const coachId = sessionStorage.getItem('coachId');
  const meetingSessionCollection = collection(database, 'client_user');
  const queryDoc = query(meetingSessionCollection, where("assign_coach_id", "==", coachId));

    await getDocs(queryDoc).then((response) => {
      setMyClient(
        response.docs.map((data) => {
          console.log(data.data());
          return { ...data.data(), c_id: data.id };
        })
      );
    });
   
 
 
 }

 useEffect(() => {
  if (myAvailability) {
  
    const updatedAvailability = { ...availability };
    myAvailability.forEach((myData) => {
      const { day, startHour, startMinute, endHour, endMinute, startHour2, startMinute2, endHour2, endMinute2, startHour3, startMinute3, endHour3, endMinute3, isUnAvbl, date, month, year } = myData;
      updatedAvailability[day] = {
        startHour: startHour.padStart(2, '0'),
        startMinute: startMinute.padStart(2, '0'),
        endHour: endHour.padStart(2, '0'),
        endMinute: endMinute.padStart(2, '0'),
        startHour2: startHour2.padStart(2, '0'),
        startMinute2: startMinute2.padStart(2, '0'),
        endHour2: endHour2.padStart(2, '0'),
        endMinute2: endMinute2.padStart(2, '0'),
        startHour3: startHour3.padStart(2, '0'),
        startMinute3: startMinute3.padStart(2, '0'),
        endHour3: endHour3.padStart(2, '0'),
        endMinute3: endMinute3.padStart(2, '0'),
        date:date,
        month:month,
        year:year,
        isMore: false,
        isUnAvbl: isUnAvbl,
      };
    });
    setAvailability(updatedAvailability);
    
    console.log('my availability');
    console.log(myAvailability);
    console.log(updatedAvailability);

    myAvailability.forEach((myData) => {
      const { day, startHour } = myData;
      if (updatedAvailability[day]) {
        console.log(`Start Hour for ${day}: ${updatedAvailability[day].startHour}`);
      }
    });
  }
}, [myAvailability]);


 



useEffect(() => {
  
  getWeek();
  getAllWeek();

}, [])


    useEffect(() => {

      const coachId = sessionStorage.getItem('coachId');
      if(coachId == ""){
        router.push('/client/login')
    }
      setCoachId(coachId);

      if (coachId) {
        const fetchCoach = async () => {
          const coachRef = doc(collection(database, "coaches_user"), coachId);
          const coachDoc = await getDoc(coachRef);

          if (coachDoc.exists()) {
            setCoach(coachDoc.data());
            console.log('coach data',coachDoc.data());
            setcoachesCalApiKey(coachDoc.data().coach_api);
            setcoachesCalUsername(coachDoc.data().coach_uname);

          } else {
            console.log("No coach found");
          }
        };
        fetchCoach();
        getMyMeeting();
       getMyAvailability();
       getMyClient();
      }



  }, [coachId])


   
  useEffect(() => {
    setAvailability({ 

      mon: { startHour: '09', startMinute: '00', endHour: '17', endMinute: '00',startHour2: '00', startMinute2: '00', endHour2: '00', endMinute2: '00',startHour3: '00', startMinute3: '00', endHour3: '00', endMinute3: '00', isMore:false, isUnAvbl :false },
      tue: { startHour: '09', startMinute: '00', endHour: '17', endMinute: '00',startHour2: '00', startMinute2: '00', endHour2: '00', endMinute2: '00', startHour3: '00', startMinute3: '00', endHour3: '00', endMinute3: '00',isMore:false,isUnAvbl :false },
      wed: { startHour: '09', startMinute: '00', endHour: '17', endMinute: '00',startHour2: '00', startMinute2: '00', endHour2: '00', endMinute2: '00',startHour3: '00', startMinute3: '00', endHour3: '00', endMinute3: '00', isMore:false, isUnAvbl :false },
      thu: { startHour: '09', startMinute: '00', endHour: '17', endMinute: '00',startHour2: '00', startMinute2: '00', endHour2: '00', endMinute2: '00',startHour3: '00', startMinute3: '00', endHour3: '00', endMinute3: '00',isMore:false,isUnAvbl :false },
      fri: { startHour: '09', startMinute: '00', endHour: '17', endMinute: '00',startHour2: '00', startMinute2: '00', endHour2: '00', endMinute2: '00',startHour3: '00', startMinute3: '00', endHour3: '00', endMinute3: '00', isMore:false,isUnAvbl :false },
      sat: { startHour: '09', startMinute: '00', endHour: '17', endMinute: '00',startHour2: '00', startMinute2: '00', endHour2: '00', endMinute2: '00', startHour3: '00', startMinute3: '00', endHour3: '00', endMinute3: '00', isMore:false,isUnAvbl :false },
      sun: { startHour: '09', startMinute: '00', endHour: '17', endMinute: '00',startHour2: '00', startMinute2: '00', endHour2: '00', endMinute2: '00',startHour3: '00', startMinute3: '00', endHour3: '00', endMinute3: '00', isMore:false,isUnAvbl :false }
     });
    getWeek();
    

}, [startLoop])

useEffect(() => {
 
  getMyAvailability();

  const reorderAvailability = () => {
    const daysOrder = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const currentDay = new Date().toLocaleString('en-us', { weekday: 'short' }).toLowerCase();
    const currentDayIndex = daysOrder.indexOf(currentDay);

    const reorderedDays = Array.from({ length: 7 }, (_, index) =>
      daysOrder[(currentDayIndex + index) % 7]
    );

    const reorderedAvailability = {};
    reorderedDays.forEach((day) => {
      reorderedAvailability[day] = availability[day];
    });

    setAvailability(reorderedAvailability);
  };

  reorderAvailability();
},[nextSevenDay[0].date])






useEffect(() => {

  if(coachesCalApiKey!=''){

 // getTimeslots();

  //getBookedSchedule();
  }

  if(coachesCalUsername!=''){

   // getTimeslots();

    getBookedSchedule();
    }

}, [coachesCalApiKey,coachesCalUsername])


//Get next Seven day

 // const [date, setDate] = useState(null);
    const getWeek =() =>{

      const next7Days = [];
      var now = new Date(); // current date and time

 const options = { month: 'short' };
 console.log(now.toLocaleString('default', options));

 const options2 = { day: '2-digit'  };
 console.log(now.toLocaleDateString (undefined, options2));

 const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let endLoop=startLoop + 7;
 for (let i = startLoop; i < endLoop; i++) {
  let today = new Date(); // create a new date object with the current date and time
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + i);

   // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
   let dayOfWeek = tomorrow.getDay();

   // Convert the day of the week to a 3-digit string
   let dayOfWeekStr = '';

   if(dayOfWeek == 0){

    dayOfWeekStr = 'Sun';
   }

   if(dayOfWeek == 1){

     dayOfWeekStr = 'Mon';
   }

   if(dayOfWeek == 2){

     dayOfWeekStr = 'Tue';
   }

   if(dayOfWeek == 3){

     dayOfWeekStr = 'Wed';
   }

   if(dayOfWeek == 4){

     dayOfWeekStr = 'Thu';
   }

   if(dayOfWeek == 5){

     dayOfWeekStr = 'Fri';
   }
   if(dayOfWeek == 6){

     dayOfWeekStr = 'Sat';
   }
   let month=monthNames[tomorrow.getMonth()].toUpperCase();
  next7Days.push({'date':tomorrow.toLocaleDateString(undefined, options2),'day':dayOfWeekStr,'month':month});
 //console.log();
 }

 console.log('next7days',next7Days);
setnextSevenDay(next7Days);
    }



    //get next 1 month
    const getAllWeek =() =>{

      const next7Days = [];
      var now = new Date(); // current date and time

 const options = { month: 'short' };
 console.log(now.toLocaleString('default', options));

 const options2 = { day: '2-digit'  };
 console.log(now.toLocaleDateString (undefined, options2));

 const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let endLoop=startLoop + 7;
 for (let i = 0; i < 70; i++) {
  let today = new Date(); // create a new date object with the current date and time
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + i);

   // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
   let dayOfWeek = tomorrow.getDay();

   // Convert the day of the week to a 3-digit string
   let dayOfWeekStr = '';

   if(dayOfWeek == 0){

    dayOfWeekStr = 'Sun';
   }

   if(dayOfWeek == 1){

     dayOfWeekStr = 'Mon';
   }

   if(dayOfWeek == 2){

     dayOfWeekStr = 'Tue';
   }

   if(dayOfWeek == 3){

     dayOfWeekStr = 'Wed';
   }

   if(dayOfWeek == 4){

     dayOfWeekStr = 'Thu';
   }

   if(dayOfWeek == 5){

     dayOfWeekStr = 'Fri';
   }
   if(dayOfWeek == 6){

     dayOfWeekStr = 'Sat';
   }
   let month=monthNames[tomorrow.getMonth()].toUpperCase();
  next7Days.push({'date':tomorrow.toLocaleDateString(undefined, options2),'day':dayOfWeekStr,'month':month});
 //console.log();
 }

 console.log(next7Days);
setallWeekDay(next7Days);
    }


    const handleFormOk = () => {
      setisFormShow(true);
     // setisShowmsg(false);
    };
  
    const handleFormCancel = () => {
      setisFormShow(false);
     // setisShowmsg(false);
    };


    const handleSchedule = (e) => {
      e.preventDefault();
      setisSesShow(true);
     // setisShowmsg(false);
    };
  
    const handleScheduleCancel = () => {
      setisSesShow(false);
     // setisShowmsg(false);
    };

    const handleStand = (e) => {
      e.preventDefault();
      setisStandShow(true);
     // setisShowmsg(false);
    };
  
    const handleStandCancel = () => {
      setisStandShow(false);
     // setisShowmsg(false);
    };


    const handleavbl = (e) => {
      e.preventDefault();
      setisAvblShow(true);
     // setisShowmsg(false);
    };
  
    const handleavblCancel = () => {
      setisAvblShow(false);
     // setisShowmsg(false);
    };



    const handleSyncFormOk = () => {
      setisSyncFormShow(true);
     // setisShowmsg(false);
    };
  
    const handleSyncFormCancel = () => {
      setisSyncFormShow(false);
     // setisShowmsg(false);
    };

/**Get Timeslot */

// const getTimeslots_old = async () => {

//   var date = new Date(); // current date and time

//   var tomorrow = new Date(date);
//   tomorrow.setDate(date.getDate() + 1);
//   var todayDate = new Date(tomorrow).toISOString().slice(0, 10);



//   var startTime = "";
//   var endTime = "";
//   const d = date;
//   var selectedDay = date.getDay();
//   //console.log("selected days: " + selectedDay + "");


//   var scheduleId = 62521;
//   var included = 1;
//   setarray1([]);

//   try {
//     const res = await fetch(
//       "" +
//         apiUrl +
//         "v1/schedules/" +
//         scheduleId +
//         "?apiKey=" +
//         coachesCalApiKey +
//         "",
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     const data = await res.json();
//     // //console.log(res);
//     //console.log(data);

//     if (res.status == 200) {
//       //console.log("testing");
//       if (data.schedule.availability.length > 0) {
//         //console.log(data.schedule.availability.length);

//         for (
//           let index = 0;
//           index < data.schedule.availability.length;
//           index++
//         ) {
//           const days = data.schedule.availability[index].days;
//           if (days.includes(selectedDay)) {
//             startTime = data.schedule.availability[index].startTime;
//             endTime = data.schedule.availability[index].endTime;
//             let endtimeArr = endTime.split(":");
//             //console.log(endtimeArr[2]);

//             if (endtimeArr[2] != "00") {
//               endTime = setCharAt(endTime, 6, "0");
//               endTime = setCharAt(endTime, 7, "0");
//             }

//             //console.log(endTime);

//             //console.log(startTime);
//             //console.log(endTime);
//             included = 1;
//             break;
//           } else {
//             included = 0;
//           }
//         }

//         var timeslots = [startTime];
//         //console.log(coachesEventTimeInterval);

// //var interval = coachesEventTimeInterval;
// var interval=90;

//         var times = [
//           { start: "10:00:00", end: "10:20:00" },
//           { start: "10:40:00", end: "10:50:00" },
//           { start: "14:00:00", end: "14:15:00" },
//         ];

//         while (
//           Date.parse("01/01/2011 " + endTime + "") >
//           Date.parse("01/01/2011 " + startTime + "")
//         ) {
//           //console.log(isBetween); // true
//           startTime = addMinutes(startTime, interval);
//           if (
//             Date.parse("01/01/2011 " + endTime + "") >
//             Date.parse("01/01/2011 " + startTime + "")
//           ) {
//             var isBetween = times.some(({ start, end }) => {
//               return startTime >= start && startTime <= end;
//             });

//             var isBetween2 = times.some(({ start, end }) => {
//               return (
//                 addMinutes(startTime, interval) > start &&
//                 addMinutes(startTime, interval) < end
//               );
//             });
//             if (!isBetween && !isBetween2) {
//               timeslots.push(startTime);
//             }
//           }
//         }

//         console.log(timeslots);
//       } else {
//         //console.log("no");
//         //setisShow(false);
//       }
//    //   setarray1(timeslots);
//     }
//   } catch (err) {
//     //console.log(err);
//   }


// };


 /* Get Booked Schedule  of Coaches */

 const getBookedSchedule = async () => {
  var dateFrom = "2023-03-27";
  var dateTo = "2023-04-27";
  var busySchedule = [];

  try {
    const res = await fetch(
      "" +
        apiUrl +
        "v1/availability?apiKey=" +
        coachesCalApiKey +
        "&dateFrom=" +
        dateFrom +
        "&dateTo=" +
        dateTo +
        "&username=" +
        coachesCalUsername +
        "",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (res.status == 200) {
      if (data.busy.length > 0) {
        //console.log(data.busy);
        for (let index = 0; index < data.busy.length; index++) {
          var start = data.busy[index].start;

          let stime = new Date(start).toLocaleTimeString("en-US");

          let date_ = new Date(start).getDate();
          let month_ = new Date(start).getMonth();
          let year_ = new Date(start).getFullYear();
          console.log(date_);
          console.log(month_);
          console.log(year_);
       let  meeting_title = data.busy[index].title;


          var convertedStartTime = new Date("1/1/2013 " + stime);
          let convertedStartTimeHourStr="";
          let convertedStartTimeMinStr="";


          let convertedEndTimeHourStr="";
          let convertedEndTimeMinStr="";

          if(convertedStartTime.getHours() < 10){
            convertedStartTimeHourStr="0"+convertedStartTime.getHours()+"";
          }else{
            convertedStartTimeHourStr=""+convertedStartTime.getHours()+"";
          }


          if(convertedStartTime.getMinutes() < 10){
            convertedStartTimeMinStr="0"+convertedStartTime.getMinutes()+"";
          }else{
            convertedStartTimeMinStr=""+convertedStartTime.getMinutes()+"";
          }




          var startTime =
          convertedStartTimeHourStr+
            ":" +
            convertedStartTimeMinStr +
            ":00";

          var end = data.busy[index].end;

          let etime = new Date(end).toLocaleTimeString("en-US");

          var convertedEndTime = new Date("1/1/2013 " + etime);

          if(convertedEndTime.getHours() < 10){
            convertedEndTimeHourStr="0"+convertedEndTime.getHours()+"";
          }else{
            convertedEndTimeHourStr=""+convertedEndTime.getHours()+"";
          }

          if(convertedEndTime.getMinutes() < 10){
            convertedEndTimeMinStr="0"+convertedEndTime.getMinutes()+"";
          }else{
            convertedEndTimeMinStr=""+convertedEndTime.getMinutes()+"";
          }
          var endTime =
          convertedEndTimeHourStr +
            ":" +
            convertedEndTimeMinStr +
            ":00";

          busySchedule.push({ starttime: startTime, endtime: endTime, title:meeting_title,date:date_,month:month_,year:year_ });

          //console.log(bookedTimeslot);
        }
      }
    }
  } catch (err) {
    //console.log(err);
  }
  //setbookedTimeslot(busySchedule);

  console.log(busySchedule); 
  // getTimeslots();
};


const [Month, setMonth] = useState("");
const [Date_, setDate_] = useState();
const [Day_, setDay_] = useState("");

const [meetingByDate, setMeetingByDate] = useState([]);
const [meetingdate, setmeetingdate] = useState("");

const [meetingday, setmeetingday] = useState("");

const [CoachUnavailability, setCoachUnavailability] = useState([]);
const [unavailableId, setUnavailableId] = useState(null);
const [UnavailableStartSlot, setUnavailableStartSlot] = useState(null);
const [UnavailableEndSlot, setUnavailableEndSlot] = useState(null);
const [isUnavailable, setIsUnavailable] = useState(false);
const [meetingCreatedAt, setmeetingCreatedAt] = useState("");

const [meetingName, setmeetingName] = useState("");

const [meetingLink, setmeetingLink] = useState("");

const [meetingPrivacy, setmeetingPrivacy] = useState("");
const [meetingApiCreated, setmeetingApiCreated] = useState("");

const [meetingtime, setmeetingtime] = useState("");

const [meetingclient, setmeetingclient] = useState("");

const [meetingemail, setmeetingemail] = useState("");
const [meetingendtime, setmeetingendtime] = useState("");
const [selectedTime, setselectedTime]: any = useState();

const [BookedId, setBookedId] = useState();
  // get all meeting data
  const getMeetingByDate = async (todayDate: string) => {

    console.log('on load date',todayDate);
    const coachId = sessionStorage.getItem("coachId");

    const queryDoc = query(meetingRef, where("coachId", "==", coachId),where("meetingDate", "==", todayDate));

    await getDocs(queryDoc).then((response) => {
      setMeetingByDate(
        response.docs.map((data) => {
          return { ...data.data(), meeting_id: data.id };
        })
      );
    });
  };

  const scheduleNext = async () => {
    setmeetingSuccessMsg('');
   
   
    try {
      const res = await fetch(
        "https://api.daily.co/v1/rooms",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization" :"Bearer a2c645d6f0369a165420d8b8b8a24894cfb18c209f1c43f8f2cb5ef35440f0a0",
          },

        }
      );
      const data = await res.json();
      //console.log(data);
      setmeetingLink(data.url);
      setmeetingName(data.name);
      setmeetingApiCreated(data.api_created);
      setmeetingPrivacy(data.privacy);

      setmeetingCreatedAt(data.created_at);
      setBookedId(data.id);
      if (res.status == 200) {
      

        setmeetingLink(data.url);
       

        setBookedId(data.id);

        const logoUrl = 'https://wabya.com/images/logo-new.png';
        const msg = `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
           <head>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <title>Wabya</title>
              <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap" rel="stylesheet">
              <style type="text/css">
                 body{padding-top: 0 !important; padding-bottom: 0 !important; padding-top: 0 !important; padding-bottom: 0 !important; margin:0 !important; width: 100% !important; -webkit-text-size-adjust: 100% !important; -ms-text-size-adjust: 100% !important; -webkit-font-smoothing: antialiased !important; font-size:14px; line-height:22px; font-family: 'Lato', sans-serif; font-weight:400;}
              </style>
           </head>
           <body paddingwidth="0" paddingheight="0"  style="" offset="0" toppadding="0" leftpadding="0">
           <div style="display:table; width:600px !important; margin: 0 auto; background: #fff; padding:20px;">
              <table width="600" border="0" cellspacing="0" cellpadding="0" class="tableContent bgBody" align="center" style='width: 600px; display: block;'>
                 <tbody>
                    <tr>
                       <table class="MainContainer" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#ece6d5" align="center" style='width: 600px; -webkit-border-radius: 15px; -moz-border-radius: 15px; border-radius: 15px;'>
                          <tbody style=''>
        <tr>
                                <td colspan="2"><div style="text-align: center; margin:35px 0 0" class="contentLogo"><a href="https://www.#.com"><img src="${logoUrl}" width="200px" alt="" border="0" style=""></a></div></td>
                             </tr>
                             <tr>
                                <td>
                                   <div style="padding:0 30px;  position: relative; z-index: 2;line-height: 22px;font-family: 'Lato', sans-serif;font-weight: 600;text-align: center;">
            <p style="color: #3498db;text-align: center;font-size: 36px;">Meeting Scheduled!</p>
        <p style="font-size: 18px; text-align: center; color: #864985;">Your meeting  has been Schedule. We are looking forward to seeing you there!</p>
        <p style="font-size: 16px; text-align: center; margin:0 0 10px;color: #242424;">Date: ${meetingdate}</p>
        <p style="font-size: 16px; text-align: center; margin:0 0 20px;color: #242424;">Time: ${meetingtime} - ${meetingendtime}</p>
        <hr style="border: 1px solid #1c686b;">
        <p style="font-size: 14px; color: #242424; text-align: center;">Thank you,<br>Wabya Team</p>
         </div>  
                                </td>
                             </tr>
                          </tbody>
                       </table>
                    </tr>
                 </tbody>
              </table>
         </div>
           </body>
        </html>
  `;
      sendMailFunc2(myData.coach_email,msg,'Meeting Scheduled');   	
      
      const msg2 = `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
         <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Wabya</title>
            <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap" rel="stylesheet">
            <style type="text/css">
               body{padding-top: 0 !important; padding-bottom: 0 !important; padding-top: 0 !important; padding-bottom: 0 !important; margin:0 !important; width: 100% !important; -webkit-text-size-adjust: 100% !important; -ms-text-size-adjust: 100% !important; -webkit-font-smoothing: antialiased !important; font-size:14px; line-height:22px; font-family: 'Lato', sans-serif; font-weight:400;}
            </style>
         </head>
         <body paddingwidth="0" paddingheight="0"  style="" offset="0" toppadding="0" leftpadding="0">
         <div style="display:table; width:600px !important; margin: 0 auto; background: #fff; padding:20px;">
            <table width="600" border="0" cellspacing="0" cellpadding="0" class="tableContent bgBody" align="center" style='width: 600px; display: block;'>
               <tbody>
                  <tr>
                     <table class="MainContainer" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#ece6d5" align="center" style='width: 600px; -webkit-border-radius: 15px; -moz-border-radius: 15px; border-radius: 15px;'>
                        <tbody style=''>
      <tr>
                              <td colspan="2"><div style="text-align: center; margin:35px 0 0" class="contentLogo"><a href="https://www.#.com"><img src="${logoUrl}" width="200px" alt="" border="0" style=""></a></div></td>
                           </tr>
                           <tr>
                              <td>
                                 <div style="padding:0 30px;  position: relative; z-index: 2;line-height: 22px;font-family: 'Lato', sans-serif;font-weight: 600;text-align: center;">
          <p style="color: #3498db;text-align: center;font-size: 36px;">Meeting Scheduled!</p>
      <p style="font-size: 18px; text-align: center; color: #864985;">Your meeting  has been Schedule. We are looking forward to seeing you there!</p>
      <p style="font-size: 16px; text-align: center; margin:0 0 10px;color: #242424;">Date: ${meetingdate}</p>
      <p style="font-size: 16px; text-align: center; margin:0 0 20px;color: #242424;">Time: ${meetingtime} - ${meetingendtime}</p>
      <hr style="border: 1px solid #1c686b;">
      <p style="font-size: 14px; color: #242424; text-align: center;">Thank you,<br>Wabya Team</p>
       </div>  
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </tr>
               </tbody>
            </table>
       </div>
         </body>
      </html>
`;
    sendMailFunc2(meetingemail,msg2,'Meeting Scheduled');  

    setmeetingSuccessMsg('MeetingScheduled');
     
      } else {
        setmeetingSuccessMsg('');
        // setbookingLoad(false);
        // setbookingError(true);
      }

      ////console.log(data);
    } catch (err) {
      setmeetingSuccessMsg('');
      // setbookingLoad(false);
      // setbookingError(true);
      ////console.log(err);
    }

  
  

    // setNext(true);
  };





const getTimeslots = async (date) => {
  
console.log('on load here',date);
  console.log(date);

  setmeetingendtime('');
  setmeetingtime('');
// setmeetingtime('');
  var tomorrow = new Date(date);

  var t_date = new Date();

  console.log('t date', t_date);


  if(tomorrow.getDay() == 0){
    setmeetingday('sun');
  }
  
if(tomorrow.getDay() == 1){
  setmeetingday('mon');
}


if(tomorrow.getDay() == 2){
  setmeetingday('tue');
}
if(tomorrow.getDay() == 3){
  setmeetingday('wed');
}
if(tomorrow.getDay() == 4){
  setmeetingday('thu');
}
if(tomorrow.getDay() == 5){
  setmeetingday('fri');
}

if(tomorrow.getDay() == 6){
  setmeetingday('sat');
}

if(t_date.getDate() != tomorrow.getDate()){
  tomorrow.setDate(date.getDate() + 1);
}
  

console.log(tomorrow.getDay(),'tommorow');








  var todayDate = new Date(tomorrow).toISOString().slice(0, 10);

  //console.log(todayDate);



  getMeetingByDate(todayDate);
  console.log('today date', todayDate);
  setmeetingdate(todayDate);

  var startTime = "";
  var endTime = "";
  const d = date;
  var selectedDay = date.getDay();
  ////console.log("selected days: " + selectedDay + "");

  setDate(date);
  console.log('today date nnndhjhg',date);
  setMonth(date.toLocaleString("default", { month: "long" }));
  setDate_(date.getDate());
  setDay_(date.toLocaleDateString("default", { weekday: "long" }));

  var included = 1;
  setarray2([]);

 

    // ////console.log(res);
    ////console.log(data);





  //getBookedSchedule();
};




function isReserved_old(time) {
  // assume reserved times are stored in an array called 'reservedTimes'
  for (let i = 0; i < meetingByDate.length; i++) {
    if (time === meetingByDate[i].meetingTime) {
      // if the time slot is reserved, return true
      return true;
    }
  }
  // if the time slot is not reserved, return false
  return false;
}


function isReserved(time) {
  // Assume reserved times are stored in an array called 'meetingByDate'
  for (let i = 0; i < meetingByDate.length; i++) {
    const reservedStartTime = meetingByDate[i].meetingTime;
    const reservedEndTime = meetingByDate[i].meetingEndTime;

    if (isTimeWithinRange(time, reservedStartTime, reservedEndTime)) {
      // If the time slot is reserved, return true
      return true;
    }
  }
  // If the time slot is not reserved, return false
  return false;
}

// Function to check if a given time is within a specified time range
function isTimeWithinRange(time, startTime, endTime) {
  return time >= startTime && time <= endTime;
}


// Function to check if a given time is within a specified time range
function isTimeWithinRange2(time, startTime, endTime) {
  return time >= startTime && time < endTime;
}
useEffect(() => {
  // Get the current time

 
  let now = new Date();
  let currentHours = now.getHours();
  let currentMinutes = now.getMinutes();

  // Given date and time in Indian Standard Time (IST)
const givenDate =date;

// Convert the given date and time to South Africa Standard Time (SAST)
const saTimeZone = 'Africa/Johannesburg';
const saFormattedDate = givenDate.toLocaleString('en-US', { timeZone: saTimeZone });

console.log(`Given date and time in IST: ${givenDate}`);
console.log(`Converted date and time in SAST: ${saFormattedDate}`);
  let currentTime=`00:00:00`;
  if(date.getDate() == now.getDate() && date.getFullYear() == now.getFullYear() && date.getMonth() == now.getMonth()){
  currentTime = `${currentHours}:${currentMinutes < 10 ? '0' : ''}${currentMinutes}:00`;
  }else{
    currentTime = `00:00:00`;
  }
  console.log(date.getDate(),date.getFullYear(),date.getMonth());
console.log(now.getDate(),now.getFullYear(),now.getMonth());
  console.log('terrr');

  console.log('my avilability', myAvailability);
//   if(myData != null){
//     if(myData.start_time){
// var starttime = myData.start_time;
//     }else{
//       var starttime = "09:00:00";
//     }
// var interval = "45";
// if(myData.start_time){
// var endtime = myData.end_time;
//      }else{
//        var endtime = "17:00:00";
//      }

//     }
//     else{
//       var starttime = "09:00:00";
//       var interval = "45";
//       var endtime = "17:00:00";
//     }
//var endtime = "17:00:00";





if(myAvailability && myAvailability.length !=0){

  for (let index = 0; index < myAvailability.length; index++) {
    
    if(myAvailability[index].day == meetingday){


      if(! myAvailability[index].isUnAvbl){

      var starttime = myAvailability[index].startHour + ":" + myAvailability[index].startMinute + ":00";

      var endtime = myAvailability[index].endHour + ":" + myAvailability[index].endMinute + ":00";

      var starttime2 = myAvailability[index].startHour2 + ":" + myAvailability[index].startMinute2 + ":00";

      var endtime2 = myAvailability[index].endHour2 + ":" + myAvailability[index].endMinute2 + ":00";

      var starttime3 = myAvailability[index].startHour3 + ":" + myAvailability[index].startMinute3 + ":00";

      var endtime3 = myAvailability[index].endHour3 + ":" + myAvailability[index].endMinute3 + ":00";


      }
      else{
        var starttime = '';
        var endtime = '';

        var starttime2 = '';
        var endtime2 = '';

        var starttime3 = '';
        var endtime3 = '';

      }
      break;
    }
    else{
      var starttime = "09:00:00";
      var endtime = "17:00:00";
      var starttime2 = '';
      var endtime2 = '';

      var starttime3 = '';
      var endtime3 = '';
    }
    
  }

  var interval = "60";




  }
  else{
    var starttime = "09:00:00";
    var interval = "60";
    var endtime = "17:00:00";
  }

if (starttime >= currentTime) {
var timeslots = [starttime];
}else{
var timeslots = [];
}
//console.log(meetingByDate);

while (starttime < endtime) {

starttime = addMinutes(starttime, interval); 
if (starttime >= currentTime) {
if(starttime < endtime){
  
    console.log(currentTime);

if(!isReserved(starttime)){

  if (!isTimeWithinRange2(starttime, starttime2, endtime2)) {
    // If the time slot is reserved, return true
   

    if (!isTimeWithinRange2(starttime, starttime3, endtime3)) {
      // If the time slot is reserved, return true
      timeslots.push(starttime);
    }
  }

}

}
}
//settimeslot_load(false);
}

console.log('on load array',timeslots);
setarray2(timeslots);
  

}, [meetingByDate]);
 
const checkAvailability = () => {
  const dateString = `${Day_} ${Month} ${Date_}`;
  const isDateAvailable = CoachUnavailability.find((item) => item.date === dateString);
//console.log(isDateAvailable);
  if(isDateAvailable){
    setUnavailableId(isDateAvailable.un_id);
    setUnavailableStartSlot(isDateAvailable.startSlot);
    setUnavailableEndSlot(isDateAvailable.endSlot);
  }else{
    setUnavailableId(null);
    setUnavailableId(null);
    setUnavailableId(null);
  }
  
  setIsUnavailable(!isDateAvailable);
};


const handleClientClick = (event: any) => {
  //console.log(event)

  const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[selectedIndex];
   // const selectedTime = selectedOption.getAttribute('data-time');
 
  console.log( selectedOption.getAttribute("data-value"));
  console.log( selectedOption.getAttribute("data-email"));
  setmeetingclient(selectedOption.getAttribute("data-value"));
  setmeetingemail(selectedOption.getAttribute("data-email"));

 
  
};










const handleTimeClick = (event: any) => {
  console.log(event)

  const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[selectedIndex];
   // const selectedTime = selectedOption.getAttribute('data-time');
  console.log( selectedOption.getAttribute("data-key"));
  console.log( selectedOption.getAttribute("data-time"));
  setmeetingtime(selectedOption.getAttribute("data-time"));

  // selectedTime.splice(0, selectedTime.length);
  //selectedTime.splice(0, array1.length);
  setselectedTime(selectedOption.getAttribute('data-key'));
  //////console.log(meetingdate);
  ////console.log(meetingtime);
  var startTime = meetingdate + " " + meetingtime;
  ////console.log(startTime);

  var newTime = new Date(
    new Date(
      "1970/01/01 " + selectedOption.getAttribute("data-time")
    ).getTime() +
      45 * 60000
  ).toLocaleTimeString("en-UK", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  ////console.log(newTime);
  setmeetingendtime(newTime);
  
};

const getBookingId = async () => {


  const meetRef = collection(database, "meeting");

  addDoc(meetRef, {
    meetingId: BookedId,
    clientId: meetingclient,
    coachId: sessionStorage.getItem("coachId"),
    coach_name: myData.coach_name,
    meetingDate: meetingdate,
    meetingTime: meetingtime,
    meetingEndTime: ""+meetingendtime+":00",
    meetingLink: meetingLink,
    meetingApiCreated:meetingApiCreated,
    meetingName:meetingName,
    meetingPrivacy:meetingPrivacy,
    meetingCreatedAt:meetingCreatedAt,
    isCoachCancel:'0',
    isNotified:1,
    status: "true",
    meetingstatus: "wait",
    isMeetingStarted: 0,
  isMeetingEnd: 0,
  });

  // setTimeout(() => {
  //   window.location.reload();
  // }, 3000); // 3000 milliseconds = 3 seconds
// setNext(true);


getMeeting();
};

useEffect(() => {
   
  checkAvailability();
   
 }, [Day_,Month,Date_,CoachUnavailability]);





function addMinutes(time, minutes) {
  var date = new Date(
    new Date("01/01/2015 " + time).getTime() + minutes * 60000
  );
  var tempTime =
    (date.getHours().toString().length == 1
      ? "0" + date.getHours()
      : date.getHours()) +
    ":" +
    (date.getMinutes().toString().length == 1
      ? "0" + date.getMinutes()
      : date.getMinutes()) +
    ":" +
    (date.getSeconds().toString().length == 1
      ? "0" + date.getSeconds()
      : date.getSeconds());
  return tempTime;
}


/* Get All Event  of Coaches */

const getEventTypes = async () => {
  // settype_load(true);

  // settype_err_load(false);

   try {
     const res = await fetch(
       "" + apiUrl + "v1/event-types?apiKey=" + coachesCalApiKey + "",
       {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
         },
       }
     );
     const data = await res.json();
     if (res.status == 200) {
       //console.log(data);
      // setcoachesEvents(data.event_types);

        if(data.event_types[0].id != null){


        setcoachesCalEventSelected(data.event_types[0].id);
        }

     }
   } catch (err) {
     //console.log(err);

   }

   // setNext(true);
 };






    const handleClick =(event) =>{

      let id=event.target.getAttribute("data-id")
      setactive(id);
      setstartLoop((id)*7);
    }

    // useEffect(() => {
    //   console.log('workkkk');
    //  getMyAvailability();
    // }, [startLoop]);

    // get all meeting data
  const getMeeting = async () => {
    const coachId = sessionStorage.getItem('coachId');
    const meetingQuery = query(meetingRef, where("coachId", "==", coachId), where("meetingApiCreated", "==", true));
    // Query for meeting data
  //  const meetingQuery = query(collection(db, 'meetings'), where("coachId", "==", coachId), where("meetingApiCreated", "==", true));

    // Query for client data
    const clientQuery = query(clientRef, where("assign_coach_id", "==", coachId));
   // const clientQuery = query(collection(db, 'clients'), where("assign_coach_id", "==", coachId));
console.log('abcddd');
try {
  const meetingData = await getDocs(meetingQuery);
  const clientData = await getDocs(clientQuery);

  const meetings = meetingData.docs.map((meetingDoc) => {
    const matchingClient = clientData.docs.find((clientDoc) => clientDoc.id === meetingDoc.data().clientId);

    const clients = matchingClient
      ? [{ clientId: matchingClient.id, name: matchingClient.data().client_name, email: matchingClient.data().client_email }]
      : [];

    return {
      ...meetingDoc.data(),
      meeting_id: meetingDoc.id,
     client_name: clients[0].name,
     client_email: clients[0].email,
    };
  });
setMeeting(meetings);
  console.log(meetings); // Logging the meetings with client details
} catch (error) {
  console.error("Error fetching data: ", error);
}
    console.error("dfbhbh");
  };
  

   // coach data fetch
   const getClientData = async () => {
    const queryDoc = query(clientRef);

    await getDocs(queryDoc).then((response) => {
      setclientData(
        response.docs.map((data) => { 

          return { ...data.data(), client_id: data.id };
        })
      );
    });


  };




  useEffect(() => {
//  let busySchedule=[];
//    console.log(meeting);

// for (let index = 0; index < meeting.length; index++) {
//   //const element = array[index];

//   let date_ = new Date(meeting[index].meetingDate).getDate();
//   let month_ = new Date(meeting[index].meetingDate).getMonth();
//   let year_ = new Date(meeting[index].meetingDate).getFullYear();

//    busySchedule.push({ starttime: meeting[index].meetingTime, endtime: meeting[index].meetingEndTime, title:meeting[index].meetingName,date:date_,month:month_,year:year_ });
// }

// console.log('here');
// console.log(busySchedule);
//setbookedTimeslot(busySchedule);

console.log('meeting');
console.log(meeting);
getClientData();
  }, [meeting]);


  function addMinutes(time, minutes) {
    var date = new Date(
      new Date("01/01/2015 " + time).getTime() + minutes * 60000
    );
    var tempTime =
      (date.getHours().toString().length == 1
        ? "0" + date.getHours()
        : date.getHours()) +
      ":" +
      (date.getMinutes().toString().length == 1
        ? "0" + date.getMinutes()
        : date.getMinutes()) +
      ":" +
      (date.getSeconds().toString().length == 1
        ? "0" + date.getSeconds()
        : date.getSeconds());
    return tempTime;
  }
  useEffect(() => {
    const myData = async () => {
    const coachIds = sessionStorage.getItem('coachId');
      const userCollection = collection(database, 'coaches_user');
      const userDocRef = doc(userCollection, coachIds);
      const userDoc = await getDoc(userDocRef);
      console.log(userDoc.data());

 var data=userDoc.data();
 setMydata(data);
 console.log('here i am')
 console.log(data)
      console.log('here i am')
      var starttime ="";
if(data.start_time != undefined){
  // var starttime =data.start_time;
 // var starttime = "09:00:00";
  var starttime = "00:00:00";
        }else{
         // var starttime = "09:00:00";
          var starttime = "00:00:00";
        }


var interval = "60";
  if(data.start_time){
    // var endtime = data.end_time;
   // var endtime = "17:00:00";
    var endtime = "23:00:00";
         }else{
          //  var endtime = "17:00:00";
          var endtime = "23:00:00";
         }

         //var endtime = "17:00:00";
  var timeslots = [starttime];
  let index = 0;

  
  while (starttime < endtime) {
    // const interval = index % 2 === 0 ? 45 : 15;

    console.log('starttime',starttime);
    const interval = 60;
    starttime = addMinutes(starttime, interval);
  
    if (starttime < endtime) {
      // Uncomment the following line if you want to check for reservations
      // if (!isReserved(starttime)) {
      timeslots.push(starttime);
      // }
    }
  
    index++;
    // settimeslot_load(false);
  }
  timeslots.push(endtime);
    
    setarray1(timeslots);
  
        }
        
  





     
  //       if(data.start_time != undefined){
  //  var starttime =data.start_time;
  //       }else{
  //         var starttime = "09:00:00";
  //       }
  // var interval = "45";
  // if(data.start_time){
  //   var endtime = data.end_time;
  //        }else{
  //          var endtime = "17:00:00";
  //        }
  
  //       }
        
  // //var endtime = "17:00:00";
  // var timeslots = [starttime];
  
  
  
  // while (starttime < endtime) {
  
  //   starttime = addMinutes(starttime, interval); 
  
  //   if(starttime < endtime){
  //   // if(!isReserved(starttime)){
  //   timeslots.push(starttime);
  // //  }
  // }
  //   settimeslot_load(false);
  // }
  
  // setarray1(timeslots);
  
    
    myData();
    getMeeting();
   
   }, []);

   useEffect(()=>{

    const busySchedule = [];
    //console.log(meeting[0]);
    console.log('abty');
    console.log(meeting);
    for (const meetId in meeting) {

     

      console.log(meeting[meetId]);
     
      console.log(meeting[meetId].meet_id);
      console.log();

      console.log(meeting[meetId].meetingDate);

      let date_ = new Date(meeting[meetId].meetingDate).getDate();
      let month_ = new Date(meeting[meetId].meetingDate).getMonth();
      let year_ = new Date(meeting[meetId].meetingDate).getFullYear();

       busySchedule.push({ meetingDate:meeting[meetId].meetingDate,isCoachCancel:meeting[meetId].isCoachCancel,clientName:meeting[meetId].client_name,clientEmail:meeting[meetId].client_email,isCoachAccept:meeting[meetId].isCoachAccept,meet_idd: meeting[meetId].meeting_id,starttime: meeting[meetId].meetingTime, endtime: meeting[meetId].meetingEndTime, title:meeting[meetId].meetingName,date:date_,month:month_,year:year_});


        }
     

  //  for (let index = 0; index < meeting.length; index++) {

  //   for (let index2 = 0; index2 < clientData.length; index++) {

  //     if(clientData[index2].id == meeting[index].status){
  //       console.log('loop');
  //     }

  //   }

  //  }


    // for (const meetId in meeting) {
    //   if (Object.hasOwnProperty.call(meeting, meetId)) {
    //     const userData = clientData[meetId];
    //     const meetData = meeting[meetId];

    //     if (meetData) {
    //       joinedData.push({
    //         clientId: meetId,
    //         ...userData,
    //         ...meetData,
    //       });
    //     }
    //   }
    // }

    console.log('join');
//console.log(joinedData);

   // setmeetingClientJoinedData(busySchedule);
   setbookedTimeslot(busySchedule);
   console.log('testinnnnn  dhh vhn');
   console.log(busySchedule);
   }, [meeting]);


   const [isCancelled, setIsCancelled] = useState(false);
   const cancelMeet = (meet_iddd,clientName,clientEmail,meet_date,meet_day,meet_month,meeting_start_time,meeting_end_time) => {
    console.log(meet_iddd);
    console.log(clientName);
    console.log(clientEmail);
    const fieldToEdit2 = doc(database, 'meeting', meet_iddd);

    updateDoc(fieldToEdit2, {
      isCoachCancel:1,
      isCancelNotified:0,
     
    })
    .then(() => {
      const msg = `
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #e74c3c; text-align: center;">Meeting Cancelled</h1>
          <p style="font-size: 18px; text-align: center;">We regret to inform you that the following meeting has been cancelled:</p>
          <p style="font-size: 16px; text-align: center;">Date: ${meet_date} ${meet_month} ${meet_day}<br>Time: ${meeting_start_time} - ${meeting_end_time}</p>
          <hr style="border: 1px solid #e74c3c;">
          <p style="font-size: 14px; color: #888; text-align: center;">We apologize for any inconvenience caused.<br>Thank you,<br>Wabya Team</p>
      </div>
  `;
      sendMailFunc('abhinavkumar3256@gmail.com',msg);  
     
  
     
    })
    .catch((err) => {
      console.log(err);
    })

    getMyMeeting();
   }










   const handleDateClick = (day) => {
   
    const inputDateString = day;
    const inputDate = new Date(inputDateString);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day_ = String(inputDate.getDate()).padStart(2, '0');
    console.log('day',day_);
    const options = { weekday: 'short' };
    const dayName = new Date(day).toLocaleDateString('en-US', options);
    console.log('dayName',dayName);
    const formattedDate = `${year}-${month}-${day_}`;

setSelectDateMob(formattedDate);
setSelectDayMob(dayName);
console.log(formattedDate);
m=0;
  };

  useEffect(() => {

   
    if(selectDateMob !=''){
      const inputDateString = selectDateMob;
    const inputDate = new Date(inputDateString);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day_ = String(inputDate.getDate()).padStart(2, '0');
   
    setCheckedDateMob(parseInt(day_));

  }




}, [selectDateMob])

  const formatDate = (date) => {
    const options = { day: '2-digit', weekday: 'short' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };



   
   const rejectMeet = (meet_iddd,clientName,clientEmail,meet_date,meet_day,meet_month,meeting_start_time,meeting_end_time) => {
    console.log(meet_iddd);
    console.log(clientName);
    console.log(clientEmail);
    const fieldToEdit2 = doc(database, 'meeting', meet_iddd);

    updateDoc(fieldToEdit2, {
      isCoachAccept:0
     
    })
    .then(() => {
      const msg = `
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #e74c3c; text-align: center;">Meeting Cancelled</h1>
          <p style="font-size: 18px; text-align: center;">We regret to inform you that the following meeting has been cancelled:</p>
          <p style="font-size: 16px; text-align: center;">Date: ${meet_date} ${meet_month} ${meet_day}<br>Time: ${meeting_start_time} - ${meeting_end_time}</p>
          <hr style="border: 1px solid #e74c3c;">
          <p style="font-size: 14px; color: #888; text-align: center;">We apologize for any inconvenience caused.<br>Thank you,<br>Wabya Team</p>
      </div>
  `;
      sendMailFunc('abhinavkumar3256@gmail.com',msg);  
      getMeeting();
  
     
    })
    .catch((err) => {
      console.log(err);
    })
   }


   async function sendMailFunc2 (email,content,subject){   
    let response = await sendMail(email,subject,content);   
  
    console.log('response',response);
  } 

   async function sendMailFunc (email,content){   
    let response = await sendMail(email,"sample mail",content);   
  
    console.log('response',response);
  }    	

   const acceptMeet = (meet_iddd,meet_date,meet_day,meet_month,meeting_start_time,meeting_end_time) => {
    console.log(meet_iddd);
    const fieldToEdit2 = doc(database, 'meeting', meet_iddd);

    updateDoc(fieldToEdit2, {
      isCoachAccept:1
   
    })
    .then(() => {
      const msg = `
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #3498db; text-align: center;">Meeting Accepted!</h1>
          <p style="font-size: 18px; text-align: center;">Your meeting request  has been accepted. We are looking forward to seeing you there!</p>
          <p style="font-size: 16px; text-align: center;">Date: ${meet_date} ${meet_month}  ${meet_day}<br>Time: ${meeting_start_time} - ${meeting_end_time}</p>
          <hr style="border: 1px solid #3498db;">
          <p style="font-size: 14px; color: #888; text-align: center;">Thank you,<br>Wabya Team</p>
      </div>
  `;
      sendMailFunc('abhinavkumar3256@gmail.com',msg);  
      getMeeting();
  
     
    }) 
    .catch((err) => {
      console.log(err);
    })
   }


   const updateSchedule = (e) => {
    e.preventDefault();
    setscheduleSuccess(false);
  console.log('here we');
    // Convert availability object to an array of objects with day information
    const availabilityData = Object.entries(availability).map(([day, data]) => ({
      day: day, // Include the day information
      startHour: data.startHour,
      startMinute: data.startMinute,
      endHour: data.endHour,
      endMinute: data.endMinute,
      startHour2: data.startHour2,
      startMinute2: data.startMinute2,
      endHour2: data.endHour2,
      endMinute2: data.endMinute2,
      startHour3: data.startHour3,
      startMinute3: data.startMinute3,
      endHour3: data.endHour3,
      endMinute3: data.endMinute3,
      isUnAvbl: data.isUnAvbl,
      coach_id:coachId,
    }));
  
    // Add data to Firebase
    availabilityData.forEach((data,index) => {

console.log('myindex',index);
console.log('day',nextSevenDay[index].date);

      const coachId = sessionStorage.getItem('coachId');
      const userDocRef = collection(database, 'schedules');
      const queryDoc = query(userDocRef, where("coach_id", "==", coachId), where("day", "==", `${data.day}`), where("date","==", `${nextSevenDay[index].date}`));



      getDocs(queryDoc)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // The record exists; update it
          querySnapshot.forEach((doc) => {
            const existingDocRef = doc.ref;
            updateDoc(existingDocRef, {
              day: data.day, // Include the day information
              startHour: data.startHour,
              startMinute: data.startMinute,
              endHour: data.endHour,
              endMinute: data.endMinute,
              startHour2: data.startHour2,
              startMinute2: data.startMinute2,
              endHour2: data.endHour2,
              endMinute2: data.endMinute2,
              startHour3: data.startHour3,
              startMinute3: data.startMinute3,
              endHour3: data.endHour3,
              endMinute3: data.endMinute3,
              isUnAvbl: data.isUnAvbl,
              date:nextSevenDay[index].date,
              month:nextSevenDay[index].month,
              coach_id:coachId,
            })
              .then(() => {
                setscheduleSuccess(true);
               
              })
              .catch((err) => {
                console.error(err);
              });
          });
        } else {
     
    







         
      console.log('data',data);
      console.log('date',nextSevenDay[index].date);

     
      addDoc(userDocRef, {
        
        day: data.day, // Include the day information
        startHour: data.startHour,
        startMinute: data.startMinute,
        endHour: data.endHour,
        endMinute: data.endMinute,
        startHour2: data.startHour2,
        startMinute2: data.startMinute2,
        endHour2: data.endHour2,
        endMinute2: data.endMinute2,
        startHour3: data.startHour3,
        startMinute3: data.startMinute3,
        endHour3: data.endHour3,
        endMinute3: data.endMinute3,
        isUnAvbl:data.isUnAvbl,
        coach_id:coachId,
        date:nextSevenDay[index].date,
        month:nextSevenDay[index].month,
      
       
       
      })
        .then((docRef) => {
          console.log(docRef)
          console.log(docRef.id)
          setscheduleSuccess(true);

  
        })
        .catch((err) => {
          console.error(err);
        })
      }
    })
    });

    getMyAvailability();
  };
  

   useEffect(() => {
//     console.log(clientData);
//     console.log("ahhbhu");
//     //console.log(meeting);

//     const busySchedule = [];
//     //console.log(meeting[0]);

//     for (const meetId in meeting) {

//       for (const clientIdd in clientData) {
//        // console.log(clientData[clientIdd].client_id);
//         if(clientData[clientIdd].client_id == meeting[meetId].clientId){

//       console.log(meeting[meetId]);
//       console.log(clientData[clientIdd]);


//       console.log(meeting[meetId].meetingDate);

//       let date_ = new Date(meeting[meetId].meetingDate).getDate();
//       let month_ = new Date(meeting[meetId].meetingDate).getMonth();
//       let year_ = new Date(meeting[meetId].meetingDate).getFullYear();

//        busySchedule.push({ starttime: meeting[meetId].meetingTime, endtime: meeting[meetId].meetingEndTime, title:meeting[meetId].meetingName,date:date_,month:month_,year:year_ ,clientName:clientData[clientIdd].client_name});


//         }
//       }

//     }

//   //  for (let index = 0; index < meeting.length; index++) {

//   //   for (let index2 = 0; index2 < clientData.length; index++) {

//   //     if(clientData[index2].id == meeting[index].status){
//   //       console.log('loop');
//   //     }

//   //   }

//   //  }


//     // for (const meetId in meeting) {
//     //   if (Object.hasOwnProperty.call(meeting, meetId)) {
//     //     const userData = clientData[meetId];
//     //     const meetData = meeting[meetId];

//     //     if (meetData) {
//     //       joinedData.push({
//     //         clientId: meetId,
//     //         ...userData,
//     //         ...meetData,
//     //       });
//     //     }
//     //   }
//     // }

//     console.log('join');
// //console.log(joinedData);

//    // setmeetingClientJoinedData(busySchedule);
//    setbookedTimeslot(busySchedule);
//    console.log('testinnnnnn');
//    console.log(busySchedule);
   }, [clientData]);

  //  useEffect(() => {
  //   let busySchedule=[];
  //     console.log(meetingClientJoinedData);

  //  for (let index = 0; index < meetingClientJoinedData.length; index++) {
  //    //const element = array[index];

  //    let date_ = new Date(meetingClientJoinedData[index].meetingDate).getDate();
  //    let month_ = new Date(meetingClientJoinedData[index].meetingDate).getMonth();
  //    let year_ = new Date(meetingClientJoinedData[index].meetingDate).getFullYear();

  //     busySchedule.push({ starttime: meetingClientJoinedData[index].meetingTime, endtime: meetingClientJoinedData[index].meetingEndTime, title:meetingClientJoinedData[index].meetingName,date:date_,month:month_,year:year_ ,clientName:meetingClientJoinedData[index].client_name});
  //  }

  //  console.log('here');
  //  console.log(busySchedule);
  //  setbookedTimeslot(busySchedule);


  //    }, [meetingClientJoinedData]);

  const daysOfWeek = getCurrentWeek();
  useEffect(() => {
    if (BookedId) {
      getBookingId();
    }
  }, [BookedId]);
  

  useEffect(() => {

    console.log('get timeslot', date);

    // Using setTimeout to delay the execution of getTimeslots by 3 seconds
    const timeoutId = setTimeout(() => {
      getTimeslots(date);
    }, 3000);
  
    // Clean up the timeout if the component unmounts before the timeout is triggered
    return () => clearTimeout(timeoutId);
  
  }, []); // The empty dependency array ensures that the effect runs only once, similar to componentDidMount
  
  return (
    <>
    <section className='calendar calendar-desktop'>
      <div className='container'>
        <div className='row'>
          <div className="upcoming-event">
            <div className="row">
              <div className="col-sm-8"></div>
              <div className="col-sm-4">
                {/* <div className="cal-icon">
                  <i className="fa fa-calendar-o"></i>
                  <p>upcoming meeting reminder <span>10 minutes : Client name</span></p>
                  <div className="join">
                    <h5>Join</h5>
                  </div>
                </div> */}

              </div>
            </div>
          </div>


          <div className="timesheet-carousel">
          <OwlCarousel options={options}>

          { forloops.map((floop, index) => {
            let i=(index)*7;
            let j=i+6;
            if (index== active) {
              return (
                <>
                  <div className='active-owl cal-item' onClick={handleClick} data-id={index}>{  allWeekDay.length>i ? allWeekDay[i].month.toLowerCase() : null} { allWeekDay.length>i ? allWeekDay[i].date.toLowerCase() : null } -  { allWeekDay.length>j ?  allWeekDay[j].month.toLowerCase() : null} { allWeekDay.length>j ?  allWeekDay[j].date.toLowerCase() : null}</div>
                </>
              )
            }else{
              return (

                <>
                  <div className='cal-item' onClick={handleClick} data-id={index}>{ allWeekDay.length>i ? allWeekDay[i].month.toLowerCase() : null} { allWeekDay.length>i ? allWeekDay[i].date.toLowerCase() : null } -  { allWeekDay.length>j ?  allWeekDay[j].month.toLowerCase() : null} { allWeekDay.length>j ?  allWeekDay[j].date.toLowerCase() : null}</div>
                </>
              );
            }

          })}
          </OwlCarousel>
          </div>


          {/* <div className='timesheet-carousel'>
            <div className='row'>
              <div className='col-sm-1'>
                <div className='left-arrow'>
                  <i className='fa fa-angle-left' aria-hidden='true'></i>
                </div>
              </div>
              <div className='col-sm-10'>
                <div className='center-arrow'>


                {forloops.map((floop, index) => {
                    let i=(index)*7;
                    let j=i+6;
                    if (index== active) {
                         return (

                          <>

                  <span className='active' onClick={handleClick} data-id={index}>{ allWeekDay.length>i ? allWeekDay[i].month : null} { allWeekDay.length>i ? allWeekDay[i].date : null } -  { allWeekDay.length>j ?  allWeekDay[j].month : null} { allWeekDay.length>j ?  allWeekDay[j].date : null}</span>
                  </>)
                }else{
                  return (

                    <>
                  <span className='' onClick={handleClick} data-id={index}>{ allWeekDay.length>i ? allWeekDay[i].month : null} { allWeekDay.length>i ? allWeekDay[i].date : null } -  { allWeekDay.length>j ?  allWeekDay[j].month : null} { allWeekDay.length>j ?  allWeekDay[j].date : null}</span>

                  <span>|</span>

</>


);
                  }

                })}



                </div>
              </div>
              <div className='col-sm-1'>
                <div className='right-arrow'>
                  <i className='fa fa-angle-right' aria-hidden='true'></i>
                </div>
              </div>
            </div>
          </div>  */}


          <div className='timesheet-buttons'>
            <div className='row'>
              <div className='col-sm-12'>
                {/* <button className='btn btn-two'>sync calendars</button> */}
                <button className='btn btn-chestnutred'  onClick={handleStand}>set availability</button>

                  <Fragment>

                            {/* <button className='btn btn-five' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>schedule session</button> */}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >

      {/* <div className="schedule-session">
        <div className="row">
          <div className="col-sm-12">
            <div className="schedule">
              <h2>
              <i className="fa fa-calendar-o"></i>
              schedule a session
              </h2>
              <div className="divider"></div>

            </div>
          </div>
        </div>
      </div> */}
        {/* <ScrollWrapper>

          <MenuItem onClick={handleDropdownClose}>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Avatar alt='order' src='/images/avatars/3.png' />
              <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                <MenuItemTitle>Revised Order </MenuItemTitle>
                <MenuItemSubtitle variant='body2'>New order revised from john</MenuItemSubtitle>
              </Box>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                19 Mar
              </Typography>
            </Box>
          </MenuItem>

         </ScrollWrapper> */}

      </Menu>
                        </Fragment>

                  <button className='btn btn-darkblue' onClick={handleSchedule}>schedule session</button>

              </div>
            </div>
          </div> 

          <div id="calendar-wrap">
              <div className="calendar">
              <div className="table-responsive">
                <table className="table table-calendar table-bordered">
                  <thead>
                    <tr>
                      <th></th>
                      {nextSevenDay.map((nextSeven, index) => {
                         return (
                    <th> { nextSeven.day  }  { nextSeven.date  }</th>
                    );
                    })}
                    </tr>
                  </thead>
                  <tbody>

                  {array1.map((timeslot:string, index:number) => {

                    let formattedTime = timeslot.slice(0, -3);
                    let i =index % 2;
              //        var isBetween = bookedTimeslot.some(({ starttime, endtime }) => {

              //         return timeslot >= starttime && timeslot <= endtime

              // });

//               const matchingTimeslot = bookedTimeslot.find(({ starttime, endtime,title,date }) => timeslot >= starttime && timeslot <= endtime && date == nextSevenDay[index].date);

// const isBetween = !!matchingTimeslot; // will be true if matchingTimeslot is truthy, false otherwise

// const matchingStarttime = matchingTimeslot && matchingTimeslot.starttime; // will be the starttime of the matching timeslot, or undefined if no matching timeslot
// const matchingEndtime = matchingTimeslot && matchingTimeslot.endtime; // will be the endtime of the matching timeslot, or undefined if no matching timeslot
// const matchingTitle = matchingTimeslot && matchingTimeslot.title; // will be the endtime of the matching timeslot, or undefined if no matching timeslot





              return(<>

              <tr>

                      <th>{formattedTime}</th>

                      {array1.map((timeslot2, index2:number) => {
              //        var isBetween = bookedTimeslot.some(({ starttime, endtime }) => {

              //         return timeslot >= starttime && timeslot <= endtime

              // });


              const matchingTimeslot = bookedTimeslot.find(({clientEmail,meet_idd,isCoachAccept,isCoachCancel, starttime, endtime,title,date,clientName }) => timeslot >= starttime && timeslot < endtime && index2 < 7 && nextSevenDay[index2].date == date);

const isBetween = !!matchingTimeslot; // will be true if matchingTimeslot is truthy, false otherwise



const matchingTimeslot_2 = bookedTimeslot.find(({clientEmail,meet_idd,isCoachAccept,isCoachCancel, starttime, endtime,title,date,clientName }) => index > 0 && array1[index-1] >= starttime && array1[index-1] < endtime && index2 < 7 && nextSevenDay[index2].date == date);

const isBetween_2 = matchingTimeslot_2; // will be true if matchingTimeslot is truthy, false otherwise

const matchingStarttime = matchingTimeslot && matchingTimeslot.starttime.slice(0,-3); // will be the starttime of the matching timeslot, or undefined if no matching timeslot
const matchingEndtime = matchingTimeslot && matchingTimeslot.endtime.slice(0,-3); // will be the endtime of the matching timeslot, or undefined if no matching timeslot
const matchingTitle = matchingTimeslot && matchingTimeslot.title; // will be the endtime of the matching timeslot, or undefined if no matching timeslot
const clientName = matchingTimeslot && matchingTimeslot.clientName;
const clientEmail = matchingTimeslot && matchingTimeslot.clientEmail;
const meet_iddd = matchingTimeslot && matchingTimeslot.meet_idd;
const isCoachAccept_ = matchingTimeslot && matchingTimeslot.isCoachAccept;
const isCoachCancel_ = matchingTimeslot && matchingTimeslot.isCoachCancel;
if(isBetween && ! isBetweenAvailabilityTimeslot(timeslot, nextSevenDay[index2].day))




return(<>
  <td style={{ backgroundColor: index < 7 &&  isBetweenAvailabilityTimeslot(timeslot, nextSevenDay[index2].day) ? 'lightgrey' : '' }}>


  {index % 2 === 0 || index % 2 === 1 ? (
    <>
                     <div className="blue-event mrb-10">
                     
                           <p><span>{ matchingStarttime} - {matchingEndtime}  </span> </p>

                      

                       <p className='calendar-clientname'>Client :  {clientName ? clientName.toLowerCase() : null}</p> 

                       {/* {isCoachAccept_ == undefined && isCoachAccept_ !== 1 ? (
  <p>
    <u onClick={() => acceptMeet(meet_iddd,clientName,clientEmail,nextSevenDay[index2].date,nextSevenDay[index2].day,nextSevenDay[index2].month,matchingStarttime,matchingEndtime)}>Accept</u>
  </p>
) : null}

{isCoachAccept_ !== undefined && isCoachAccept_ == 1 ? (
  <p>
    Accepted
      </p>
) : null}

                       {isCoachAccept_ == undefined && isCoachAccept_ !== 0 ? (
  <p>
    <u onClick={() => rejectMeet(meet_iddd,clientName,clientEmail,nextSevenDay[index2].date,nextSevenDay[index2].day,nextSevenDay[index2].month,matchingStarttime,matchingEndtime)}>Reject  {isCoachCancel_}</u>
  </p>
) : null}

{isCoachAccept_ !== undefined && isCoachAccept_ == 0 ? (
  <p>
    Rejected
      </p>
) : null} */} 


{isCoachCancel_ != undefined && isCoachCancel_ !== 1 ? (
  <p className='calendar-clientcanel'>
    <u  style={{'cursor':'pointer'}} onClick={() => cancelMeet(meet_iddd,clientName,clientEmail,nextSevenDay[index2].date,nextSevenDay[index2].day,nextSevenDay[index2].month,matchingStarttime,matchingEndtime)}>Cancel</u>
  </p>
) : null}

{isCoachCancel_ !== undefined && isCoachCancel_ == 1 ? (
  <p className='calendar-clientcanel'>
    cancelled
      </p>
) : null}
                       
                        </div>

                        <div className="blue-event free-time"><p className="calendar-clientcanel mrb-0">free time</p></div>
                        </>)
                        : (
                          isBetween_2 ? (
                            <>

                              {/* <p style={{ textAlign: 'center' }}>free time </p> */}
                            </>
                          ) : (
                            null
                          )
                        )} 
                      </td>
                      </>

                      )
                      else
                      if(index2 < 7 ){
                        return(
<><td style={{ backgroundColor:  index2 < 7 && isBetweenAvailabilityTimeslot(timeslot, nextSevenDay[index2].day) ? 'lightgrey' : '' }}>{ !isBetweenAvailabilityTimeslot(timeslot, nextSevenDay[index2].day) && index %2!==0  && isBetween_2? <p style={{'textAlign':'center'}}></p>:null}

</td>

</>
                    
                        )

                     
                      }
                     
                    

})}

                      <td> </td>
                      <td>
                        {/* <div className="green-event">
                          <p>personal event <span>09:00 - 10:00 </span></p>
                        </div> */}
                        
                      </td>

                    </tr>


              </>)


})}

                    {/* <tr>
                      <th>10:00</th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <div className="blue-event">
                          <p>client name <span>10:15 - 11:15 </span> </p>
                          <small>notes : <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit.</small>
                        </div>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>11:00</th>
                      <td></td>
                      <td><div className="blue-event">
                          <p>client name <span>11:00 - 12:00 </span> </p>
                          <small>notes : <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit.</small>
                        </div></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                      <div className="green-event">
                          <p>personal event <span>11:00 - 12:00 </span></p>
                        </div>
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>12:00</th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td><div className="blue-event">
                          <p>client name <span>12:15 - 01:15 </span> </p>
                          <small>notes : <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit.</small>
                        </div></td>
                    </tr>
                    <tr>
                      <th>01:00</th>
                      <td></td>
                      <td></td>
                      <td>
                        <div className="green-event">
                          <p>personal event <span>01:00 - 02:00 </span></p>
                        </div></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
              </div>
          </div>

        </div> {/* // row */}



        <Modal
          centered
          className="unavailable-modal"
          visible={isFormShow}
          onOk={handleFormOk}
          onCancel={handleFormCancel}
          width={800}
          height={'200px'}
          footer={[]}
         
        >
          <div className="modal-data">
            <div className="modall">
              <div className="history-modal">

              <div className="cal-time">
              <form onSubmit={updateSchedule}>
      {days.map((day) => (
        <div className='row timerow' key={day} >
          <div className='col-md-2'>{day.toUpperCase()}</div>
          <div className='col-md-2'>
            <input
              type='number'
              value={availability[day].startHour}
              name='startHour'
              className='selecttime'
              onChange={(e) => handleHourChange(e, day)}
            />
          </div>
          <div className='col-md-2'>
            <input
              type='number'
              value={availability[day].startMinute}
              name='startMinute'
              className='selecttime'
              onKeyUp={(e) => handleMinuteChange(e, day)}
            />
          </div>
          <div className='col-md-1'>to</div>
          <div className='col-md-2'>
            <input
              type='number'
              value={availability[day].endHour}
              name='endHour'
              className='selecttime'
              onChange={(e) => handleHourChange(e, day)}
            />
          </div>
          <div className='col-md-2'>
            <input
              type='number'
              value={availability[day].endMinute}
              name='endMinute'
              className='selecttime'
              onChange={(e) => handleMinuteChange(e, day)}
            />
          </div>
        </div>
      ))}
      <button type='submit' >Submit</button>
    </form>

  
                    </div>
                </div>
                </div>

                </div>

  </Modal>

      </div> {/* container */}
    </section> 




    <Modal

centered
className="session-modal unavailable-modal avbl-modal-mobile new-modall"
visible={isStandShow}
onOk={handleStand}
onCancel={handleStandCancel}
width={800}
height={1000}
footer={[]}

     
         
        >
    


<>

<div className="standard-availability edit-availability availability-popup stand-avbl" style={{boxShadow: "none",
    background: "#fcf5ec"}}>
  <div className="info">
    <div className="title">
      {" "}
      <i className="fa fa-calendar-o" /> edit availability
    </div>
  </div>
  <div className="availability-form availability-form2">
    <form action="">
      <div className="month-carousel form-control" style={{display:'none'}}>
        <div className="item" >
          <span className="first">jan 01 - 07</span>
          <span className="last">
            <i className="fa fa-angle-left" />{" "}
            <i className="fa fa-angle-right" />
          </span>
        </div>
      </div>

      <div className="timesheet-carousel" >
          <OwlCarousel options={options22}>

          { forloops.map((floop, index) => {
            let i=(index)*7;
            let j=i+6;
            if (index== active) {
              return (
                <>
                  <div className='active-owl cal-item' style={{fontSize:'12px'}} onClick={handleClick} data-id={index}>{ allWeekDay.length>i ? allWeekDay[i].month : null} { allWeekDay.length>i ? allWeekDay[i].date : null } -  { allWeekDay.length>j ?  allWeekDay[j].month : null} { allWeekDay.length>j ?  allWeekDay[j].date : null}</div>
                </>
              )
            }else{
              return (

                <>
                  <div className='cal-item' style={{fontSize:'12px'}} onClick={handleClick} data-id={index}>{ allWeekDay.length>i ? allWeekDay[i].month : null} { allWeekDay.length>i ? allWeekDay[i].date : null } -  { allWeekDay.length>j ?  allWeekDay[j].month : null} { allWeekDay.length>j ?  allWeekDay[j].date : null}</div>
                </>
              );
            }

          })}
          </OwlCarousel>
          </div>

      {days.map((day) => (
        <>
      <div className="row">
        <div className="col-sm-1 ap1">
          <span>{day}</span>
        </div>
        <div className="col-sm-2 ap2">
          
          <input
            type="number"
            className="text-top form-control dates"
            name="startHour"
           value={availability[day].startHour}
           onChange={(e) => handleHourChange(e, day)}
           />
             <input
            type="number"
            className="text-top form-control dates"
            name="startMinute"
            value={availability[day].startMinute}
            onChange={(e) => handleMinuteChange(e, day)}
          />
        </div>
        <div className="col-sm-1 ap3">
          <span className="text-center">to</span>
        </div>
        <div className="col-sm-2 ap2">
        <input
            type="number"
            className="text-top form-control dates"
            name="endHour"
            value={availability[day].endHour}
            onChange={(e) => handleHourChange(e, day)}
          />
          <input
            type="number"
            className="text-top form-control dates"
            name="endMinute"
            value={availability[day].endMinute}
            onChange={(e) => handleMinuteChange(e, day)}
          />
        </div>
        <div className="col-sm-1 ap4">


          {/* <section className="sec-plus" onClick={() => handleIsMoreToggle(day)}>+</section> */}
        </div>
        <div className="col-sm-4 ap5 text-right">

        { !availability[day].isUnAvbl ?
          <button className="btn btn-chestnutred unavailable" onClick={(e) => handleIsUnavblToggle(e,day)}>
            set day as unavailable
          </button>
          : 
          <button className="btn btn-chestnutred unavailable" onClick={(e) => handleIsUnavblToggle(e,day)}>
            unavailable
          </button>

        }
        </div>

      
        <div className="col-sm-1 ap1"> <div className="unavbl-time">unavailable</div></div>
        <div className="col-sm-2 ap2">
        <input
            type="number"
            className="text-top form-control dates"
            name="startHour2"
           value={availability[day].startHour2}
           onChange={(e) => handleHourChange2(e, day)}
           />
             <input
            type="number"
            className="text-top form-control dates"
            name="startMinute2"
            value={availability[day].startMinute2}
            onChange={(e) => handleMinuteChange2(e, day)}
          />
        </div>
        <div className="col-sm-1 ap3">
          <span className="text-center">to</span>
        </div>
        <div className="col-sm-2 ap2">
        <input
            type="number"
            className="text-top form-control dates"
            name="endHour2"
            value={availability[day].endHour2}
            onChange={(e) => handleHourChange2(e, day)}
          />
          <input
            type="number"
            className="text-top form-control dates"
            name="endMinute2"
            value={availability[day].endMinute2}
            onChange={(e) => handleMinuteChange2(e, day)}
          />
        </div>
        <div className="col-sm-1 ap4">
          {/* <section className="sec-plus" >+</section> */}
          <section className="sec-plus" onClick={() => handleIsMoreToggle(day)}>+</section>
        </div>
        <div className="col-sm-4 ap5 text-right" />

       
      











        { availability[day].isMore || availability[day].startHour3 != '00' || availability[day].startMinute3 != '00' || availability[day].endHour3 != '00' || availability[day].endMinute3 != '00' ?
        <>
        <div className="col-sm-1 ap1" />
        <div className="col-sm-2 ap2">
        <input
            type="number"
            className="text-top form-control dates"
            name="startHour3"
           value={availability[day].startHour3}
           onChange={(e) => handleHourChange3(e, day)}
           />
             <input
            type="number"
            className="text-top form-control dates"
            name="startMinute3"
            value={availability[day].startMinute3}
            onChange={(e) => handleMinuteChange3(e, day)}
          />
        </div>
        <div className="col-sm-1 ap3">
          <span className="text-center">to</span>
        </div>
        <div className="col-sm-2 ap2">
        <input
            type="number"
            className="text-top form-control dates"
            name="endHour3"
            value={availability[day].endHour3}
            onChange={(e) => handleHourChange3(e, day)}
          />
          <input
            type="number"
            className="text-top form-control dates"
            name="endMinute3"
            value={availability[day].endMinute3}
            onChange={(e) => handleMinuteChange3(e, day)}
          />
        </div>
        <div className="col-sm-1 ap4">
          {/* <section className="sec-plus" >+</section> */}
        </div>
        <div className="col-sm-4 ap5 text-right" />

        </> : null }
      </div>
      </>
          ))}
      
    </form>
  </div>
  <div className="col-sm-10" >
  {scheduleSuccess &&  <Alert severity='success' style={{ margin :'0 55px 20px 55px',width:'100%'}}> Data Saved</Alert> } </div>
  <div className="close-button">
    <button className="btn btn-darkgreen btn-close" onClick={updateSchedule} style={{'background':'#6cc3a5','textTransform':'lowercase'}}>approve</button>
  </div>
</div>




<div className="standard-availability" style={{display:'none'}}>
  <div className="info">
    <div className="title">
      {" "}
      <i className="fa fa-calendar-o" /> standard availability
    </div>
  </div>

 
  <div className="availability-form">
    <div className="main-para">standard weekly availability</div>
    <div className="main-subpara">
      you can customise each day at the next step
    </div>
    <form action="" id="submit-av">
      <div className="row">

      {days.map((day) => (
        <>
        <div className="col-sm-12 form-group">
          <span>{day}:</span>
          <input
            type="number"
            className="text-top form-control dates"
            name="startHour"
           value={availability[day].startHour}
           onChange={(e) => handleHourChange(e, day)}
          />
          <input
            type="number"
            className="text-top form-control dates"
            name="startMinute"
            value={availability[day].startMinute}
            onChange={(e) => handleMinuteChange(e, day)}
          />
          <span>to</span>
          <input
            type="number"
            className="text-top form-control dates"
            name="endHour"
            value={availability[day].endHour}
            onChange={(e) => handleHourChange(e, day)}
          />
          <input
            type="number"
            className="text-top form-control dates"
            name="endMinute"
            value={availability[day].endMinute}
            onChange={(e) => handleMinuteChange(e, day)}
          />
          <span>+</span>
          <button type='button' className='btn btn-four day-unavbl'>set day as unavailable</button>
        </div>

<div className="col-sm-12 form-group">

<input
  type="number"
  className="text-top form-control dates"
  name="startHour"
 value={availability[day].startHour}
 onChange={(e) => handleHourChange(e, day)}
/>
<input
  type="number"
  className="text-top form-control dates"
  name="startMinute"
  value={availability[day].startMinute}
  onChange={(e) => handleMinuteChange(e, day)}
/>
<span>to</span>
<input
  type="number"
  className="text-top form-control dates"
  name="endHour"
  value={availability[day].endHour}
  onChange={(e) => handleHourChange(e, day)}
/>
<input
  type="number"
  className="text-top form-control dates"
  name="endMinute"
  value={availability[day].endMinute}
  onChange={(e) => handleMinuteChange(e, day)}
/>

</div>
</>
          ))}
       
       
    
      </div>
    </form>
  </div>
  {scheduleSuccess &&  <Alert severity='success' style={{ margin :'0 0 20px 0',width:'70%'}}> Data Saved</Alert> }
  <div className="close-button">
    <button className="btn btn-darkgreen btn-close" onClick={updateSchedule}>approve</button>
  </div>

</div>
</>
</Modal>













  {/* <section className="user-detail-mobile">
    <div className="container">
      <div className="row">
        <div className="col-12">
          {/* <div className="meeting-reminder">
            <div className="info">
              <div className="title">upcoming meeting reminder</div>
              <p>10 minutes: client name</p>
            </div>
            <div className="meeting-link">
              <a href="#">join</a>
              <a href="#">dismiss</a>
            </div>
          </div> 
          <div className="client-name mrb-50">
            <div className="info-name mrb-10">
              {/* <h2 className="text-center">calendar show </h2> 
              <Calendar  />

      

            </div>

            <Modal
          centered
          className="unavailable-modal"
          visible={isSyncFormShow}
          onOk={handleSyncFormOk}
          onCancel={handleSyncFormCancel}
          width={800}
          height={1000}
          footer={[]}
         
        >
            <div className="personal-event">
  <div className="info">
    <div className="title">wednesday 11 january 2023</div>
  </div>
  <div className="meeting-link">
    <p className="clientname">
      <strong>client name</strong> <br /> <span>09:30 - 11:30</span>
    </p>
    <p className="notes">
      <small className="clientname">
        <strong>notes:</strong>
      </small>
      <br />
      <small>
        lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        nonummy nibh euismod.
      </small>
    </p>
    <p className="clientname mt-5 mt-lg-4">
      <strong>personal event</strong> <br />
      <span>12:00 - 13:00 </span>
    </p>
  </div>
  <div className="close-button">
    <button className="btn btn-thulian-pink btn-close">close</button>
  </div>
</div>

</Modal>

<Modal
          centered
          className="unavailable-modal avbl-modal-mobile"
          visible={isFormShow}
          onOk={handleFormOk}
          onCancel={handleFormCancel}
          width={800}
          height={1000}
          footer={[]}
         
        >
    
<div className="standard-availability">
  <div className="info">
    <div className="title">
      {" "}
      <i className="fa fa-calendar-o" /> standard availability
    </div>
  </div>

 
  <div className="availability-form">
    <div className="main-para">standard weekly availability</div>
    <div className="main-subpara">
      you can customise each day at the next step
    </div>
    <form action="" id="submit-av">
      <div className="row">

      {days.map((day) => (
        <div className="col-sm-12 form-group">
          <span>{day}:</span>
          <input
            type="text"
            className="text-top form-control dates"
            name="startHour"
           value={availability[day].startHour}
           onChange={(e) => handleHourChange(e, day)}
          />
          <input
            type="text"
            className="text-top form-control dates"
            name="startMinute"
            value={availability[day].startMinute}
            onChange={(e) => handleMinuteChange(e, day)}
          />
          <span>to</span>
          <input
            type="text"
            className="text-top form-control dates"
            name="endHour"
            value={availability[day].endHour}
            onChange={(e) => handleHourChange(e, day)}
          />
          <input
            type="text"
            className="text-top form-control dates"
            name="endMinute"
            value={availability[day].endMinute}
            onChange={(e) => handleMinuteChange(e, day)}
          />
        </div>
          ))}
       
       
    
      </div>
    </form>
  </div>
  <div className="close-button">
    <button className="btn btn-darkgreen btn-close">approve</button>
  </div>

</div>
</Modal>



          </div>
          <div className="mrb-20">
            <p className="text-center btn-p">
              <a href="#" className="btn btn-lightgreen">
                sync calendars
              </a>
            </p>
            <p className="text-center btn-p">
              <a href="#" className="btn btn-chestnutred" >
                set availability
              </a>
            </p>
            <p className="text-center btn-p">
              <a href="#" className="btn btn-darkblue">
                schedule session
              </a>
            </p>
          </div>
         
        </div>
       
      </div>
     
    </div>
  </section> */}
  {/*/ tag wrap */}






  
  <section className="calendar-mobile user-detail-mobile">
    <div className="container">
      <div className="row align-items-center calendar-profile">
        <div className="col-8 left-top">
          <h2>
            hello <br />
            {myData !== null  && <>{myData.coach_name}</>}
          </h2>
        </div>
        <div className="col-4 right-top">
          <figure>
          {myData !== null  && 
            <img className="img-radius" src={myData.coach_profile} />}
          </figure>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="calendar-weeksheet">

          {daysOfWeek.map((day, index) => (
         <div className={`col-weeksheet ${day.getDate() === checkedDateMob ? 'active' : ''}`}  key={index} onClick={() => handleDateClick(day)}>
         {day.getDate()}
         <span>{formatDay(day)}</span>
       </div>
      ))}
            
          </div>
          {/*/ calendar-weeksheet */}
          <div className="calendar-timesheet">
            <div className="row">
              
            {array1.map((timeslot, index) => {
  const formattedTime = timeslot.slice(0, -3);
  let i = index % 2;

  const matchingTimeslot = bookedTimeslot.find(({ clientEmail, meet_idd, isCoachAccept, isCoachCancel, starttime, endtime, title, date, clientName,meetingDate }) =>
    timeslot >= starttime && timeslot < endtime && selectDateMob == meetingDate
  );

  const isBetween = !!matchingTimeslot;

  const matchingTimeslot_2 = bookedTimeslot.find(({ clientEmail, meet_idd, isCoachAccept, isCoachCancel, starttime, endtime, title, date, clientName,meetingDate }) =>
    index > 0 && array1[index - 1] >= starttime && array1[index - 1] < endtime && selectDateMob == meetingDate
  );

  const isBetween_2 = matchingTimeslot_2;

  const matchingStarttime = matchingTimeslot && matchingTimeslot.starttime.slice(0, -3);
  const matchingEndtime = matchingTimeslot && matchingTimeslot.endtime.slice(0, -3);
  const matchingTitle = matchingTimeslot && matchingTimeslot.title;
  const clientName = matchingTimeslot && matchingTimeslot.clientName;
  const clientEmail = matchingTimeslot && matchingTimeslot.clientEmail;
  const meet_iddd = matchingTimeslot && matchingTimeslot.meet_idd;
  const isCoachAccept_ = matchingTimeslot && matchingTimeslot.isCoachAccept;
  const isCoachCancel_ = matchingTimeslot && matchingTimeslot.isCoachCancel;

  return (
    <>
      <div key={index} className="row timesheet-entry">
        <div className="col-3 timesheet-left">
          <ul>
            <li>{formattedTime}</li>
          </ul>
        </div>

        <div className="col-9 timesheet-right">
        {isBetween && ! isBetweenAvailabilityTimeslot(timeslot, selectDayMob)? (
  <>
    <div className="timesheet-fix" >
      <h3>{clientName}</h3>
      <p>
        <i className="fa fa-clock-o" aria-hidden="true" /> {matchingStarttime} - {matchingEndtime}
      </p>
    </div>

    <div className="timesheet-fix">
      
      <p>
        free time
      </p>
    </div>
  </>
) : (
  // Your else content goes here
  <div >
    {/* <h4>Not Between</h4> */}
{isBetweenAvailabilityTimeslot(timeslot, selectDayMob) ?
<>
    <div className="timesheet-fix" style={{ backgroundColor: isBetweenAvailabilityTimeslot(timeslot, selectDayMob) ? '#0f2450' : '' }}>
<p className='text-center'>unavailable</p>
 
 </div>
 </>:null}
  </div>
)}

          
        </div>
      </div>
    </>
  );
})}

           
            </div>
            {/*/ row */}
          </div>
          {/*/ calendar-timesheet */}












          <>
          <Modal
          centered
          className="session-modal background-dark"
          visible={isSesShow}
          onOk={handleSchedule}
          onCancel={handleScheduleCancel}
          width={800}
         
          footer={[]}
         
        >
  <section className="schedule-session-new">
    <div className="">
      <div className="row">
        <div className="col-12">
          <h3 className="mrb-20">schedule a session</h3>
          <div className="form-group mrb-30">
            <h4 className="mrb-5">select the date</h4>
            <Calendar onChange={getTimeslots} value={date} minDate={today} />
          </div>
          {/*/ form-group */}


          <div className="availability-wrap availability-wrap-session"><h4>select the time</h4>
          <div className="availability-box availability-box-edit">
            <div className="inner">
              <span><small>from</small>  <select name="cars" className="form-control" onChange={handleTimeClick}> 
              <option >00:00</option>
              {array2.map((timeSlot, index) => (
    
    <option   data-key={index}
    key={index}
    data-time={timeSlot}
   
    onClick={handleTimeClick} >{timeSlot.replace(/:00$/, '')}</option>
  
))}
</select></span>
              <span><small>to</small>{meetingendtime ? meetingendtime : '00:00'}</span>
              </div>
              </div>
              
              </div>










          <div className="form-group mrb-30">
            {/* <h4 className="mrb-5">select the time</h4> */}
           
           
            {/* <select name="cars" class="form-control" onChange={handleTimeClick}>
            
            <option value="">
          Select Time
        </option>
            {array2.map((timeSlot, index) => (
    
      <option   data-key={index}
      key={index}
      data-time={timeSlot}
     
      >{timeSlot}</option>
    
  ))}
               </select> */}
          
            {/*/ inner */}
          </div>
          {/*/ form-group */}
          <div className="form-group mrb-30">
            <h4 className="mrb-5">select your client</h4>
            <select name="cars" className="form-control" onChange={handleClientClick}>
            <option value="" data-value="" data-email="">
          Select Client
        </option>
            {myClient.map((client, index) => (
        <option key={index} value={client.c_id} data-value={client.c_id} data-email={client.client_email}>
          {client.client_name}
        </option>
        
      ))}
      </select>
          </div>
          {/*/ form-group */}
          <div className="form-group mrb-30">
            <h4 className="mrb-5">notes</h4>
            <textarea className="form-control" defaultValue={""} />
          </div>
          {/*/ form-group */}
          {meetingSuccessMsg &&  <Alert severity='success' style={{ margin :'0 0 20px 0',width:'70%'}}>{meetingSuccessMsg}</Alert>} 
          <div className="form-group form-btn">
            <button className="btn btn-orange schedule-btnn" onClick={scheduleNext}   >save</button>
          </div>
        </div>
        {/*/ cl-coll */}
      </div>
      {/*/ row */}
    </div>
  </section>
  </Modal>
  {/*/ availability */}
</>




<Modal
          centered
          className="session-modal background-dark"
          visible={isAvblShow}
          onOk={handleavbl}
          onCancel={handleavblCancel}
          width={800}
         
          footer={[]}
         
        >
         <section className='schedule-session-new stand-avbl-mobile'>
  <section className="availability-wrap">
    <div className="">
      <div className="row">
        <div className="col-12">
          <h3 className="mrb-5">standard availability</h3> <span onClick={handleEditClick}>Edit</span>
          <p></p>
          <div className="timesheet-carousel" >
          <OwlCarousel options={options22}>

          { forloops.map((floop, index) => {
            let i=(index)*7;
            let j=i+6;
            if (index== active) {
              return (
                <>
                  <div className='active-owl cal-item' style={{fontSize:'12px'}} onClick={handleClick} data-id={index}>{ allWeekDay.length>i ? allWeekDay[i].month : null} { allWeekDay.length>i ? allWeekDay[i].date : null } -  { allWeekDay.length>j ?  allWeekDay[j].month : null} { allWeekDay.length>j ?  allWeekDay[j].date : null}</div>
                </>
              )
            }else{
              return (

                <>
                  <div className='cal-item' style={{fontSize:'12px'}} onClick={handleClick} data-id={index}>{ allWeekDay.length>i ? allWeekDay[i].month : null} { allWeekDay.length>i ? allWeekDay[i].date : null } -  { allWeekDay.length>j ?  allWeekDay[j].month : null} { allWeekDay.length>j ?  allWeekDay[j].date : null}</div>
                </>
              );
            }

          })}
          </OwlCarousel>
          </div>
          <div className="availability-list">
          
            {/*/ availability-box */}
            
            {/*/ availability-box */}
         
            {/*/ availability-box */}
            
            {/*/ availability-box */}

       

            {days.map((day) => (
            <div className="availability-box availability-box-edit">
              <div className="accepting-availability">
              <span className="span">{dayMappings[day]}</span>
              {availability[day].isUnAvbl}
                <label className="switch">


                {!availability[day].isUnAvbl
                ?
                <>

                  <input className="switch-input" type="checkbox"  onClick={(e) => handleIsUnavblToggle(e,day)} />

                  <span
                    className="switch-label"
                    data-on="unavailable"
                    data-off="available"
                  />

                  </> : 
                  <>
                   <input className="switch-input " type="checkbox"   onClick={(e) => handleIsUnavblToggle(e,day)} />
                   <span
                    className="switch-label switch-unlabel"
                    data-on="available"
                    data-off="unavailable"
                  />
                  </>}
                
                 <span className={`switch-handle ${!availability[day].isUnAvbl ? 'switch-avbl' : 'switch-unavbl'}`} />
                </label>
              </div>

             
              <div className="inner inner-edit mrb-10 mrt-0"
              
              >
               
                  
                { ! isEdit ?
                <>
                  
                  <>
                 <span>
                  <small>from</small>
                 {availability[day].startHour} : {availability[day].startMinute}  
                 </span>
                 <span>
                  <small>to</small>  
                 {availability[day].endHour} : {availability[day].endMinute} 
                 </span>
                 {/* <div className='plus' onClick={() => handleIsMoreToggle(day)}> + </div> */}
                 </> 
                
                </>

                 :
                  
                  <>
                
                  <span className="input-edit">
                   <input type='number' value={availability[day].startHour}  name='startHour'
              className='standard-in-num'
              onChange={(e) => handleHourChange(e, day)}/>  <input
              type='number'
              value={availability[day].startMinute}
              name='startMinute'
              className='standard-in-num'
              onKeyUp={(e) => handleMinuteChange(e, day)}
            />
            </span>


        
            <span className="input-edit">
                   <input
              type='number'
              value={availability[day].endHour}
              name='endHour'
              className='standard-in-num'
              onChange={(e) => handleHourChange(e, day)}
            /><input
            type="number"
            className="standard-in-num"
            name="endMinute"
            value={availability[day].endMinute}
            onChange={(e) => handleMinuteChange(e, day)}
          /> 
           </span>




             </> }
               








               
               

                
               
              </div>








             
               
                  
                { ! isEdit ?
                <>
                  
                  <>
                  <span className="span">unavailable</span>
                  <div className="inner"
              
              >
               
                 <span>
                  <small>from</small>
                 {availability[day].startHour2} : {availability[day].startMinute2}  
                 </span>
                 <span>
                  <small>to</small>  
                 {availability[day].endHour2} : {availability[day].endMinute2} 
                 </span>
                 <div className='plus' onClick={() => handleIsMoreToggle(day)}> + </div>
                 {/* <div className='plus' onClick={() => handleIsMoreToggle(day)}> + </div> */}
                </div>
                 </> 
                
                </>

                 :
                  
                  <>
                   <span className="span">unavailable</span>
                 <div className="inner inner-edit"
              
              >
                  <span className="input-edit">
                   <input type='number' value={availability[day].startHour2}  name='startHour2'
              className='standard-in-num'
              onChange={(e) => handleHourChange2(e, day)}/> 
               <input
              type='number'
              value={availability[day].startMinute2}
              name='startMinute2'
              className='standard-in-num'
              onChange={(e) => handleMinuteChange2(e, day)}
            />
            </span>


        
            <span className="input-edit">
                   <input
              type='number'
              value={availability[day].endHour2}
              name='endHour2'
              className='standard-in-num'
              onChange={(e) => handleHourChange2(e, day)}
            /><input
            type="number"
            className="standard-in-num"
            name="endMinute2"
            value={availability[day].endMinute2}
            onChange={(e) => handleMinuteChange2(e, day)}
          /> 
           </span>

           </div>


             </> }
               








               
               

                
               
             










            
               
                  
                { ! isEdit ?
                 
                <>
                  {availability[day].isMore || availability[day].startHour3 != '00' || availability[day].startMinute3 != '00' || availability[day].endHour3 != '00' || availability[day].endMinute3 != '00' ?
                  <>
                    <div className="inner inner-edit"
              
              >
                 <span>
                  <small>from</small>
                 {availability[day].startHour3} : {availability[day].startMinute3}  
                 </span>
                 <span>
                  <small>to</small>  
                 {availability[day].endHour3} : {availability[day].endMinute3} 
                 </span></div>
                 {/* <div className='plus' onClick={() => handleIsMoreToggle(day)}> + </div> */}
                 </> 
                :null }
                </>

                 :
                  
                  <>
                  <div className="inner inner-edit"
              
              >
                  <span className="input-edit">
                   <input type='number' value={availability[day].startHour3}  name='startHour3'
              className='standard-in-num'
              onChange={(e) => handleHourChange3(e, day)}/>  <input
              type='number'
              value={availability[day].startMinute3}
              name='startMinute3'
              className='standard-in-num'
              onChange={(e) => handleMinuteChange3(e, day)}
            />
            </span>


        
            <span className="input-edit">
                   <input
              type='number'
              value={availability[day].endHour3}
              name='endHour3'
              className='standard-in-num'
              onChange={(e) => handleHourChange3(e, day)}
            /><input
            type="number"
            className="standard-in-num"
            name="endMinute3"
            value={availability[day].endMinute3}
            onChange={(e) => handleMinuteChange3(e, day)}
          /> 
           </span>


</div>

             </> }
               








               
               

                
               
              


            


              
        

              
            </div>

))}
            {/*/ availability-box */}

            
           
           
            {/*/ availability-box */} 
        
            {/*/ availability-box */}
            <p className="text-center btn-p">

            {scheduleSuccess &&  <Alert severity='success' style={{ margin :'0 0 20px 0',width:'70%'}}> Data Saved</Alert> }
            <a href="#" className="btn btn-darkblue" onClick={updateSchedule}>
    save
</a>

            </p>



<>
            {/* <h3 className="mrb-20">custom availability</h3>
          <div className="form-group mrb-30">
            <h4 className="mrb-5">select the date</h4>
            <Calendar  />
          </div>
         


          <div class="availability-wrap availability-wrap-session availability-wrap-session2">
         
          <div class="availability-box availability-box-edit">
          <div className="accepting-availability">
              <span className="span">select the time</span>
                <label className="switch">
                  <input className="switch-input" type="checkbox" />
                  <span
                    className="switch-label"
                    data-on="available"
                    data-off="unavailable"
                  />
                  <span className="switch-handle" />
                </label>
              </div>
            <div class="inner">

              <span><small>from</small>09 : 00</span>
              <span><small>to</small>17: 00</span>
              <span className='plus'> + </span>
              </div>
              </div>
              </div>


              <p className="text-center btn-p">

           
            <a href="#" className="btn btn-darkblue" >
    save
</a>

            </p> */}

</>










          </div>
          {/*/ availability-list */}
        </div>
        {/*/ cl-coll */}
      </div>
      {/*/ row */}
    </div>
  </section>
  </section>
  {/*/ availability */}

  </Modal>


          <div className="calendar-btns">
            <p className="btn-p">
              <a href="#" className="btn btn-lightgreen">
                sync calendar
              </a>
            </p>
            <p className="btn-p">
              <a href="#" className="btn btn-orange" onClick={handleavbl}>
                my availability
              </a>
            </p>
            <p className="btn-p">
              {/* <a href="#" className="btn btn-darkblue" onClick={handleSchedule}> */}
              <a href="#" className="btn btn-darkblue" onClick={handleSchedule}>
                schedule session
              </a>
            </p>
          </div>
        </div>
        {/*/ cl-coll */}
      </div>
      {/*/ row */}
    </div>
  </section>
  {/*/ coach-feedback */}
</>




  )
}

export default Calender