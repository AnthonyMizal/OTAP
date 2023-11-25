import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Modal, Pressable, SafeAreaView } from 'react-native';
import { COLORS } from '../constants/colors';
import {useFonts} from 'expo-font';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';

const HistoryBox = ({data, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
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
            <SafeAreaView>
            <TouchableOpacity style={styles.box} key={item.id} onPress={() => {setModalVisible(true); handleItemPress(item);}}>
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

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>

                <View style={styles.details}>
                  
                      <Text style={styles.emergencydits}><Icon name="megaphone-outline" style={styles.megaphone}/> Emergency Details</Text>
                  <TouchableOpacity style={styles.buttonClose}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Icon style={styles.exit} name="close-outline"/>
                  </TouchableOpacity>
                </View>
                  
                  <View style={styles.map}>
                      <MapView style={styles.googlemap} />
                  </View>

                  <View style={styles.info}>
                    <Text style={styles.modalText}><Icon style={styles.infoicon} name="alert-circle"/> Type: </Text>
                    <Text style={styles.modalText}><Icon style={styles.infoicon} name="person-circle-outline"/> Name: </Text>
                    <Text style={styles.modalText}><Icon style={styles.infoicon} name="calendar"/> Age: </Text>
                    <Text style={styles.modalText}><Icon style={styles.infoicon} name="home"/> Address: </Text>
                  </View>
                  
                  </View>
              </View>
            </Modal>
          </SafeAreaView>
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
    },


    centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
    },

  modalView: {
    margin: 20,
    backgroundColor: COLORS.placeholderBG,
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 10,
    padding:20,
    width: '90%',
        height: '70%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  details:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emergencydits: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  megaphone:{
    color: 'red',
    fontSize: 18,
  },
  exit: {
    color: 'red',
    fontSize: 24,
  },
  
  map: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  googlemap: {
    ...StyleSheet.absoluteFillObject,
    height: '90%',
    marginTop: 5,
  },
    
  info:{
    backgroundColor: '#efefef',
    padding: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  infoicon: {
    color: 'rgb(81, 142, 239)',
  },

})