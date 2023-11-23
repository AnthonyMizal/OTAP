import { StyleSheet, Text, View, Image, TouchableOpacity, Button, ToastAndroid, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, {useState} from 'react';
import { ROUTES } from '../../constants/routes';
import {useFonts} from 'expo-font';
import {COLORS} from '../../constants/colors';
import axios from 'axios';
import { baseUrl } from '../../constants/url';

import DateTimePickerModal from "react-native-modal-datetime-picker";


const IncidentReport = (props) => {
  const {navigation} = props;
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [details, setDetails] = useState("");
  const [addnotes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    hideDatePicker();
    // Do something with the selected date
    setDate(date);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    hideTimePicker();
    // Do something with the selected time
    setTime(time);
  };

  const onChangeDetailsHandler = (details) => {
    setDetails(details);
  };
  const onChangeNotesHandler = (addnotes) => {
    setNotes(addnotes);
  };




  const onSubmitFormHandler = async (event) => {

    setIsLoading(true);

    try {
      const response = await axios.post(`${baseUrl}`, {
        first_name,
        last_name,
        age,
        contact_no,
        barangay,
        email,
        password
      });

      if (response.status === 201) {

        setIsLoading(false);

      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  };

    let [fontsLoaded] = useFonts({
      'Momcake-Bold': require('../../fonts/Momcake-Bold.otf'),
      'Momcake-Thin': require('../../fonts/Momcake-Thin.otf'),
      'CL-Reg': require('../../fonts/CL-Reg.ttf'),
      'CL-Bold': require('../../fonts/CL-Bold.ttf'),
      'Poppins-Black': require('../../fonts/Poppins-Black.ttf'),
      'Poppins-ExtraBold': require('../../fonts/Poppins-ExtraBold.ttf'),
      'Poppins-Medium': require('../../fonts/Poppins-Medium.ttf'),
      'Poppins-SemiBold': require('../../fonts/Poppins-SemiBold.ttf'),
      'Poppins-Thin': require('../../fonts/Poppins-Thin.ttf'),
    });
    if (!fontsLoaded) {
      return null;
    }
    return (
      <View style={styles.container}>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView 
                  style={styles.keyboardView}>
            <View style={styles.header}>
              <Image style={styles.headinglogo} source={require('../../otapimages/header.png')} />
          </View>
    <View style={styles.box}>
    </View>
    
    <Text style={styles.loginTxt}>Incident Report</Text>
    <Text style={styles.loginTxt2}>Send a report to your barangay.</Text>


   
    <View style={styles.inputWrapper}>
    <Text style={styles.loginTxt3}>When Did the Incident/Emergency Happened?</Text>
      <View style={styles.dateTimeCont}>
      <TouchableOpacity onPress={showDatePicker}>
          <Text style={styles.dateTimeInput}>{date ? date.toLocaleDateString() : 'Select Date'}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />

        <TouchableOpacity onPress={showTimePicker}>
          <Text style={styles.dateTimeInput}>{time ? time.toLocaleTimeString() : 'Select Time'}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />
      </View>
        
      <Text style={styles.loginTxt2}>What Happened?</Text>
        <TextInput
          style={styles.input}
          textAlignVertical="top"
          multiline = {true}
          numberOfLines = {5}
          placeholder="Incident Details"
          value={details}
          onChangeText={onChangeDetailsHandler}
        />
        <TextInput
          style={styles.input}
          textAlignVertical="top"
          multiline = {true}
          numberOfLines = {3}
          placeholder="Other notes"
          value={addnotes}
          onChangeText={onChangeNotesHandler}
        />
      </View>
    <TouchableOpacity style={styles.getStartedBtn} onPress={onSubmitFormHandler}>
      <Text style={styles.getStartedTxtLogin}>SEND REPORT</Text>
    </TouchableOpacity>

  
    </KeyboardAvoidingView>
    
    </ScrollView>
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    header: {
      padding: 14,
      marginTop: 30,
      alignItems: 'flex-start'
    },
    headinglogo: {
      width: 230,
      height: 42,
      borderWidth: 2,
    },
    box: {
      width: 330,
      height: 10,
      borderRadius: 20,

      display: 'flex',
      alignItems: 'center'
    },
    scrollView: {
      width: '100%',
      height: 0
    },
    picContainer: {
      width: '90%',
      height: '60%',
      alignItems: 'center',
      paddingTop: 20
    },
    keyboardView: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginlogo: {
      width: 200,
      height: 200,
    },

    text1: {
      fontFamily: 'Momcake-Bold',
      fontSize: 14,
      color: COLORS.green
    },
    textWrapper: {
      paddingTop: 25,
      paddingLeft: 30,
      alignSelf: 'flex-start'
    },
    text2: {
      fontFamily: 'Antically',
      color: COLORS.green,
      fontSize: 34
    },
    text3: {
      fontFamily: 'Antically',
      color: COLORS.green,
      fontSize: 47
    },
    textWrapper2: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 40
    },
    getStartedBtn: {
      marginVertical: 20,
      backgroundColor: COLORS.primary,
      padding: 18,
      paddingHorizontal: 100,
      borderRadius: 50,
      width: '80%',
      alignItems: 'center',
      elevation: 2
    },
    getStartedTxt: {
      color: '#737373',
      fontFamily: 'CL-Bold',
      fontSize: 16
    },
    getStartedTxtLogin: {
      color: COLORS.white,
      fontFamily: 'CL-Bold',
      fontSize: 16
    },
    input: {
      backgroundColor: COLORS.placeholderBG,
      borderRadius: 15,
      padding: 18,
      borderWidth: 1,
      borderColor: COLORS.primary,
    },

    dateTimeCont: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    dateTimeInput:{
      backgroundColor: COLORS.placeholderBG,
      borderRadius: 15,
      padding: 18,
      borderWidth: 1,
      borderColor: COLORS.primary,
      width: 150
    },

    inputWrapper: {
      width: '80%',
      gap: 20,
     
    },
    bottomTextCont: {
      alignItems: 'center',
      gap: 18,
      marginTop: 25
    },
    registerTxt: {
      color: COLORS.primary,
      fontFamily: 'Momcake-Bold',
      fontSize: 20,
      paddingBottom: 15
    },
    loginTxt: {
      color: COLORS.primary,
      fontFamily: 'CL-Bold',
      fontSize: 30,
    },
    loginTxt2: {
      color: '#A6A6A6',
      fontFamily: 'CL-Bold',
      fontSize: 15,
      marginTop: 15
    },
    loginTxt3: {
      color: '#A6A6A6',
      fontFamily: 'CL-Bold',
      fontSize: 15,
      marginTop: 40
    }
  })
  
  export default IncidentReport;