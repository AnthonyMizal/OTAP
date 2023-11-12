import { StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, {useState} from 'react';
import { ROUTES } from '../../constants/routes';
import {useFonts} from 'expo-font';
import {COLORS} from '../../constants/colors';
import DropdownComponent from '../../components/dropdownbarangay';
import axios from 'axios';

const Signup = (props) => {
    const {navigation} = props;
    const [first_name, setFirstname] = useState("");
    const [last_name, setLastname] = useState("");
    const [contact_no, setContact] = useState("");
    const [age, setAge] = useState("");
    const [barangay, setBarangay] = useState("");
    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
    const onChangeBarangayHandler = (barangay) => {
      setBarangay(barangay);

    };
    const onChangeUsernameHandler = (email) => {
      setUsername(email);
    };
    const onChangePasswordHandler = (password) => {
      setPassword(password);
    };

    const onSubmitFormHandler = async (event) => {
  
      setIsLoading(true);
  
      try {
        const response = await axios.post(`http://192.168.18.43:8000/api/register`, {
          first_name,
          last_name,
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
    <View style={styles.box}>
    </View>
    
    <Text style={styles.loginTxt}>Register to O-TAP!</Text>
    <Text style={styles.loginTxt2}>O-TAP is your one tap assisstant for emergency.</Text>

    <View style={styles.inputWrapper}>
      <TextInput style={styles.input} placeholder='Firstname'
      value={first_name}
      onChangeText={onChangeFirstnameHandler}
      />
      <TextInput style={styles.input} placeholder='Lastname'
      value={last_name}
      onChangeText={onChangeLastnameHandler}
      />
      <TextInput style={styles.input} placeholder='Contact No.'
      value={contact_no}
      onChangeText={onChangeContactHandler}
      />
      <TextInput style={styles.input} placeholder='Age'
      value={age}
      onChangeText={onChangeAgeHandler}
      />
      <DropdownComponent onSelectedValue={onChangeBarangayHandler} />
      <TextInput style={styles.input} placeholder='Username'
      value={email}
      onChangeText={onChangeUsernameHandler}
      />
      <TextInput style={styles.input} placeholder='Password'
      secureTextEntry
      value={password}
      onChangeText={onChangePasswordHandler}
      />
   

    </View>
    <TouchableOpacity style={styles.getStartedBtn} onPress={onSubmitFormHandler}>
      <Text style={styles.getStartedTxtLogin}>SIGNUP</Text>
    </TouchableOpacity>

    <View style={styles.bottomTextCont}>
      <Text style={styles.getStartedTxt}>Already have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)}>
      <Text style={styles.registerTxt}>LOGIN</Text>
      </TouchableOpacity>
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
        backgroundColor: COLORS.placeholderBG,
        borderRadius: 15,
        padding: 18,
        borderWidth: 1,
        borderColor: COLORS.primary,
      },
      inputWrapper: {
        width: '80%',
        gap: 20,
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

export default Signup;