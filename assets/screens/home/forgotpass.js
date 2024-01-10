import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid, Image, Modal, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, {useState} from 'react';
import {useFonts} from 'expo-font';
import axios from 'axios';
import CheckBox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { ROUTES } from '../../constants/routes';
import { baseUrl } from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ForgotPass = (props) => {
const {navigation} = props;
const [contact_no, setContact] = useState("");
const [isLoading, setIsLoading] = useState(false);
const onChangeContactHandler = (contact_no) => {
    setContact(contact_no);
  };

const handleOTP = async () => {
try {

    if (!contact_no) {
        ToastAndroid.show('Please enter a valid contact number!', ToastAndroid.SHORT);
        return;
    }

    if (!/^\d{11}$/.test(contact_no)) {
        ToastAndroid.show('Contact number must be numeric and 11 characters long!', ToastAndroid.SHORT);
        return;
    }
    
    const response = await axios.post(`${baseUrl}sendOTP`, {
     contact_no,
    });
    
    if (response.status === 200) {
    ToastAndroid.show('Succesfully Sent! Wait for your OTP!', ToastAndroid.SHORT);
    setContact('');
    AsyncStorage.setItem('contactNum', JSON.stringify(contact_no));
    setIsLoading(false);
    return navigation.navigate(ROUTES.OTP);
    } else {
    throw new Error("An error has occurred");
    }

} catch (error) {
    setIsLoading(false);
    console.log(error.response.status);
    if (error.response.status == 400) {
    ToastAndroid.show('Error!', ToastAndroid.SHORT);
    }
    else if (error.response.status == 404) {
    ToastAndroid.show('Invalid Account!', ToastAndroid.SHORT);
    } 
    else if (error.request) {
    ToastAndroid.show('Check your internet Connection!', ToastAndroid.SHORT);
    } else {
    ToastAndroid.show('An unexpected error occurred!', ToastAndroid.SHORT);
    }
}
};

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Registered Contact Number:</Text>
        <TextInput style={styles.input} placeholderTextColor={COLORS.gray} placeholder='ex. 09123456789'
        value={contact_no}
        onChangeText={onChangeContactHandler}/>
      </View>

      <TouchableOpacity style={styles.getStartedBtn} onPress={handleOTP}>
        <Text style={styles.getStartedTxt}>CONFIRM</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ForgotPass;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
    },
    inputLabel: {
        fontFamily: 'CL-Bold',
        marginTop: 20,
        marginBottom: 3,
        color: COLORS.primary
    },
    input: {
        backgroundColor: COLORS.placeholderBG,
        borderRadius: 15,
        padding: 18,
    },
    inputWrapper: {
        width: '80%',
        marginTop: 40
    },
    getStartedBtn: {
        marginTop: 20,
        backgroundColor: COLORS.primary,
        padding: 18,
        paddingHorizontal: 100,
        borderRadius: 50,
        width: '80%',
        alignItems: 'center',
        elevation: 2
    },
    getStartedTxt: {
        color: COLORS.white,
        fontFamily: 'CL-Bold',
        fontSize: 16
    },
})