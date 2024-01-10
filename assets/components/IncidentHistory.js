import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, ToastAndroid, View, Image, FlatList, Modal, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { COLORS } from '../constants/colors';
import {useFonts} from 'expo-font';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { baseUrl } from '../constants/url';
import { imgUrl } from '../constants/url';

const IncidentHistory = ({data, navigation, fetchIncidentHistory}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
        fetchIncidentHistory();
    };

    const patchCancelled = async (id) => {
    
      try {
        const response = await axios.patch(`${baseUrl}cancelledIncident/${id}`);
        ToastAndroid.show('Succesfully canceled an emergency!', ToastAndroid.SHORT);
        fetchIncidentHistory();
        return response.data; 
      } catch (error) {
        console.error('Error making PATCH request:', error);
        throw error;
      }
    };
  
    const cannotCancel = () => {
      return ToastAndroid.show('Cannot cancel emergency!', ToastAndroid.SHORT);
    }
  
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
              <View >
                
              <TouchableOpacity style={styles.box} key={data.id} onPress={openModal}>
                  <View style={styles.rightCont}>
                    <View style={styles.lineDefault}></View>
                  </View>
        
                  <View style={styles.middleCont}>
                    <Text style={styles.incidentLabel}>You've Reported an Incident</Text>
                  </View>
                 
              </TouchableOpacity> 
  
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  style={{justifyContent: 'flex-end', margin: 0}}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                >
                   <TouchableWithoutFeedback  onPress={() => setModalVisible(!modalVisible)}>
              <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>
  
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                  <ScrollView>
                  <View style={styles.details}>
                    
                  {data.status === 'Pending' ? (
                     <View style={styles.pendingCont}>
                      <View style={styles.pendingCircle}></View>
                      <Text style={styles.pendingStatus}>{data.status}</Text>
                     </View>
                  ) : data.status === 'Responding' ? (
                    <View style={styles.respondingCont}>
                      <View style={styles.respondingCircle}></View>
                      <Text style={styles.respondingStatus}>{data.status}</Text>
                    </View>
                  ) : data.status === 'Cancelled' ? (
                    <View style={styles.cancelledCont}>
                      <View style={styles.cancelledCircle}></View>
                      <Text style={styles.cancelledStatus}>{data.status}</Text>
                    </View>
                  ) : data.status === 'Que' ? (
                    <View style={styles.cancelledCont}>
                      <View style={styles.cancelledCircle}></View>
                      <Text style={styles.cancelledStatus}>INQUE</Text>
                    </View>
                  ) : (
                    <View style={styles.completedCont}>
                      <View style={styles.completedCircle}></View>
                      <Text style={styles.completedStatus}>{data.status}</Text>
                    </View>
                  )}
                    <TouchableOpacity style={styles.buttonClose}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Icon style={styles.exit} name="close-outline"/>
                    </TouchableOpacity>
  
                  </View>

                  <View style={styles.textCont}>
                    
                    <Image
                        style={{ width: 350, height: 200, borderRadius: 40 }}
                        source={{ uri: imgUrl + data.file }}
                    />
                    <View style={styles.dateMainCont}>
                        <View style={styles.dateChildCont}>
                            <Text style={styles.label}>Date:</Text>
                            <Text style={styles.labelValue}>{data.datehappened}</Text>
                        </View>
                        
                        <View style={styles.dateChildCont}>
                            <Text style={styles.label}>Time:</Text>
                            <Text style={styles.labelValue}>{data.timehappened}</Text>
                        </View>
                        
                        

                    </View>
                    
                    <View style={styles.detailsMainCont}>
                        <View style={styles.detailsChildCont}>
                            <Text style={styles.label}>Details:</Text>
                            <Text style={styles.labelValue}>{data.details}</Text>
                        </View>
                    </View>

                    <View style={styles.detailsMainCont}>
                        <View style={styles.detailsChildCont}>
                            <Text style={styles.label}>Notes:</Text>
                            <Text style={styles.labelValue}>{data.addnotes}</Text>
                        </View>
                    </View>

                  </View>
                      
                    <View style={styles.info}>
                    <Text style={styles.btnTxt}>Cancel your report?</Text>
                    {data.status !== 'Cancelled' && data.status !== 'Completed' && data.status !== 'Responding'  && data.status !== 'Forwarded' ? (
                      <TouchableOpacity
                        style={styles.getStartedBtn}
                        onPress={() => patchCancelled(data.id)}
                      >
                        <Text style={styles.getStartedTxtLogin}>ABORT</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.getStartedBtnOff}
                        onPress={() => cannotCancel()}
                      >
                        <Text style={styles.getStartedTxtLogin}>ABORT</Text>
                      </TouchableOpacity>
                    )}
                    </View>
                    </ScrollView>
                    </View>
                </View>
              </Modal>
              </View>
              )
}

