import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { COLORS } from '../../constants/colors';
import React, { useEffect, useState } from 'react';
import {useFonts} from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../../constants/url';
const Start = ({navigation}) => {
  const [emergency, setEmergerncy] = useState("");

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
    console.log(user_id, emergency, status, location.latitude, location.longitude)
    try {

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
      // The request was successful
      setEmergerncy("");
      console.log('Request was successful!');
    } else {
      // Handle errors based on the status code
      console.error('Request failed with status:', response.status);
    }
    } catch (error) {
   
      
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
          <View style={styles.header}>
            <Image style={styles.headinglogo} source={require('../../otapimages/header.png')} />
          </View>
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.box1} onPress={() => {sendEmergency(); sendAmbulance();}}>
                    <Icon
                    name= 'ambulance'
                    size={50}
                    color={COLORS.white}
                    />
                    <Text style={styles.boxText}>AMBULANCE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.box2} onPress={() => {sendEmergency(); sendFiretruck();}}>
                    <Icon
                    name= 'fire'
                    size={50}
                    color={COLORS.white}
                    />
                    <Text style={styles.boxText}>FIRE TRUCK</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.box3} onPress={() => {sendEmergency(); sendBpat();}}>
                    <Icon2
                    name= 'local-police'
                    size={50}
                    color={COLORS.white}
                    />
                    <Text style={styles.boxText}>BPSO</Text>
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
        height: '22%',
        backgroundColor: '#f77777',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      box2: {
        width: '80%',
        height: '22%',
        backgroundColor: '#f7ae77',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      box3: {
        width: '80%',
        height: '22%',
        backgroundColor: '#77c0f7',
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