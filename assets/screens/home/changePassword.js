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

const ChangePassword = (props) => {
    const {navigation} = props;
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [shownewPassword, setnewShowPassword] = useState(false);
    const onChangePasswordHandler = (password) => {
        setPassword(password);
      };

      const onChangeCpasswordHandler = (confirmPassword) => {
        setConfirmPassword(confirmPassword);
      };

      const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };
      const togglenewPasswordVisibility = () => {
        setnewShowPassword((prevshownewPassword) => !prevshownewPassword);
      };

    const changePassword = async (contactNo, newPassword) => {

    if (password !== confirmPassword) {
        ToastAndroid.show("Passwords do not match. Please try again.", ToastAndroid.SHORT);
        return;
    }

    const contact_no = JSON.parse(await AsyncStorage.getItem('contactNum'));

        try {
            const response = await axios.post(`${baseUrl}changepassOTP`, {
                contact_no,
                password
            });
    
            if (response.status === 200) {
                ToastAndroid.show('Password changed successfully!', ToastAndroid.SHORT);
                return navigation.navigate(ROUTES.LOGIN);
            } else {
                throw new Error("An error has occurred");
            }
        } catch (error) {
            console.error(error.response);
            if (error.response) {
                ToastAndroid.show('Password change failed. Please try again.', ToastAndroid.SHORT);
            } else if (error.request) {
                ToastAndroid.show('Check your internet connection!', ToastAndroid.SHORT);
            } else {
                ToastAndroid.show('An unexpected error occurred!', ToastAndroid.SHORT);
            }
        }
    };

  return (
    <View style={styles.container}>
    {/* <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>New Password:</Text>
      <TextInput style={styles.input} placeholderTextColor={COLORS.gray} 
      value={password}
      onChangeText={onChangePasswordHandler}/>
    </View> */}
     <View style={styles.inputWrapper}>
    <Text style={styles.inputLabel}>New Password:</Text>
    <View style={styles.passinput}>
        <View style={styles.passinputCont}>
        <TextInput
          style={styles.passContinput}
          placeholder="Current Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={onChangePasswordHandler}
        />
        </View>
         
          <TouchableOpacity style={styles.passtoggle} onPress={togglePasswordVisibility}>
                {showPassword === true ? (
                  <Icon
                  name= 'eye-off'
                  size={25}
                  color={COLORS.gray}
                  />
                  ) : (
                    <Icon
                  name= 'eye'
                  size={25}
                  color={COLORS.gray}
                  />
                  )}
          </TouchableOpacity>
      </View>
      </View>
{/* 
    <View style={styles.inputWrapper2}>
      
      <TextInput style={styles.input} placeholderTextColor={COLORS.gray} 
      value={confirmPassword}
      onChangeText={onChangeCpasswordHandler}/>
    </View> */}

<View style={styles.inputWrapper2}>
    <Text style={styles.inputLabel}>Confirm New Password:</Text>
    <View style={styles.passinput}>
        <View style={styles.passinputCont}>
        <TextInput
        style={styles.passinputCont}
        placeholder="New Password"
        secureTextEntry={!shownewPassword}
        value={confirmPassword}
        onChangeText={onChangeCpasswordHandler}
      />
        </View>
         
          <TouchableOpacity style={styles.passtoggle} onPress={togglenewPasswordVisibility}>
                {shownewPassword === true ? (
                  <Icon
                  name= 'eye-off'
                  size={25}
                  color={COLORS.gray}
                  />
                  ) : (
                    <Icon
                  name= 'eye'
                  size={25}
                  color={COLORS.gray}
                  />
                  )}
          </TouchableOpacity>
      </View>
      </View> 

    <TouchableOpacity style={styles.getStartedBtn} onPress={changePassword}>
      <Text style={styles.getStartedTxt}>CONFIRM</Text>
    </TouchableOpacity>
  </View>
  )
}

export default ChangePassword

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
        marginTop: 50
    },
    inputWrapper2: {
        width: '80%',
    },
    passinput: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.placeholderBG,
        borderRadius: 15,
        padding: 18,
      },
      passinputCont:{
        width: '90%',
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