export default IncidentHistory

const styles = StyleSheet.create({
    dateMainCont:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20
    },
    detailsMainCont:{
        marginVertical: 20
    },
    detailsChildCont:{
        display: 'flex',
        flexDirection: 'row',
        gap: 6,
    },
    label:{
        fontFamily: 'CL-Bold',
        color: COLORS.primary,
        fontSize: 15
    },
    labelValue:{
        fontFamily: 'CL-Bold',
        color: "#2b2b2b",
        fontSize: 15
    },
    dateChildCont:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 6,

    },
    box: {
        padding: 20,
        minWidth: '90%',
        borderRadius: 10,
        backgroundColor: COLORS.white,
        display: 'flex',
        flexDirection: 'row',
        gap: 6,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 10,
          height: 5,
        },
        shadowOpacity: 1.25,
        shadowRadius: 50,
        elevation: 2,
    },
    lineDefault: {
        width: 20,
        height: 40,
        backgroundColor: '#d4a55f',
        borderRadius: 50
      },
    middleCont:{
    justifyContent: 'center',
    minWidth: "70%",
    },
    incidentLabel: {
        color: '#d4a55f',
        fontFamily: 'CL-Bold',
        fontSize: 15,
        marginLeft: 10
      },
      centeredView: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'flex-end'
        },
    
      modalView: {
        alignSelf: 'flex-end',
        backgroundColor: COLORS.placeholderBG,
        borderColor: COLORS.primary,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        padding:20,
        width: '100%',
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
        color: COLORS.gray,
        fontSize: 34,
      },
      
      map: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: 10,
        borderRadius: 30,
        backgroundColor: 'red',
        width: '100%',
        height: '50%'
      },
      googlemap: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        borderRadius: 10
      },
        
      info:{
       
        
      },
      infoicon: {
        color: 'rgb(81, 142, 239)',
      },
      pendingCont: {
        borderWidth: 1,
        borderColor: '#f54260',
        justifyContent: 'space-around',
        width: "33%",
        borderRadius: 15,
        textAlign: 'right',
        padding: 6,
        backgroundColor: '#fcc5d0',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3
      },
      pendingCircle: {
        width: 10,
        height: 10,
        backgroundColor: '#f54260',
        borderRadius: 100
      },
      pendingStatus:{
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#f54260',
        fontSize: 12
      },
      cancelledCont: {
        borderWidth: 1,
        borderColor: '#7a7979',
        justifyContent: 'space-around',
        width: "33%",
        borderRadius: 15,
        textAlign: 'right',
        padding: 6,
        backgroundColor: '#e8e8e8',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3
      },
      cancelledCircle: {
        width: 10,
        height: 10,
        backgroundColor: '#7a7979',
        borderRadius: 100
      },
      cancelledStatus:{
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#7a7979',
        fontSize: 12
      },
      respondingCont: {
        borderWidth: 1,
        borderColor: '#dbb537',
        justifyContent: 'space-around',
        width: "33%",
        borderRadius: 15,
        textAlign: 'right',
        padding: 6,
        backgroundColor: '#f9facf',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3
      },
      respondingCircle: {
        width: 10,
        height: 10,
        backgroundColor: '#dbb537',
        borderRadius: 100
      },
      respondingStatus:{
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#dbb537',
        fontSize: 10
      },
      completedCont: {
        borderWidth: 1,
        borderColor: '#37db65',
        justifyContent: 'space-around',
        width: "33%",
        borderRadius: 15,
        textAlign: 'right',
        padding: 6,
        backgroundColor: '#cbfcc5',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3
      },
      completedCircle: {
        width: 10,
        height: 10,
        backgroundColor: '#37db65',
        borderRadius: 100
      },
      completedStatus:{
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#37db65',
        fontSize: 12
      },
      modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
      },
      getStartedBtn: {
        marginTop: 10,
        backgroundColor: '#f54260',
        padding: 18,
        paddingHorizontal: 100,
        borderRadius: 50,
        width: '100%',
        alignItems: 'center',
        elevation: 2
      },
      getStartedBtnOff: {
        marginTop: 10,
        backgroundColor: COLORS.gray,
        padding: 18,
        paddingHorizontal: 100,
        borderRadius: 50,
        width: '100%',
        alignItems: 'center',
        elevation: 2
      },
      getStartedTxtLogin: {
        color: '#fff',
        fontFamily: 'CL-Bold',
        fontSize: 16
      },
      disabledBtnTxt: {
        color: COLORS.gray,
        fontFamily: 'CL-Bold',
        fontSize: 16
      },
      btnTxt: {
        color: '#A6A6A6',
        fontFamily: 'CL-Bold',
        fontSize: 15,
        marginTop: 15
      },
  
  })