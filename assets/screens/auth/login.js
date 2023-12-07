import { StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, {useState} from 'react';
import { ROUTES } from '../../constants/routes';
import {useFonts} from 'expo-font';
import {COLORS} from '../../constants/colors';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../constants/url';
import Icon from 'react-native-vector-icons/Ionicons';
const Login = (props) => {
    const {navigation} = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const onChangeEmailHandler = (email) => {
      setEmail(email);
      };
      const onChangePasswordHandler = (password) => {
        setPassword(password);
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
    
      const handleLogin = async () => {
        try {
          const response = await axios.post(`${baseUrl}userlogin`, {
            email,
            password,
          });
          if (response.status === 200) {
            ToastAndroid.show('Succesfully Logged In!', ToastAndroid.SHORT);
            const token = response.data.token;
            setEmail('');
            setPassword('');
            AsyncStorage.setItem('user_id', JSON.stringify(response.data.user.id));
            return navigation.navigate(ROUTES.HOME_NAVIGATOR);
    
          } else {
            throw new Error("An error has occurred");
          }

        } catch (error) {
          if (error.response) {

            console.log('Login Failed', error.response.data.message);
          } else if (error.request) {
  
            console.log('Network Error', 'Please check your internet connection.');
          } else {

            console.log('Error', 'An unexpected error occurred.');
          }
        }
      };



  return (
    <View style={styles.container}>
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView 
                  style={styles.keyboardView}>
    <View style={styles.box}>
      <View style={styles.picContainer}>
      <Image style={styles.loginlogo} source={require('../../otapimages/otaploginlogo.png')} />
      </View>
    </View>
    
    <Text style={styles.loginTxt}>Welcome to O-TAP!</Text>
    <Text style={styles.loginTxt2}>O-TAP is your one tap assisstant for emergency.</Text>

    <View style={styles.inputWrapper}>

      <View style={styles.input}>
          <Icon
            name= 'person'
            size={25}
            color={COLORS.primary}
            />
          <TextInput style={styles.inputCon} placeholderTextColor={COLORS.gray} placeholder='Email'
          value={email}
          onChangeText={onChangeEmailHandler}
          />
      </View>
      

      <View style={styles.passinput}>
        <View style={styles.passinputCont}>
            <Icon
            name= 'lock-closed'
            size={25}
            color={COLORS.primary}
            />
             <TextInput style={styles.inputCon} placeholderTextColor={COLORS.gray} placeholder='Password'
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
    <TouchableOpacity style={styles.getStartedBtn} onPress={handleLogin}>
      <Text style={styles.getStartedTxtLogin}>LOGIN</Text>
    </TouchableOpacity>

    <View style={styles.bottomTextCont}>
      <Text style={styles.getStartedTxt}>Don't have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate(ROUTES.SIGNUP)}>
      <Text style={styles.registerTxt}>Register</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.VTextCont}>
      <Text style={styles.getStartedTxt}>v1.0.0</Text>
    </View>
  
    </KeyboardAvoidingView>
    
    </ScrollView>
  </View>
     )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
      },
      box: {
        width: 330,
        height: 250,
        borderRadius: 20,
        marginTop: 50,
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
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#ececec',
        borderRadius: 15,
        padding: 18,
        gap: 7
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
        display: 'flex',
        flexDirection: 'row',
        gap: 7
      },
      inputCon:{
        width: '80%',
      },
      inputWrapper: {
        width: '80%',
        gap: 20,
        marginTop: 40
      },
      bottomTextCont: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        marginTop: 25
      },
      VTextCont: {
        marginTop: 80
      },
      registerTxt: {
        color: COLORS.primary,
        fontFamily: 'CL-Bold',
        fontSize: 20,
        textDecorationLine: 'underline'
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
      

})

export default Login;