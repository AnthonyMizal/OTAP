import { StyleSheet, Text, TouchableOpacity, ToastAndroid, View, Image } from 'react-native';
import { COLORS } from '../../constants/colors';
import React, { useEffect, useState } from 'react';
import {useFonts} from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../../constants/url';
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import * as geolib from "geolib";
import customBounds from '../../components/staritabounds'
const Start = ({navigation}) => {
  const [emergency, setEmergerncy] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  

  useEffect(() => {

    if (emergency !== "") {
      sendEmergency();
    }
  }, [emergency]);

  const sendAmbulance = () => {
    setEmergerncy("Requesting for Ambulance");
  };
  
  const sendFiretruck = () => {
    setEmergerncy("Requesting for a Fire Truck");
  };

  const sendBpat = () => {
    setEmergerncy("Requesting for a Barangay Public Safety Officer");
  };

  const sendFlood = () => {
    setEmergerncy("Requesting for a Rescue(Flood)");
  };

  const getLocation = async () => {
        const location = JSON.parse(await AsyncStorage.getItem('location'));
        const user_id = JSON.parse(await AsyncStorage.getItem('user_id'));
        console.log('Selected Location:', location.latitude);
        console.log('ID:', user_id);
  };

  const sendEmergency = async () => {

    const location = JSON.parse(await AsyncStorage.getItem('location'));
    const user_id = JSON.parse(await AsyncStorage.getItem('user_id'));
    const status = "Pending";

    try {
      const isInsideBounds = geolib.isPointInPolygon(
        { latitude: location.latitude, longitude: location.longitude },
        customBounds.map(point => ({ latitude: point.latitude, longitude: point.longitude }))
       
      );
      if (!isInsideBounds) {
        return ToastAndroid.show('You are outside the vicinity of Santa rita!', ToastAndroid.SHORT);
      }

      const response = await axios.post(`${baseUrl}sendreport`, {
        residents_id:user_id,
        type:emergency,
        status:status,
        latitude:location.latitude,
        longitude:location.longitude,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status == 200) {
      setEmergerncy("");
      ToastAndroid.show('Succesfully sent an emergency!', ToastAndroid.SHORT);
      setIsButtonDisabled(true); 
      setTimeout(() => {
        setIsButtonDisabled(false); 
      },1 * 60 * 1000);
    } else {
      console.error('Request failed with status:', response.status);
    }
    } catch (error) {

          if (error.response.status == 400) {
            ToastAndroid.show('Your account is banned!', ToastAndroid.SHORT);
          }
      
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
         <FlashMessage position="top" />
          <View style={styles.header}>
            <Image style={styles.headinglogo} source={require('../../otapimages/header.png')} />
          </View>
         
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.box1, isButtonDisabled && styles.disabledButton]} onPress={() => {
            if (!isButtonDisabled) {
              sendEmergency();
              sendAmbulance();
            } 
          }}
          disabled={isButtonDisabled}>
                    <Icon
                    name= 'ambulance'
                    size={50}
                    color={COLORS.white}
                    />
                    <Text style={styles.boxText}>AMBULANCE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.box2, isButtonDisabled && styles.disabledButton]} onPress={() => {
            if (!isButtonDisabled) {
              sendEmergency();
              sendFiretruck();
            }
          }}
          disabled={isButtonDisabled}>
                    <Icon
                    name= 'fire'
                    size={50}
                    color={COLORS.white}
                    />
                    <Text style={styles.boxText}>FIRE TRUCK</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.box3, isButtonDisabled && styles.disabledButton]} onPress={() => {
            if (!isButtonDisabled) {
              sendEmergency();
              sendBpat();
            }
          }}
          disabled={isButtonDisabled}>
                    <Icon2
                    name= 'local-police'
                    size={50}
                    color={COLORS.white}
                    />
                    <Text style={styles.boxText}>BPAT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.box4, isButtonDisabled && styles.disabledButton]} onPress={() => {
            if (!isButtonDisabled) {
              sendEmergency();
              sendFlood();
            }
          }}
          disabled={isButtonDisabled}>
                    <Icon
                    name= 'water'
                    size={50}
                    color={COLORS.white}
                    />
                    <Text style={styles.boxText}>FLOOD</Text>
                </TouchableOpacity>
          </View>
                

      </View>
    )
  }
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
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
      box1: {
        width: '80%',
        height: '16%',
        backgroundColor: '#f77777',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      disabledButton:{
        width: '80%',
        height: '16%',
        backgroundColor: '#969696',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      box2: {
        width: '80%',
        height: '16%',
        backgroundColor: '#f7ae77',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      box3: {
        width: '80%',
        height: '16%',
        backgroundColor: '#77c0f7',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      box4: {
        width: '80%',
        height: '16%',
        backgroundColor: '#69dbd4',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      boxText: {
        fontFamily: 'Poppins-SemiBold',
        color: COLORS.white,
        fontSize: 20
      },
      buttonContainer:{
        width: '100%',
        height: '100%',
        gap: 15,
        alignItems: 'center'
      }
  })

  export default Start;