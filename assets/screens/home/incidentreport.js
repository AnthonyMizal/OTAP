import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/colors'
import Icon from 'react-native-vector-icons/Ionicons';
import {useFonts} from 'expo-font';

const IncidentReport = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>IncidentReport</Text>
      </View>
    )
  }
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          alignItems: 'center',
        justifyContent: 'center'
      },
      text: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    }
  })
  
  export default IncidentReport;