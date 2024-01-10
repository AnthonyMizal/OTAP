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
const Otp = (props) => {
    const {navigation} = props;
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onChangeOtpHandler = (otp) => {
        setOtp(otp);
      };

      const handleVerfication = async () => {

        const contact_no = JSON.parse(await AsyncStorage.getItem('contactNum'));

        try {
          const response = await axios.post(`${baseUrl}verifyOTP`, {
            contact_no,
            otp,
          });
        
          if (response.status === 200) {
            ToastAndroid.show('OTP verification successful!', ToastAndroid.SHORT);
            setOtp('');
            setIsLoading(false);
            return navigation.navigate(ROUTES.CHANGE_PASSWORD);
    
          } else {
            throw new Error("An error has occurred");
          }

        } catch (error) {
          setIsLoading(false);
          console.log(error.response);
          if (error.response.status == 400) {
            ToastAndroid.show('Incorrect OTP!', ToastAndroid.SHORT);
          }
          else if (error.response.status == 404) {
            ToastAndroid.show('No account found!', ToastAndroid.SHORT);
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
            <Text style={styles.inputLabel}>Type here your one time password:</Text>
            <TextInput style={styles.input} placeholderTextColor={COLORS.gray} placeholder='ex. 012345'
             value={otp}
             onChangeText={onChangeOtpHandler}/>
          </View>
    
          <TouchableOpacity style={styles.getStartedBtn} onPress={handleVerfication}>
            <Text style={styles.getStartedTxt}>CONFIRM</Text>
          </TouchableOpacity>
        </View>
      )
}

export default Otp

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