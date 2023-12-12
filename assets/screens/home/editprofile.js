import { StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useFonts} from 'expo-font';
import { COLORS } from '../../constants/colors';
import { ROUTES } from '../../constants/routes';
import { baseUrl } from '../../constants/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropdownComponent from '../../components/dropdownbarangay';
import { useFocusEffect } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';

const EditProfile = (props) => {
  const {navigation} = props;
    const [first_name, setFirstname] = useState("");
    const [last_name, setLastname] = useState("");
    const [contact_no, setContact] = useState("");
    const [age, setAge] = useState("");
    const [barangay, setBarangay] = useState("");
    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [shownewPassword, setnewShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const togglenewPasswordVisibility = () => {
      setnewShowPassword((prevshownewPassword) => !prevshownewPassword);
    };
    const onChangeFirstnameHandler = (first_name) => {
      setFirstname(first_name);
    };
    const onChangeLastnameHandler = (last_name) => {
      setLastname(last_name);
    };
    const onChangeContactHandler = (contact_no) => {
      setContact(contact_no);
    };
    const onChangeAgeHandler = (age) => {
      setAge(age);
    };
    const onChangeBarangayHandler = (selectedBarangay) => {
      setBarangay("");
      setBarangay(selectedBarangay);
      console.log(selectedBarangay);
    };
    const onChangeUsernameHandler = (email) => {
      setUsername(email);
    };
    const onChangePasswordHandler = (password) => {
      setPassword(password);
    };

// Get User Details
    const fetchData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('user_id');
        const response = await axios.get(`${baseUrl}user/${storedUserId}`); 
        if (response.status === 200) {
          setFirstname(response.data.userDetail.first_name);
          setLastname(response.data.userDetail.last_name);
          setContact(response.data.userDetail.contact_no)
          setAge(response.data.userDetail.age);
          setBarangay(response.data.userDetail.barangay);
          setUsername(response.data.userDetail.email);
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
  
    useFocusEffect(
      React.useCallback(() => {
        fetchData();
        return () => {
          fetchData();
        };
      }, [])
    );

    //Edit Account
    const onSubmitFormHandler = async (event) => {
      try {
        if (!/^\d+$/.test(age)) {
          ToastAndroid.show('Age must be numeric!', ToastAndroid.SHORT);
          return;
        }
    
        if (!/^\d{11}$/.test(contact_no)) {
          ToastAndroid.show('Contact number must be numeric and 11 characters long!', ToastAndroid.SHORT);
          return;
        }
        const storedUserId = await AsyncStorage.getItem('user_id');
        const response = await axios.patch(`${baseUrl}userEdit/${storedUserId}`, {
          first_name,
          last_name,
          age,
          contact_no,
          email,
          current_password: password,
          password: newPassword,
        });
  
        if (response.status === 200) {
          setIsLoading(false);
          ToastAndroid.show('Succesfully Updated Account!', ToastAndroid.SHORT);
        } else {
          throw new Error("An error has occurred");
        }
      } catch (error) {
        if (error.response && error.response.status === 422 && error.response.data.message === 'Current password is incorrect.') {
          ToastAndroid.show('Incorrect Password!', ToastAndroid.SHORT);
          };
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
    
    <Text style={styles.loginTxt}>Edit Your Profile!</Text>

    <View style={styles.inputWrapper}>

      <Text style={styles.inputLabel}>First Name:</Text>
      <TextInput style={styles.input} placeholder='Firstname'
      value={first_name}
      onChangeText={onChangeFirstnameHandler}
      />

      <Text style={styles.inputLabel}>Last Name:</Text>
      <TextInput style={styles.input} placeholder='Lastname'
      value={last_name}
      onChangeText={onChangeLastnameHandler}
      />

      <Text style={styles.inputLabel}>Contact No.:</Text>
      <TextInput style={styles.input} placeholder='Contact No.'
      value={contact_no}
      onChangeText={onChangeContactHandler}
      />

      <Text style={styles.inputLabel}>Age:</Text>
      <TextInput style={styles.input} placeholder='Age'
      value={age.toString()}
      onChangeText={onChangeAgeHandler}
      />

      <Text style={styles.inputLabel}>Email:</Text>
      <TextInput style={styles.input} placeholder='Email'
      value={email}
      onChangeText={onChangeUsernameHandler}
      />

    <Text style={styles.inputLabel}>Current Password:</Text>
    <View style={styles.passinput}>
        <View style={styles.passinputCont}>
        <TextInput
          style={styles.passContinput}
          placeholder="Current Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
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





      <Text style={styles.inputLabel}>New Password:</Text>
      <View style={styles.passinput}>
        <View style={styles.passinputCont}>
        <TextInput
        style={styles.passinputCont}
        placeholder="New Password"
        secureTextEntry={!shownewPassword}
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
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
    <TouchableOpacity style={styles.getStartedBtn} onPress={onSubmitFormHandler}>
      <Text style={styles.getStartedTxtLogin}>CONFIRM</Text>
    </TouchableOpacity>

  
    </KeyboardAvoidingView>
    
    </ScrollView>
  </View>
     )
}

export default EditProfile

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: COLORS.white,
      alignItems: 'center',
    },
    header: {
      padding: 14,
      marginTop: 30,
      alignItems: 'flex-start',
      marginBottom: 10,
    },
    headinglogo: {
      width: 230,
      height: 42,
      borderWidth: 2,
    },
    inputLabel: {
      fontFamily: 'CL-Bold',
      marginTop: 20,
      marginBottom: 3,
      color: COLORS.primary
    },
    box: {
      width: 330,
      height: 10,
      borderRadius: 20,
      marginTop: 50,
      display: 'flex',
      alignItems: 'center'
    },
    scrollView: {
      width: '100%',
      height: 0
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
      marginTop: 20,
      backgroundColor: COLORS.primary,
      padding: 18,
      paddingHorizontal: 100,
      borderRadius: 50,
      width: '80%',
      alignItems: 'center',
      elevation: 2,
      marginBottom: 150
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
    passContinput: {
      backgroundColor: COLORS.placeholderBG,
      borderRadius: 15,
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
    }
})
