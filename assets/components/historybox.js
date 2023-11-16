import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/colors';
import {useFonts} from 'expo-font';


const HistoryBox = () => {

    let [fontsLoaded] = useFonts({
        'Momcake-Bold': require('../fonts/Momcake-Bold.otf'),
        'Momcake-Thin': require('../fonts/Momcake-Thin.otf'),
        'CL-Reg': require('../fonts/CL-Reg.ttf'),
        'CL-Bold': require('../fonts/CL-Bold.ttf'),
        'Poppins-Black': require('../fonts/Poppins-Black.ttf'),
        'Poppins-ExtraBold': require('../fonts/Poppins-ExtraBold.ttf'),
        'Poppins-Medium': require('../fonts/Poppins-Medium.ttf'),
        'Poppins-SemiBold': require('../fonts/Poppins-SemiBold.ttf'),
        'Poppins-Thin': require('../fonts/Poppins-Thin.ttf'),
      });
      if (!fontsLoaded) {
        return null;
      }

  return (
      <TouchableOpacity style={styles.box}>
        <Text>Alert!</Text>
      </TouchableOpacity>
  )
}

export default HistoryBox;

const styles = StyleSheet.create({
    box: {
        padding: 20,
        width: '87%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.white,
        
    },
})