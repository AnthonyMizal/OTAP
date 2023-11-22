import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { COLORS } from '../constants/colors';
import {useFonts} from 'expo-font';


const HistoryBox = ({data, navigation}) => {

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
       <FlatList scrollEnabled={false} data={data} keyExtractor={item => item.id.toString()} renderItem={({item}) => {
           return ( 
            <TouchableOpacity style={styles.box} key={item.id} onPress={() => {navigation.navigate(ROUTES.RECIPE_DETAILS, item)}}>
                <View style={styles.rightCont}>
                {item.type === 'Requesting for a Fire Truck' ? (
                  <View style={styles.lineCondition1}></View>
                ) : item.type === 'Requesting for a Barangay Public Safety Officer' ? (
                  <View style={styles.lineCondition2}></View>
                ) : (
                  <View style={styles.lineDefault}></View>
                )}
                </View>
      
                <View style={styles.middleCont}>
                    <Text style={styles.recipeTitle}>{item.type}</Text>
                </View>
                <View style={styles.leftCont}>
                    {/* <BookmarkButton data={item.id}/> */}
                </View>
            </TouchableOpacity> 
            )
    }}/>
  )
}

export default HistoryBox;

const styles = StyleSheet.create({
    box: {
        padding: 20,
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.white,
        display: 'flex',
        flexDirection: 'row',
        gap: 6,
        marginBottom: 10
    },
    lineCondition1: {
      width: 3,
      height: 30,
      backgroundColor: '#f7ae77',
    },
    lineCondition2: {
      width: 3,
      height: 30,
      backgroundColor: '#77c0f7',
    },
    lineDefault: {
      width: 3,
      height: 30,
      backgroundColor: '#f77777',
    },
    middleCont:{
      alignItems: 'center',
      justifyContent: 'center'
    }
    
})