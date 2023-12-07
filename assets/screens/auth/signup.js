import { StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, {useState} from 'react';
import { ROUTES } from '../../constants/routes';
import {useFonts} from 'expo-font';
import {COLORS} from '../../constants/colors';
import DropdownComponent from '../../components/dropdownbarangay';
import axios from 'axios';
import { baseUrl } from '../../constants/url';

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
    const onChangeBarangayHandler = (selectedBarangay) => {
      setBarangay("");
      setBarangay(selectedBarangay);
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
        const response = await axios.post(`${baseUrl}register`, {
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
          ToastAndroid.show('Succesfully Created an Account!', ToastAndroid.SHORT);
          return navigation.navigate(ROUTES.LOGIN);
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

      <Text style={styles.inputLabel}>First Name:</Text>
      <TextInput style={styles.input}
      placeholderTextColor={COLORS.gray} 
      placeholder='ex. John'
      value={first_name}
      onChangeText={onChangeFirstnameHandler}
      />

      <Text style={styles.inputLabel}>Last Name:</Text>
      <TextInput style={styles.input} placeholderTextColor={COLORS.gray} placeholder='ex. Doe'
      value={last_name}
      onChangeText={onChangeLastnameHandler}
      />

      <Text style={styles.inputLabel}>Contact No.:</Text>
      <TextInput style={styles.input} placeholderTextColor={COLORS.gray} placeholder='ex. 0912345678'
      value={contact_no}
      onChangeText={onChangeContactHandler}
      />

      <Text style={styles.inputLabel}>Age:</Text>
      <TextInput style={styles.input} placeholderTextColor={COLORS.gray} placeholder='ex. 21'
      value={age}
      onChangeText={onChangeAgeHandler}
      />

      <Text style={styles.inputLabel}>Barangay:</Text>
      <DropdownComponent onSelectedValue={onChangeBarangayHandler} />

      <Text style={styles.inputLabel}>Email:</Text>
      <TextInput style={styles.input} placeholderTextColor={COLORS.gray} placeholder='ex. example@gmail.com'
      value={email}
      onChangeText={onChangeUsernameHandler}
      />

      <Text style={styles.inputLabel}>Password:</Text>
      <TextInput style={styles.input} placeholderTextColor={COLORS.gray} placeholder='(must contain 8 characters)'
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
      <Text style={styles.registerTxt}>Login</Text>
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
      },
      inputWrapper: {
        width: '80%',
        marginTop: 40
      },
      bottomTextCont: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        marginVertical: 40
      },
      registerTxt: {
        textDecorationLine: 'underline',
        color: COLORS.primary,
        fontFamily: 'CL-Bold',
        fontSize: 20,
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